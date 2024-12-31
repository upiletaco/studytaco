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
      categories: {
        Row: {
          created_at: string
          game_id: string | null
          id: string
          name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          game_id?: string | null
          id?: string
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          game_id?: string | null
          id?: string
          name?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      email_list: {
        Row: {
          created_at: string
          email: string | null
          id: number
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
        }
        Relationships: []
      }
      games: {
        Row: {
          alias: string | null
          created_at: string
          high_score: number | null
          id: string
          is_public: boolean
        }
        Insert: {
          alias?: string | null
          created_at?: string
          high_score?: number | null
          id?: string
          is_public?: boolean
        }
        Update: {
          alias?: string | null
          created_at?: string
          high_score?: number | null
          id?: string
          is_public?: boolean
        }
        Relationships: []
      }
      millionaire_games: {
        Row: {
          alias: string | null
          created_at: string
          high_score: number | null
          id: string
          is_public: boolean | null
        }
        Insert: {
          alias?: string | null
          created_at?: string
          high_score?: number | null
          id?: string
          is_public?: boolean | null
        }
        Update: {
          alias?: string | null
          created_at?: string
          high_score?: number | null
          id?: string
          is_public?: boolean | null
        }
        Relationships: []
      }
      millionaire_mc_options: {
        Row: {
          clue: string | null
          correct: boolean | null
          created_at: string
          id: string
          question_id: string | null
        }
        Insert: {
          clue?: string | null
          correct?: boolean | null
          created_at?: string
          id?: string
          question_id?: string | null
        }
        Update: {
          clue?: string | null
          correct?: boolean | null
          created_at?: string
          id?: string
          question_id?: string | null
        }
        Relationships: []
      }
      millionaire_questions: {
        Row: {
          created_at: string
          game_id: string | null
          id: string
          question: string | null
        }
        Insert: {
          created_at?: string
          game_id?: string | null
          id?: string
          question?: string | null
        }
        Update: {
          created_at?: string
          game_id?: string | null
          id?: string
          question?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "millionaire_questions_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "millionaire_games"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          category_id: string | null
          clue: string | null
          created_at: string
          id: string
          points: number | null
          question: string | null
          updated_at: string | null
        }
        Insert: {
          category_id?: string | null
          clue?: string | null
          created_at?: string
          id?: string
          points?: number | null
          question?: string | null
          updated_at?: string | null
        }
        Update: {
          category_id?: string | null
          clue?: string | null
          created_at?: string
          id?: string
          points?: number | null
          question?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      survey_data: {
        Row: {
          created_at: string
          data: Json | null
          id: number
          user: string | null
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: number
          user?: string | null
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: number
          user?: string | null
        }
        Relationships: []
      }
      wwbm_games: {
        Row: {
          alias: string | null
          created_at: string
          high_score: number | null
          id: number
          is_public: boolean | null
        }
        Insert: {
          alias?: string | null
          created_at?: string
          high_score?: number | null
          id?: number
          is_public?: boolean | null
        }
        Update: {
          alias?: string | null
          created_at?: string
          high_score?: number | null
          id?: number
          is_public?: boolean | null
        }
        Relationships: []
      }
      wwbm_games_duplicate: {
        Row: {
          alias: string | null
          created_at: string
          high_score: number | null
          id: number
          is_public: boolean | null
        }
        Insert: {
          alias?: string | null
          created_at?: string
          high_score?: number | null
          id?: number
          is_public?: boolean | null
        }
        Update: {
          alias?: string | null
          created_at?: string
          high_score?: number | null
          id?: number
          is_public?: boolean | null
        }
        Relationships: []
      }
      wwbm_questions: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

