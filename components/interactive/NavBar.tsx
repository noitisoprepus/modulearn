import { colors } from "@/styles/colors";
import { router } from "expo-router";
import React from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import DynamicText from "../DynamicText";

type ButtonVariant = "full" | "single";

type NavBarProps = {
  onNext?: () => void;
  onPrev?: () => void;
  pages?: number;
  currentIndex?: number;
  quiz?: boolean;
  variant?: ButtonVariant;
  hasAnswered?: boolean;
};

const { width } = Dimensions.get("window");

export default function NavBar(props: NavBarProps) {
  const { variant = "full" } = props;

  switch (variant) {
    case "full":
      return <FullNavBar {...props} />;
    case "single":
      return <SingleNavBar {...props} />;
  }
}

function SingleNavBar({ onPrev }: NavBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.items}>
        <Pressable onPress={onPrev} style={styles.pressable}>
          <DynamicText style={styles.text}>
            Continue
          </DynamicText>
        </Pressable>
      </View>
    </View>
  );
}

function FullNavBar({
  onPrev,
  onNext,
  pages = 0,
  currentIndex = 0,
  quiz = false,
  hasAnswered = false,
}: NavBarProps) {
  const isLastQuestion = currentIndex === pages - 1;

  return (
    <View style={styles.container}>
      <View style={styles.items}>
        <Pressable onPress={onPrev} disabled={currentIndex < 0}>
          <DynamicText
            style={
              currentIndex === 0
                ? styles.disabledText
                : styles.text
            }
          >
            Back
          </DynamicText>
        </Pressable>
        <DynamicText style={styles.separator}>
          |
        </DynamicText>
        {!quiz ? (
          <Pressable
            disabled={!isLastQuestion}
            onPress={() => {
              router.push(`/module/[id]/quiz`);
            }}
          >
            <DynamicText
              style={
                isLastQuestion
                  ? styles.text
                  : styles.disabledText
              }
            >
              Take the Quiz
            </DynamicText>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              router.back();
            }}
          >
            <DynamicText style={styles.text}>
              Return to Module
            </DynamicText>
          </Pressable>
        )}

        <DynamicText style={styles.separator}>
          |
        </DynamicText>
        <Pressable onPress={onNext}>
          <DynamicText
            style={
              hasAnswered || !isLastQuestion
                ? styles.text
                : styles.disabledText
            }
          >
            {quiz && isLastQuestion ? "Submit" : "Next"}
          </DynamicText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignSelf: "center",
    bottom: 50,
    width: width * 0.9,
    height: 45,
    backgroundColor: colors.primary,
    borderRadius: 10,
    elevation: 5,
    overflow: "hidden",
  },
  pressable: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  items: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: "100%",
    paddingHorizontal: 20,
  },
  text: {
    color: colors.lightText,
    fontWeight: "bold",
    textAlign: "center",
  },
  disabledText: {
    color: colors.disabledText,
    fontWeight: "bold",
    textAlign: "center",
  },
  separator: {
    color: colors.lightText,
    fontWeight: "900",
    textAlign: "center",
  },
});
