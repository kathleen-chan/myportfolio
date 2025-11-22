import { useState, useEffect } from "react";
import DarkTheme from "./themes/darkTheme";
import LightTheme from "./themes/lightTheme";

export default function App() {
  const [darkTheme, setDarkTheme] = useState(true);

  useEffect(() => {
    // Remove existing theme CSS
    const existing = document.getElementById("theme-css");
    if (existing) existing.remove();

    // Add new theme CSS
    const link = document.createElement("link");
    link.id = "theme-css";
    link.rel = "stylesheet";
    link.href = darkTheme ? "./themes/dark.css" : "./themes/light.css"; 
    document.head.appendChild(link);
  }, [darkTheme]);

  return (
    <>
      {/* Theme toggle button */}
      <button
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 10000,
          padding: "10px 20px",
          borderRadius: "25px",
          border: "none",
          cursor: "pointer",
          backgroundColor: darkTheme ? "#fff" : "#222",
          color: darkTheme ? "#222" : "#fff",
          fontWeight: "bold",
        }}
        onClick={() => setDarkTheme((prev) => !prev)}
      >
        {darkTheme ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Render theme-specific layout */}
      {darkTheme ? <DarkTheme /> : <LightTheme />}
    </>
  );
}
