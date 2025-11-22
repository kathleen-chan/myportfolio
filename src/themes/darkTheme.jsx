import "./dark.css";
import cursor from "../assets/cursor.png";
import { useState, useEffect, useRef } from "react";

export default function DarkTheme() {
  const [showSecret, setShowSecret] = useState(false);
  const glowRef = useRef(null);
  const starRef = useRef(null);
  const headerRef = useRef(null);

  /* Cursor Effect */
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

  return (
    <div className="dark-app-container">
      <header className="dark-header" ref={headerRef}>
        <div className="oblique kathleen">Kathleen</div>
        <div className="brogetta portfolio">portfOlio</div>
        <div className="oblique chan">Chan</div>
      </header>

      <nav className="glass-navbar">
        <ul className="nav-links">
          <li>
            <a href="#about">about</a>
          </li>
          <li>
            <a href="#projects">projects</a>
          </li>
          <li>
            <a href="#contact">contact</a>
          </li>
        </ul>
      </nav>

      <main className="dark-main">
        <section className="dark-about" id="about">
          <h2>About Me</h2>
          <p>Completely different dark theme layout.</p>
          <button onClick={() => setShowSecret((prev) => !prev)}>
            Reveal Secret
          </button>
          {showSecret && <p>This is a secret dark section!</p>}
        </section>

        <section className="dark-projects" id="projects">
          <h2>Projects</h2>
          <div className="dark-grid">
            <div className="dark-card">Project A</div>
            <div className="dark-card">Project B</div>
            <div className="dark-card">Project C</div>
          </div>
        </section>
      </main>

      <footer className="dark-footer">
        <p>Contact me: darkmode@example.com</p>
      </footer>
    </div>
  );
}
