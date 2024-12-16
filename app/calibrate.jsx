import * as React from "react";
import { View, Text, Button, StyleSheet, Pressable } from "react-native";
import { ControlContext } from "./contexts/ControlContext";
import { useMQTT } from "./contexts/MQTTContext";
import  MultiSlider from "@ptomasroos/react-native-multi-slider";


export default function CalibrateScreen() {
  const [complete, setComplete] = React.useState(false);
  const [currStep, setCurrStep] = React.useState(1);
  const [start, setStart] = React.useState(false);
  const [sliderValue, setSliderValue] = React.useState([0]);
  const {
    isConnected,
    lastMessage,
    publish,
    subscribe,
    disconnect,
    subscribeToDialPosition,
    unsubscribe,
  } = useMQTT();

  const onValuesChange = (values) => {
    setSliderValue(values);
    console.log('Current value:', values[0]/100);
    publish("/calibration-move", (values[0]).toString());
  };
  
  const handleReset = () => {
    publish("/command", "reset");
    setCurrStep(1);
    setComplete(false);
    setStart(false);
  }

  React.useEffect(() => {
    publish("/command", "start-calibration");
  }, []);

  return (
    <View style={styles.container}>
      {start && !complete && (<MultiSlider
        values={[sliderValue[0]]}
        onValuesChangeFinish={onValuesChange}
        min={0}
        max={100}
        step={1}
        enabledOne
        sliderLength={250}
      />)}
      <Text style={styles.headerText}>
        {complete ? "Set Up Complete!" : "Setup Water Heater Controls"}
      </Text>
      {start && (      <Text style={styles.instructionText}>
        {!complete && (
          <>
            Move the slider until the physical dial is on the
            {currStep === 1
              ? " Vacation "
              : currStep === 2
              ? " Low "
              : currStep === 3
              ? " High "
              : " Very High "}
            position.
          </>
        )}
      </Text>)}
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
                <View
          style={[styles.stepIndicator, currStep >= 4 && styles.activeStep]}
        />
      </View>
      <Pressable
        style={[styles.confirmButton, complete && styles.disabledButton]}
        onPress={() => {
          if(start === false){
            setStart(true);
          }else{
            publish("/command", "confirm");
            setCurrStep(currStep + 1);
            if (currStep >= 4){
              setComplete(true);
            } 
          }
        }
      }
      >
        <Text style={styles.buttonText}>{start === false ? "Start Calibration" : "Confirm Position"}</Text>
      </Pressable>
      <Pressable style={[styles.resetButton, !start && styles.disabledButton]} onPress={handleReset}>
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
