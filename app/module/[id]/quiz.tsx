import DynamicText from "@/components/DynamicText";
import ChoiceCard from "@/components/interactive/ChoiceCard";
import QuestionCard from "@/components/QuestionCard";
import ScreenWrapper from "@/components/ScreenWrapper";
import Spacer from "@/components/Spacer";
import { modules } from "@/data/modulesContentMap";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

export default function Quiz() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const moduleData = modules.find((module) => module.id === id);
  const moduleAssessment = moduleData?.data["assessment"];
  const totalQuestions = moduleAssessment.length;
  const moduleTitle = moduleData?.title || "No title loaded";

  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(totalQuestions).fill(null)
  );

  if (!moduleAssessment) return null;

  const currentQuestion = moduleAssessment[currentIndex];
  const question = currentQuestion["question"];
  const choices: Record<string, string> = currentQuestion["choices"];

  const nextQuestion = (choice: string) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentIndex] = choice;
      return updated;
    });

    if (currentIndex !== moduleAssessment.length - 1) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 300);
    } else {
      router.push(`/module/${id}/results`);
    }
    // else route results page

    // TODO : add sound ?
  };

  return (
    <>
      <ScreenWrapper showAppBar appBarTitle={moduleTitle}>
        <View style={styles.layout}>
          <View style={styles.gap}>
            <DynamicText variant="header" style={styles.text}>
              Assessment
            </DynamicText>
            <QuestionCard index={currentIndex + 1} question={question} />
          </View>
          <Spacer size={40} />
          {Object.entries(choices).map(
            ([choice, value]: [string, string], index) => (
              <Pressable key={index} onPress={() => nextQuestion(choice)}>
                <ChoiceCard
                  choice={choice}
                  value={value}
                  active={choice === answers[currentIndex]}
                />
              </Pressable>
            )
          )}
        </View>
      </ScreenWrapper>
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
