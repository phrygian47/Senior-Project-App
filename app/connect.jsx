import * as React from "react";
import { router } from "expo-router";
import { Text, View, Button } from "react-native";
import MqttService from "./services/MqttService";
//import Paho from "paho-mqtt";

//const MQTT_BROKER_URL = "37e8d6595c8a470bb699134f3cddafc3.s1.eu.hivemq.cloud";
//const TOPIC = "wh-control";

export default function connect() {
  /*React.useEffect(() => {
    const port = 8884; // websocket port for HiveMQ cloud
    const clientId = "ClientId-" + Math.random().toString(16).substring(2, 8);
    const mqttClient = new Paho.Client(
      `wss://${MQTT_BROKER_URL}:${port}/mqtt`,
      clientId
    );
    //connect to server
    mqttClient.connect({
      useSSL: true,
      userName: "Test",
      password: "password",
      onSuccess: () => {
        console.log("Connected to MQTT broker");
      },
      onFailure: (error) => {
        console.log("Connection failed:", error.errorMessage);
      },
    });
    mqttClient.onConnectionLost = function (responseObject) {
      console.log("Connection Lost: " + responseObject.errorMessage);
    };

    mqttClient.onMessageArrived = function (message) {
      console.log("Message Arrived: " + message.payloadString);
    };

    return () => {
      if (mqttClient && mqttClient.isConnected()) {
        mqttClient.disconnect();
      }
    };
  }, []);

  const onSubmit = (data) => {
    if (mqttClient) {
      const message = new Message(JSON.stringify(data));
      message.destinationName = "wh-control";
      mqttClient.send(message);
      console.log("Message sent to topic: wh-control", data);
    } else {
      console.log("MQTT client is not connected");
    }
  };*/

  const publishHandler = () => {
    const message = "Hello from React Native!";
    MqttService.publish("wh-control", message);
  };

  return (
    <View>
      <Button onPress={publishHandler} title="Send Message"></Button>
    </View>
  );
}
