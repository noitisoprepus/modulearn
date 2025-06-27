import DynamicText from "@/components/DynamicText";
import InfoCard from "@/components/InfoCard";
import RecallCard from "@/components/interactive/RecallCard";
import ScreenWrapper from "@/components/ScreenWrapper";
import Spacer from "@/components/Spacer";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function Module() {
  const { title } = useLocalSearchParams();

  const parsedTitle =
    typeof title === "string"
      ? title
      : Array.isArray(title)
      ? title[0]
      : undefined;

  return (
    <ScreenWrapper showAppBar appBarTitle={parsedTitle}>
      <View style={styles.layout}>
        <DynamicText variant="header">
          Module 1: Introduction to STS
        </DynamicText>
        <Spacer size={20} />
        <DynamicText>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur
          dolores eveniet deleniti natus exercitationem officiis nihil obcaecati
          ratione maiores, velit dolorum nobis optio reprehenderit maxime
          reiciendis debitis fugit atque itaque.
        </DynamicText>
        <RecallCard />
        <InfoCard variant="fact" />
        <InfoCard variant="remember" />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  layout: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

// TODO : recall, info card, fetch data, additional sections (new page)
