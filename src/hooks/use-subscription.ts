import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Subscription {
  id: string;
  status: string;
  invoice_number: string;
  amount: number;
  paid_at: string | null;
  expires_at: string | null;
  created_at: string;
}

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);

  const fetchSubscription = async () => {
    if (!user) {
      setSubscription(null);
      setIsPremium(false);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Error fetching subscription:", error);
        setIsPremium(false);
        return;
      }

      if (data) {
        const sub = data as unknown as Subscription;
        const isActive = sub.expires_at
          ? new Date(sub.expires_at) > new Date()
          : false;
        setSubscription(sub);
        setIsPremium(isActive);
      } else {
        setSubscription(null);
        setIsPremium(false);
      }
    } catch (err) {
      console.error("Subscription fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, [user]);

  const createPayment = async (): Promise<string | null> => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData?.session?.access_token;

      if (!accessToken) {
        throw new Error("Not authenticated");
      }

      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/doku-create-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({}),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Payment creation failed");
      }

      return result.payment_url;
    } catch (err) {
      console.error("Create payment error:", err);
      throw err;
    }
  };

  return {
    subscription,
    isPremium,
    isLoading,
    createPayment,
    refetch: fetchSubscription,
  };
}
