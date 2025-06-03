// src/hooks/useQuizzes.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateQuizAndCards } from "../api/quizApi";

export const useUpdateQuizAndCards = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateQuizAndCards,
    onSuccess: () => {
      queryClient.invalidateQueries(); // Refresh everything
    },
  });
};
