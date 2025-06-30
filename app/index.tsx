import PressableCard from "@/components/interactive/PressableCard";
import ScreenWrapper from "@/components/ScreenWrapper";
import { media, modules } from "@/data/modulesContentMap";
import { router } from "expo-router";
import { View } from "react-native";

export default function Index() {
  const title = "Science, Technology, and Society";

  return (
    <ScreenWrapper showAppBar appBarTitle={title}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {modules.map((module, index) => {
          const image = module.imgSrc !== "null"
                ? media[module.imgSrc]
                : require("@/assets/images/react-logo.png"); // fallback
          return (
            <PressableCard
              imgSource={image}
              module={`Module ${index}`}
              title={module.title}
              onPress={() =>
                router.navigate({
                  pathname: '/module/[id]',
                  params: { id: module.id }
                })
              }
            />
          );
        })}
        
      </View>
    </ScreenWrapper>
  );
}
