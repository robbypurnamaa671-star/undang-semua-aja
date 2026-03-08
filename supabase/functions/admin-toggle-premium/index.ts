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
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Verify the caller is an admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user },
    } = await supabaseAuth.auth.getUser();

    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check admin role using service client
    const serviceClient = createClient(supabaseUrl, supabaseServiceKey);

    const { data: roleData } = await serviceClient
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { user_id, enable } = await req.json();

    if (!user_id) {
      return new Response(JSON.stringify({ error: "user_id is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (enable) {
      // Check if user already has an active subscription
      const { data: existing } = await serviceClient
        .from("subscriptions")
        .select("id")
        .eq("user_id", user_id)
        .eq("status", "active")
        .maybeSingle();

      if (existing) {
        // Update expiry
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + 1);

        await serviceClient
          .from("subscriptions")
          .update({
            expires_at: expiresAt.toISOString(),
            paid_at: new Date().toISOString(),
            payment_method: "manual_admin",
          })
          .eq("id", existing.id);
      } else {
        // Create new subscription
        const invoiceNumber = `MANUAL-${Date.now()}`;
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + 1);

        await serviceClient.from("subscriptions").insert({
          user_id,
          invoice_number: invoiceNumber,
          status: "active",
          amount: 0,
          paid_at: new Date().toISOString(),
          expires_at: expiresAt.toISOString(),
          payment_method: "manual_admin",
        });
      }

      // Mark all user's invitations as paid
      await serviceClient
        .from("invitations")
        .update({ is_paid: true })
        .eq("user_id", user_id);
    } else {
      // Deactivate: set all active subscriptions to expired
      await serviceClient
        .from("subscriptions")
        .update({
          status: "expired",
          expires_at: new Date().toISOString(),
        })
        .eq("user_id", user_id)
        .eq("status", "active");

      // Mark invitations as unpaid
      await serviceClient
        .from("invitations")
        .update({ is_paid: false })
        .eq("user_id", user_id);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
