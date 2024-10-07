import React from "react";
import { StyleSheet, Pressable, Text, View } from "react-native";

export default function FlatButton({
  text,
  onPressFunction,
}: {
  text: string;
  onPressFunction: any;
}) {
  return (
    <Pressable onPress={onPressFunction}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "cornflowerblue",
    width: 150,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
});