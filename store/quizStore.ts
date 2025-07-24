import { create } from "zustand";

type QuizState = {
  answers: string[];
  setAnswers: (answers: string[]) => void;
  clearAnswers: () => void;
};

export const useQuizStore = create<QuizState>((set) => ({
  answers: [],
  setAnswers: (answers) => set({ answers }),
  clearAnswers: () => set({ answers: [] }),
}));
