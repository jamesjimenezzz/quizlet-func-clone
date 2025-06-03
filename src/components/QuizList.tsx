import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFetchQuizzes, useDeleteQuiz } from "../hooks/useQuizzes";
import { Link } from "react-router";
import { Trash2 } from "lucide-react";

const QuizList = () => {
  const { data: quizzes, isLoading, isError } = useFetchQuizzes();
  const { mutate } = useDeleteQuiz();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading quizzes</div>;

  return (
    <>
      {quizzes?.map((quiz) => (
        <Card key={quiz.id} className="max-w-md bg-transparent gap-1 my-5">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg">{quiz.title}</CardTitle>
            <CardDescription className="">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 bg-gray-200 rounded-full py-1 px-2">
                  5 Cards
                </span>
                <Trash2
                  onClick={() => mutate(quiz.id)}
                  className="w-4 text-red-700 h-4 cursor-pointer"
                />
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <p>
                {quiz.description ||
                  "No description available for this study set."}
              </p>
            </CardDescription>
          </CardContent>
          <CardFooter>
            <CardAction className="mt-2 flex justify-between text-center w-full gap-2">
              <Link to={`/quiz/${quiz.id}`} key={quiz.id}>
                <Button className="flex-1 ">Start Studying</Button>
              </Link>
              <Link to={`/form/${quiz.id}`} key={quiz.title}>
                <Button variant="outline">Edit</Button>
              </Link>
            </CardAction>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default QuizList;
