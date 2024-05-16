"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ToggleMode from "./ToggleMode";

export default function Navbar() {
  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShrink(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`px-6 fixed top-0 left-0 right-0 drop-shadow-md z-10 transition-all duration-300 ease-in-out ${
        shrink
          ? "bg-gray-100 dark:bg-slate-900 h-12 md:h-16"
          : "bg-gray-100 dark:bg-slate-900 py-2 md:py-7 h-20 md:h-24"
      }`}
    >
      <div className="position prose max-w-4xl prose-xl mx-auto flex justify-between items-center flex-row h-[100%]">
        <div className="flex flex-row justify-center items-center gap-4 text-base flex-grow">
          <p className="text-2xl font-bold grid mb-0 m-auto">
            <Link
              href="/"
              className="logo-animation font-bold text-gradient no-underline"
            >
              CCentral
            </Link>
          </p>
        </div>
        <div className="flex flex-row justify-end items-center sm:justify-evenly sm:items-center gap-4 text-base">
          <ToggleMode />
        </div>
      </div>
    </nav>
  );
}
