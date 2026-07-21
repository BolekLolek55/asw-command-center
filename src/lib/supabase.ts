import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper functions
export async function getSubjects() {
  const { data, error } = await supabase
    .from("subjects")
    .select("*")
    .order("name");

  if (error) throw error;
  return data;
}

export async function getMaterials(subjectId?: string) {
  let query = supabase.from("materials").select("*, subjects(name)").order("created_at", { ascending: false });

  if (subjectId) {
    query = query.eq("subject_id", subjectId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function uploadMaterial(file: File, subjectId: string, title: string) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `${subjectId}/${fileName}`;

  // Upload file to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from("materials")
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from("materials")
    .getPublicUrl(filePath);

  // Save metadata to database
  const { data, error } = await supabase
    .from("materials")
    .insert({
      subject_id: subjectId,
      title: title || file.name,
      file_url: publicUrl,
      file_type: fileExt?.toUpperCase() || "UNKNOWN",
      file_size: file.size,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getFlashcards(subjectId?: string) {
  let query = supabase.from("flashcards").select("*");

  if (subjectId) {
    query = query.eq("subject_id", subjectId);
  }

  const { data, error } = await query.order("next_review");
  if (error) throw error;
  return data;
}

export async function updateFlashcardReview(id: string, quality: number) {
  // Simple SRS algorithm
  const { data: card } = await supabase
    .from("flashcards")
    .select("*")
    .eq("id", id)
    .single();

  if (!card) throw new Error("Card not found");

  let { interval, repetitions, ease_factor } = card;

  if (quality >= 3) {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * ease_factor);

    repetitions += 1;
  } else {
    repetitions = 0;
    interval = 1;
  }

  ease_factor = Math.max(1.3, ease_factor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);

  const { data, error } = await supabase
    .from("flashcards")
    .update({
      interval,
      repetitions,
      ease_factor,
      next_review: nextReview.toISOString(),
      last_reviewed: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getStudyStats() {
  const { data, error } = await supabase
    .from("study_sessions")
    .select("*")
    .order("date", { ascending: false })
    .limit(30);

  if (error) throw error;
  return data;
}

export async function logStudySession(subjectId: string, duration: number, notes?: string) {
  const { data, error } = await supabase
    .from("study_sessions")
    .insert({
      subject_id: subjectId,
      duration,
      notes,
      date: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
