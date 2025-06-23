import { colors } from "@/styles/colors";
import { DimensionValue, Pressable, StyleSheet, Text, View } from "react-native";

type ButtonProps = {
  label: string;
  textAlignment?: 'left' | 'center' | 'right';
  backgroundColor?: string;
  textColor?: string;
  width?: DimensionValue;
  borderRadius?: number;
  elevation?: number;
  onPress?: () => void;
};

export default function Button({
  label,
  textAlignment = 'center',
  backgroundColor = colors.secondary,
  textColor = colors.lightText,
  width = "100%",
  borderRadius = 12,
  elevation,
  onPress,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, { backgroundColor, width, borderRadius, elevation }]}
    >
      {({ pressed }) => (
        <>
          {pressed && <View style={[styles.overlay, { borderRadius }]} />}
          <Text style={[styles.text, { color: textColor, textAlign: textAlignment }]}>
            {label}
          </Text>
        </>
      )}
      
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignSelf: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    zIndex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
