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
  const { data, error } = await supabase.from("quizzes").select("*");
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
