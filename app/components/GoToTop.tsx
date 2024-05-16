import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function GoToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 p-3 rounded-full shadow-lg z-50"
          style={{ background: "linear-gradient(90deg, #4ca5ff, #b573f8)" }}
          aria-label="Go to top"
        >
          <FaArrowUp className="text-white text-2xl" />
        </button>
      )}
    </>
  );
}
