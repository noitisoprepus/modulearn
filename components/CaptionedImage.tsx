import React from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import DynamicText from "./DynamicText";

type CaptionImageProps = {
  imgSrc: ImageSourcePropType;
  caption: string;
};

export default function CaptionedImage({ imgSrc, caption }: CaptionImageProps) {
  return (
    <View style={styles.layout}>
      <Image style={styles.image} source={imgSrc} />
      <DynamicText variant="caption" style={styles.caption}>
        {caption}
      </DynamicText>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    margin: "auto",
  },
  image: { width: 250, height: 175, objectFit: "cover" },
  caption: { margin: "auto" },
});
