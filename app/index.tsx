import PressableCard from "@/components/interactive/PressableCard";
import ScreenWrapper from "@/components/ScreenWrapper";
import Spacer from "@/components/Spacer";
import { media, modules, title } from "@/data/modulesContentMap";
import { useVoiceCommands } from "@/hooks/useVoiceCommands";
import { useAppStore } from "@/store/appStore";
import { useModuleStore } from "@/store/moduleStore";
import { useSpeechStore } from "@/store/speechStore";
import { numberWordsMap } from "@/utils/speechUtils";
import { router } from "expo-router";
import { useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const { setModuleIndex } = useModuleStore();
  const {
      setShouldRecognize,
      setVoiceCommands,
      setVoicePrompt,
      setCommandCallback,
    } = useSpeechStore();

  const { modulePrompt, moduleCommands } = useMemo(() => {
    let prompt = "Say the number of the module you want to open.";
    const commands: string[] = [];

    modules.forEach((mod, i) => {
      const indexString = (i + 1).toString();
      const word = Object.keys(numberWordsMap).find(key => numberWordsMap[key] === indexString);
      
      if (word) {
        prompt += ` Module ${indexString}: ${mod.title}.`;
        commands.push(word);
      }
    });

    return { modulePrompt: prompt, moduleCommands: commands };
  }, []);

  const handleVoiceCommand = (command: string) => {
    if (command === "modules") {
      setVoicePrompt(modulePrompt);
      setVoiceCommands(moduleCommands);
      setCommandCallback((command: string) => {
        const index = parseInt(numberWordsMap[command]) - 1;
        setModuleIndex(index);
        router.navigate("/module/[id]");
      });
      setShouldRecognize(true);
    } else if (command === "help") {
      // TODO: Add HELP message
    } else {
      console.error(`The command, "${command}", is unrecognizable.`);
      return;
    }
  };

  useEffect(() => {
    const { hasAppStarted, markAppStarted } = useAppStore.getState();
    
    const promptIntro = hasAppStarted
        ? "You are now back in the home screen."
        : "Welcome to ModuLearn.";

    setVoicePrompt(`${promptIntro} Say "modules" to navigate to a module; or say "help" if you need help on how to use the app.`);
    setVoiceCommands(["modules", "help"]);
    setCommandCallback(handleVoiceCommand);
    setShouldRecognize(true);

    if (!hasAppStarted) {
      markAppStarted();
  }
  }, []);
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
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: "auto",
    justifyContent: "space-between",
    padding: 20,
    rowGap: 20,
  },
});
