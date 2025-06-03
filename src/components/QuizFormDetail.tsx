import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useFetchCards } from "../hooks/useCards";
import {
  useFetchQuizByQuizId,
  useUpdateQuizAndCards,
} from "../hooks/useQuizzes";
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
import { toast, Toaster } from "sonner";
import ToastSuccessForm from "@/components/ToastSuccessForm";

const QuizFormDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: cardsFromDb, isLoading: loadingCards } = useFetchCards(id!);
  const { data: quizFromDb, isLoading: loadingQuiz } = useFetchQuizByQuizId(
    id!
  );
  const { mutate, isPending } = useUpdateQuizAndCards();

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

  useEffect(() => {
    if (quizFromDb && cardsFromDb) {
      reset();
      setTitle(quizFromDb.title || "");
      setDescription(quizFromDb.description || "");
      cardsFromDb.forEach((card) =>
        addCard(card.question, card.answer, card.id)
      );
    }
  }, [quizFromDb, cardsFromDb]);

  const handleSave = () => {
    if (!id) return;
    mutate(
      {
        quizId: id,
        title,
        description,
        cards,
      },
      {
        onSuccess: () => {
          reset();
          toast.custom(() => (
            <ToastSuccessForm message="Quiz has been succesfully updated." />
          ));
        },
      }
    );
  };

  if (loadingQuiz || loadingCards) {
    return <p className="text-center mt-10">Loading quiz data...</p>;
  }

  return (
    <>
      <Header />
      <div className="w-full max-w-[800px] mx-auto text-base p-2 my-5">
        <div className="flex items-center justify-between mb-4">
          <p className="font-semibold text-2xl">Edit Quiz</p>
        </div>
        <Card className="w-full max-w-[900px] mx-auto text-sm px-2 py-4">
          <CardHeader>
            <CardTitle className="text-2xl">Edit Quiz</CardTitle>
            <CardDescription>
              Update the title, description, and cards below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
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
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-5 mt-6">
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
                    />
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
                    />
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
          <div className="flex justify-between  p-2">
            <Button
              onClick={() => addCard("", "")}
              variant={"outline"}
              className="font-semibold mx-3"
            >
              Add Card
            </Button>

            <Button onClick={handleSave} className="font-semibold ">
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default QuizFormDetail;
