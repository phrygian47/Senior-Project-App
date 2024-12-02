import * as React from "react";
import { Text, View, StyleSheet, Pressable, Image, Modal } from "react-native";
import FlatButton from "../components/FlatButton";
import IconButton from "../components/IconButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { DeviceContext } from "./contexts/DeviceContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function openHome({ route, navigation }) {
  const imageMap = {
    "water-heater.png": require("../assets/images/water-heater.png"),
    "toilet.png": require("../assets/images/toilet.png"),
    // Add other images as necessary
  };
  const { devices, setDevices } = React.useContext(DeviceContext);
  const [modalVisible, setModalVisible] = React.useState(false);
  const router = useRouter();
  const onAddDeviceHandler = (id) => {
    const nextDevices = devices.map((device) => {
      if (device.visible === true || device.id != id) {
        return device;
      } else {
        return {
          ...device,
          visible: true,
        };
      }
    });

    setDevices(nextDevices);
    setModalVisible(!modalVisible);
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
        <View style={styles.header}>
          <Text style={styles.headerText}>My Devices</Text>
        </View>
        <View style={styles.deviceList}>
          {devices.map((device) => {
            const imageSource = imageMap[device.imageName]; // Use the image map to look up the image source
            return (
              <View key={device.id}>
                {device.visible ? (
                  <IconButton
                    imageStyle={{ height: 100, width: 100 }}
                    source={imageSource} // Use the mapped image source
                    onPress={() => router.push("/calibrate")}
                  />
                ) : null}
              </View>
            );
          })}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("window closed");
            setModalVisible(!modalVisible);
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#00000080",
            }}
          >
            <Text
              style={[styles.headerText, { color: "white", marginBottom: 40 }]}
            >
              Add New Device
            </Text>
            <View style={[styles.deviceList, { marginVertical: 0 }]}>
              {devices.map((device) => {
                const imageSource = imageMap[device.imageName]; // Use the image map to look up the image source
                return (
                  <View key={device.id}>
                    <IconButton
                      imageStyle={styles.image}
                      source={imageSource} // Use the mapped image source
                      onPress={() => onAddDeviceHandler(device.id)}
                    />
                  </View>
                );
              })}
            </View>
          </View>
        </Modal>
        <View style={styles.button}>
          <FlatButton
            text="Add Device"
            onPressFunction={() => setModalVisible(!modalVisible)}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  header: {
    marginTop: 80,
    justifyContent: "flex-start",
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingLeft: 20,
    maxWidth: 300,
  },
  headerText: {
    fontSize: 30,
  },
  deviceList: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  image: {
    height: 100,
    width: 100,
    marginLeft: 10,
  },
  button: {
    alignItems: "center",
  },
});
