import { createContext, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  //   const [mode, setMode] = useState("light-mode");
  const { value: mode, setValue: setMode } = useLocalStorage(
    "app-mode",
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark-mode"
      : "light-mode"
  );

  useEffect(
    function () {
      if (mode === "light-mode") {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      } else if (mode === "dark-mode") {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      }
    },
    [mode]
  );

  function toggleTheme() {
    if (!mode || mode === "light-mode") {
      setMode("dark-mode");
    } else if (mode === "dark-mode") {
      setMode("light-mode");
    }
  }
  return (
    <ThemeContext.Provider value={{ mode, setMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("Theme Context used outside the provider");
  }
  return context;
}
