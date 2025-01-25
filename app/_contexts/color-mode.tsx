"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { setCookie } from "cookies-next";

export enum ColorMode {
  LIGHT = "light",
  DARK = "dark",
}

interface ColorModeContextType {
  mode: ColorMode;
  setMode: (mode: ColorMode) => void;
}

const ColorModeContext = createContext<ColorModeContextType>({
  mode: ColorMode.DARK,
  setMode: () => {},
});

export const ColorModeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<ColorMode>(ColorMode.DARK);

  useEffect(() => {
    setMode(ColorMode.DARK);
  }, []);

  useEffect(() => {
    if (mode === ColorMode.DARK) {
      document.documentElement.classList.add("dark");
      setCookie("theme", ColorMode.DARK);
    } else {
      document.documentElement.classList.remove("dark");
      setCookie("theme", ColorMode.LIGHT);
    }
  }, [mode]);

  return (
    <ColorModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => useContext(ColorModeContext);
