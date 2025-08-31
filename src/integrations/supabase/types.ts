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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      artworks: {
        Row: {
          availability_status: string
          collection_name: string | null
          created_at: string
          created_year: number | null
          description: string | null
          dominant_colors: string[] | null
          id: string
          image_url: string
          mood_tags: string[] | null
          price: number | null
          size_category: string | null
          technique: string | null
          title: string
          updated_at: string
        }
        Insert: {
          availability_status?: string
          collection_name?: string | null
          created_at?: string
          created_year?: number | null
          description?: string | null
          dominant_colors?: string[] | null
          id?: string
          image_url: string
          mood_tags?: string[] | null
          price?: number | null
          size_category?: string | null
          technique?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          availability_status?: string
          collection_name?: string | null
          created_at?: string
          created_year?: number | null
          description?: string | null
          dominant_colors?: string[] | null
          id?: string
          image_url?: string
          mood_tags?: string[] | null
          price?: number | null
          size_category?: string | null
          technique?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      class_bookings: {
        Row: {
          booking_status: string
          class_schedule_id: string
          created_at: string
          id: string
          payment_status: string
          special_requests: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          booking_status?: string
          class_schedule_id: string
          created_at?: string
          id?: string
          payment_status?: string
          special_requests?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          booking_status?: string
          class_schedule_id?: string
          created_at?: string
          id?: string
          payment_status?: string
          special_requests?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "class_bookings_class_schedule_id_fkey"
            columns: ["class_schedule_id"]
            isOneToOne: false
            referencedRelation: "class_schedules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "class_bookings_class_schedule_id_fkey"
            columns: ["class_schedule_id"]
            isOneToOne: false
            referencedRelation: "class_schedules_public"
            referencedColumns: ["id"]
          },
        ]
      }
      class_schedules: {
        Row: {
          age_group: string
          class_title: string
          class_type: string
          created_at: string
          current_enrollments: number | null
          end_time: string
          id: string
          instructor_name: string
          materials_list: string[] | null
          max_students: number
          scheduled_date: string
          start_time: string
          status: string
          updated_at: string
          zoom_link: string | null
        }
        Insert: {
          age_group: string
          class_title: string
          class_type: string
          created_at?: string
          current_enrollments?: number | null
          end_time: string
          id?: string
          instructor_name?: string
          materials_list?: string[] | null
          max_students?: number
          scheduled_date: string
          start_time: string
          status?: string
          updated_at?: string
          zoom_link?: string | null
        }
        Update: {
          age_group?: string
          class_title?: string
          class_type?: string
          created_at?: string
          current_enrollments?: number | null
          end_time?: string
          id?: string
          instructor_name?: string
          materials_list?: string[] | null
          max_students?: number
          scheduled_date?: string
          start_time?: string
          status?: string
          updated_at?: string
          zoom_link?: string | null
        }
        Relationships: []
      }
      email_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          last_email_sent: string | null
          name: string | null
          preferences: Json | null
          subscription_source: string | null
          subscription_status: string
          updated_at: string
          welcome_series_completed: boolean | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          last_email_sent?: string | null
          name?: string | null
          preferences?: Json | null
          subscription_source?: string | null
          subscription_status?: string
          updated_at?: string
          welcome_series_completed?: boolean | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          last_email_sent?: string | null
          name?: string | null
          preferences?: Json | null
          subscription_source?: string | null
          subscription_status?: string
          updated_at?: string
          welcome_series_completed?: boolean | null
        }
        Relationships: []
      }
      student_enrollments: {
        Row: {
          class_type: string
          completion_status: string
          created_at: string
          enrollment_date: string
          id: string
          notes: string | null
          progress_percentage: number | null
          skills_learned: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          class_type: string
          completion_status?: string
          created_at?: string
          enrollment_date?: string
          id?: string
          notes?: string | null
          progress_percentage?: number | null
          skills_learned?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          class_type?: string
          completion_status?: string
          created_at?: string
          enrollment_date?: string
          id?: string
          notes?: string | null
          progress_percentage?: number | null
          skills_learned?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      class_schedules_public: {
        Row: {
          age_group: string | null
          class_title: string | null
          class_type: string | null
          created_at: string | null
          current_enrollments: number | null
          end_time: string | null
          id: string | null
          instructor_name: string | null
          materials_list: string[] | null
          max_students: number | null
          scheduled_date: string | null
          start_time: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          age_group?: string | null
          class_title?: string | null
          class_type?: string | null
          created_at?: string | null
          current_enrollments?: number | null
          end_time?: string | null
          id?: string | null
          instructor_name?: string | null
          materials_list?: string[] | null
          max_students?: number | null
          scheduled_date?: string | null
          start_time?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          age_group?: string | null
          class_title?: string | null
          class_type?: string | null
          created_at?: string | null
          current_enrollments?: number | null
          end_time?: string | null
          id?: string | null
          instructor_name?: string | null
          materials_list?: string[] | null
          max_students?: number | null
          scheduled_date?: string | null
          start_time?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_class_zoom_link: {
        Args: { class_id: string }
        Returns: string
      }
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
