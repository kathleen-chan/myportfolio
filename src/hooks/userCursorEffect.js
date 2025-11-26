import { useEffect } from "react";
import cursor from "../assets/cursor.png";

export function useCursorEffect() {
  useEffect(() => {
    let isBubbleActive = false;

    const handleMove = (e) => {
      // Don't create star cursor if bubble is active
      if (isBubbleActive) return;

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

    // Track bubble cursor state
    const checkBubbles = () => {
      const projectBubble = document.getElementById("cursor-bubble");
      
      isBubbleActive = 
        (projectBubble && projectBubble.classList.contains("active"))
    };

    const observer = new MutationObserver(checkBubbles);

    // Observe both bubble cursors
    const projectBubble = document.getElementById("cursor-bubble");
    
    if (projectBubble) {
      observer.observe(projectBubble, { 
        attributes: true, 
        attributeFilter: ["class"] 
      });
    }
    
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      observer.disconnect();
    };
  }, []);
}