import { Stack } from "expo-router";
import { DeviceProvider } from "./contexts/DeviceContext";
import { ControlProvider } from "./contexts/ControlContext";
import { MQTTProvider } from "./contexts/MQTTContext";

export default function RootLayout() {
  return (
    <MQTTProvider>
      <DeviceProvider>
        <ControlProvider>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                title: "App Name",
                headerShown: true,
                headerTransparent: true,
                headerTitleStyle: {
                  fontWeight: "bold",
                  fontSize: 20,
                },
              }}
            />
            <Stack.Screen
              name="open-home"
              options={{
                animation: "fade",
                headerTransparent: true,
                headerShown: true,
                headerTitle: "My Home",
                headerBackButtonDisplayMode: "minimal",
              }}
            />
            <Stack.Screen name="connect" />
            <Stack.Screen
              name="calibrate"
              options={{
                headerTitle: "Water Heater Set Up",
              }}
            />
            <Stack.Screen
              name="(tabs)"
              options={{
                headerTransparent: true,
                headerShown: true,
                headerTitle: "Water Heater Control",
                headerTintColor: "black",
                headerBackButtonDisplayMode: "minimal",
                headerTitleStyle: {
                  color: "#000",
                },
                animation: "fade",
              }}
            />
          </Stack>
        </ControlProvider>
      </DeviceProvider>
    </MQTTProvider>
  );
}
