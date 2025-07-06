import { colors } from "@/styles/colors";
import { PropsWithChildren } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import AppBar from "./AppBar";

type ScreenWrapperProps = PropsWithChildren<{
  showAppBar?: boolean;
  appBarTitle?: string;
  scrollable?: boolean;
  backgroundColor?: string;
  contentBackgroundColor?: string;
}>;

export default function ScreenWrapper({
  showAppBar = false,
  appBarTitle,
  scrollable = false,
  backgroundColor = colors.primary,
  contentBackgroundColor = colors.surface,
  children,
}: ScreenWrapperProps) {
  const ContainerWrapper = scrollable ? ScrollView : View;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      {showAppBar && <AppBar title={appBarTitle} />}
      <ContainerWrapper
        style={[styles.container, { backgroundColor: contentBackgroundColor }]}
      >
        {children}
      </ContainerWrapper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 48 : 0,
  },
  container: {
    width: "100%",
  },
});
