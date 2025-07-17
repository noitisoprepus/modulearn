import { colors } from "@/styles/colors";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import DynamicText from "./DynamicText";

type QuestionCardProps = {
  index: number;
  question: string;
};

export default function QuestionCard({ question, index }: QuestionCardProps) {
  const [image, setImage] = useState(Boolean);

  return (
    <View style={styles.layout}>
      <DynamicText style={[styles.text, { fontWeight: "bold" }]}>
        Question {index} of 10
      </DynamicText>
      <DynamicText style={styles.text}>{question}</DynamicText>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    height: 150,
    width: 350,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.cardDefault,
  },
  text: {
    margin: "auto",
    textAlign: "center",
  },
});
