import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function NavBar() {
  return (
    <View style={styles.layout}>
      <Text>NavBarasdasdasd</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    width: 200,
    height: 100,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
