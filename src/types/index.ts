export type Quiz = {
  id: string;
  title: string;
  description: string;
  created_at: string;
};

export type Card = {
  id: string;
  quiz_id: string;
  question: string;
  answer: string;
  created_at: string;
};

export type NewQuiz = {
  title: string;
  description: string;
  cards: { question: string; answer: string }[];
};
