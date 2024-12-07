import React from "react";
import { View, Text, StyleSheet, Platform, StatusBar } from "react-native";

interface BatteryIndicatorProps {
  batteryLevel: number; // Battery level from 0 to 100
}

const BatteryIndicator: React.FC<BatteryIndicatorProps> = ({
  batteryLevel,
}) => {
  // Determine the color based on battery level
  const getBatteryColor = (level: number): string => {
    if (level <= 20) return "#FF453A"; // Red for low battery
    if (level <= 40) return "#FF9F0A"; // Orange for medium-low
    return "#32D74B"; // Green for good level
  };

  // Ensure battery level stays within bounds
  const normalizedLevel = Math.min(Math.max(batteryLevel, 0), 100);

  return (
    <View style={styles.container}>
      {/* Battery Icon */}
      <View style={styles.batteryContainer}>
        {/* Battery body */}
        <View style={styles.batteryBody}>
          {/* Battery level fill */}
          <View
            style={[
              styles.batteryFill,
              {
                width: `${normalizedLevel}%`,
                backgroundColor: getBatteryColor(normalizedLevel),
              },
            ]}
          />
        </View>
        {/* Battery tip */}
        <View style={styles.batteryTip} />
      </View>

      {/* Battery percentage */}
      <Text style={styles.percentage}>{normalizedLevel}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 1,
    // Account for status bar height on different platforms
    paddingTop: Platform.OS === "ios" ? StatusBar.currentHeight || 44 : 0,
    backgroundColor: "transparent",
    position: "absolute",
    top: 10,
    right: 5,
  },
  batteryContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  batteryBody: {
    width: 50,
    height: 24,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#ffffff",
    padding: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  batteryFill: {
    height: "100%",
    borderRadius: 1,
  },
  batteryTip: {
    width: 2,
    height: 4,
    backgroundColor: "#ffffff",
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  chargingContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  chargingIcon: {
    fontSize: 8,
    color: "#ffffff",
  },
  percentage: {
    marginLeft: 6,
    fontSize: 12,
    color: "#ffffff",
    fontWeight: "600",
  },
});

export default BatteryIndicator;
