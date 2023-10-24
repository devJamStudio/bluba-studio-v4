import React from "react";
import Sun from "../images/sun.svg";
import Moon from "../images/moon.svg";
import { useState, useEffect } from "react";
function getDefaultTheme() {
  if (typeof window !== "undefined") {
    const savedTheme = window.localStorage.getItem("theme");

    return savedTheme ? savedTheme : "light";
  }
}

export default function DarkMode() {
  const [isDark, setIsDark] = useState(getDefaultTheme());

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isDark === "dark") {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
      window.localStorage.setItem("theme", isDark);
    }
  }, [isDark]);

  return (
    <div className="global-toggle-switch">
      <button
        aria-label={"theme-toggle"}
        onClick={() => setIsDark(isDark === "dark" ? "light" : "dark")}
      >
        {isDark === "dark" ? (
          <img
            src={Sun}
            alt="sun img"
            className="dark:stroke-white stroke-black dark:fill-white"
          />
        ) : (
          <img
            src={Moon}
            className="dark:stroke-white stroke-black dark:fill-white"
            alt="moon img"
          />
        )}
      </button>
    </div>
  );
}
