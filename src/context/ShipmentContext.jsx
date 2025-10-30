// Create a new context file: context/SelectedShipmentContext.js
import React, { createContext, useContext, useState } from 'react';

const ShipmentContext = createContext();

export const useSelectedShipment = () => {
  return useContext(ShipmentContext);
};

export const SelectedShipmentProvider = ({ children }) => {
  const [selectedShipmentId, setSelectedShipmentId] = useState('');

  return (
    <ShipmentContext.Provider value={{ selectedShipmentId, setSelectedShipmentId }}>
      {children}
    </ShipmentContext.Provider>
  );
};