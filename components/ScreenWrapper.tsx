import { colors } from "@/styles/colors";
import { PropsWithChildren } from "react";
import { Platform, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import AppBar from "./AppBar";

type ScreenWrapperProps = PropsWithChildren<{
  showAppBar?: boolean;
  appBarTitle?: string;
  backgroundColor?: string;
  contentBackgroundColor?: string;
}>;

export default function ScreenWrapper({
  showAppBar = false,
  appBarTitle,
  backgroundColor = colors.primary,
  contentBackgroundColor = colors.surface,
  children,
}: ScreenWrapperProps) {
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      {showAppBar && <AppBar title={appBarTitle} />}
      <ScrollView
        style={[styles.container, { backgroundColor: contentBackgroundColor }]}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 48 : 0,
  },
  container: {
    flex: 1,
  },
});
