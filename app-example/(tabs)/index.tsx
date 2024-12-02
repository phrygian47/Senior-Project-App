import * as React from "react";
import uuid from "react-native-uuid";
import { Text, View, StyleSheet, Pressable, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ScheduleScreen from "../../app/(tabs)/schedule-screen";
import FlatButton from "../../components/FlatButton";
import IconButton from "../../components/IconButton";

export default function HomeScreen() {
  const [devices, setDevices] = React.useState([
    {
      id: 1,
      onPressFunction: () => console.log("clicked!"),
      imageStyle: styles.image,
      source: require("../../assets/images/react-logo.png"),
      text: "Water Heater",
    },
  ]);

  function onClickHandler(name: string) {
    console.log(name + " clicked");
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {devices.map((device) => (
        <IconButton
          key={device.id}
          onPress={device.onPressFunction}
          imageStyle={device.imageStyle}
          source={device.source}
          text={device.text}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  header: {
    fontWeight: "bold",
    fontSize: 24,
    padding: 20,
  },
});
