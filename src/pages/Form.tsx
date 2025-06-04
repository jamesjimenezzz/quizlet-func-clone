import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/Header";
import { useQuizStore } from "../stores/quizStore";
import { useCreateQuiz } from "../hooks/useQuizzes";

import { toast, Toaster } from "sonner";
import ToastSuccessForm from "@/components/ToastSuccessForm";

const Form = () => {
  const {
    title,
    description,
    cards,
    setTitle,
    setDescription,
    addCard,
    updateCard,
    removeCard,
    reset,
  } = useQuizStore();

  const { mutate, isPending } = useCreateQuiz();

  useEffect(() => {
    // Reset store and add one empty card on form mount
    reset();
    setTitle("");
    setDescription("");
    addCard("", "");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      { title, description, cards },
      {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onSuccess: (_data) => {
          reset();
          addCard("", "");
          toast.custom(() => (
            <ToastSuccessForm message="Quiz has been added succesfully." />
          ));
        },
      }
    );
  };

  const isFormValid =
    title.trim() !== "" &&
    description.trim() !== "" &&
    cards.some(
      (card) => card.question.trim() !== "" && card.answer.trim() !== ""
    );

  return (
    <div className="max-w-[1200px] mx-auto">
      <Header />
      <div className="w-full max-w-[800px] mx-auto text-base p-2 my-5">
        <div className="flex items-center justify-between mb-4">
          <p className="font-semibold text-2xl">Create a new quiz</p>
          <Button
            className="font-semibold "
            variant={"outline"}
            onClick={handleSubmit}
          >
            {isPending ? "Saving..." : "Create set"}
          </Button>
        </div>

        <Card className="w-full max-w-[900px] mx-auto text-sm px-2 py-4">
          <CardHeader>
            <CardTitle className="text-2xl">Create a New Quiz</CardTitle>
            <CardDescription>
              Fill out the form below to create a new quiz.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <p>Title</p>
              <input
                type="text"
                placeholder="Quiz Title"
                className="border p-2 rounded w-full mb-4"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <p>Description</p>
              <textarea
                placeholder="Quiz Description"
                className="border p-2 rounded w-full mb-4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </form>
          </CardContent>
        </Card>

        <div className="w-full max-w-[800px] mx-auto text-base px-1 my-10">
          <div className="flex flex-col gap-5">
            {cards.map((card, index) => (
              <Card
                key={index}
                className="w-full max-w-[900px] mx-auto text-md px-3 py-2.5"
              >
                <CardHeader>
                  <CardTitle className="text-lg">Card {index + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <div className="w-full">
                      <p className="font-semibold text-gray-400 uppercase">
                        Question
                      </p>
                      <textarea
                        placeholder="Enter a question..."
                        className="border p-4 rounded w-full mb-4"
                        value={card.question}
                        onChange={(e) =>
                          updateCard(index, "question", e.target.value)
                        }
                      ></textarea>
                    </div>
                    <div className="w-full">
                      <p className="font-semibold text-gray-400 uppercase">
                        Answer
                      </p>
                      <textarea
                        placeholder="Enter an answer..."
                        className="border p-4 rounded w-full mb-4"
                        value={card.answer}
                        onChange={(e) =>
                          updateCard(index, "answer", e.target.value)
                        }
                      ></textarea>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={() => removeCard(index)}
                    className="mt-2"
                  >
                    Remove Card
                  </Button>
                </CardContent>
              </Card>
            ))}

            <div className="flex p-4 justify-between items-center gap-2">
              <Button
                onClick={() => addCard("", "")}
                variant="outline"
                className="font-semibold"
              >
                Add card
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className="font-semibold w-1/4"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Form;
