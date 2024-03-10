"use client";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      return storedTheme
        ? storedTheme === "dark"
        : window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  const toggleTheme = () => setDarkMode(!darkMode);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);
  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white dark:focus:ring-offset-gray-50 dark:focus:ring-gray-600"
    >
      {darkMode ? (
        <FaSun className="text-black text-xl" />
      ) : (
        <FaMoon className="text-yellow text-xl" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
