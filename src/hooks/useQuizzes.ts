import {
  createQuiz,
  fetchQuizzes,
  deleteQuiz,
  updateQuiz,
  fetchQuizbyQuizId,
  deleteAll,
} from "@/api/quizzes";
import { type NewQuiz } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCards, deleteCardByQuizId } from "@/api/cards";
import { updateQuizAndCards } from "../api/quizApi";

export const useCreateQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newQuiz: NewQuiz) => {
      const quiz = await createQuiz(newQuiz.title, newQuiz.description);
      await createCards(quiz.id, newQuiz.cards);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["quizzes"] }),
  });
};

export const useFetchQuizzes = () => {
  const query = useQuery({
    queryKey: ["quizzes"],
    queryFn: fetchQuizzes,
  });

  return query;
};

export const useUpdateQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      title,
      description,
    }: {
      id: string;
      title: string;
      description: string;
    }) => updateQuiz(id, title, description),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["quizzes"] }),
  });
};

export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (quizId: string) => {
      await deleteQuiz(quizId);
      await deleteCardByQuizId(quizId);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["quizzes"] }),
  });
};

export const useFetchQuizByQuizId = (quizId: string) => {
  const query = useQuery({
    queryKey: ["quizzes", quizId],
    queryFn: () => fetchQuizbyQuizId(quizId),
    enabled: !!quizId,
  });

  return query;
};

export const useUpdateQuizAndCards = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateQuizAndCards,
    onSuccess: () => {
      queryClient.invalidateQueries(); // Refresh everything
    },
  });
};

export const useDeleteAll = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAll,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
  });
};
