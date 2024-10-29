import React, { createContext, useContext, useState } from 'react';

interface TemperatureContextType {
  unit: 'C' | 'F';
  setUnit: (unit: 'C' | 'F') => void;
}

const TemperatureContext = createContext<TemperatureContextType | undefined>(
  undefined
);

export const TemperatureProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  return (
    <TemperatureContext.Provider value={{ unit, setUnit }}>
      {children}
    </TemperatureContext.Provider>
  );
};

export const useTemperature = () => {
  const context = useContext(TemperatureContext);
  if (!context) {
    throw new Error('useTemperature must be used within a TemperatureProvider');
  }
  return context;
};
