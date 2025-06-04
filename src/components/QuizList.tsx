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
import { useFetchCards } from "@/hooks/useCards";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const QuizList = () => {
  const { data: quizzes, isLoading, isError } = useFetchQuizzes();
  const { mutate } = useDeleteQuiz();
  const { data: allCards } = useFetchCards();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading quizzes</div>;

  return (
    <div className="w-full   items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {quizzes?.map((quiz) => {
        const cardCount =
          allCards?.filter((card) => card.quiz_id === quiz.id).length || 0;

        return (
          <Card
            key={quiz.id}
            className="w-full sm:max-w-md bg-transparent gap-2  my-5 md:mx-0"
          >
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-lg">{quiz.title}</CardTitle>
              <CardDescription className="">
                <div className="flex items-center gap-3">
                  <span className="text-sm dark:bg-slate-200 dark:text-gray-800 font-semibold text-gray-800 bg-gray-200 rounded-full py-1 px-2">
                    {cardCount}
                  </span>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Trash2 className="cursor-pointer h-5 w-5 text-red-500" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your quiz flashcard and remove from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500"
                          onClick={() => mutate(quiz.id)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
        );
      })}
    </div>
  );
};

export default QuizList;
