import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

type TextVariant = "title" | "header" | "paragraph" | "caption";

type DynamicTextProps = {
  variant?: TextVariant;
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
};

export default function DynamicText({
  variant = "paragraph",
  children,
  style,
}: DynamicTextProps) {
  let textStyle;

  switch (variant) {
    case "title":
      textStyle = styles.title;
      break;
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
  title: {
    letterSpacing: -1,
    fontWeight: "black",
    fontSize: 20,
    fontFamily: "KantumruyProBold",
    textAlign: "center",
  },
  header: {
    letterSpacing: -1,
    fontWeight: "700",
    fontSize: 18,
    fontFamily: "KantumruyProBold",
  },
  paragraph: {
    letterSpacing: -0.5,
    fontSize: 16,
    fontFamily: "KantumruyProRegular",
  },
  caption: {
    fontSize: 12,
    fontFamily: "KantumruyProLightItalic",
    letterSpacing: -0.5,
    maxWidth: 220,
    wordWrap: "wrap",
    textAlign: "center",
  },
});
