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
  const cardStyle = [
    styles.layout,
    active && { backgroundColor: colors.secondary },
  ];
  const textStyle = [
    styles.text,
    active && { color: colors.lightText },
  ];

  return (
    <View style={cardStyle}>
      <View style={styles.textLayout}>
        <DynamicText style={textStyle}>{choice.toUpperCase()}.</DynamicText>
        <DynamicText style={[textStyle, styles.valueText]}>{value}</DynamicText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    minHeight: 60,
    paddingHorizontal: 15,
    paddingVertical: 5,
    elevation: 5,
    backgroundColor: colors.cardDefault,
    borderRadius: 10,
    justifyContent: "center",
  },
  textLayout: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
  },
  valueText: {
    paddingHorizontal: 10,
  },
});
