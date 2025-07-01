import Section from "@/components/interactive/Section";
import ScreenWrapper from "@/components/ScreenWrapper";
import Spacer from "@/components/Spacer";
import Wrapper from "@/components/Wrapper";
import { modules } from "@/data/modulesContentMap";
import { useLocalSearchParams } from "expo-router";
import React from "react";

export default function Module() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const moduleData = modules.find((module) => module.id === id);

  if (!moduleData) return null;

  // TODO: Implement a handler/provider (not sure what to call it) that will track, feed, and navigate through each topic from moduleData.data as a page into this screen
  const moduleTopics = moduleData.data["topics"];

  return (
    <ScreenWrapper scrollable showAppBar appBarTitle={moduleData.title}>
      <Wrapper paddingHorizontal={10} paddingVertical={20} itemsGap={8}>
        {moduleTopics.map((topic, index: number) => {
          return (
            <Section
              key={index}
              sectionTitle={topic.title}
              content={topic.sections}
            />
          );
        })}
        <Spacer size={80} />
      </Wrapper>
    </ScreenWrapper>
  );
}
