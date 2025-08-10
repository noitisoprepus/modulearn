import React, { useEffect, useState } from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import DynamicText from "./DynamicText";

type CaptionImageProps = {
  imgSrc: ImageSourcePropType;
  caption?: string;
  attribution?: string;
};

export default function CaptionedImage({ imgSrc, caption, attribution }: CaptionImageProps) {
  const [ratio, setRatio] = useState(1);

  useEffect(() => {
    const { width, height } = Image.resolveAssetSource(imgSrc);
    setRatio(width / height);
  }, [imgSrc]);

  return (
    <View style={styles.layout}>
      <Image
        style={[styles.image, { aspectRatio: ratio }]}
        source={imgSrc}
        resizeMode="contain"
      />
      {caption && (
        <DynamicText variant="caption" style={styles.caption}>
          {caption}
        </DynamicText>
      )}
      {attribution && (
        <DynamicText variant="attribution" style={styles.attribution}>
          {attribution}
        </DynamicText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  image: {
    width: "80%",
    height: undefined,
  },
  caption: {
    marginTop: 10,
  },
  attribution: {
    marginTop: 4,
  }
});
