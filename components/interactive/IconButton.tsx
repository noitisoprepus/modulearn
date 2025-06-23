import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { DimensionValue, Pressable, StyleSheet, Text, View } from "react-native";

type MaterialIconName = ComponentProps<typeof MaterialIcons>["name"];

type IconButtonProps = {
  icon: MaterialIconName;
  iconSize?: number;
  iconColor?: string;
  label?: string;
  labelPosition?: "top" | "bottom" | "left" | "right";
  backgroundColor?: string;
  textColor?: string;
  width?: DimensionValue;
  borderRadius?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  onPress?: () => void;
};

export default function IconButton({
  icon,
  iconSize = 24,
  iconColor = colors.primary,
  label,
  labelPosition = "right",
  backgroundColor,
  textColor = colors.darkText,
  width,
  borderRadius = 24,
  paddingVertical = 8,
  paddingHorizontal = 8,
  onPress,
}: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, { backgroundColor, width, borderRadius, paddingVertical, paddingHorizontal }]}
    >
      {({ pressed }) => (
        <>
          {pressed && <View style={[styles.overlay, { borderRadius }]} />}
          <View style={[styles.content, styles[labelPosition]]}>
            {label && (
              <Text
                style={[
                  styles.text,
                  { color: textColor },
                  labelPosition === "top" ? { marginBottom: 0 } : {},
                  labelPosition === "bottom" ? { marginTop: 0 } : {},
                  labelPosition === "left" ? { marginRight: 4 } : {},
                  labelPosition === "right" ? { marginLeft: 4 } : {},
                ]}
              >
                {label}
              </Text>
            )}
            <MaterialIcons name={icon} size={iconSize} color={iconColor} />
          </View>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    zIndex: 1,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
  top: {
    flexDirection: "column",
  },
  bottom: {
    flexDirection: "column-reverse",
  },
  left: {
    flexDirection: "row",
  },
  right: {
    flexDirection: "row-reverse",
  },
});
