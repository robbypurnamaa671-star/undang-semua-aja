import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log("DOKU notification received:", JSON.stringify(body));

    const invoiceNumber =
      body?.order?.invoice_number || body?.invoice_number;
    const transactionStatus =
      body?.transaction?.status || body?.status;

    if (!invoiceNumber) {
      console.error("No invoice number in notification");
      return new Response(JSON.stringify({ error: "Missing invoice_number" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    if (!supabaseServiceKey) {
      throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Determine payment status
    const isPaid =
      transactionStatus === "SUCCESS" || transactionStatus === "PAID";

    if (isPaid) {
      // Update subscription status
      const now = new Date();
      const expiresAt = new Date(now);
      expiresAt.setMonth(expiresAt.getMonth() + 1);

      const { data: subscription, error: updateError } = await supabase
        .from("subscriptions")
        .update({
          status: "active",
          paid_at: now.toISOString(),
          expires_at: expiresAt.toISOString(),
          payment_method: body?.channel?.id || body?.payment_method || "unknown",
        })
        .eq("invoice_number", invoiceNumber)
        .select("user_id")
        .single();

      if (updateError) {
        console.error("Update subscription error:", updateError);
        throw new Error(
          `Failed to update subscription: ${updateError.message}`
        );
      }

      // Update all user's draft/published invitations to isPaid = true
      if (subscription?.user_id) {
        const { error: invError } = await supabase
          .from("invitations")
          .update({ is_paid: true })
          .eq("user_id", subscription.user_id);

        if (invError) {
          console.error("Update invitations error:", invError);
        }
      }
    } else {
      // Update subscription with failed/other status
      await supabase
        .from("subscriptions")
        .update({ status: transactionStatus?.toLowerCase() || "failed" })
        .eq("invoice_number", invoiceNumber);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error processing DOKU notification:", error);
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
