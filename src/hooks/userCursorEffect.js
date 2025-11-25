import { useEffect } from "react";
import cursor from "../assets/cursor.png";

export function useCursorEffect() {
  useEffect(() => {
    const handleMove = (e) => {
      const star = document.createElement("img");
      star.src = cursor;
      star.className = "cursor";
      star.style.left = e.clientX + "px";
      star.style.top = e.clientY + "px";
      star.style.transform = `translate(-50%, -50%) rotate(${
        Math.random() * 360
      }deg)`;
      document.body.appendChild(star);
      setTimeout(() => star.remove(), 600);
    };
    
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);
}