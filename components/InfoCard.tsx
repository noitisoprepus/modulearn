import { colors } from "@/styles/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import DynamicText from "./DynamicText";
import Spacer from "./Spacer";

type InfoCardVariant = "trivia" | "remember";

type InfoCardProps = {
  variant: InfoCardVariant;
  content: string;
};

export default function InfoCard({
  variant = "trivia",
  content,
}: InfoCardProps) {
  return (
    <>
      {variant === "trivia" ? (
        <View style={[styles.card, { backgroundColor: colors.cardTrivia }]}>
          <DynamicText variant="header" style={{ fontSize: 16 }}>
            Did you know?
          </DynamicText>
          <Spacer size={10} />
          <DynamicText variant="paragraph" style={{ fontSize: 16 }}>
            {content}
          </DynamicText>
        </View>
      ) : (
        <View style={[styles.card, { backgroundColor: colors.cardRemember }]}>
          <DynamicText variant="header" style={{ fontSize: 16 }}>
            Remember:
          </DynamicText>
          <Spacer size={10} />
          <DynamicText variant="paragraph" style={{ fontSize: 16 }}>
            {content}
          </DynamicText>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    elevation: 6,
    shadowColor: colors.shadow,
    height: "auto",
    marginHorizontal: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    wordWrap: "wrap",
  },
});
