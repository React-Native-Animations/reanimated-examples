import React from "react";
import { StyleSheet, Text, View } from "react-native";

import CodeInitial from "./src/CodeInitial";
import CodeExperiment from "./src/CodeExperiment";

export default function App() {
  return (
    <View style={styles.container}>
      <CodeExperiment />
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
