import PressableCard from "@/components/interactive/PressableCard";
import ScreenWrapper from "@/components/ScreenWrapper";
import { media, modules } from "@/data/modulesContentMap";
import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Index() {
  const title = "Science, Technology, and Society";

  return (
    <ScreenWrapper showAppBar appBarTitle={title}>
      <ScrollView>
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
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  layout: {
    width: 400,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: "auto",
    justifyContent: "space-between",
    padding: 20,
    gap: 20,
  },
});

// TODO : pagination, appbar, quiz page
// !FIX: home screen card and grid layout (2xn)
// TODO(after) : TTS, voice command
