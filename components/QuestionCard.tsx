import React from "react";
import { Image, StyleSheet, View } from "react-native";
import DynamicText from "./DynamicText";

type QuestionCardProps = {
  index: number;
  question: string;
  img?: string;
  questions: number;
};

export default function QuestionCard({
  question,
  index,
  img,
  questions,
}: QuestionCardProps) {
  return (
    <View style={styles.layout}>
      <DynamicText style={[styles.text, styles.tracker]}>
        Question {index} of {questions}
      </DynamicText>
      <DynamicText style={[styles.text, styles.question]}>
        {question}
      </DynamicText>
      {img && (
        <Image
          source={require("@/assets/images/raccoon.webp")}
          style={styles.image}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    height: "auto",
    width: 350,
    // backgroundColor: "red",
    gap: 20,
    alignItems: "center",
  },
  text: {
    margin: "auto",
    textAlign: "center",
  },
  tracker: {
    // fontSize: 10,
    fontWeight: "bold",
  },
  question: {
    fontSize: 20,
  },
  image: {
    width: 300,
    height: 250,
    objectFit: "cover",
  },
});
