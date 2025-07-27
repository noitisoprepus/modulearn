import PressableCard from "@/components/interactive/PressableCard";
import ScreenWrapper from "@/components/ScreenWrapper";
import Spacer from "@/components/Spacer";
import { media, modules, title } from "@/data/modulesContentMap";
import { useVoiceCommands } from "@/hooks/useVoiceCommands";
import { useModuleStore } from "@/store/moduleStore";
import { numberWordsMap } from "@/utils/speechUtils";
import { router } from "expo-router";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const { setModuleIndex } = useModuleStore();

  const { promptMessage, moduleCommands } = useMemo(() => {
    let prompt = "Welcome to ModuLearn. Say the number of the module you want to open.";
    const commands: string[] = [];

    modules.forEach((mod, i) => {
      const indexString = (i + 1).toString();
      const word = Object.keys(numberWordsMap).find(key => numberWordsMap[key] === indexString);
      
      if (word) {
        prompt += ` Module ${indexString}: ${mod.title}.`;
        commands.push(word);
      }
    });

    return { promptMessage: prompt, moduleCommands: commands };
  }, []);

  useVoiceCommands({
    commands: moduleCommands,
    onCommand: (command) => {
      const index = parseInt(numberWordsMap[command]) - 1;
      setModuleIndex(index);
      router.navigate("/module/[id]")
    },
    promptMessage: promptMessage,
  });

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
