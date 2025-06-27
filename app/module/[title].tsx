import Section from "@/components/interactive/Section";
import ScreenWrapper from "@/components/ScreenWrapper";
import Spacer from "@/components/Spacer";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

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
      <ScrollView style={styles.page}>
        <Section
          sectionTitle="Module 1: Introduction to STS"
          content={[
            {
              type: "text",
              content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            },
            {
              type: "image",
              src: require("@/assets/images/raccoon.webp"),
              caption:
                "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            },
            {
              type: "text",
              content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            },
            {
              type: "active-recall",
              question: "Sample active recall question",
              answer: "Sample answer",
            },
          ]}
        />
        <Section
          sectionTitle="I. Lorem Ipsum"
          content={[
            {
              type: "text",
              content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            },
            {
              type: "trivia",
              content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            },
            {
              type: "text",
              content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            },
            {
              type: "remember",
              content:
                "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            },
          ]}
        />
        <Spacer size={80} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

// TODO : fetch data, additional sections (new page)
