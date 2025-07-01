import { PropsWithChildren } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

type WrapperProps = PropsWithChildren<{
  paddingHorizontal?: number;
  paddingVertical?: number;
  itemsGap?: number;
  alignItems?: ViewStyle["alignItems"];
}>;

export default function Wrapper({ 
  paddingHorizontal = 16, 
  paddingVertical = 8,
  itemsGap = 16,
  alignItems = "stretch", 
  children 
}: WrapperProps) {
  return (
    <View style={[styles.container, { paddingVertical, paddingHorizontal }]}>
      <View style={[styles.children, { alignItems, gap: itemsGap }]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  children: {
    flexDirection: "column",
  },
});

