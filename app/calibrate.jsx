import * as React from "react";
import { View, Text, Button, StyleSheet, Pressable } from "react-native";
import { ControlContext } from "./contexts/ControlContext";
import { useMQTT } from "./contexts/MQTTContext";

export default function (CalibrateScreen) {
  const [complete, setComplete] = React.useState(false);
  const [currStep, setCurrStep] = React.useState(1);
  const [dialPosition, setDialPosition] = React.useState(0);
  const [isPositionConfirmed, setIsPositionConfirmed] = React.useState(false);
  const { controlValue, setControlValue } = React.useContext(ControlContext);
  const {
    isConnected,
    lastMessage,
    publish,
    subscribe,
    disconnect,
    subscribeToDialPosition,
    unsubscribe,
  } = useMQTT();

  React.useEffect(() => {
    subscribeToDialPosition("wh-control", dialPositionUpdateHandler);

    return () => {
      unsubscribe("wh-control");
    };
  }, []);

  React.useEffect(() => {
    console.log("Updated calibrated positions:", controlValue);
  }, [controlValue]);

  const dialPositionUpdateHandler = (position) => {
    setDialPosition(position);
    setIsPositionConfirmed(true);
  };

  const onConfirmHandler = () => {
    if (isPositionConfirmed) {
      setControlValue((prevPos) => ({
        ...prevPos,
        [`pos${currStep}`]: dialPosition,
      }));
      setIsPositionConfirmed(false);

      if (currStep < 3) {
        setCurrStep(currStep + 1);
      } else {
        console.log("Setup complete with positions: ", controlValue);
        setComplete(true);
      }
    } else {
      console.warn("Awating dial position confirmation...");
    }
  };

  const resetHandler = () => {
    setControlValue([
      {
        id: "off",
        value: null,
      },
      {
        id: "low",
        value: null,
      },
      {
        id: "high",
        value: null,
      },
    ]);
    setCurrStep(1);
    setComplete(false);
    setIsPositionConfirmed(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        {complete ? "Set Up Complete!" : "Setup Water Heater Controls"}
      </Text>
      <Text style={styles.instructionText}>
        {!complete && (
          <>
            Turn the physical dial to the
            {currStep === 1
              ? " Vacation "
              : currStep === 2
              ? " Low "
              : " High "}
            position.
          </>
        )}
      </Text>
      <View style={styles.progressContainer}>
        <View
          style={[styles.stepIndicator, currStep >= 1 && styles.activeStep]}
        />
        <View
          style={[styles.stepIndicator, currStep >= 2 && styles.activeStep]}
        />
        <View
          style={[styles.stepIndicator, currStep >= 3 && styles.activeStep]}
        />
      </View>
      <Pressable
        style={[
          styles.confirmButton,
          !isPositionConfirmed && styles.disabledButton,
        ]}
        onPress={onConfirmHandler}
        disabled={!isPositionConfirmed}
      >
        <Text style={styles.buttonText}>Confirm Position</Text>
      </Pressable>
      <Pressable style={styles.resetButton} onPress={resetHandler}>
        <Text style={styles.buttonText}>Reset Setup</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  instructionText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
    textAlign: "center",
  },
  positionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 20,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
    marginBottom: 30,
    width: "60%",
  },
  stepIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#ddd",
  },
  activeStep: {
    backgroundColor: "#4CAF50",
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#bbb",
  },
  resetButton: {
    backgroundColor: "#f44336",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
