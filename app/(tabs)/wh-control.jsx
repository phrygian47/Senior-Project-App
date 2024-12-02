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
  } = useMQTT();

  const { controlValue } = React.useContext(ControlContext);

  const [status, setStatus] = React.useState(null);
  React.useEffect(() => {
    publish("connect", "Connected");
    getLastMessage("status", updateStatus);

    return () => {
      unsubscribe("status");
    };
  }, []);

  const updateStatus = (lastStatus) => {
    setStatus(lastStatus);
  };

  const onOffPress = () => {
    if (controlValue.pos1 != null) {
      publish("wh-control", controlValue.pos1.toString());
    } else {
      console.log("Setup Incomplete");
    }
  };

  const onLowPress = () => {
    if (controlValue.pos2 != null) {
      publish("wh-control", controlValue.pos2.toString());
    } else {
      console.log("Setup Incomplete");
    }
  };

  const onHighPress = () => {
    if (controlValue.pos3 != null) {
      publish("wh-control", controlValue.pos3.toString());
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
      <View style={styles.status}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
      <SafeAreaView>
        <View style={styles.content}>
          <TouchableOpacity onPress={onOffPress} style={styles.button}>
            <Text style={styles.buttonText}>Off</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onLowPress} style={styles.button}>
            <Text style={styles.buttonText}>Low</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onHighPress} style={styles.button}>
            <Text style={styles.buttonText}>High</Text>
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
