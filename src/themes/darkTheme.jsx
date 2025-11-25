import "./dark.css";

import umi from "../assets/u-mi.jpg";
import brainrot from "../assets/brainrot!...ish.png";
import oubaitori from "../assets/oubaitori.jpg";

import cursor from "../assets/cursor.png";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
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
  const aboutRef1 = useRef(null);
  const aboutRef2 = useRef(null);
  const aboutRef3 = useRef(null);
  const imaginationRef = useRef(null);
  const meetsRef = useRef(null);
  const techRef = useRef(null);
  const projectsRef = useRef(null);
  const projectCardsRef = useRef([]);
  const diamondRef = useRef(null);

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
        cutLine.style.transform = `translate(-50%, -50%) rotate(${italicAngle}deg) scaleY(${
          length / maxLength
        })`;

        if (length >= maxLength) {
          stretchDone = true;
          progress = 0;
        }
        return;
      }

      // --- Phase 2: Rotate ---
      if (stretchDone && !rotationDone) {
        const rotateProgress = progress;
        const rotation =
          italicAngle + (finalAngle - italicAngle) * rotateProgress;
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
          const offsetY =
            startY - (startY + shootForwardDistance * 0.5) * easeIn;

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
            const chanTargetCenterX =
              targetX + kathleenFinalWidth + 5 + chanFinalWidth / 2;
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.5 }
    );

    [aboutRef1, aboutRef2, aboutRef3].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.5 }
    );

    [aboutRef1, aboutRef2, aboutRef3].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.5 }
    );

    [aboutRef1, aboutRef2, aboutRef3].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll animation for "imagination" moving towards "technical craft"
  useEffect(() => {
    let animationEnabled = false;
    let scrollLocked = false;
    let accumulatedScroll = 0;
    let cursorShown = false;

    const checkIfCentered = () => {
      const imagination = imaginationRef.current;
      if (!imagination) return;

      const imaginationRect = imagination.getBoundingClientRect();
      const elementCenter = imaginationRect.top + imaginationRect.height / 2;
      const viewportCenter = window.innerHeight / 2;

      if (Math.abs(elementCenter - viewportCenter) <= 60) {
        animationEnabled = true;
        scrollLocked = true;
        document.body.classList.add("lock-scroll");
      }
    };

    const handleWheel = (e) => {
      if (!scrollLocked) return;

      e.preventDefault();
      e.stopPropagation();

      const imagination = imaginationRef.current;
      const tech = techRef.current;
      const diamond = diamondRef.current;

      if (!imagination || !tech || !diamond) return;

      // Accumulate scroll
      accumulatedScroll += e.deltaY;

      const imaginationRect = imagination.getBoundingClientRect();
      const techRect = tech.getBoundingClientRect();

      // Calculate initial positions (store on first run)
      if (!imagination.dataset.initialTop) {
        imagination.dataset.initialTop = imaginationRect.top + window.scrollY;
      }

      const initialTop = parseFloat(imagination.dataset.initialTop);
      const targetTop = techRect.top + window.scrollY;

      // Calculate the distance to travel
      const travelDistance = targetTop - initialTop;

      // Calculate progress based on accumulated scroll
      const scrollNeeded = 1000; // Total scroll amount needed to complete animation
      let progress = accumulatedScroll / scrollNeeded;
      progress = Math.max(0, Math.min(1, progress));

      // Calculate current vertical position of imagination element
      const translateY = travelDistance * progress;

      // Update imagination position
      imagination.style.transform = `translateY(${translateY}px)`;
      imagination.style.position = "relative";

      // Position the cursor image just below the "imagination" element
      const cursorPositionY = imaginationRect.bottom + window.scrollY;
      if (progress >= 1 && !cursorShown && diamond) {
        cursorShown = true;
        diamond.style.opacity = "1"; // Fade in
        diamond.style.position = "absolute"; // Position it absolutely
        diamond.style.top = `${cursorPositionY}px`; // Position it right below imagination
        diamond.style.left = `49%`;
        diamond.style.transition = "transform 1s ease-out"; // Apply transition for smooth movement
      }

      // Animate the cursor image's downward movement
      if (progress >= 1) {
        // Animate the cursor image's downward "shoot" effect
        diamond.style.transform = `translateY(1000px)`; // Adjust the "100px" to control the speed of the shoot down
      }

      // When animation is complete, unlock scroll
      if (progress >= 1) {
        scrollLocked = false;
        document.body.classList.remove("lock-scroll");
      }
    };

    const handleScroll = () => {
      if (scrollLocked) return;

      if (!animationEnabled) {
        checkIfCentered();
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", handleWheel, { passive: false });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      document.body.classList.remove("lock-scroll");
    };
  }, []);

  // Projects
  useEffect(() => {
    const cards = document.querySelectorAll(".dark-card");
    const rotations = [-5, 0, 5];
    const handleScrollAnimation = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Only animate if the card is not already animated
              if (!entry.target.classList.contains("animated")) {
                entry.target.classList.add("animated"); // Mark as animated

                const rotation =
                  rotations[Math.floor(Math.random() * rotations.length)];

                gsap.to(entry.target, {
                  y: 0,
                  opacity: 1,
                  rotation: rotation,
                  duration: 1,
                  ease: "power3.out",
                });
              }
            } else {
              // When the card goes out of view, remove the animated class to trigger the animation again when in view
              entry.target.classList.remove("animated");
            }
          });
        },
        { threshold: 0.2 }
      ); // Set the threshold to trigger when 30% of the card is visible

      // Observe all cards
      cards.forEach((card) => observer.observe(card));

      return () => {
        // Cleanup observer when the component unmounts
        observer.disconnect();
      };
    };
    handleScrollAnimation();
  }, []);

  return (
    <div className="dark-app-container">
      <header className="dark-header" ref={headerRef}>
        <div className="header-glow" ref={glowRef}></div>
        <div className="oblique kathleen" ref={kathleenRef}>
          Kathleen
        </div>
        <div className="title-row" ref={titleRowRef}>
          <span className="pinyon-script-regular portf" ref={portfRef}>
            Portf
          </span>
          <span className="brogetta olio">Olio</span>
        </div>
        <div className="cut-line" ref={cutLineRef}></div>
        <div className="oblique chan" ref={chanRef}>
          Chan
        </div>
      </header>

      <nav className="glass-navbar">
        <div className="nav-name oblique" ref={navNameRef}>
          Kathleen Chan
        </div>
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
        <section className="dark-about montserrat center">
          <h2 ref={aboutRef1} className="aboutMe float-up text-scramble">
            A designer, explorer, and creator moving between the constellations
            of UX/UI, web, game, graphic, and product design.
          </h2>
          <h2
            ref={aboutRef2}
            className="aboutMe-kat pinyon-script-regular float-up"
          >
            Kathleen.
          </h2>
          <p ref={aboutRef3} className="aboutMe-kat2 pixel float-up">
            I am passionate about creating meaningful digital experiences where
          </p>
          <p ref={imaginationRef} className="imagination pinyon-script-regular">
            imagination
          </p>
          <p ref={meetsRef} className="meets pixel">
            meets
          </p>
          <p ref={techRef} className="tech brogetta">
            technical craft.
          </p>
          <img src={cursor} ref={diamondRef} className="diamond" alt="Cursor" />

          {/*
          <button onClick={() => setShowSecret((prev) => !prev)}>
            Reveal Secret
          </button>
          {showSecret && <p>This is a secret dark section!</p>}
           */}
        </section>

        <section className="dark-projects" ref={projectsRef}>
          <div className="projects">
            <h2 className="pro brogetta">Pro</h2>
            <h2 className="jects pinyon-script-regular">jects</h2>
          </div>
          <div className="dark-grid">
            <div className="dark-card">
              <div className="project-image">
                <img src={umi} />
              </div>
              <h3 className="project-title pixel">U-mi</h3>
              <p></p>
            </div>

            <div className="dark-card">
              <div className="project-image">
                <img src={oubaitori} />
              </div>
              <h3 className="project-title pixel">Oubaitori</h3>
              <p></p>
            </div>

            <div className="dark-card">
              <div className="project-image">
                <img src={brainrot} />
              </div>
              <h3 className="project-title pixel">Brainrot!..ish</h3>
              <p className="desc pixel">
                Design and integration of interactive multiplayer minigames.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="dark-footer">
        <p>Contact me: darkmode@example.com</p>
      </footer>
    </div>
  );
}
