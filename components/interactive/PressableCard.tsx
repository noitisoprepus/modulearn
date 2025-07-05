import { colors } from "@/styles/colors";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Spacer from "../Spacer";

type PressableCardProps = {
  imgSource: ImageSourcePropType;
  module: string;
  title: string;
  onPress: () => void;
};

export default function PressableCard({
  imgSource,
  module,
  title,
  onPress,
}: PressableCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={imgSource} style={styles.image} />
      <View style={styles.titles}>
        <Text style={styles.text}>{module}</Text>
        <Spacer size={10} />
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    objectFit: "cover",
    height: 150,
    width: "100%",
    maxWidth: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  titles: { padding: 10 },
  card: {
    borderRadius: 10,
    backgroundColor: colors.cardDefault,
    elevation: 6,
    shadowColor: colors.shadow,
    height: 250,
    width: 170,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "KantumruyProMedium",
  },
});
