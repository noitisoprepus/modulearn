import ScreenWrapper from "@/components/ScreenWrapper";
import { modules } from "@/data/modulesContentMap";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Results() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const moduleData = modules.find((module) => module.id === id);
  const moduleTitle = moduleData?.title || "No title loaded";

  return (
    <ScreenWrapper showAppBar appBarTitle={moduleTitle}>
      <View>
        <Text>hallo</Text>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({});
