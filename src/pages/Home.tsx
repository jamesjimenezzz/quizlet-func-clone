import React from "react";
import { Link, NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Car } from "lucide-react";
import { CirclePlus, BookOpenText } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { useFetchQuizzes } from "../hooks/useQuizzes";
import QuizList from "@/components/QuizList";

const Home = () => {
  const { data: quizzes, isLoading, isError } = useFetchQuizzes();

  return (
    <div className="max-w-[1400px] mx-auto ">
      <Header />
      <section className="text-center my-10">
        <div className="max-w-2xl mx-auto space-y-3">
          <p className="text-6xl uppercase font-bold">Master any Subject</p>
          <p className="text-xl text-gray-400 dark:text-neutral-500">
            Create flashcards, take practice tests, and study smarter with our
            powerful learning tools
          </p>
        </div>
        <div className="flex gap-4 justify-center mt-8">
          <Link to="/form">
            <Button>
              <CirclePlus /> Create Study Set
            </Button>
          </Link>
          <Button variant={"outline"}>
            {" "}
            <BookOpenText /> Browse Library
          </Button>
        </div>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-[1200px] mx-0 mx-auto gap-4  p-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card
            key={index}
            className="bg-transparent border border-stone-800 rounded-xs max-w-sm gap-1"
          >
            <CardHeader>
              <CardTitle className="text-lg">Total Study Sets</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-bold text-3xl">2</p>
            </CardContent>
            <CardFooter>
              <CardDescription>Card Description</CardDescription>
            </CardFooter>
          </Card>
        ))}
      </section>

      <main className="p-4 mt-6">
        <p className="font-bold text-3xl">Your Study Sets</p>
        <div className="grid grid-cols-3">
          <QuizList />
        </div>
      </main>
    </div>
  );
};

export default Home;
