import React, { createContext, useState, useContext, ReactNode } from 'react';
import { AppContextType } from '../types';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [isConversationMode, setIsConversationMode] = useState(false);

  const setConversationMode = (isActive: boolean) => {
    setIsConversationMode(isActive);
  };

  return (
    <AppContext.Provider value={{ isConversationMode, setConversationMode }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};