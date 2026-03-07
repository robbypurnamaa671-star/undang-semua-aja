import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const DOKU_API_URL = "https://api.doku.com/checkout/v1/payment";

async function generateSignature(
  clientId: string,
  requestId: string,
  requestTimestamp: string,
  requestTarget: string,
  body: string,
  secretKey: string
): Promise<string> {
  // 1. Generate Digest: SHA-256 of body, base64 encoded
  const bodyBytes = new TextEncoder().encode(body);
  const digestBuffer = await crypto.subtle.digest("SHA-256", bodyBytes);
  const digest = btoa(String.fromCharCode(...new Uint8Array(digestBuffer)));

  // 2. Build signature components
  const components = `Client-Id:${clientId}\nRequest-Id:${requestId}\nRequest-Timestamp:${requestTimestamp}\nRequest-Target:${requestTarget}\nDigest:${digest}`;

  // 3. HMAC-SHA256 with secret key
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secretKey),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(components)
  );
  const signature = btoa(
    String.fromCharCode(...new Uint8Array(signatureBuffer))
  );

  return `HMACSHA256=${signature}`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } =
      await supabaseAuth.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = claimsData.claims.sub as string;

    // Get DOKU credentials
    const dokuClientId = Deno.env.get("DOKU_CLIENT_ID");
    if (!dokuClientId) {
      throw new Error("DOKU_CLIENT_ID is not configured");
    }
    const dokuSecretKey = Deno.env.get("DOKU_SECRET_KEY");
    if (!dokuSecretKey) {
      throw new Error("DOKU_SECRET_KEY is not configured");
    }

    // Generate invoice number
    const now = new Date();
    const invoiceNumber = `INV-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

    const amount = 12000;

    // Build DOKU request body
    const dokuBody = JSON.stringify({
      order: {
        amount,
        invoice_number: invoiceNumber,
      },
      payment: {
        payment_due_date: 60, // minutes
      },
      customer: {
        id: userId,
        name: "Undanganlink User",
      },
    });

    // Generate request headers
    const requestId = crypto.randomUUID();
    const requestTimestamp = now.toISOString().replace(/\.\d{3}Z$/, "Z");
    const requestTarget = "/checkout/v1/payment";

    const signature = await generateSignature(
      dokuClientId,
      requestId,
      requestTimestamp,
      requestTarget,
      dokuBody,
      dokuSecretKey
    );

    // Call DOKU API
    const dokuResponse = await fetch(DOKU_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Client-Id": dokuClientId,
        "Request-Id": requestId,
        "Request-Timestamp": requestTimestamp,
        Signature: signature,
      },
      body: dokuBody,
    });

    const dokuData = await dokuResponse.json();

    if (!dokuResponse.ok) {
      console.error("DOKU API error:", JSON.stringify(dokuData));
      throw new Error(
        `DOKU API error [${dokuResponse.status}]: ${JSON.stringify(dokuData)}`
      );
    }

    // Save subscription record using service role
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    const { error: insertError } = await supabaseAdmin
      .from("subscriptions")
      .insert({
        user_id: userId,
        invoice_number: invoiceNumber,
        amount,
        status: "pending",
        doku_payment_url: dokuData.response?.payment?.url || null,
        doku_payment_token: dokuData.response?.payment?.token || null,
      });

    if (insertError) {
      console.error("Insert error:", insertError);
      throw new Error(`Failed to save subscription: ${insertError.message}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        payment_url: dokuData.response?.payment?.url,
        invoice_number: invoiceNumber,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    console.error("Error creating payment:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
