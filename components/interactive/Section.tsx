import { media } from "@/data/modulesContentMap";
import React from "react";
import { StyleSheet, View } from "react-native";
import CaptionedImage from "../CaptionedImage";
import DynamicText from "../DynamicText";
import InfoCard from "../InfoCard";
import Spacer from "../Spacer";
import RecallCard from "./RecallCard";

type TextBlock = {
  type: "text";
  header: string;
  content: string;
};

type ImageBlock = {
  type: "image";
  imgSrc: string;
  caption: string;
};

type InfoCardBlock = {
  type: "remember" | "trivia";
  content: string;
};

type RecallCardBlock = {
  type: "active-recall";
  question: string;
  answer: string;
};

type SectionProps = {
  sectionTitle: string;
  content: (TextBlock | ImageBlock | InfoCardBlock | RecallCardBlock)[];
};

export default function Section({ sectionTitle, content }: SectionProps) {
  return (
    <View>
      <DynamicText variant="title">{sectionTitle}</DynamicText>
      <Spacer size={10} />
      <View style={styles.layout}>
        {content.map((block, index) => {
          switch (block.type) {
            case "text":
              return (
                <View key={index}>
                  {block.header && (
                    <DynamicText key={"header" + index} variant="header">
                      {block.header}
                    </DynamicText>
                  )}
                  <Spacer />
                  <DynamicText key={"content" + index} variant="paragraph">
                    {block.content}
                  </DynamicText>
                </View>
              );
            case "image":
              // Extract the file base name from a file path
              const filename = block.imgSrc.replace(/^.*[\\/]/, "").replace(/\.[^/.]+$/, "");
              return (
                <CaptionedImage
                  key={index}
                  caption={block.caption}
                  imgSrc={media[filename]}
                />
              );
            case "remember":
              return (
                <InfoCard
                  key={index}
                  variant="remember"
                  content={block.content}
                />
              );
            case "trivia":
              return (
                <InfoCard
                  key={index}
                  variant="trivia"
                  content={block.content}
                />
              );
            case "active-recall":
              return (
                <RecallCard
                  key={index}
                  question={block.question}
                  answer={block.answer}
                />
              );
            default:
              return null;
          }
        })}
        <Spacer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    gap: 12,
  },
});
