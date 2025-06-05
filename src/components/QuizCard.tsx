import React from "react";
import { type Quiz } from "@/types";
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
import { Link } from "react-router";
import AlertConfirmation from "./AlertConfirmation";

type Props = {
  quiz: Quiz;
  cardCount: number;
  onDelete: (id: string) => void;
};

const QuizCard = ({ quiz, cardCount, onDelete }: Props) => {
  return (
    <>
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
              <AlertConfirmation
                id={quiz.id}
                onDelete={onDelete}
                classNameAction="bg-red-500"
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
            <Link to={`/quiz/${quiz.id}`}>
              <Button className="flex-1 ">Start Studying</Button>
            </Link>
            <Link to={`/form/${quiz.id}`}>
              <Button variant="outline">Edit</Button>
            </Link>
          </CardAction>
        </CardFooter>
      </Card>
    </>
  );
};

export default QuizCard;
