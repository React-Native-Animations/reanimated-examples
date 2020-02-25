import React from "react";
import { StyleSheet, Text, View } from "react-native";

import CodeInitial from "./src/CodeInitial";
import CodeExperiment from "./src/CodeExperiment";
import PanRotateAndZoom from "./src/PanRotateAndZoom";

export default function App() {
  return (
    <View style={styles.container}>
      <PanRotateAndZoom />

      {/* <CodeExperiment /> */}
      {/* <CodeInitial /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
