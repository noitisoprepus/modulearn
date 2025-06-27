import { colors } from "@/styles/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import DynamicText from "./DynamicText";
import Spacer from "./Spacer";

type InfoCardVariant = "fact" | "remember";

type InfoCardProps = {
  variant: InfoCardVariant;
};

export default function InfoCard({ variant = "fact" }: InfoCardProps) {
  return (
    <>
      {variant === "fact" ? (
        <View style={[styles.card, { backgroundColor: colors.cardFacts }]}>
          <DynamicText variant="header" style={{ fontSize: 16 }}>
            Did you know?
          </DynamicText>
          <Spacer size={10} />
          <DynamicText variant="paragraph" style={{ fontSize: 16 }}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni
            voluptate dolores temporibus! Sed eos nostrum dolores sequi
            asperiores a adipisci aut, porro neque dicta, molestiae praesentium!
            Non possimus magnam quisquam?
          </DynamicText>
        </View>
      ) : (
        <View style={[styles.card, { backgroundColor: colors.cardRemember }]}>
          <DynamicText variant="header" style={{ fontSize: 16 }}>
            Remember:
          </DynamicText>
          <Spacer size={10} />
          <DynamicText variant="paragraph" style={{ fontSize: 16 }}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni
            voluptate dolores temporibus! Sed eos nostrum dolores sequi
            asperiores a adipisci aut, porro neque dicta, molestiae praesentium!
            Non possimus magnam quisquam?
          </DynamicText>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: "auto",
    borderRadius: 10,
    elevation: 6,
    shadowColor: colors.shadow,
    width: 330,
    height: "auto",
    paddingVertical: 15,
    paddingHorizontal: 10,
    wordWrap: "wrap",
  },
});
