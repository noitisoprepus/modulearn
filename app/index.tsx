import PressableCard from "@/components/interactive/PressableCard";
import ScreenWrapper from "@/components/ScreenWrapper";
import Spacer from "@/components/Spacer";
import { media, modules, title } from "@/data/modulesContentMap";
import { useVoiceCommands } from "@/hooks/useVoiceCommands";
import { useAppStore } from "@/store/appStore";
import { useModuleStore } from "@/store/moduleStore";
import { useSpeechStore } from "@/store/speechStore";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const { setModuleIndex } = useModuleStore();
  const {
      setSpeechRate,
      setShouldRecognize,
      setVoiceCommands,
      setVoicePrompt,
      setCommandCallback,
    } = useSpeechStore();

  const { modulePrompt, moduleCommands } = useMemo(() => {
    let prompt = `Say "module" plus the number of the module you want to open.`;
    const commands: string[] = [];

    modules.forEach((mod, i) => {
      const indexString = (i + 1).toString();
      prompt += ` Module ${indexString}: ${mod.title}.`;
      commands.push(`module ${indexString}`);
    });

    return { modulePrompt: prompt, moduleCommands: commands };
  }, []);

  const handleVoiceCommand = (command: string) => {
    switch (command) {
      case "modules":
        setVoicePrompt(modulePrompt);
        setVoiceCommands(moduleCommands);
        setCommandCallback((command: string) => {
          const selectedNumber = command.split("module ")[1];
          const index = parseInt(selectedNumber) - 1;
          setModuleIndex(index);
          router.navigate("/module/[id]");
        });
        setShouldRecognize(true);
        break;
      case "help":
        // TODO: Add HELP message
        break;
      case "configure":
        setVoicePrompt(`How fast should the text be read? Say "slow", "normal", or "quick".`);
        setVoiceCommands(["slow", "normal", "quick"]);
        setCommandCallback((command: string) => {
          if (command === "slow") {
            setSpeechRate(0.75);
          } else if (command === "quick") {
            setSpeechRate(1.25);
          } else {
            setSpeechRate(1);
          }

          // Prompt what to do next
          setupVoiceCommands("What do you want to do now?")
          setShouldRecognize(true);
        });
        setShouldRecognize(true);
        break;
      default:
        console.error(`The command, "${command}", is unrecognizable.`);
        break;
    }
  };

  const setupVoiceCommands = (initialMessage: string = "") => {
    // Default commands
    const commands: string[] = ["modules", "configure"];
    const prompts: string[] = [];

    prompts.push(`Say "modules" to navigate to a module.`);
    prompts.push(`Say "configure" to adjust text-to-speech settings.`);

    const fullVoicePrompt = [initialMessage, ...prompts].filter(Boolean).join("\n");

    setVoicePrompt(fullVoicePrompt);
    setVoiceCommands(commands);
    setCommandCallback(handleVoiceCommand);
  };
  
  useFocusEffect(useCallback(() => {
    useSpeechStore.getState().clearSpeechState();

    const { hasAppStarted, markAppStarted } = useAppStore.getState();
    
    const promptIntro = hasAppStarted
        ? "You are now back in the home screen."
        : "Welcome to ModuLearn.";

    setupVoiceCommands(promptIntro);
    setShouldRecognize(true);

    if (!hasAppStarted) {
      markAppStarted();
    }
  }, []))

  useVoiceCommands();

  return (
    <ScreenWrapper showAppBar appBarTitle={title}>
      <View style={styles.layout}>
        {modules.map((module, index) => {
          const image =
            module.imgSrc !== "null"
              ? media[module.imgSrc]
              : require("@/assets/images/react-logo.png"); // fallback
          return (
            <PressableCard
              key={module.id}
              imgSource={image}
              module={`Module ${index + 1}`}
              title={module.title}
              onPress={() => {
                setModuleIndex(index);
                router.navigate("/module/[id]");
              }}
            />
          );
        })}
      </View>
      <Spacer size={50} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  layout: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingVertical: 20,
    rowGap: 20,
  },
});
