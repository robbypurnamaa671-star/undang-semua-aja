import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { InvitationData, EventSession, BankAccount, generateSlug } from "@/lib/invitation";

export interface DbInvitation {
  id: string;
  user_id: string;
  slug: string;
  event_type: string;
  template_id: string;
  status: "draft" | "published";
  is_paid: boolean;
  title: string;
  names: string[];
  event_date: string | null;
  event_time: string | null;
  timezone: string;
  location_name: string | null;
  location_address: string | null;
  location_map_url: string | null;
  message: string | null;
  cover_image: string | null;
  gallery_images: string[];
  theme_color: string | null;
  events: any[];
  bank_accounts: any[];
  closing_message: string | null;
  closing_prayer: string | null;
  music_url: string | null;
  whatsapp_number: string | null;
  created_at: string;
  updated_at: string;
}

// Convert database format to app format
export function dbToInvitation(db: DbInvitation): InvitationData {
  return {
    id: db.id,
    userId: db.user_id,
    slug: db.slug,
    eventType: db.event_type as InvitationData["eventType"],
    templateId: db.template_id,
    status: db.status,
    isPaid: db.is_paid,
    title: db.title,
    names: db.names,
    eventDate: db.event_date || "",
    eventTime: db.event_time || "",
    timezone: db.timezone || "WIB",
    locationName: db.location_name || "",
    locationAddress: db.location_address || "",
    locationMapUrl: db.location_map_url || undefined,
    message: db.message || "",
    coverImage: db.cover_image || undefined,
    galleryImages: db.gallery_images,
    themeColor: db.theme_color || undefined,
    events: (db.events || []).map((e: any) => ({
      name: e.name || '',
      date: e.date || '',
      time: e.time || '',
      endTime: e.endTime || '',
      location: e.location || '',
    })) as EventSession[],
    bankAccounts: (db.bank_accounts || []).map((a: any) => ({
      bankName: a.bankName || '',
      accountNumber: a.accountNumber || '',
      accountHolder: a.accountHolder || '',
    })) as BankAccount[],
    closingMessage: db.closing_message || undefined,
    closingPrayer: db.closing_prayer || undefined,
    musicUrl: db.music_url || undefined,
    whatsappNumber: db.whatsapp_number || undefined,
    createdAt: db.created_at,
    updatedAt: db.updated_at,
  };
}

// Convert app format to database format
export function invitationToDb(invitation: InvitationData, userId: string) {
  return {
    user_id: userId,
    slug: invitation.slug || generateSlug(),
    event_type: invitation.eventType,
    template_id: invitation.templateId,
    status: invitation.status,
    is_paid: invitation.isPaid,
    title: invitation.title,
    names: invitation.names,
    event_date: invitation.eventDate || null,
    event_time: invitation.eventTime || null,
    timezone: invitation.timezone || 'WIB',
    location_name: invitation.locationName || null,
    location_address: invitation.locationAddress || null,
    location_map_url: invitation.locationMapUrl || null,
    message: invitation.message || null,
    cover_image: invitation.coverImage || null,
    gallery_images: invitation.galleryImages,
    theme_color: invitation.themeColor || null,
    events: invitation.events.map(e => JSON.parse(JSON.stringify(e))),
    bank_accounts: invitation.bankAccounts.map(a => JSON.parse(JSON.stringify(a))),
    closing_message: invitation.closingMessage || null,
    closing_prayer: invitation.closingPrayer || null,
    music_url: invitation.musicUrl || null,
    whatsapp_number: invitation.whatsappNumber || null,
  };
}

