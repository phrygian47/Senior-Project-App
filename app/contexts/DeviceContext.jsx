import React, { useState, createContext } from "react";

const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const [devices, setDevices] = useState([
    {
      id: 1,
      imageName: "water-heater.png",
      text: "Water Heater",
      visible: true,
    },
    {
      id: 2,
      imageName: "toilet.png",
      text: "Flusher",
      visible: false,
    },
  ]);

  return (
    <DeviceContext.Provider value={{ devices, setDevices }}>
      {children}
    </DeviceContext.Provider>
  );
};

export default DeviceProvider;

export { DeviceContext };
