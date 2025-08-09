import React from "react";
import { ImageSourcePropType, StyleSheet, View } from "react-native";
import CaptionedImage from "./CaptionedImage";
import DynamicText from "./DynamicText";

type QuestionCardProps = {
  index: number;
  question: string;
  imgSrc?: ImageSourcePropType;
  imgCaption?: string;
  questions: number;
};

export default function QuestionCard({
  question,
  index,
  imgSrc,
  imgCaption,
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
      {imgSrc && (
        <CaptionedImage imgSrc={imgSrc} caption={imgCaption} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    height: "auto",
    width: 350,
    gap: 20,
    alignItems: "center",
  },
  text: {
    margin: "auto",
    textAlign: "center",
  },
  tracker: {
    fontWeight: "bold",
  },
  question: {
    fontSize: 20,
  },
});
