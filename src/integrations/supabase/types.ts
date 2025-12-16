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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          image_url: string | null
          role: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          role: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      registrations_12th_learners: {
        Row: {
          board: string | null
          career_interests: string[] | null
          created_at: string
          date_of_birth: string | null
          email: string | null
          full_name: string
          id: string
          percentage: string | null
          phone: string
          preferred_course: string | null
          preferred_institution: string | null
          school_name: string | null
          stream: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          board?: string | null
          career_interests?: string[] | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          full_name: string
          id?: string
          percentage?: string | null
          phone: string
          preferred_course?: string | null
          preferred_institution?: string | null
          school_name?: string | null
          stream?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          board?: string | null
          career_interests?: string[] | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          full_name?: string
          id?: string
          percentage?: string | null
          phone?: string
          preferred_course?: string | null
          preferred_institution?: string | null
          school_name?: string | null
          stream?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      registrations_employers: {
        Row: {
          company_name: string
          company_size: string | null
          contact_email: string
          contact_name: string
          contact_phone: string
          created_at: string
          designation: string | null
          experience_level: string | null
          hiring_timeline: string | null
          id: string
          industry: string | null
          job_location: string | null
          roles_hiring: string | null
          updated_at: string
          user_id: string | null
          website: string | null
        }
        Insert: {
          company_name: string
          company_size?: string | null
          contact_email: string
          contact_name: string
          contact_phone: string
          created_at?: string
          designation?: string | null
          experience_level?: string | null
          hiring_timeline?: string | null
          id?: string
          industry?: string | null
          job_location?: string | null
          roles_hiring?: string | null
          updated_at?: string
          user_id?: string | null
          website?: string | null
        }
        Update: {
          company_name?: string
          company_size?: string | null
          contact_email?: string
          contact_name?: string
          contact_phone?: string
          created_at?: string
          designation?: string | null
          experience_level?: string | null
          hiring_timeline?: string | null
          id?: string
          industry?: string | null
          job_location?: string | null
          roles_hiring?: string | null
          updated_at?: string
          user_id?: string | null
          website?: string | null
        }
        Relationships: []
      }
      registrations_learners: {
        Row: {
          created_at: string
          date_of_birth: string | null
          degree: string | null
          email: string
          experience: string | null
          full_name: string
          graduation_year: string | null
          id: string
          institution: string | null
          job_role: string | null
          phone: string
          preferred_role: string | null
          skills: string | null
          specialization: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          date_of_birth?: string | null
          degree?: string | null
          email: string
          experience?: string | null
          full_name: string
          graduation_year?: string | null
          id?: string
          institution?: string | null
          job_role?: string | null
          phone: string
          preferred_role?: string | null
          skills?: string | null
          specialization?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          date_of_birth?: string | null
          degree?: string | null
          email?: string
          experience?: string | null
          full_name?: string
          graduation_year?: string | null
          id?: string
          institution?: string | null
          job_role?: string | null
          phone?: string
          preferred_role?: string | null
          skills?: string | null
          specialization?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      student_assessment_attempts: {
        Row: {
          answers_json: Json | null
          attempt_number: number
          completed_at: string | null
          course_recommendations: Json | null
          created_at: string
          current_question: number
          id: string
          is_paused: boolean
          questions_json: Json | null
          started_at: string
          stream: Database["public"]["Enums"]["student_stream"]
          total_questions: number
          updated_at: string
          user_id: string
        }
        Insert: {
          answers_json?: Json | null
          attempt_number?: number
          completed_at?: string | null
          course_recommendations?: Json | null
          created_at?: string
          current_question?: number
          id?: string
          is_paused?: boolean
          questions_json?: Json | null
          started_at?: string
          stream: Database["public"]["Enums"]["student_stream"]
          total_questions?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          answers_json?: Json | null
          attempt_number?: number
          completed_at?: string | null
          course_recommendations?: Json | null
          created_at?: string
          current_question?: number
          id?: string
          is_paused?: boolean
          questions_json?: Json | null
          started_at?: string
          stream?: Database["public"]["Enums"]["student_stream"]
          total_questions?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      student_profiles: {
        Row: {
          created_at: string
          entrance_exams: string[] | null
          id: string
          marks_range: string | null
          specific_interests: string[] | null
          stream: Database["public"]["Enums"]["student_stream"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          entrance_exams?: string[] | null
          id?: string
          marks_range?: string | null
          specific_interests?: string[] | null
          stream: Database["public"]["Enums"]["student_stream"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          entrance_exams?: string[] | null
          id?: string
          marks_range?: string | null
          specific_interests?: string[] | null
          stream?: Database["public"]["Enums"]["student_stream"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      student_question_history: {
        Row: {
          answered_at: string | null
          attempt_id: string | null
          created_at: string
          id: string
          options: Json
          question_hash: string
          question_text: string
          stream: Database["public"]["Enums"]["student_stream"]
          user_answer: string | null
          user_id: string
        }
        Insert: {
          answered_at?: string | null
          attempt_id?: string | null
          created_at?: string
          id?: string
          options: Json
          question_hash: string
          question_text: string
          stream: Database["public"]["Enums"]["student_stream"]
          user_answer?: string | null
          user_id: string
        }
        Update: {
          answered_at?: string | null
          attempt_id?: string | null
          created_at?: string
          id?: string
          options?: Json
          question_hash?: string
          question_text?: string
          stream?: Database["public"]["Enums"]["student_stream"]
          user_answer?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_question_history_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "student_assessment_attempts"
            referencedColumns: ["id"]
          },
        ]
      }
      user_assessment_attempts: {
        Row: {
          assessment_type: Database["public"]["Enums"]["assessment_type"]
          attempt_number: number
          completed_at: string | null
          created_at: string
          current_question: number
          id: string
          is_paused: boolean
          narrative_result: string | null
          score: Json | null
          started_at: string
          total_questions: number
          updated_at: string
          user_id: string
        }
        Insert: {
          assessment_type: Database["public"]["Enums"]["assessment_type"]
          attempt_number?: number
          completed_at?: string | null
          created_at?: string
          current_question?: number
          id?: string
          is_paused?: boolean
          narrative_result?: string | null
          score?: Json | null
          started_at?: string
          total_questions?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          assessment_type?: Database["public"]["Enums"]["assessment_type"]
          attempt_number?: number
          completed_at?: string | null
          created_at?: string
          current_question?: number
          id?: string
          is_paused?: boolean
          narrative_result?: string | null
          score?: Json | null
          started_at?: string
          total_questions?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_question_history: {
        Row: {
          answered_at: string | null
          assessment_type: Database["public"]["Enums"]["assessment_type"]
          attempt_id: string | null
          created_at: string
          id: string
          options: Json
          question_hash: string
          question_text: string
          user_answer: string | null
          user_id: string
        }
        Insert: {
          answered_at?: string | null
          assessment_type: Database["public"]["Enums"]["assessment_type"]
          attempt_id?: string | null
          created_at?: string
          id?: string
          options: Json
          question_hash: string
          question_text: string
          user_answer?: string | null
          user_id: string
        }
        Update: {
          answered_at?: string | null
          assessment_type?: Database["public"]["Enums"]["assessment_type"]
          attempt_id?: string | null
          created_at?: string
          id?: string
          options?: Json
          question_hash?: string
          question_text?: string
          user_answer?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_question_history_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "user_assessment_attempts"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      assessment_type:
        | "psychometric"
        | "career_interest"
        | "emotional_intelligence"
        | "skill_gap"
      student_stream: "pcm" | "pcb" | "pcmb" | "commerce" | "arts"
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
    Enums: {
      app_role: ["admin", "moderator", "user"],
      assessment_type: [
        "psychometric",
        "career_interest",
        "emotional_intelligence",
        "skill_gap",
      ],
      student_stream: ["pcm", "pcb", "pcmb", "commerce", "arts"],
    },
  },
} as const
