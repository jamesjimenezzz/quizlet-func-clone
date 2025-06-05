import React, { useMemo } from "react";

import { useFetchQuizzes, useDeleteQuiz } from "../hooks/useQuizzes";

import { useFetchCards } from "@/hooks/useCards";

import QuizCard from "./QuizCard";

const QuizList = () => {
  const { data: quizzes, isLoading, isError } = useFetchQuizzes();
  const { mutate } = useDeleteQuiz();
  const { data: allCards } = useFetchCards();

  const latestQuizzes = useMemo(() => {
    return [...(quizzes || [])]
      .sort(
        (a, b) =>
          new Date(b.created_at || 0).getTime() -
          new Date(a.created_at || 0).getTime()
      )
      .slice(0, 3);
  }, [quizzes]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading quizzes</div>;

  return (
    <div className="w-full   items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {latestQuizzes?.map((quiz) => {
        const cardCount =
          allCards?.filter((card) => card.quiz_id === quiz.id).length || 0;

        return <QuizCard quiz={quiz} cardCount={cardCount} onDelete={mutate} />;
      })}
    </div>
  );
};

export default QuizList;
