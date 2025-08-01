import AnswerCard from "@/components/AnswerCard";
import DynamicText from "@/components/DynamicText";
import NavBar from "@/components/interactive/NavBar";
import ScreenWrapper from "@/components/ScreenWrapper";
import Spacer from "@/components/Spacer";
import { modules } from "@/data/modulesContentMap";
import { useVoiceCommands } from "@/hooks/useVoiceCommands";
import { useAppStore } from "@/store/appStore";
import { useModuleStore } from "@/store/moduleStore";
import { useQuizStore } from "@/store/quizStore";
import { useSpeechStore } from "@/store/speechStore";
import { colors } from "@/styles/colors";
import { speakChunks } from "@/utils/speechUtils";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";

type AssessmentItem = {
  question: string;
};

export default function Results() {
  const { moduleIndex } = useModuleStore();
  const { answers, clearAnswers } = useQuizStore();
  const {
    setIsSpeaking,
    setShouldRecognize,
    setVoiceCommands,
    setVoicePrompt,
    setCommandCallback,
  } = useSpeechStore();
  
  const moduleData = modules[moduleIndex ?? 0] ?? null;
  const moduleTitle = moduleData?.title ?? "Untitled";
  const moduleAssessment = moduleData?.data["assessment"] ?? [];
  const moduleAnswers = moduleAssessment.map(
    (item: any) => item.answer
  );

  const isCorrect = moduleAnswers.map(
    (correctAnswer: string, index: number) => correctAnswer.toLowerCase() === answers[index]
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

  const readResults = () => {
    if (moduleAnswers.length === 0) return;

    // Prepare the results transcription
    const fullText = `You got ${correctItems} out of ${assessmentItems} questions correct.`;
    setIsSpeaking(true);
    speakChunks({
      text: fullText,
      onComplete: () => {
        setIsSpeaking(false);

        // Prompt what to do next
        setupResultsCommands(`What do you want to do now?`);
        setShouldRecognize(true);
      },
      onStopped: () => setIsSpeaking(false),
    });
  };

  const readCorrects = () => {
    if (moduleAnswers.length === 0) return;

    // Prepare the correct answers transcription
    const content: string[] = [];

    if (correctItems === 0) {
      content.push(`You did not get any answers correctly.`);
    } else {
      isCorrect.forEach((correct: boolean, index: number) => {
        if (correct) {
          const question: string = moduleAssessment[index].question;
          const userAnswer: string = answers[index];
          const choiceText: string = moduleAssessment[index].choices[userAnswer];
          content.push(
            `Question ${index + 1}. ${question}. You answered ${userAnswer}, ${choiceText}. That is correct.`
          );
        }
      });
    }

    const fullText = content.join(" ");
    setIsSpeaking(true);
    speakChunks({
      text: fullText,
      onComplete: () => {
        setIsSpeaking(false);

        // Prompt what to do next
        setupResultsCommands(`What do you want to do now?`);
        setShouldRecognize(true);
      },
      onStopped: () => setIsSpeaking(false),
    });
  };

  const readMistakes = () => {
    if (moduleAnswers.length === 0) return;

    // Prepare the incorrect answers transcription
    const content: string[] = [];

    if (correctItems === assessmentItems) {
      content.push(`You did not commit any mistakes. Congratulations!`);
    } else {
      isCorrect.forEach((correct: boolean, index: number) => {
        if (!correct) {
          const question: string = moduleAssessment[index].question;
          const userAnswer: string = answers[index];
          const userAnswerText: string = moduleAssessment[index].choices[userAnswer];

          content.push(
            `Question ${index + 1}. ${question}. You answered ${userAnswer}, ${userAnswerText}. That is incorrect.`
          );
        }
      });
    }

    const fullText = content.join(" ");
    setIsSpeaking(true);
    speakChunks({
      text: fullText,
      onComplete: () => {
        setIsSpeaking(false);

        // Prompt what to do next
        setupResultsCommands(`What do you want to do now?`);
        setShouldRecognize(true);
      },
      onStopped: () => setIsSpeaking(false),
    });
  }

  const handleResultsCommand = (command: string) => {
    switch (command) {
      case "result":
        readResults();
        break;
      case "corrects":
        readCorrects();
        break;
      case "mistakes":
        readMistakes();
        break;
      case "retake":
        clearAnswers();
        router.navigate("/module/[id]/quiz");
        break;
      case "module":
        handlePrev();
        break;
      case "home":
        clearAnswers();
        router.navigate("/");
        break;
      default:
        break;
    }
  };

  const setupResultsCommands = (initialMessage: string = "") => {
    if (moduleAnswers.length === 0) return;

    const commands: string[] = ["result", "corrects", "mistakes", "retake", "module", "home"];
    const prompts: string[] = [];

    // Default commands
    prompts.push(`Say "result" to read your results.`);
    prompts.push(`Say "corrects" to read your correct answers.`);
    prompts.push(`Say "mistakes" to read your incorrect answers.`);
    prompts.push(`Say "retake" to retake the quiz.`);
    prompts.push(`Say "module" to go back to the module.`);
    prompts.push(`Say "home" to go back to the home screen.`);

    const fullVoicePrompt = [initialMessage, ...prompts].filter(Boolean).join("\n");

    setVoicePrompt(fullVoicePrompt);
    setVoiceCommands(commands);
    setCommandCallback(handleResultsCommand);
  };

  useEffect(() => {
    if (useAppStore.getState().accessibilityEnabled)
      readResults();
  }, []);

  useVoiceCommands();

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
