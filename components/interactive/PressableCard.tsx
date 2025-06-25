import { colors } from "@/styles/colors";
import { router } from "expo-router";
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
};

export default function PressableCard({
  imgSource,
  module,
  title,
}: PressableCardProps) {
  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        router.navigate({
          pathname: "/module/[title]",
          params: { title: title },
        })
      }
    >
      <Image source={imgSource} style={styles.image} />
      <View style={styles.titles}>
        <Text style={styles.text}>{module}</Text>
        <Spacer size={20} />
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: { flex: 0, height: 177, width: 200 },
  titles: { paddingHorizontal: 15, paddingVertical: 10 },
  card: {
    borderRadius: 10,
    backgroundColor: colors.cardDefault,
    elevation: 6,
    shadowColor: colors.shadow,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "KantumruyProMedium",
  },
});
