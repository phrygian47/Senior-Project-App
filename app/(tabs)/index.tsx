import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ScheduleScreen from "./schedule-screen";
import FlatButton from "../../components/FlatButton";

export default function HomeScreen() {
  function onClickHandler(name: string) {
    console.log(name + " clicked");
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <FlatButton
        text="Vacation"
        onPressFunction={() => onClickHandler("Vacation")}
      ></FlatButton>
      <FlatButton
        text={"Low"}
        onPressFunction={() => onClickHandler("Low")}
      ></FlatButton>
      <FlatButton
        text={"High"}
        onPressFunction={() => onClickHandler("High")}
      ></FlatButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    fontWeight: "bold",
    fontSize: 24,
    padding: 20,
  },
});
