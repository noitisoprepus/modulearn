import { colors } from "@/styles/colors";
import React, { useState } from "react";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Spacer from "../Spacer";

export default function RecallCard() {
  const [value, setValue] = useState("");
  const [isCorrect, setIsCorrect] = useState(Boolean);
  const isDisabled = value.length === 0;
  const answer: string = "answer";

  function submitAnswer() {
    if (value !== answer) {
      console.log("Wrong");
      setIsCorrect(false);
    } else {
      console.log("Correct");
      setIsCorrect(true);
      Keyboard.dismiss();
    }
  }

  return (
    <View style={styles.card}>
      <View style={styles.layout}>
        <View style={styles.textLayout}>
          <Text
            style={[
              styles.text,
              {
                fontFamily: "KantumruyProBold",
              },
            ]}
          >
            Active Recall:
          </Text>
          <Text style={styles.text}>Lorem ipsum dolor sit amet?</Text>
        </View>
        <Spacer size={10} />
        <View style={styles.inputs}>
          <TextInput
            style={styles.textInput}
            inputMode={isCorrect ? "none" : "text"}
            onChangeText={(text) => setValue(text)}
          />
          {isCorrect ? (
            <View
              style={[styles.submitInput, { backgroundColor: colors.correct }]}
            >
              <Text style={styles.submitInputLabel}>Correct!</Text>
            </View>
          ) : (
            <Pressable
              disabled={isDisabled}
              style={
                isDisabled
                  ? [styles.submitInput, { backgroundColor: colors.disabled }]
                  : styles.submitInput
              }
              onPress={submitAnswer}
            >
              <Text style={styles.submitInputLabel}>Submit</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: "auto",
    borderRadius: 10,
    backgroundColor: colors.cardRecall,
    elevation: 6,
    shadowColor: colors.shadow,
    width: 330,
    height: "auto",
    paddingVertical: 15,
  },
  layout: {
    margin: "auto",
  },
  text: {
    fontSize: 16,
    fontFamily: "KantumruyProRegular",
    letterSpacing: -0.5,
  },
  textLayout: {
    flexDirection: "row",
    width: 170,
    wordWrap: "wrap",
    gap: 10,
  },
  inputs: {
    flexDirection: "row",
    gap: 15,
  },
  textInput: {
    borderBottomWidth: 2,
    padding: 0,
    margin: 0,
    height: "auto",
    width: 200,
    fontSize: 14,
    color: colors.darkText,
  },
  submitInput: {
    backgroundColor: colors.primary,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  submitInputLabel: {
    color: colors.lightText,
    fontFamily: "KantumruyProMedium",
    letterSpacing: -1,
    fontSize: 14,
  },
});
