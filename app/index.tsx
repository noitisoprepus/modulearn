import PressableCard from "@/components/interactive/PressableCard";
import ScreenWrapper from "@/components/ScreenWrapper";
import Spacer from "@/components/Spacer";
import { media, modules } from "@/data/modulesContentMap";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const title = "Science, Technology, and Society";

  return (
    <ScreenWrapper scrollable showAppBar appBarTitle={title}>
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
              onPress={() =>
                router.navigate({
                  pathname: "/module/[id]",
                  params: { id: module.id },
                })
              }
            />
          );
        })}
      </View>
      <Spacer size={50} />
    </ScreenWrapper>
  );
}

// const windowWidth =

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

// TODO : pagination, appbar, quiz page
// TODO(after) : TTS, voice command
