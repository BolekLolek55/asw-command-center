export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      subjects: {
        Row: {
          id: string;
          name: string;
          color: string;
          icon: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          color?: string;
          icon?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          color?: string;
          icon?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      materials: {
        Row: {
          id: string;
          subject_id: string | null;
          title: string;
          file_url: string;
          file_type: string;
          file_size: number;
          tags: string[];
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          subject_id?: string | null;
          title: string;
          file_url: string;
          file_type: string;
          file_size?: number;
          tags?: string[];
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          subject_id?: string | null;
          title?: string;
          file_url?: string;
          file_type?: string;
          file_size?: number;
          tags?: string[];
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      flashcards: {
        Row: {
          id: string;
          subject_id: string | null;
          question: string;
          answer: string;
          difficulty: number;
          interval: number;
          repetitions: number;
          ease_factor: number;
          next_review: string;
          last_reviewed: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          subject_id?: string | null;
          question: string;
          answer: string;
          difficulty?: number;
          interval?: number;
          repetitions?: number;
          ease_factor?: number;
          next_review?: string;
          last_reviewed?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          subject_id?: string | null;
          question?: string;
          answer?: string;
          difficulty?: number;
          interval?: number;
          repetitions?: number;
          ease_factor?: number;
          next_review?: string;
          last_reviewed?: string | null;
          created_at?: string;
        };
      };
      study_sessions: {
        Row: {
          id: string;
          subject_id: string | null;
          duration: number;
          notes: string | null;
          date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          subject_id?: string | null;
          duration: number;
          notes?: string | null;
          date?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          subject_id?: string | null;
          duration?: number;
          notes?: string | null;
          date?: string;
          created_at?: string;
        };
      };
      missions: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          deadline: string | null;
          priority: string;
          status: string;
          subject_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          deadline?: string | null;
          priority?: string;
          status?: string;
          subject_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          deadline?: string | null;
          priority?: string;
          status?: string;
          subject_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      intel_sources: {
        Row: {
          id: string;
          name: string;
          url: string;
          type: string;
          status: string;
          last_fetch: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          url: string;
          type?: string;
          status?: string;
          last_fetch?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          url?: string;
          type?: string;
          status?: string;
          last_fetch?: string | null;
          created_at?: string;
        };
      };
      activities: {
        Row: {
          id: string;
          action: string;
          type: string;
          subject_id: string | null;
          material_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          action: string;
          type?: string;
          subject_id?: string | null;
          material_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          action?: string;
          type?: string;
          subject_id?: string | null;
          material_id?: string | null;
          created_at?: string;
        };
      };
    };
  };
}
