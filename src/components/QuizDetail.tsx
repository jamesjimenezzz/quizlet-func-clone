import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useParams } from "react-router-dom";
import { useFetchCards } from "../hooks/useCards";
import Header from "./Header";

const QuizDetail = () => {
  const { id } = useParams();
  const { data: cards, isLoading, isError } = useFetchCards(id!);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const toggle = (id: string) => {
    setSelectedCard((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
      setSelectedCard(null);
    };

    handleSelect();
    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading cards</div>;

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-md">
          <Carousel setApi={setApi} className="overflow-hidden pl-4">
            <CarouselContent className="flex w-full snap-x snap-mandatory">
              {cards?.map((card) => (
                <CarouselItem
                  key={card.id}
                  className="w-full flex items-center justify-center snap-center"
                >
                  <Card
                    onClick={() => toggle(card.id)}
                    className={`w-90 h-90 rounded-lg overflow-hidden flex items-center justify-center ${
                      selectedCard === card.id
                        ? "dark:bg-neutral-800 bg-slate-100"
                        : "dark:bg-transparent bg-white"
                    }`}
                  >
                    <CardContent className="w-full h-full flex items-center justify-center p-0">
                      <span className="text-xl font-semibold break-words max-w-full max-h-full text-center">
                        {selectedCard === card.id ? card.answer : card.question}
                      </span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
          </Carousel>
        </div>
        <div className=" w-full text-muted-foreground  mx-auto  py-2 text-center text-sm">
          Slide {current} of {cards?.length || 0}
        </div>
      </div>
    </>
  );
};

export default QuizDetail;
