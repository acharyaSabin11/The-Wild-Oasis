import { HiMiniMoon, HiMiniSun } from "react-icons/hi2";
import Button from "./Button";
import { useThemeContext } from "../contexts/ThemeContext";

function ToggleDarkMode() {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <Button type="icon" size="icon" onClick={toggleTheme}>
      {mode === "dark-mode" ? <HiMiniSun /> : <HiMiniMoon />}
    </Button>
  );
}

export default ToggleDarkMode;
