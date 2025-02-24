import React, { createContext, useContext, useState } from "react";
import { SiaAssistant } from "../components/SiaAssistant";
import { useTheme } from "./ThemeContext";

interface SiaContextType {
  showSia: () => void;
  hideSia: () => void;
  isVisible: boolean;
}

const SiaContext = createContext<SiaContextType | undefined>(undefined);

export function SiaProvider({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const { isDarkMode } = useTheme();

  const showSia = () => setIsVisible(true);
  const hideSia = () => setIsVisible(false);

  return (
    <SiaContext.Provider value={{ showSia, hideSia, isVisible }}>
      {children}
      <SiaAssistant
        isVisible={isVisible}
        onClose={hideSia}
        isDarkMode={isDarkMode}
      />
    </SiaContext.Provider>
  );
}

export function useSia() {
  const context = useContext(SiaContext);
  if (context === undefined) {
    throw new Error("useSia must be used within a SiaProvider");
  }
  return context;
}
