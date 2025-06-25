import React from "react";
import { StyleSheet, Text, TextStyle } from "react-native";

type TextVariant = "header" | "paragraph" | "caption";

type DynamicTextProps = {
  variant?: TextVariant;
  children: React.ReactNode;
  style?: TextStyle;
};

export default function DynamicText({
  variant = "paragraph",
  children,
  style,
}: DynamicTextProps) {
  let textStyle;

  switch (variant) {
    case "header":
      textStyle = styles.header;
      break;
    case "caption":
      textStyle = styles.caption;
      break;
    default:
      textStyle = styles.paragraph;
      break;
  }

  return <Text style={[textStyle, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  header: {
    letterSpacing: -1,
    fontWeight: "black",
    fontSize: 20,
    fontFamily: "KantumruyProBold",
  },
  paragraph: {
    letterSpacing: -0.5,
    fontSize: 16,
    fontFamily: "KantumruyProRegular",
  },
  caption: {
    fontStyle: "italic",
    letterSpacing: -5,
    fontWeight: "light",
    fontSize: 11,
    fontFamily: "KantumruyProLightItalic",
  },
});
