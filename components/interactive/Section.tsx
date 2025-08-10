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

type ListBlock = {
  type: "list";
  category: string;
  hasHeader: boolean;
  entries: string[];
}

type ImageBlock = {
  type: "image";
  imgSrc: string;
  caption?: string;
  attribution?: string;
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
  content: (TextBlock | ListBlock | ImageBlock | InfoCardBlock | RecallCardBlock)[];
};

export default function Section({ sectionTitle, content }: SectionProps) {
  return (
    <View>
      <DynamicText variant="title">{sectionTitle}</DynamicText>
      <Spacer />
      <View style={styles.layout}>
        {content.map((block, index) => {
          switch (block.type) {
            case "text":
              return (
                <View key={index}>
                  {block.header && (
                    <>
                      <Spacer />
                      <DynamicText key={"header" + index} variant="header">
                        {block.header}
                      </DynamicText>
                      <Spacer />
                    </>
                  )}
                  <DynamicText key={"content" + index} variant="paragraph">
                    {block.content}
                  </DynamicText>
                </View>
              );
            case "list":
              return (
                <View key={index} style={styles.listContainer}>
                  {block.entries.map((entry, index) => {
                    let headerPart = "";
                    let contentPart = entry;

                    if (block.hasHeader) {
                      const dashIndex = entry.indexOf("-");
                      if (dashIndex !== -1) {
                        headerPart = entry.slice(0, dashIndex).trim();
                        contentPart = entry.slice(dashIndex + 1).trim();
                      }
                    }

                    const bullet = block.category === "ordered" ? `${index + 1}.` : "\u2022"; // \u2022 = bullet

                    return (
                      <View key={index} style={styles.listItem}>
                        <DynamicText style={styles.bullet}>{bullet}</DynamicText>
                        <View>
                          {block.hasHeader && headerPart ? (
                            <DynamicText style={styles.listHeader}>
                              {headerPart}{" - "}
                              <DynamicText style={styles.listText}>{contentPart}</DynamicText>
                            </DynamicText>
                          ) : (
                            <DynamicText style={styles.listText}>{entry}</DynamicText>
                          )}
                        </View>
                      </View>
                    );
                  })}
                </View>
              );
            case "image":
              // Extract the file base name from a file path
              const filename = block.imgSrc.replace(/^.*[\\/]/, "").replace(/\.[^/.]+$/, "");
              return (
                <CaptionedImage
                  key={index}
                  caption={block.caption}
                  attribution={block.attribution}
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
    gap: 10,
  },
  listContainer: {
    gap: 5,
    marginLeft: 10,
    marginRight: 20,
  },
  listItem: {
    flexDirection: "row",
  },
  bullet: {
    width: 24,
    fontWeight: "bold",
  },
  listHeader: {
    fontWeight: "bold",
  },
  listText: {
    fontWeight: "normal",
  },
});
