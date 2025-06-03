// src/stores/quizStore.ts

import { create } from "zustand";

type Card = {
  id?: string;
  question: string;
  answer: string;
};

type QuizStore = {
  title: string;
  description: string;
  cards: Card[];
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  addCard: (question: string, answer: string, id?: string) => void;
  updateCard: (index: number, field: keyof Card, value: string) => void;
  removeCard: (index: number) => void;
  reset: () => void;
};

export const useQuizStore = create<QuizStore>((set) => ({
  title: "",
  description: "",
  cards: [],
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  addCard: (question, answer, id) =>
    set((state) => ({
      cards: [...state.cards, { question, answer, id }],
    })),
  updateCard: (index, field, value) =>
    set((state) => {
      const updatedCards = [...state.cards];
      updatedCards[index] = { ...updatedCards[index], [field]: value };
      return { cards: updatedCards };
    }),
  removeCard: (index) =>
    set((state) => {
      const updatedCards = [...state.cards];
      updatedCards.splice(index, 1);
      return { cards: updatedCards };
    }),
  reset: () => set({ title: "", description: "", cards: [] }),
}));
