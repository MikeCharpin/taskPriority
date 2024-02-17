export type GoalData = Database['public']["Tables"]["goals"]["Row"]
export type ProjectData = Database['public']["Tables"]["projects"]["Row"]
export type TaskData = Database['public']["Tables"]["tasks"]["Row"]

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      goals: {
        Row: {
          goalColor: string
          goalComplexity: string
          goalDesc: string
          goalExcitement: string
          goalId: string
          goalMotivation: string | null
          goalRank: number
          goalScore: number
          goalStatus: string
          inserted_at: string
          user_id: string
        }
        Insert: {
          goalColor?: string
          goalComplexity?: string
          goalDesc?: string
          goalExcitement?: string
          goalId: string
          goalMotivation?: string | null
          goalRank?: number
          goalScore?: number
          goalStatus?: string
          inserted_at?: string
          user_id: string
        }
        Update: {
          goalColor?: string
          goalComplexity?: string
          goalDesc?: string
          goalExcitement?: string
          goalId?: string
          goalMotivation?: string | null
          goalRank?: number
          goalScore?: number
          goalStatus?: string
          inserted_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "goals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      projects: {
        Row: {
          inserted_at: string
          projectComplexity: string
          projectDesc: string
          projectExcitement: string
          projectGoal: string
          projectId: string
          projectMotivation: string | null
          projectPriorityScore: number
          projectRank: number
          projectScore: number
          projectStatus: string
          projectTimeframe: string
          user_id: string
        }
        Insert: {
          inserted_at?: string
          projectComplexity?: string
          projectDesc?: string
          projectExcitement?: string
          projectGoal?: string
          projectId: string
          projectMotivation?: string | null
          projectPriorityScore?: number
          projectRank?: number
          projectScore?: number
          projectStatus?: string
          projectTimeframe?: string
          user_id: string
        }
        Update: {
          inserted_at?: string
          projectComplexity?: string
          projectDesc?: string
          projectExcitement?: string
          projectGoal?: string
          projectId?: string
          projectMotivation?: string | null
          projectPriorityScore?: number
          projectRank?: number
          projectScore?: number
          projectStatus?: string
          projectTimeframe?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_projectgoal_fkey"
            columns: ["projectGoal"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["goalId"]
          },
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      tasks: {
        Row: {
          inserted_at: string
          taskComplexity: string
          taskDesc: string
          taskDuration: number
          taskExcitement: string
          taskGoal: string
          taskId: string
          taskProject: string
          taskRank: number
          taskScore: number
          taskStatus: string
          user_id: string
        }
        Insert: {
          inserted_at?: string
          taskComplexity?: string
          taskDesc?: string
          taskDuration?: number
          taskExcitement?: string
          taskGoal?: string
          taskId: string
          taskProject?: string
          taskRank?: number
          taskScore?: number
          taskStatus?: string
          user_id: string
        }
        Update: {
          inserted_at?: string
          taskComplexity?: string
          taskDesc?: string
          taskDuration?: number
          taskExcitement?: string
          taskGoal?: string
          taskId?: string
          taskProject?: string
          taskRank?: number
          taskScore?: number
          taskStatus?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_taskproject_fkey"
            columns: ["taskProject"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["projectId"]
          },
          {
            foreignKeyName: "tasks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
