import React, { useState, createContext } from "react";

const ControlContext = createContext();

export const ControlProvider = ({ children }) => {
  const [controlValue, setControlValue] = useState({
    pos1: null,
    pos2: null,
    pos3: null,
  });

  return (
    <ControlContext.Provider value={{ controlValue, setControlValue }}>
      {children}
    </ControlContext.Provider>
  );
};

export default ControlProvider;

export { ControlContext };
