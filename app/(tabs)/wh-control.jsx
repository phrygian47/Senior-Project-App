import * as React from "react";
import { useRouter } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { ControlContext } from "../contexts/ControlContext";
import { useMQTT } from "../contexts/MQTTContext";
import BatteryIndicator from "../../components/BatteryIndicator";

export default function WhControl() {
  const {
    isConnected,
    lastMessage,
    publish,
    subscribe,
    disconnect,
    subscribeToDialPosition,
    getLastMessage,
    unsubscribe,
    subscribeWithCallback
  } = useMQTT();

  const { controlValue } = React.useContext(ControlContext);

  const [status, setStatus] = React.useState(null);
  const [battery, setBattery] = React.useState(85);

// Separate effect for status subscription
React.useEffect(() => {
  // Define status message handler
  const handleStatusMessage = (message) => {
    const lastStatus = message.payloadString;
    const newStatus = (lastStatus === "Low" ? "Low" : 
    lastStatus === "High" ? "High" : 
    lastStatus === "VeryHigh" ? "Very High" :
    "Vacation");
    console.log(newStatus)
    setStatus(newStatus);
  };

  // Subscribe to status topic with its handler
  subscribeWithCallback("/status", handleStatusMessage);
  // Initial status request
  publish("/command", "send-status");

  return () => {
    unsubscribe("/status");
  };
}, []);

// Separate effect for battery subscription
React.useEffect(() => {
  // Define battery message handler
  const handleBatteryMessage = (message) => {
    const batteryLevel = parseInt(message.payloadString);
    setBattery(batteryLevel);
  };

  // Subscribe to battery topic with its handler
  subscribeWithCallback("/battery-level", handleBatteryMessage);
  // Initial battery request
  publish("/command", "send-battery");

  return () => {
    unsubscribe("/battery-level");
  };
}, []);

/*  const updateBattery = (batteryLevel) => {
    setBattery(batteryLevel);
  };

  const updateStatus = (lastStatus) => {
    lastStatus === 1 ? setStatus("Low") : lastStatus === 2 ? setStatus("High") : setStatus("Vacation");
  };*/


  // ATTENTION
  // MAKE CHANGES TO CONTROL VALUE POS DONT LEAVE IT LIKE THIS
  const onOffPress = () => {
    if (controlValue.pos1 == null) {
      publish("/wh-control-apptohub", "VACATION");
    } else {
      console.log("Setup Incomplete");
    }
  };

  const onLowPress = () => {
    if (controlValue.pos2 == null) {
      publish("/wh-control-apptohub", "LOW");
    } else {
      console.log("Setup Incomplete");
    }
  };

  const onHighPress = () => {
    if (controlValue.pos3 == null) {
      publish("/wh-control-apptohub", "HIGH");
    } else {
      console.log("Setup Incomplete");
    }
  };

  const onVeryHighPress = () => {
    if (controlValue.pos3 == null) {
      publish("/wh-control-apptohub", "VERY-HIGH");
    } else {
      console.log("Setup Incomplete");
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FFFFFF", "#FAF3E0"]}
        dither={true}
        style={styles.background}
      />
      <BatteryIndicator batteryLevel={battery} />
      <View style={styles.status}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
      <SafeAreaView>
        <View style={styles.content}>
          <TouchableOpacity onPress={onOffPress} style={styles.button}>
            <Text style={styles.buttonText}>Vacation</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onLowPress} style={styles.button}>
            <Text style={styles.buttonText}>Low</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onHighPress} style={styles.button}>
            <Text style={styles.buttonText}>High</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onVeryHighPress} style={styles.button}>
            <Text style={styles.buttonText}>Very High</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#E0F7FA",
    margin: 20,
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  content: {
    justifyContent: "center",
    alignContent: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
  status: {
    justifyContent: "center",
    alignContent: "flex-start",
    borderWidth: 2,
    backgroundColor: "#FAF3E0",
    marginHorizontal: 20,
    borderRadius: 10,
  },
  statusText: {
    textAlign: "center",
    fontSize: 40,
    color: "#000",
  },
});
