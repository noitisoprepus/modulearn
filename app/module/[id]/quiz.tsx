import DynamicText from "@/components/DynamicText";
import ChoiceCard from "@/components/interactive/ChoiceCard";
import NavBar from "@/components/interactive/NavBar";
import QuestionCard from "@/components/QuestionCard";
import ScreenWrapper from "@/components/ScreenWrapper";
import Spacer from "@/components/Spacer";
import { modules } from "@/data/modulesContentMap";
import { useQuizState } from "@/state/quizState";
import { useAudioPlayer } from "expo-audio";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

const sfxSource = require("@/assets/sfx/click.wav");

export default function Quiz() {
  const player = useAudioPlayer(sfxSource);

  const { id } = useLocalSearchParams<{ id: string }>();
  const { answers, setAnswers } = useQuizState();
  const [currentIndex, setCurrentIndex] = useState(0);

  const moduleData = modules.find((module) => module.id === id);

  if (!moduleData) return null;

  const moduleAssessment = moduleData.data["assessment"];
  const moduleTitle = moduleData.title || "No title loaded";

  const currentQuestion = moduleAssessment[currentIndex];
  const question = currentQuestion["question"];
  const choices: Record<string, string> = currentQuestion["choices"];
  const questionImage = currentQuestion["imgSrc"];
  const numberOfQuestions = moduleAssessment.length;
  const filteredAnswer = answers.filter((i) => {
    return i;
  });

  const hasAnsweredAll = filteredAnswer.length === numberOfQuestions;

  const handleAnswer = (choice: string) => {
    const updated = [...answers];
    updated[currentIndex] = choice;
    setAnswers(updated);

    if (currentIndex !== moduleAssessment.length - 1) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 300);
    }

    player.seekTo(0);
    player.play();
    // TODO : add sound ?
  };

  const handleNext = () => {
    if (currentIndex < moduleAssessment.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (hasAnsweredAll) {
      router.push(`/module/${id}/results`);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <>
      <ScreenWrapper showAppBar appBarTitle={moduleTitle}>
        <View style={styles.layout}>
          <View style={styles.gap}>
            <DynamicText variant="header" style={styles.text}>
              Assessment
            </DynamicText>
            <QuestionCard
              index={currentIndex + 1}
              question={question}
              img={questionImage}
              questions={numberOfQuestions}
            />
          </View>
          <Spacer size={20} />
          {Object.entries(choices).map(
            ([choice, value]: [string, string], index) => (
              <Pressable key={index} onPress={() => handleAnswer(choice)}>
                <ChoiceCard
                  choice={choice}
                  value={value}
                  active={choice === answers[currentIndex]}
                />
              </Pressable>
            )
          )}
        </View>
        <Spacer size={100} />
      </ScreenWrapper>
      <NavBar
        quiz
        onNext={handleNext}
        onPrev={handlePrev}
        currentIndex={currentIndex}
        pages={moduleAssessment.length}
        hasAnswered={hasAnsweredAll}
      />
    </>
  );
}

const styles = StyleSheet.create({
  layout: {
    justifyContent: "center",
    alignContent: "center",
    margin: "auto",
    padding: 20,
    gap: 20,
  },
  gap: {
    gap: 40,
  },
  text: {
    margin: "auto",
  },
});