export function useInvitations() {
  const [invitations, setInvitations] = useState<InvitationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchInvitations = async () => {
    if (!user) {
      setInvitations([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("invitations")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setInvitations((data || []).map((d) => dbToInvitation(d as unknown as DbInvitation)));
    } catch (error: any) {
      console.error("Error fetching invitations:", error);
      toast({
        title: "Gagal memuat undangan",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, [user]);

  const createInvitation = async (invitation: InvitationData): Promise<string | null> => {
    if (!user) {
      toast({
        title: "Silakan login terlebih dahulu",
        variant: "destructive",
      });
      return null;
    }

    try {
      const dbData = invitationToDb(invitation, user.id);
      
      const { data, error } = await supabase
        .from("invitations")
        .insert(dbData as any)
        .select()
        .single();

      if (error) throw error;

      setInvitations((prev) => [dbToInvitation(data as unknown as DbInvitation), ...prev]);
      
      toast({
        title: "Berhasil!",
        description: "Undangan berhasil disimpan",
      });

      return data.id;
    } catch (error: any) {
      console.error("Error creating invitation:", error);
      toast({
        title: "Gagal menyimpan undangan",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  };

  const updateInvitation = async (id: string, invitation: Partial<InvitationData>): Promise<boolean> => {
    if (!user) return false;

    try {
      const updateData: any = {};
      
      if (invitation.title !== undefined) updateData.title = invitation.title;
      if (invitation.names !== undefined) updateData.names = invitation.names;
      if (invitation.eventDate !== undefined) updateData.event_date = invitation.eventDate || null;
      if (invitation.eventTime !== undefined) updateData.event_time = invitation.eventTime || null;
      if (invitation.timezone !== undefined) updateData.timezone = invitation.timezone;
      if (invitation.locationName !== undefined) updateData.location_name = invitation.locationName || null;
      if (invitation.locationAddress !== undefined) updateData.location_address = invitation.locationAddress || null;
      if (invitation.locationMapUrl !== undefined) updateData.location_map_url = invitation.locationMapUrl || null;
      if (invitation.message !== undefined) updateData.message = invitation.message || null;
      if (invitation.coverImage !== undefined) updateData.cover_image = invitation.coverImage || null;
      if (invitation.galleryImages !== undefined) updateData.gallery_images = invitation.galleryImages;
      if (invitation.status !== undefined) updateData.status = invitation.status;
      if (invitation.isPaid !== undefined) updateData.is_paid = invitation.isPaid;
      if (invitation.events !== undefined) updateData.events = invitation.events.map(e => JSON.parse(JSON.stringify(e)));
      if (invitation.bankAccounts !== undefined) updateData.bank_accounts = invitation.bankAccounts.map(a => JSON.parse(JSON.stringify(a)));
      if (invitation.closingMessage !== undefined) updateData.closing_message = invitation.closingMessage || null;
      if (invitation.closingPrayer !== undefined) updateData.closing_prayer = invitation.closingPrayer || null;
      if (invitation.musicUrl !== undefined) updateData.music_url = invitation.musicUrl || null;
      if (invitation.whatsappNumber !== undefined) updateData.whatsapp_number = invitation.whatsappNumber || null;

      const { error } = await supabase
        .from("invitations")
        .update(updateData)
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw error;

      setInvitations((prev) =>
        prev.map((inv) => (inv.id === id ? { ...inv, ...invitation } : inv))
      );

      return true;
    } catch (error: any) {
      console.error("Error updating invitation:", error);
      toast({
        title: "Gagal menyimpan perubahan",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteInvitation = async (id: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from("invitations")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw error;

      setInvitations((prev) => prev.filter((inv) => inv.id !== id));
      
      toast({
        title: "Undangan dihapus",
      });

      return true;
    } catch (error: any) {
      console.error("Error deleting invitation:", error);
      toast({
        title: "Gagal menghapus undangan",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  const publishInvitation = async (id: string): Promise<boolean> => {
    return updateInvitation(id, { status: "published" });
  };

  return {
    invitations,
    isLoading,
    createInvitation,
    updateInvitation,
    deleteInvitation,
    publishInvitation,
    refetch: fetchInvitations,
  };
}

export function usePublicInvitation(slug: string) {
  const [invitation, setInvitation] = useState<InvitationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvitation = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("invitations")
          .select("*")
          .eq("slug", slug)
          .eq("status", "published")
          .maybeSingle();

        if (error) throw error;

        if (!data) {
          setError("Undangan tidak ditemukan");
          setInvitation(null);
        } else {
          setInvitation(dbToInvitation(data as unknown as DbInvitation));
        }
      } catch (err: any) {
        console.error("Error fetching public invitation:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchInvitation();
    }
  }, [slug]);

  return { invitation, isLoading, error };
}
