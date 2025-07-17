import NavBar from "@/components/interactive/NavBar";
import Section from "@/components/interactive/Section";
import ScreenWrapper from "@/components/ScreenWrapper";
import Spacer from "@/components/Spacer";
import Wrapper from "@/components/Wrapper";
import { modules } from "@/data/modulesContentMap";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";

export default function Module() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const moduleData = modules.find((module) => module.id === id);

  const moduleTitle: string = moduleData?.title || "Title not loaded";

  if (!moduleData) return null;

  // TODO: Implement a handler/provider (not sure what to call it) that will track, feed, and navigate through each topic from moduleData.data as a page into this screen
  const moduleTopics = moduleData.data["topics"];

  const handleNext = () => {
    if (currentIndex < moduleTopics.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentTopic = moduleTopics[currentIndex];

  return (
    <>
      <ScreenWrapper scrollable showAppBar appBarTitle={moduleTitle}>
        <Wrapper paddingHorizontal={10} paddingVertical={20} itemsGap={8}>
          <Section
            sectionTitle={currentTopic.title}
            content={currentTopic.sections}
          />
          <Spacer size={80} />
        </Wrapper>
      </ScreenWrapper>
      {/* for some reason, putting the navbar inside screen wrapper
          makes it not float  */}
      <NavBar
        onNext={handleNext}
        onPrev={handlePrev}
        currentIndex={currentIndex}
        sections={moduleTopics.length}
        id={id}
      />
    </>
  );
}

// navbar updates index if ++ or --
