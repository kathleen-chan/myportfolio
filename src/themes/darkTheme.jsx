import "./dark.css";
import cursor from "../assets/cursor.png";
import { useState, useEffect, useRef } from "react";

export default function DarkTheme() {
  const [showSecret, setShowSecret] = useState(false);
  const glowRef = useRef(null);
  const headerRef = useRef(null);
  const portfRef = useRef(null);
  const cutLineRef = useRef(null);
  const kathleenRef = useRef(null);
  const chanRef = useRef(null);
  const titleRowRef = useRef(null);
  const navNameRef = useRef(null);

  /* Cursor Effect */
  useEffect(() => {
    const handleMove = (e) => {
      const star = document.createElement("img");
      star.src = cursor;
      star.className = "cursor";
      star.style.left = e.clientX + "px";
      star.style.top = e.clientY + "px";
      star.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
      document.body.appendChild(star);
      setTimeout(() => star.remove(), 600);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    const portf = portfRef.current;
    const cutLine = cutLineRef.current;

    let progress = 0;
    let stretchDone = false;
    let rotationDone = false;
    let animationDone = false;

    const handleWheel = (e) => {
      if (animationDone) return;

      e.preventDefault();
      e.stopPropagation();

      progress += e.deltaY * 0.002;
      progress = Math.max(0, Math.min(progress, 1));

      const fBox = portf.getBoundingClientRect();
      const centerX = fBox.left + fBox.width * 0.93;
      const centerY = fBox.top + fBox.height * 0.46;

      const italicAngle = 32;
      const finalAngle = 115;
      const maxLength = window.innerHeight * 1.4;
      const length = Math.min(maxLength, progress * maxLength);

      // --- Phase 1: Stretch ---
      if (!stretchDone) {
        cutLine.style.top = centerY + "px";
        cutLine.style.left = centerX + "px";
        cutLine.style.opacity = 1;
        cutLine.style.height = `${maxLength}px`;
        cutLine.style.transform = `translate(-50%, -50%) rotate(${italicAngle}deg) scaleY(${length / maxLength})`;

        if (length >= maxLength) {
          stretchDone = true;
          progress = 0;
        }
        return;
      }

      // --- Phase 2: Rotate ---
      if (stretchDone && !rotationDone) {
        const rotateProgress = progress;
        const rotation = italicAngle + (finalAngle - italicAngle) * rotateProgress;
        cutLine.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scaleY(1)`;

        if (rotateProgress >= 1) {
          rotationDone = true;
          progress = 0;
        }
        return;
      }

      // --- Phase 3: Arrow shoot (pull back then launch forward) ---
      if (rotationDone) {
        animationDone = true;

        const pullBackDistance = 80;
        const shootForwardDistance = window.innerHeight * 1.5;
        const pullBackDuration = 300;
        const shootDuration = 400;

        let startTime = performance.now();

        // Phase 3a: Pull back (toward bottom-right)
        function animatePullBack(time) {
          const t = Math.min((time - startTime) / pullBackDuration, 1);
          const easeOut = 1 - Math.pow(1 - t, 2);

          const offsetX = pullBackDistance * easeOut;
          const offsetY = pullBackDistance * 0.5 * easeOut;

          cutLine.style.transform = `
            translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))
            rotate(${finalAngle}deg)
            scaleY(1)
          `;

          if (t < 1) {
            requestAnimationFrame(animatePullBack);
          } else {
            startTime = performance.now();
            requestAnimationFrame(animateShootForward);
          }
        }

        // Phase 3b: Shoot forward (toward top-left / navbar)
        function animateShootForward(time) {
          const t = Math.min((time - startTime) / shootDuration, 1);
          const easeIn = t * t * t;

          const startX = pullBackDistance;
          const startY = pullBackDistance * 0.5;
          const offsetX = startX - (startX + shootForwardDistance) * easeIn;
          const offsetY = startY - (startY + shootForwardDistance * 0.5) * easeIn;

          cutLine.style.transform = `
            translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))
            rotate(${finalAngle}deg)
            scaleY(1)
          `;

          if (t < 1) {
            requestAnimationFrame(animateShootForward);
          } else {
            // Animation complete - hide line and trigger text animations
            cutLine.style.opacity = 0;

            // Fade out "Portfolio" text
            const titleRow = titleRowRef.current;
            titleRow.style.transition = "opacity 0.1s ease-out";
            //titleRow.style.opacity = 0;

            // Get elements
            const kathleen = kathleenRef.current;
            const chan = chanRef.current;
            const navName = navNameRef.current;

            // Get positions
            const navNameRect = navName.getBoundingClientRect();
            const kathleenRect = kathleen.getBoundingClientRect();
            const chanRect = chan.getBoundingClientRect();

            // Scale factor (18px target / 30px current)
            const scaleFactor = 18 / 30;

            // Target position: where "Kathleen" should end up (left side of nav-name)
            const targetX = navNameRect.left;
            const targetY = navNameRect.top + navNameRect.height / 2;

            // Kathleen: move to target, accounting for scale shrinking from center
            const kathleenCenterX = kathleenRect.left + kathleenRect.width / 2;
            const kathleenCenterY = kathleenRect.top + kathleenRect.height / 2;
            const kathleenFinalWidth = kathleenRect.width * scaleFactor;
            const kathleenTargetCenterX = targetX + kathleenFinalWidth / 2;
            const kathleenDeltaX = kathleenTargetCenterX - kathleenCenterX;
            const kathleenDeltaY = targetY - kathleenCenterY;

            // Chan: move to target, positioned right after Kathleen
            const chanCenterX = chanRect.left + chanRect.width / 2;
            const chanCenterY = chanRect.top + chanRect.height / 2;
            const chanFinalWidth = chanRect.width * scaleFactor;
            const chanTargetCenterX = targetX + kathleenFinalWidth + 5 + chanFinalWidth / 2;
            const chanDeltaX = chanTargetCenterX - chanCenterX;
            const chanDeltaY = targetY - chanCenterY;

            // Animate Kathleen
            kathleen.style.transition = "transform 0.2s ease-out";
            kathleen.style.transform = `translate(${kathleenDeltaX}px, ${kathleenDeltaY}px) scale(${scaleFactor})`;

            // Animate Chan
            chan.style.transition = "transform 0.2s ease-out";
            chan.style.transform = `translate(${chanDeltaX}px, ${chanDeltaY}px) scale(${scaleFactor})`;

            // After animation, show navbar name and hide originals
            setTimeout(() => {
              navName.style.opacity = 1;
              kathleen.style.opacity = 0;
              chan.style.opacity = 0;
              document.body.classList.remove("lock-scroll");
          });
          }
        }

        requestAnimationFrame(animatePullBack);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  useEffect(() => {
    document.body.classList.add("lock-scroll");
    return () => document.body.classList.remove("lock-scroll");
  }, []);

  return (
    <div className="dark-app-container">
      <header className="dark-header" ref={headerRef}>
        <div className="header-glow" ref={glowRef}></div>
        <div className="oblique kathleen" ref={kathleenRef}>Kathleen</div>
        <div className="title-row" ref={titleRowRef}>
          <span className="pinyon-script-regular portf" ref={portfRef}>Portf</span>
          <span className="brogetta olio">Olio</span>
        </div>
        <div className="cut-line" ref={cutLineRef}></div>
        <div className="oblique chan" ref={chanRef}>Chan</div>
      </header>

      <nav className="glass-navbar">
        <div className="nav-name oblique" ref={navNameRef}>Kathleen Chan</div>
        <ul className="nav-links">
          <li><a href="#about">about</a></li>
          <li><a href="#projects">projects</a></li>
          <li><a href="#contact">contact</a></li>
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