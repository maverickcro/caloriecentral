"use client";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "next-themes";

export default function ToggleMode() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex items-center justify-center rounded-md focus:outline-none"
    >
      {theme === "light" ? (
        <FaSun className="text-black text-xl" />
      ) : (
        <FaMoon className="text-white text-xl" />
      )}
    </button>
  );
}
