import DynamicText from "@/components/DynamicText";
import ChoiceCard from "@/components/interactive/ChoiceCard";
import NavBar from "@/components/interactive/NavBar";
import QuestionCard from "@/components/QuestionCard";
import ScreenWrapper from "@/components/ScreenWrapper";
import Spacer from "@/components/Spacer";
import { media, modules } from "@/data/modulesContentMap";
import { useVoiceCommands } from "@/hooks/useVoiceCommands";
import { useAppStore } from "@/store/appStore";
import { useModuleStore } from "@/store/moduleStore";
import { useQuizStore } from "@/store/quizStore";
import { useSpeechStore } from "@/store/speechStore";
import { speakChunks } from "@/utils/speechUtils";
import { useFocusEffect } from "@react-navigation/native";
import { useAudioPlayer } from "expo-audio";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { ImageSourcePropType, Pressable, StyleSheet, View } from "react-native";

const sfxSource = require("@/assets/sfx/click.wav");

export default function Quiz() {
  const player = useAudioPlayer(sfxSource);

  const { answers, setAnswers } = useQuizStore();
  const { moduleIndex } = useModuleStore();
  const {
    setIsSpeaking,
    setShouldRecognize,
    setVoiceCommands,
    setVoicePrompt,
    setCommandCallback,
  } = useSpeechStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  const moduleData = modules[moduleIndex ?? 0] ?? null;
  const moduleTitle = moduleData?.title ?? "Untitled";
  const moduleAssessment = moduleData?.data["assessment"] ?? [];
  const currentQuestion = moduleAssessment[currentIndex] ?? {};

  const question = currentQuestion["question"] ?? null;
  const choices: Record<string, string> = currentQuestion["choices"] ?? null;
  const questionImage: ImageSourcePropType = media[currentQuestion["imgSrc"]];
  const questionImageCaption = currentQuestion["caption"];
  const questionImageAttribution = currentQuestion["attribution"];
  const numberOfQuestions = moduleAssessment.length;
  
  const filteredAnswer = answers.filter(Boolean);
  const hasAnsweredAll = filteredAnswer.length === numberOfQuestions;

  const handleAnswer = (choice: string) => {
    const updated = [...answers];
    updated[currentIndex] = choice;
    setAnswers(updated);

    // // Auto-next
    // if (currentIndex !== moduleAssessment.length - 1) {
    //   setTimeout(() => {
    //     setCurrentIndex(currentIndex + 1);
    //   }, 300);
    // }

    player.seekTo(0);
    player.play();
  };

  const handleNext = () => {
    if (currentIndex < moduleAssessment.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (hasAnsweredAll) {
      router.push(`/module/[id]/results`);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const readQuestion = () => {
    if (!currentQuestion) return;

    // Prepare the question contents transcription
    const content: string[] = [];
    content.push(`${question}`);

    // Image caption
    if (questionImageCaption) {
      content.push(` An image is showing: ${questionImageCaption}`);
    }

    // Choices
    for (const choice of Object.entries(choices)) {
      content.push(`${choice[0]}, ${choice[1]}.`);
    }

    const fullText = content.join(" ");
    setIsSpeaking(true);
    speakChunks({
      text: fullText,
      onComplete: () => {
        setIsSpeaking(false);

        const commands = ["question"];
        for (const key of Object.keys(choices)) {
          commands.push(`choice ${key}`);
        }

        // Prompt to choose an answer
        setVoicePrompt(`Say "choice" plus the letter of your selected answer. To repeat the question, say "question".`);
        setVoiceCommands(commands);
        setCommandCallback((command: string) => {
          if (command === "question") {
            readQuestion();
          }
          else {
            const selectedAnswer = command.split("choice ")[1];
            handleAnswer(selectedAnswer);
            setupQuizCommands(`What do you want to do now?`);
            setShouldRecognize(true);
          }
        });        
        setShouldRecognize(true);
      },
      onStopped: () => setIsSpeaking(false),
    });
  };

  const readAnswer = () => {
    if (!currentQuestion) return;

    // Prepare the answer transcription
    const updated = [...useQuizStore.getState().answers];
    const answer = updated[currentIndex];

    const fullText = answer === undefined
      ? `You have not selected an answer for this question yet.`
      : `You have selected, ${answer}, ${currentQuestion.choices[answer]}.`;
    setIsSpeaking(true);
    speakChunks({
      text: fullText,
      onComplete: () => {
        setIsSpeaking(false);

        // Prompt what to do next
        setupQuizCommands(`What do you want to do now?`);
        setShouldRecognize(true);
      },
      onStopped: () => setIsSpeaking(false),
    });
  };

  const handleQuizCommand = (command: string) => {
    switch (command) {
      case "question":
        readQuestion();
        break;
      case "answer":
        readAnswer();
        break;
      case "module":
        router.navigate("/module/[id]");
        break;
      case "next":
        handleNext();
        break;
      case "previous":
        handlePrev();
        break;
      case "submit":
        router.navigate("/module/[id]/results");
        break;
      default:
        break;
    }
  };

  const setupQuizCommands = (initialMessage: string = "") => {
    if (!moduleData) return;

    const isFirstQuestion = currentIndex === 0;
    const isLastQuestion = currentIndex === numberOfQuestions - 1;

    // Default commands
    const commands: string[] = ["question", "answer"];
    const prompts: string[] = [];

    prompts.push(`Say "question" to read the question.`);
    prompts.push(`Say "answer" to read your answer.`);
    
    if (!isFirstQuestion) {
      commands.push("previous");
      prompts.push(`Say "previous" to go back to the previous question.`);
    }
    
    if (!isLastQuestion) {
      commands.push("next");
      prompts.push(`Say "next" to go to the next question.`);
    } else if (isLastQuestion && useQuizStore.getState().answers.filter(Boolean).length === numberOfQuestions) {
      commands.push("submit");
      prompts.push(`Say "submit" to submit your answers.`);
    }
    
    // prompts.push(`Say "module" to go back to the module.`);
    
    const fullVoicePrompt = [initialMessage, ...prompts].filter(Boolean).join("\n");

    setVoicePrompt(fullVoicePrompt);
    setVoiceCommands(commands);
    setCommandCallback(handleQuizCommand);
  };

  useFocusEffect(useCallback(() => {
    useSpeechStore.getState().clearSpeechState();

    setupQuizCommands(`Question number ${currentIndex + 1}.`);
    setShouldRecognize(true);
  }, [currentIndex]));
  
  useVoiceCommands();

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
              imgSrc={questionImage}
              imgCaption={questionImageCaption}
              imgAttribution={questionImageAttribution}
              questions={numberOfQuestions}
            />
          </View>
          <Spacer size={20} />
          {Object.entries(choices).map(
            ([choice, value]: [string, string], index) => (
              <Pressable key={index} onPress={() => {
                handleAnswer(choice.toLowerCase());
                
                if (useAppStore.getState().accessibilityEnabled) {
                  useSpeechStore.getState().clearSpeechState();

                  setupQuizCommands(`What do you want to do now?`);
                  setShouldRecognize(true);
                }
              }}>
                <ChoiceCard
                  choice={choice.toUpperCase()}
                  value={value}
                  active={choice.toLowerCase() === answers[currentIndex]}
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
