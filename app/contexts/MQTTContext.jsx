import MqttService from "../services/MqttService";
import React, { createContext, useContext, useEffect, useState } from "react";

// Export Context for use in other screens
export const MQTTContext = createContext();

// Export provider wrapper to wrap entire project in context
export const MQTTProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false); // state variable to track connection
  const [lastMessage, setLastMessage] = useState(null); // state varialbe to track last message from MQTT (For us in calibration)
  const MQTT_BROKER_URL =
    "wss://37e8d6595c8a470bb699134f3cddafc3.s1.eu.hivemq.cloud:8884/mqtt"; //MQTT broker URL. If changing brokers update here
  const options = {
    clientId: "ClientId-" + Math.random().toString(16).substring(2, 8), //Random client ID for broker
    userName: "Test",
    password: "password",
  };

  // Callback whenever new MQTT emssage is received.
  React.useEffect(() => {
    const incomingMessageHandler = (message) => {
      console.log("Message Received on homepage: ", message.payLoadString);
    };

    // Connect to Broker
    MqttService.connect(MQTT_BROKER_URL, options, incomingMessageHandler);

    // Subscribe to main topic, future implementations should not have this hard coded as there may be many control topics.
    MqttService.mqttClient.onSuccess = () => {
      MqttService.subscribe("wh-control");
    };

    MqttService.mqttClient.onConnectionLost = (responseObject) => {
      if (responseObject.errorCode != 0) {
        console.log("Connection Lost, err: ", responseObject.errorMessage);
        setIsConnected(false);
      }
    };

    return () => {
      // Disconnect when component unmounts
      MqttService.disconnect();
      setIsConnected(false);
    };
  }, []);

  /* Publish message to topic, default topic is "wh-control"
  for this project but if multiple topics are needed new 
  logic will need implemented to handle the topic changes*/
  const publish = (topic, message) => {
    MqttService.publish(topic, message);
  };

  // Subscribe to topic
  const subscribe = (topic) => {
    MqttService.subscribe(topic);
  };

  const subscribeToDialPosition = (topic, onDialPositionUpdate) => {
    if (MqttService.mqttClient && MqttService.mqttClient.isConnected()) {
      MqttService.mqttClient.subscribe(topic);
      console.log(`Subscribed to topic: ${topic}`);

      MqttService.mqttClient.onMessageArrived = (message) => {
        const position = parseInt(message.payloadString, 10);
        onDialPositionUpdate(position);
      };
    } else {
      console.error("Cannot subscribe to topic.");
    }
  };

  const getLastMessage = (topic, messageReceiveHandler) => {
    if (MqttService.mqttClient && MqttService.mqttClient.isConnected()) {
      MqttService.mqttClient.subscribe(topic);
      console.log(`Subscribed to topic: ${topic}`);

      MqttService.mqttClient.onMessageArrived = (message) => {
        console.log(message.payloadString);
        const status = message.payloadString;
        messageReceiveHandler(status);
      };
    } else {
      console.error("Cannot subscribe to topic");
    }
  };

  // Disconnect from broker
  const disconnect = () => {
    MqttService.disconnect();
    setIsConnected(false);
  };

  const unsubscribe = (topic) => {
    MqttService.mqttClient.unsubscribe(topic);
    console.log("Unsubscribed from ", topic);
  };

  const contextValue = {
    isConnected,
    lastMessage,
    publish,
    subscribe,
    disconnect,
    subscribeToDialPosition,
    getLastMessage,
    unsubscribe,
  };

  return (
    <MQTTContext.Provider value={contextValue}>{children}</MQTTContext.Provider>
  );
};
export const useMQTT = () => {
  const context = useContext(MQTTContext);
  if (context === undefined) {
    throw new Error("useMQTT must be used within an MQTTProvider");
  }
  return context;
};

export default MQTTProvider;
