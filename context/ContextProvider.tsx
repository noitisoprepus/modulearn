import React, { createContext, useContext, useState } from "react";

type AnswersContextType = {
  answers: string[];
  setAnswers: React.Dispatch<React.SetStateAction<string[]>>;
  clearAnswer: () => void;
};

const AnswersContext = createContext<AnswersContextType | undefined>(undefined);

export const AnswersProvider = ({ children }: React.PropsWithChildren) => {
  const [answers, setAnswers] = useState<string[]>([]);

  const clearAnswer = () => {
    setAnswers([]);
  };

  return (
    <AnswersContext.Provider value={{ answers, setAnswers, clearAnswer }}>
      {children}
    </AnswersContext.Provider>
  );
};

export const useAnswers = () => {
  const context = useContext(AnswersContext);
  if (!context) {
    throw new Error("useAnswers must be used within an AnswersProvider");
  }
  return context;
};
