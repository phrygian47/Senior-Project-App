import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function Calibrate() {
  return (
    <View style={styles.placeholder}>
      <Text>Calibrate and History Placeholder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: "center",
    margin: "auto",
  },
});
