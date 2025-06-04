import { supabase } from "@/supabase/client";
import { type Card } from "@/types";

export const createCards = async (
  quizId: string,
  cards: { question: string; answer: string }[]
) => {
  const cardData = cards.map((card) => ({
    quiz_id: quizId,
    question: card.question,
    answer: card.answer,
  }));

  const { error } = await supabase.from("cards").insert(cardData);
  if (error) throw error;
};

export const fetchCardsByQuizId = async (quizId: string): Promise<Card[]> => {
  const { data, error } = await supabase
    .from("cards")
    .select("*")
    .eq("quiz_id", quizId);

  if (error) throw error;
  return data;
};

export const updateCard = async (
  id: string,
  question: string,
  answer: string
): Promise<void> => {
  const { error } = await supabase
    .from("cards")
    .update({ question, answer })
    .eq("id", id);

  if (error) throw error;
};

export const deleteCard = async (id: string): Promise<void> => {
  const { error } = await supabase.from("cards").delete().eq("id", id);

  if (error) throw error;
};

export const deleteCardByQuizId = async (quizId: string): Promise<void> => {
  const { error } = await supabase.from("cards").delete().eq("quiz_id", quizId);
  if (error) throw error;
};

export const fetchAllCards = async () => {
  const { data, error } = await supabase.from("cards").select("*");
  if (error) throw error;

  return data;
};
