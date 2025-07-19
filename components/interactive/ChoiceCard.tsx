import { colors } from "@/styles/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import DynamicText from "../DynamicText";

type ChoiceCardProps = {
  choice: string;
  value: string;
  active: boolean;
};

export default function ChoiceCard({ choice, value, active }: ChoiceCardProps) {
  return (
    <View
      style={
        active
          ? [styles.layout, { backgroundColor: colors.cardAnswer }]
          : styles.layout
      }
    >
      <View style={styles.textLayout}>
        <DynamicText
          style={
            active ? [styles.text, { color: colors.lightText }] : styles.text
          }
        >
          {choice.toUpperCase()}.
        </DynamicText>
        <DynamicText
          style={
            active ? [styles.text, { color: colors.lightText }] : styles.text
          }
        >
          {value}
        </DynamicText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    width: 350,
    height: 70,
    elevation: 5,
    backgroundColor: colors.cardDefault,
    borderRadius: 10,
  },
  textLayout: {
    flexDirection: "row",
    paddingHorizontal: 50,
    paddingVertical: 20,
    margin: "auto",
    gap: 20,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
