import { colors } from "@/styles/colors";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
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
    <Pressable onPress={onPrev}>
      <View style={styles.single}>
        <View style={styles.items}>
          <DynamicText
            style={{
              color: colors.lightText,
              fontWeight: "bold",
            }}
          >
            Return to Module
          </DynamicText>
        </View>
      </View>
    </Pressable>
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
    <View style={styles.full}>
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
            Back
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
              Take the Quiz
            </DynamicText>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              router.back();
            }}
          >
            <DynamicText
              style={{
                color: colors.lightText,
                fontWeight: "bold",
              }}
            >
              Return to Module
            </DynamicText>
          </Pressable>
        )}

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
              hasAnswered || !isLastQuestion
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
            {quiz && isLastQuestion ? "Submit" : "Next"}
          </DynamicText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  full: {
    position: "absolute",
    alignSelf: "center",
    bottom: 50,
    width: 320,
    height: 45,
    backgroundColor: colors.primary,
    borderRadius: 10,
    elevation: 5,
  },
  single: {
    position: "absolute",
    alignSelf: "center",
    bottom: 50,
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
