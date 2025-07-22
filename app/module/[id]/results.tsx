import AnswerCard from "@/components/AnswerCard";
import DynamicText from "@/components/DynamicText";
import NavBar from "@/components/interactive/NavBar";
import ScreenWrapper from "@/components/ScreenWrapper";
import Spacer from "@/components/Spacer";
import { modules } from "@/data/modulesContentMap";
import { useQuizState } from "@/state/quizState";
import { colors } from "@/styles/colors";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

type AssessmentItem = {
  question: string;
};

export default function Results() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { answers, clearAnswers } = useQuizState();
  const moduleData = modules.find((module) => module.id === id);

  if (!moduleData) return null;

  const moduleTitle = moduleData.title || "No title loaded";
  const moduleAssessment = moduleData.data["assessment"];
  const moduleAnswers = moduleData.data["assessment"].map(
    (item: any) => item.answer
  );

  const isCorrect = moduleAnswers.map(
    (correctAnswer: string, index: number) => correctAnswer === answers[index]
  );

  const assessmentItems = moduleAssessment.length;
  const correctItems = isCorrect.filter(Boolean).length;

  const handlePrev = () => {
    router.dismissAll();
    router.replace(`/`);
    setTimeout(() => {
      clearAnswers();
    }, 300);
  };

  return (
    <>
      <ScreenWrapper showAppBar appBarTitle={moduleTitle}>
        <View style={styles.layout}>
          <View style={styles.header}>
            <DynamicText variant="header">Results</DynamicText>
            <DynamicText variant="header" style={styles.score}>
              {correctItems} / {assessmentItems}
            </DynamicText>
          </View>
          <Spacer size={40} />
          <View style={styles.cards}>
            {moduleAssessment.map(
              ({ question }: AssessmentItem, index: number) => (
                <AnswerCard
                  key={index}
                  question={question}
                  userAnswer={answers[index]}
                  questionNumber={index}
                  isCorrect={isCorrect[index] === true}
                  choices={moduleAssessment[index].choices}
                />
              )
            )}
          </View>
        </View>
      </ScreenWrapper>
      <NavBar variant="single" onPrev={handlePrev} />
    </>
  );
}

const styles = StyleSheet.create({
  layout: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  score: {
    padding: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: colors.cardDefault,
  },
  cards: {
    margin: "auto",
    gap: 20,
  },
});
