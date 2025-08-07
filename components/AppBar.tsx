import { useAppStore } from "@/store/appStore";
import { useSpeechStore } from "@/store/speechStore";
import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import { ExpoSpeechRecognitionModule } from "expo-speech-recognition";
import { useState } from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";

type AppBarProps = {
  title?: string;
};

export default function AppBar({ title }: AppBarProps) {
  const { accessibilityEnabled, setAccessibilityEnabled } = useAppStore();
  const { isSpeaking, isRecognizing, setShouldRecognize } = useSpeechStore();
  const [expanded, setExpanded] = useState(false);

  const toggleAccessibility = (value: boolean) => {
    setAccessibilityEnabled(value);

    if (value) {
      setShouldRecognize(true);
    } else {
      // Stop accessibility functionalities
      if (isSpeaking) Speech.stop();
      if (isRecognizing) ExpoSpeechRecognitionModule.abort();
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.greetingContainer}
        onPress={() => setExpanded(prev => !prev)}
      >
        <Text
          style={styles.greeting}
          numberOfLines={expanded ? undefined : 1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
      </Pressable>
      <View style={styles.accessibilityToggle}>
        <MaterialIcons
          name="record-voice-over"
          size={24}
          color={colors.lightText}
        />
        <Switch
          value={accessibilityEnabled}
          onValueChange={toggleAccessibility}
          thumbColor={accessibilityEnabled ? colors.surface : colors.disabled}
          trackColor={{ false: colors.disabledText, true: colors.correct }}
        />
      </View>
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
  greetingContainer: {
    flex: 1,
    marginRight: 12,
  },
  greeting: {
    fontFamily: "GermaniaOne",
    fontSize: 24,
    fontWeight: "600",
    color: colors.lightText,
    flexShrink: 1,
  },
  accessibilityToggle: {
    flexDirection: "row",
    alignItems: "center",
  },
});
