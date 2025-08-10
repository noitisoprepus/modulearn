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
  const cardStyle = [
    styles.layout,
    isCorrect && { backgroundColor: colors.cardCorrect },
  ];

  const answerTextStyle = [
    styles.answerText,
    !isCorrect && { color: colors.incorrect },
  ];

  return (
    <View style={cardStyle}>
      <DynamicText style={styles.headerText}>
        Question {questionNumber + 1}
      </DynamicText>

      <DynamicText style={styles.questionText}>{question}</DynamicText>

      <View style={styles.answerRow}>
        <DynamicText style={answerTextStyle}>
          {userAnswer?.toUpperCase()}.
        </DynamicText>
        <DynamicText style={[answerTextStyle, styles.answerValue]}>
          {choices[userAnswer?.toUpperCase()]}
        </DynamicText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    minHeight: 120,
    width: "100%",
    borderRadius: 10,
    backgroundColor: colors.cardDefault,
    elevation: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  questionText: {
    marginVertical: 15,
  },
  answerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  answerText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  answerValue: {
    flex: 1,
    flexWrap: "wrap",
    paddingHorizontal: 10,
  },
});
