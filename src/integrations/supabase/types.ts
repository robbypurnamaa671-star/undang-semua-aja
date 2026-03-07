export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      guest_messages: {
        Row: {
          created_at: string
          guest_name: string
          id: string
          invitation_id: string
          is_approved: boolean
          message: string
        }
        Insert: {
          created_at?: string
          guest_name: string
          id?: string
          invitation_id: string
          is_approved?: boolean
          message: string
        }
        Update: {
          created_at?: string
          guest_name?: string
          id?: string
          invitation_id?: string
          is_approved?: boolean
          message?: string
        }
        Relationships: [
          {
            foreignKeyName: "guest_messages_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: false
            referencedRelation: "invitations"
            referencedColumns: ["id"]
          },
        ]
      }
      invitations: {
        Row: {
          bank_accounts: Json[]
          closing_message: string | null
          closing_prayer: string | null
          cover_image: string | null
          created_at: string
          event_date: string | null
          event_time: string | null
          event_type: string
          events: Json[]
          gallery_images: string[]
          guest_list: string[]
          id: string
          is_paid: boolean
          location_address: string | null
          location_map_url: string | null
          location_name: string | null
          message: string | null
          music_url: string | null
          names: string[]
          slug: string
          status: string
          template_id: string
          theme_color: string | null
          timezone: string
          title: string
          updated_at: string
          user_id: string
          whatsapp_number: string | null
        }
        Insert: {
          bank_accounts?: Json[]
          closing_message?: string | null
          closing_prayer?: string | null
          cover_image?: string | null
          created_at?: string
          event_date?: string | null
          event_time?: string | null
          event_type: string
          events?: Json[]
          gallery_images?: string[]
          guest_list?: string[]
          id?: string
          is_paid?: boolean
          location_address?: string | null
          location_map_url?: string | null
          location_name?: string | null
          message?: string | null
          music_url?: string | null
          names?: string[]
          slug: string
          status?: string
          template_id: string
          theme_color?: string | null
          timezone?: string
          title?: string
          updated_at?: string
          user_id: string
          whatsapp_number?: string | null
        }
        Update: {
          bank_accounts?: Json[]
          closing_message?: string | null
          closing_prayer?: string | null
          cover_image?: string | null
          created_at?: string
          event_date?: string | null
          event_time?: string | null
          event_type?: string
          events?: Json[]
          gallery_images?: string[]
          guest_list?: string[]
          id?: string
          is_paid?: boolean
          location_address?: string | null
          location_map_url?: string | null
          location_name?: string | null
          message?: string | null
          music_url?: string | null
          names?: string[]
          slug?: string
          status?: string
          template_id?: string
          theme_color?: string | null
          timezone?: string
          title?: string
          updated_at?: string
          user_id?: string
          whatsapp_number?: string | null
        }
        Relationships: []
      }
      rsvp_responses: {
        Row: {
          attendance: string
          created_at: string
          guest_count: number
          guest_name: string
          id: string
          invitation_id: string
          message: string | null
        }
        Insert: {
          attendance?: string
          created_at?: string
          guest_count?: number
          guest_name: string
          id?: string
          invitation_id: string
          message?: string | null
        }
        Update: {
          attendance?: string
          created_at?: string
          guest_count?: number
          guest_name?: string
          id?: string
          invitation_id?: string
          message?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rsvp_responses_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: false
            referencedRelation: "invitations"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          amount: number
          created_at: string
          doku_payment_token: string | null
          doku_payment_url: string | null
          expires_at: string | null
          id: string
          invoice_number: string
          paid_at: string | null
          payment_method: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount?: number
          created_at?: string
          doku_payment_token?: string | null
          doku_payment_url?: string | null
          expires_at?: string | null
          id?: string
          invoice_number: string
          paid_at?: string | null
          payment_method?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          doku_payment_token?: string | null
          doku_payment_url?: string | null
          expires_at?: string | null
          id?: string
          invoice_number?: string
          paid_at?: string | null
          payment_method?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
