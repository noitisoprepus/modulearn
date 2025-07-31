import { colors } from "@/styles/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import DynamicText from "./DynamicText";

type AnswerCardProps = {
  question: string;
  userAnswer: string;
  questionNumber: number;
  isCorrect: boolean;
  choices: Record<string, string>;
};

export default function AnswerCard({
  questionNumber,
  question,
  userAnswer,
  isCorrect,
  choices,
}: AnswerCardProps) {
  return (
    <View
      style={
        isCorrect
          ? [styles.layout, { backgroundColor: colors.cardCorrect }]
          : styles.layout
      }
    >
      <View style={styles.contents}>
        <DynamicText style={styles.text}>
          Question {questionNumber + 1}
        </DynamicText>
        <DynamicText style={styles.question}>{question}</DynamicText>
        <DynamicText style={
          isCorrect
            ? styles.text
            : [styles.text, { color: colors.incorrect }]
          }
        >
          {userAnswer.toUpperCase()}. {choices[userAnswer]}
        </DynamicText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    width: 350,
    height: 150,
    borderRadius: 10,
    backgroundColor: colors.cardDefault,
    elevation: 5,
    padding: 10,
  },
  contents: {
    // gap: 20,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontWeight: "bold",
  },
  question: {
    textAlign: "center",
  },
});
