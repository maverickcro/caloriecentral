"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ToggleMode() {
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const hours = new Date().getHours();
    const newTheme = hours > 7 && hours < 20 ? "light" : "dark";
    setTheme(newTheme);
  }, [setTheme]);

  // Ensure correct theme is set on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  console.log(theme);
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
