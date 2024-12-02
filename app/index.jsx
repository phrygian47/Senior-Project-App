import * as React from "react";
import { useRouter } from "expo-router";
import { Text, View, StyleSheet, Pressable, Image, Link } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import FlatButton from "../components/FlatButton";
import IconButton from "../components/IconButton";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { DeviceContext } from "./contexts/DeviceContext";
import MqttService from "./services/MqttService";

const MQTT_BROKER_URL =
  "wss://37e8d6595c8a470bb699134f3cddafc3.s1.eu.hivemq.cloud:8884/mqtt";
const options = {
  clientId: "ClientId-" + Math.random().toString(16).substring(2, 8),
  userName: "Test",
  password: "password",
};

export default function HomeScreen() {
  /*React.useEffect(() => {
    const incomingMessageHandler = (message) => {
      console.log("Message Received on homepage: ", message.payLoadString);
    };
    MqttService.connect(MQTT_BROKER_URL, options, incomingMessageHandler);

    // Subscribe to main topic
    MqttService.mqttClient.onSuccess = () => {
      MqttService.subscribe("wh-control");
    };

    return () => {
      // Disconnect when component unmounts
      MqttService.disconnect();
    };
  }, []);

  const publishHandler = (message) => {
    MqttService.publish("wh-control", message);
  };*/

  const imageMap = {
    "water-heater.png": require("../assets/images/water-heater.png"),
    "toilet.png": require("../assets/images/toilet.png"),
    // Add other images as necessary
  };
  const router = useRouter();
  const { devices } = React.useContext(DeviceContext);

  const handleIconPress = (id) => {
    if (id === 1) {
      router.push("./(tabs)/wh-control");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#003898", "#406789"]}
        dither={true}
        locations={[0.01, 0.6]}
        style={styles.background}
      />
      <SafeAreaView style={styles.container}>
        <LinearGradient
          style={[styles.circle, { marginTop: "20%" }]}
          colors={["#fff", "#4DA6FF"]}
        >
          <IconButton
            key={0}
            onPress={() => router.push("/open-home")}
            imageStyle={styles.largeIcon}
            source={require("../assets/images/home-icon-200x200.png")}
          />
        </LinearGradient>
        <View>
          <Text style={styles.homeButtonText}>My Home</Text>
        </View>
        <View style={styles.deviceButtonContainer}>
          {devices.map((device) => {
            const imageSource = imageMap[device.imageName]; // Use the image map to look up the image source
            return (
              <View key={device.id} style={styles.deviceButtons}>
                {device.visible ? (
                  <IconButton
                    imageStyle={styles.smallIcon}
                    source={imageSource} // Use the mapped image source
                    text={device.text}
                    onPress={() => handleIconPress(device.id)}
                  />
                ) : null}
              </View>
            );
          })}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  largeIcon: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  smallIcon: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  header: {
    fontWeight: "bold",
    fontSize: 24,
    padding: 20,
  },
  circle: {
    height: 150,
    width: 150,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderWidth: 2,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  homeButtonText: {
    fontSize: 28,
    marginTop: 10,
    color: "#000",
    textAlign: "center",
  },
  deviceButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  deviceButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
