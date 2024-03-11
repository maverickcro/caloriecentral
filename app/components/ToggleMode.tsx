"use client";
import { useEffect } from "react";
import { useTheme } from "next-themes";

export default function ToggleMode() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const hours = new Date().getHours();
    const newTheme = hours > 7 && hours < 20 ? "light" : "dark";
    setTheme(newTheme);
  }, [setTheme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div className="toggle-container">
      <input
        id="toggle"
        className="toggle"
        type="checkbox"
        onChange={toggleTheme}
        checked={theme === "dark"}
        // aria-label for accessibility
        aria-label="Toggle dark mode"
      />
    </div>
  );
}
