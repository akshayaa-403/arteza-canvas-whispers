export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
