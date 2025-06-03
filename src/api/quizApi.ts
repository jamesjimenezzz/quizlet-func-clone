import { supabase } from "@/supabase/client";

export const updateQuizAndCards = async ({
  quizId,
  title,
  description,
  cards,
}: {
  quizId: string;
  title: string;
  description: string;
  cards: { id?: string; question: string; answer: string }[];
}) => {
  const { error: quizError } = await supabase
    .from("quizzes")
    .update({ title, description })
    .eq("id", quizId);
  if (quizError) throw quizError;

  for (const card of cards) {
    if (card.id) {
      const { error } = await supabase
        .from("cards")
        .update({ question: card.question, answer: card.answer })
        .eq("id", card.id);
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from("cards")
        .insert({
          quiz_id: quizId,
          question: card.question,
          answer: card.answer,
        });
      if (error) throw error;
    }
  }
};
