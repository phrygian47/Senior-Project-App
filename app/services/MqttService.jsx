import * as Paho from "paho-mqtt";

class MqttService {
  constructor() {
    this.mqttClient = null;
  }

  connect(brokerUrl, options = {}, onMessageArrived) {
    if (this.client) {
      console.warn("Already Connected to MQTT Broker");
      return; // already connected
    }

    this.mqttClient = new Paho.Client(
      brokerUrl,
      options.clientId || "default_id"
    );

    this.mqttClient.onMessageArrived = (message) => {
      console.log("Message Received: ", message.payloadString);
      if (onMessageArrived) {
        onMessageArrived(message);
      }
    };

    this.mqttClient.connect({
      onSuccess: () => {
        console.log("Connected to broker");
      },
      onFailure: (error) => {
        console.log("Failed to connect: ", error.errorMessage);
      },
      userName: options.userName,
      password: options.password,
      useSSL: true,
    });
  }

  subscribe(topic) {
    if (this.mqttClient && this.mqttClient.isConnected()) {
      this.mqttClient.subscribe(topic);
      console.log(`Subscribed to topic: ${topic}`);
    } else {
      console.error("MQTT client not yet connected");
    }
  }

  publish(topic, message) {
    if (this.mqttClient && this.mqttClient.isConnected()) {
      const mqttMessage = new Paho.Message(message);
      mqttMessage.destinationName = topic;
      this.mqttClient.send(mqttMessage);
      console.log(`Message sent to topic ${topic}: ${message}`);
    } else {
      console.error("Cannot publish, client not connected.");
    }
  }

  subscribeToDialPosition(topic, onDialPositionUpdate) {
    if (this.mqttClient && this.mqttClient.isConnected()) {
      this.mqttClient.subscribe(topic);
      console.log(`Subscribed to topic: ${topic}`);

      this.mqttClient.onMessageArrived = (message) => {
        const position = parseInt(message.payloadString, 10);
        onDialPositionUpdate(position);
      };
    } else {
      console.error("Cannot subscribe to topic.");
    }
  }

  disconnect() {
    if (this.mqttClient) {
      this.mqttClient.disconnect();
      console.log("Disconnected");
      this.mqttClient = null;
    }
  }
}

export default new MqttService();
