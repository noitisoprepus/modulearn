import { colors } from "@/styles/colors";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import DynamicText from "../DynamicText";

type NavBarProps = {
  onNext: () => void;
  onPrev: () => void;
  sections: number;
  currentIndex: number;
  id: string;
};

export default function NavBar({
  onPrev,
  onNext,
  sections,
  currentIndex,
  id,
}: NavBarProps) {
  return (
    <View style={styles.layout}>
      <View style={styles.items}>
        <Pressable onPress={onPrev} disabled={currentIndex < 0}>
          <DynamicText
            style={
              currentIndex === 0
                ? { color: colors.disabledText, fontWeight: "bold" }
                : {
                    color: colors.lightText,
                    fontWeight: "bold",
                  }
            }
          >
            Prev Page
          </DynamicText>
        </Pressable>
        <DynamicText
          style={{
            color: colors.lightText,
            fontWeight: "black",
          }}
        >
          |
        </DynamicText>
        <Pressable
          disabled={currentIndex !== sections - 1}
          onPress={() => {
            router.push(`/module/${id}/quiz`);
          }}
        >
          <DynamicText
            style={
              currentIndex === sections - 1
                ? {
                    color: colors.lightText,
                    fontWeight: "bold",
                  }
                : {
                    color: colors.disabledText,
                    fontWeight: "bold",
                  }
            }
          >
            Quiz
          </DynamicText>
        </Pressable>
        <DynamicText
          style={{
            color: colors.lightText,
            fontWeight: "black",
          }}
        >
          |
        </DynamicText>
        <Pressable onPress={onNext}>
          <DynamicText
            style={
              currentIndex === sections - 1
                ? { color: colors.disabledText, fontWeight: "bold" }
                : {
                    color: colors.lightText,
                    fontWeight: "bold",
                  }
            }
          >
            Next Page
          </DynamicText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    position: "absolute",
    bottom: "5%",
    left: "50%",
    transform: [{ translateX: -160 }],
    width: 320,
    height: 45,
    backgroundColor: colors.primary,
    borderRadius: 10,
    elevation: 5,
  },
  items: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-around",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

// might reuse pressable card onpress method for navigating between sections
// add debouncer
// TODO : route to quiz page
