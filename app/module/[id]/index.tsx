import NavBar from "@/components/interactive/NavBar";
import Section from "@/components/interactive/Section";
import ScreenWrapper from "@/components/ScreenWrapper";
import Spacer from "@/components/Spacer";
import Wrapper from "@/components/Wrapper";
import { modules } from "@/data/modulesContentMap";
import { useModuleStore } from "@/store/moduleStore";
import React, { useState } from "react";

export default function Module() {
  const { moduleIndex } = useModuleStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (moduleIndex === null) return null;

  const moduleData = modules[moduleIndex];
  const moduleTitle: string = moduleData?.title || "Title not loaded";

  if (!moduleData) return null;

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
      <ScreenWrapper showAppBar appBarTitle={moduleTitle}>
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
        pages={moduleTopics.length}
      />
    </>
  );
}
