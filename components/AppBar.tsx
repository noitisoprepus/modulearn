import { colors } from "@/styles/colors";
import { StyleSheet, Text, View } from "react-native";
import TextToSpeechButton from "./interactive/TextToSpeechButton";

type AppBarProps = {
  title?: string;
};

export default function AppBar({ title }: AppBarProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{title}</Text>
      <TextToSpeechButton text="Hello there. Welcome to ModuLearn! This is a speech test. I am speaking so many words." />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 100, // Always on top
  },
  greeting: {
    fontFamily: "GermaniaOne",
    fontSize: 24,
    fontWeight: "600",
    color: colors.lightText,
  },
});
