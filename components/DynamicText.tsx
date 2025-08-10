import { colors } from "@/styles/colors";
import React from "react";
import { Linking, StyleProp, StyleSheet, Text, TextStyle } from "react-native";

type TextVariant = "title" | "header" | "paragraph" | "caption" | "attribution";

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
    case "attribution":
      textStyle = styles.attribution;
      break;
    default:
      textStyle = styles.paragraph;
      break;
  }

  if (variant === "attribution" && typeof children === "string") {
    return (
      <Text style={[textStyle, style]}>
        {parseAttributionText(children)}
      </Text>
    );
  }

  return <Text style={[textStyle, style]}>{children}</Text>;
}

function parseAttributionText(text: string) {
  const regex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  text.replace(regex, (match, linkText, linkUrl, offset) => {
    if (offset > lastIndex) {
      parts.push(text.slice(lastIndex, offset));
    }

    parts.push(
      <Text key={offset} style={styles.link} onPress={() => Linking.openURL(linkUrl)}>
        {linkText}
      </Text>
    );

    lastIndex = offset + match.length;
    return match;
  });

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
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
    marginHorizontal: 30,
    wordWrap: "wrap",
    textAlign: "center",
  },
  attribution: {
    marginHorizontal: 40,
    fontSize: 11,
    fontFamily: "KantumruyProLightItalic",
    letterSpacing: -0.25,
    color: colors.disabled,
    textAlign: "center",
  },
  link: {
    color: "#007AFF",
    textDecorationLine: "underline",
  },
});
