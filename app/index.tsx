import PressableCard from "@/components/interactive/PressableCard";
import ScreenWrapper from "@/components/ScreenWrapper";
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
        <PressableCard
          imgSource={require("@/assets/images/react-logo.png")}
          module="Module: 1"
          title="Introduction to STS"
        />
      </View>
    </ScreenWrapper>
  );
}
