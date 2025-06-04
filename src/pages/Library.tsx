import Header from "@/components/Header";
import React from "react";
import { useDeleteQuiz, useFetchQuizzes } from "@/hooks/useQuizzes";
import { useFetchCards } from "@/hooks/useCards";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
import { Trash2 } from "lucide-react";
import { type Carde } from "@/types";
import InputAbs from "@/components/InputAbs";
import { Funnel } from "lucide-react";

const Library = () => {
  const { data: quizzes, isLoading, isError } = useFetchQuizzes();
  const { mutate } = useDeleteQuiz();
  const { data: allCards } = useFetchCards();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading quizzes</div>;

  return (
    <div className="max-w-[1200px] mx-auto  ">
      <Header />
      <div className="flex items-center my-12 justify-between">
        <div className="">
          <p className="text-4xl font-semibold">Your Library</p>
          <p>2 study sets • 8 total cards</p>
        </div>

        <div>
          <Button variant={"outline"}>Create Study Set</Button>
        </div>
      </div>
      <div className="flex text-center items-center gap-5 mb-5 justify-between">
        <InputAbs className="w-full  " />
        <Funnel className="w-6 h-6" />
        <Button>Most Recent</Button>
      </div>
      <div className="grid   sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {quizzes?.map((quiz) => {
          const cardCount =
            allCards?.filter((card) => card.quiz_id === quiz.id).length || 0;
          const cardQuestion = allCards?.filter(
            (card) => card.quiz_id === quiz.id
          );
          const cardAnswer = allCards?.filter(
            (card) => card.quiz_id === quiz.id
          );

          return (
            <Card
              key={quiz.id}
              className="w-full mx-auto sm:max-w-[432.5px] m-0 rounded-lg h-75.5  bg-transparent pt-7   gap-0 my-5 "
            >
              <CardHeader className="flex items-center  pb-2 justify-between">
                <CardTitle className="text-lg">{quiz.title}</CardTitle>
                <CardDescription className="">
                  <div className="flex items-center gap-3">
                    <span className="text-sm dark:bg-slate-200 dark:text-gray-800 font-semibold text-gray-800 bg-gray-200 rounded-full  px-3">
                      {cardCount}
                    </span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription className="space-y-3">
                  <p>
                    {quiz.description ||
                      "No description available for this study set."}
                  </p>
                  <div className="flex   gap-2">
                    <ul className="">
                      {cardQuestion?.map((card) => (
                        <li>{card.question}</li>
                      ))}
                    </ul>

                    <ul className="">
                      {cardQuestion?.map((card) => (
                        <li>•</li>
                      ))}
                    </ul>

                    <ul>
                      {cardAnswer?.map((card) => (
                        <li>{card.answer}</li>
                      ))}
                    </ul>
                  </div>
                </CardDescription>
              </CardContent>
              <CardFooter className=" items-center text-center">
                <CardAction className="mt-2 flex items-center text-center w-full gap-2">
                  <Link className="flex-1" to={`/quiz/${quiz.id}`}>
                    <Button className="w-full ">Start Studying</Button>
                  </Link>
                  <Link className="w-1/4" to={`/form/${quiz.id}`}>
                    <Button className="w-full " variant="outline">
                      Edit
                    </Button>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger className="" asChild>
                      <Button
                        variant="outline"
                        className="p-2 hover:text-white dark:hover:text-white  text-red-500 dark:hover:bg-red-500  hover:bg-red-500 "
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
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
                </CardAction>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Library;
