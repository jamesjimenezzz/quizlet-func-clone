import Header from "@/components/Header";
import React, { useMemo, useState } from "react";
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
import InputAbs from "@/components/InputAbs";
import { Funnel } from "lucide-react";
import { useDeleteAll } from "@/hooks/useQuizzes";
import { Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Library = () => {
  const { mutate: deleteAllData } = useDeleteAll();
  const { data: quizzes, isLoading, isError } = useFetchQuizzes();

  const { mutate } = useDeleteQuiz();
  const [sortOption, setSortOption] = useState("");

  const { data: allCards } = useFetchCards();

  const sortedQuizzes = useMemo(() => {
    if (!quizzes) return;

    const cardWithData = quizzes.map((quiz) => {
      const quizCards = allCards?.filter((card) => card.quiz_id === quiz.id);
      return {
        ...quiz,
        cardCount: quizCards?.length,
        cardQuestion: quizCards?.map((c) => c.question),
        cardAnswer: quizCards?.map((c) => c.answer),
      };
    });

    switch (sortOption) {
      case "alphabetical":
        return cardWithData.sort((a, b) => a.title.localeCompare(b.title));
      case "most-cards":
        return cardWithData.sort(
          (a, b) => (b.cardCount || 0) - (a.cardCount || 0)
        );
      case "recent":
      default:
        return cardWithData.sort(
          (a, b) =>
            new Date(b.created_at || "").getTime() -
            new Date(a.created_at || "").getTime()
        );
    }
  }, [quizzes, allCards, sortOption]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading quizzes</div>;

  const quizLength = quizzes?.length;
  const cardLength = allCards?.length;

  return (
    <div className="max-w-[1200px] mx-auto  ">
      <Header />
      <div className="flex items-center my-12 justify-between">
        <div className="">
          <p className="text-4xl font-semibold">Your Library</p>
          <p className="flex gap-2">
            {" "}
            <span>
              {quizLength} {(quizLength || 0) < 2 ? " study set" : "study sets"}
            </span>
            <span>•</span>
            <span>
              {cardLength}{" "}
              {(cardLength || 0) < 2 ? " total card" : "total cards"}
            </span>
          </p>
        </div>

        <div>
          <Button variant={"outline"}>Create Study Set</Button>
        </div>
      </div>
      <div className="flex text-center items-center gap-5 mb-5 justify-between">
        <InputAbs className="w-full  " />
        <Funnel className="w-6 h-6" />
        <Select onValueChange={setSortOption} value={sortOption}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Most Recent" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="alphabetical">Alphabetical</SelectItem>
            <SelectItem value="most-cards">Most Cards</SelectItem>
          </SelectContent>
        </Select>
        <AlertDialog>
          <AlertDialogTrigger className="" asChild>
            <Button variant={"destructive"}>Delete All</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                quiz flashcard and remove from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500"
                onClick={() => deleteAllData()}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="grid   sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {sortedQuizzes?.map((quiz) => {
          return (
            <Card
              key={quiz.id}
              className="w-full mx-auto sm:max-w-[432.5px] m-0 rounded-lg h-75.5  bg-transparent pt-7   gap-0 my-5 "
            >
              <CardHeader className="flex items-center  pb-2 justify-between">
                <CardTitle className="text-lg">{quiz.title}</CardTitle>
                <CardDescription className="">
                  <div className="flex items-center gap-3">
                    <span className="text-sm dark:bg-stone-800 dark:text-gray-200 font-semibold text-gray-800 bg-gray-200 rounded-full  px-3">
                      {quiz.cardCount}
                    </span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 ">
                <CardDescription className="space-y-3 flex-1 ">
                  <p>
                    {quiz.description ||
                      "No description available for this study set."}
                  </p>
                  <div className="flex-1 flex   gap-2">
                    <ul className="">
                      {quiz.cardQuestion?.map((card) => (
                        <li key={card.id}>{card.question}</li>
                      ))}
                    </ul>

                    <ul className="">
                      {quiz.cardQuestion?.map((card) => (
                        <li key={card.id}>•</li>
                      ))}
                    </ul>

                    <ul>
                      {quiz.cardAnswer?.map((card) => (
                        <li key={card.id}>{card.answer}</li>
                      ))}
                    </ul>
                  </div>
                </CardDescription>
              </CardContent>

              <div className="text-muted-foreground text-sm gap-2 flex py-4 px-6 items-center">
                <p>{<Calendar className="h-4 w-4" />}</p>
                <span>
                  Created on{" "}
                  {new Date(quiz.created_at || "").toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

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
