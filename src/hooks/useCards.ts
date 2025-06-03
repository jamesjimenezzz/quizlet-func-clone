import { fetchCardsByQuizId, updateCard, deleteCard } from "@/api/cards";
import { supabase } from "@/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFetchCards = (quizId: string) =>
  useQuery({
    queryKey: ["cards", quizId],
    queryFn: () => fetchCardsByQuizId(quizId),
    enabled: !!quizId,
  });

export const useUpdateCard = (quizId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      question,
      answer,
    }: {
      id: string;
      question: string;
      answer: string;
    }) => updateCard(id, question, answer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards", quizId] });
    },
  });
};

export const useDeleteCard = (quizId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCard(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["cards", quizId] }),
  });
};
