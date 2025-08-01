import DynamicText from "@/components/DynamicText";
import NavBar from "@/components/interactive/NavBar";
import Section from "@/components/interactive/Section";
import ScreenWrapper from "@/components/ScreenWrapper";
import Spacer from "@/components/Spacer";
import Wrapper from "@/components/Wrapper";
import { modules } from "@/data/modulesContentMap";
import { useVoiceCommands } from "@/hooks/useVoiceCommands";
import { useModuleStore } from "@/store/moduleStore";
import { useSpeechStore } from "@/store/speechStore";
import { speakChunks } from "@/utils/speechUtils";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";

export default function Module() {
  const { moduleIndex } = useModuleStore();
  const {
    setIsSpeaking,
    setShouldRecognize,
    setVoiceCommands,
    setVoicePrompt,
    setCommandCallback,
  } = useSpeechStore();
  const [topicIndex, setTopicIndex] = useState(0);

  const moduleData = modules[moduleIndex ?? 0] ?? null;
  const moduleTitle = moduleData?.title ?? "Untitled";
  const currentTopic = moduleData?.data["topics"]?.[topicIndex] ?? [];

  const handleNext = () => {
    if (topicIndex < (moduleData?.data["topics"]?.length ?? 0) - 1) {
      setTopicIndex(topicIndex + 1);
    }
  };

  const handlePrev = () => {
    if (topicIndex > 0) {
      setTopicIndex(topicIndex - 1);
    }
  };

  const readTopic = () => {
    if (!currentTopic) return;

    // Prepare the topic contents transcription
    const content: string[] = [];
    content.push(`${currentTopic.title}. `);

    for (const section of currentTopic.sections) {
      switch (section.type) {
        case "text":
          content.push(`${section.content} `);
          break;
        case "image":
          if (section.caption) {
            content.push(` An image is showing: ${section.caption}`);
          }
          break;
        case "trivia":
          content.push(` Here's a trivia: ${section.content}`);
          break;
        case "remember":
          content.push(` Remember this: ${section.content}`);
          break;
        case "active-recall":
          // TODO: Handle voice interaction
          break;
        default:
          break;
      }
    }

    const fullText = content.join(" ");
    setIsSpeaking(true);
    speakChunks({
      text: fullText,
      onComplete: () => {
        setIsSpeaking(false);

        // Prompt what to do next
        setupVoiceCommands(`Finished reading ${currentTopic.title}. What do you want to do next?`);
        setShouldRecognize(true);
      },
      onStopped: () => setIsSpeaking(false),
    });
  };

  const handleVoiceCommand = (command: string) => {
    switch (command) {
      case "read":
        readTopic();
        break;
      case "home":
        router.navigate("/");
        break;
      case "next":
        handleNext();
        break;
      case "previous":
        handlePrev();
        break;
      case "quiz":
        router.navigate("/module/[id]/quiz");
        break;
      default:
        break;
    }
  };

  const setupVoiceCommands = (initialMessage: string = "") => {
    if (!moduleData) return;

    const topics = moduleData.data["topics"] || [];
    const isFirstTopic = topicIndex === 0;
    const isLastTopic = topicIndex === topics.length - 1;

    // Default commands
    const commands: string[] = ["read", "home"];
    const prompts: string[] = [];

    prompts.push(`Say "read" to start reading.`);
    
    if (!isFirstTopic) {
      commands.push("previous");
      prompts.push(`Say "previous" to go back to the previous topic.`);
    }
    
    if (!isLastTopic) {
      commands.push("next");
      prompts.push(`Say "next" to go to the next topic.`);
    } else {
      commands.push("quiz");
      prompts.push(`Say "quiz" to take the quiz.`);
    }
    
    prompts.push(`Say "home" to go to the home screen.`);

    const fullVoicePrompt = [initialMessage, ...prompts].filter(Boolean).join("\n");

    setVoicePrompt(fullVoicePrompt);
    setVoiceCommands(commands);
    setCommandCallback(handleVoiceCommand);
  };

  useEffect(() => {
    setupVoiceCommands(`You are now in ${currentTopic.title}.`);
    setShouldRecognize(true);
  }, [topicIndex]);

  useVoiceCommands();

  return (
    <>
      <ScreenWrapper showAppBar appBarTitle={moduleTitle}>
        <Wrapper paddingHorizontal={10} paddingVertical={20} itemsGap={8}>
          {currentTopic ? (
            <Section
              sectionTitle={currentTopic.title}
              content={currentTopic.sections}
            />
          ) : (
            <DynamicText>Module content unavailable...</DynamicText>
          )}
          <Spacer size={80} />
        </Wrapper>
      </ScreenWrapper>
      {/* for some reason, putting the navbar inside screen wrapper
          makes it not float  */}
      <NavBar
        onNext={handleNext}
        onPrev={handlePrev}
        currentIndex={topicIndex}
        pages={(moduleData?.data["topics"]?.length ?? 0)}
      />
    </>
  );
}
