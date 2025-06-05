import { supabase } from "@/supabase/client";
import { type Quiz } from "@/types";

export const createQuiz = async (
  title: string,
  description: string
): Promise<Quiz> => {
  const { data, error } = await supabase
    .from("quizzes")
    .insert({ title, description })
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const fetchQuizzes = async (): Promise<Quiz[]> => {
  const { data, error } = await supabase
    .from("quizzes")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;

  return data;
};

export const updateQuiz = async (
  id: string,
  title: string,
  description: string
): Promise<void> => {
  const { error } = await supabase
    .from("quizzes")
    .update({ title, description })
    .eq("id", id);

  if (error) throw error;
};

export const deleteQuiz = async (id: string): Promise<void> => {
  const { error } = await supabase.from("quizzes").delete().eq("id", id);

  if (error) throw error;
};

export const fetchQuizbyQuizId = async (id: string): Promise<Quiz> => {
  const { data, error } = await supabase
    .from("quizzes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
};

export const deleteAll = async (): Promise<void> => {
  // Step 1: Delete all cards first (child table)
  const { error: cardError } = await supabase
    .from("cards")
    .delete()
    .not("id", "is", null) // delete all cards
    .select();

  if (cardError) {
    console.error("Failed to delete cards:", cardError);
    throw cardError;
  }

  // Step 2: Delete all quizzes (parent table)
  const { error: quizError } = await supabase
    .from("quizzes")
    .delete()
    .not("id", "is", null) // delete all quizzes
    .select();

  if (quizError) {
    console.error("Failed to delete quizzes:", quizError);
    throw quizError;
  }

  console.log("✅ All data deleted successfully.");
};
