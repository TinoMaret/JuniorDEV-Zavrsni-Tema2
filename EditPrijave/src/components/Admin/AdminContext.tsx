import React, { createContext, useContext, useState } from 'react';

interface CheckboxContextType {
  checked: boolean;
  handleCheckboxChange: () => void;
}

const CheckboxContext = createContext<CheckboxContextType | undefined>(undefined);

export const AdminContext = () => {
  const context = useContext(CheckboxContext);
  if (!context) {
    throw new Error('useCheckboxContext must be used within a CheckboxProvider');
  }
  return context;
};

export const AdminProvider:React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked((prevChecked) => !prevChecked); // Toggle the value of checked
  };

  // Provide the context value
  const contextValue: CheckboxContextType = {
    checked,
    handleCheckboxChange
  };

  return (
    <CheckboxContext.Provider value={contextValue}>
        {children}
    </CheckboxContext.Provider>
  );
};