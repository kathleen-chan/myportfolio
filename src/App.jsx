import starGif from "./assets/star.gif";
import meGif from "./assets/me.gif";
import meirl2 from "./assets/meirl2.jpg";
import meDrawn from "./assets/meDrawn.jpg";
import arrow from "./assets/arrow.gif";
import brainrot from "./assets/brainrot!...ish.png";
import oubaitori from "./assets/oubaitori.png";
import umi from "./assets/u-mi.png";
import arch1 from "./assets/arch1.png";
import arch2 from "./assets/arch2.png";
import arch3 from "./assets/arch3.png";

import { useState, useEffect, useRef } from "react";
import ScratchReveal from "./ScratchReveal";

function App() {
  /* Cursor stars */
  useEffect(() => {
    const handleMove = (e) => {
      const star = document.createElement("img");
      star.src = starGif;
      star.className = "cursor-star";

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

  /* Speech bubble */
  const [showBubble, setShowBubble] = useState(false);
  const handleGifClick = () => {
    setShowBubble(true);
    setTimeout(() => setShowBubble(false), 2500);
  };

  /* Projects CS*/
  const [showCS, setShowCS] = useState(false);
  const containerRef = useRef(null);

  const projects = [
    { name: "Brainrot", image: brainrot },
    { name: "Oubaitori", image: oubaitori },
    { name: "Umi", image: umi },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (showCS) {
      container.style.maxHeight = `${container.scrollHeight}px`;
    } else {
      container.style.maxHeight = `${container.scrollHeight}px`;
      requestAnimationFrame(() => {
        container.style.maxHeight = "0px";
      });
    }
  }, [showCS]);

  /* Projects Archi */
  const [showArch, setShowArch] = useState(false);
  const archRef = useRef(null);

  const architectureProjects = [
    { name: "Arch Project 1", image: arch1 },
    { name: "Arch Project 2", image: arch2 },
    { name: "Arch Project 3", image: arch3 },
  ];

  useEffect(() => {
    const box = archRef.current;
    if (!box) return;

    if (showArch) {
      box.style.maxHeight = `${box.scrollHeight}px`;
    } else {
      box.style.maxHeight = `${box.scrollHeight}px`;
      requestAnimationFrame(() => {
        box.style.maxHeight = "0px";
      });
    }
  }, [showArch]);

  /* Makes picures larger in projects */
  const [lightboxImage, setLightboxImage] = useState(null);
  const openLightbox = (img) => setLightboxImage(img);
  const closeLightbox = () => setLightboxImage(null);

  return (
    <div className="app-container">
      <img
        src={meGif}
        className="me-gif"
        onClick={handleGifClick}
        style={{ cursor: "pointer" }}
      />
      {/* Speech Bubble */}
      {showBubble && (
        <div className="speech-bubble">
          {" "}
          hello~! 🌸 <br /> ໒꒰@` ˘ `@ ꒱ა
        </div>
      )}
      <div className="grid-background"></div>

      {/* Navbar */}
      <nav className="navbar-buttons outfit">
        <a href="#home" className="nav-button">
          HOME
        </a>
        <a href="#about" className="nav-button">
          ABOUT ME
        </a>
        <a href="#projects" className="nav-button">
          PROJECTS
        </a>
      </nav>

      {/* Home */}
      <header className="hachi-maru-pop-regular">
        <section className="bubble-section">
          <div className="bubble-background"></div>

          {/* Stars */}
          <img
            src={starGif}
            className="star-img"
            style={{ top: "10%", left: "10%", transform: "rotate(-10deg)" }}
          />
          <img
            src={starGif}
            className="star-img"
            style={{ top: "15%", left: "80%", transform: "rotate(20deg)" }}
          />
          <img
            src={starGif}
            className="star-img"
            style={{ top: "90%", left: "35%", transform: "rotate(8deg)" }}
          />

          <div className="text-content">
            <h1>My Portfolio</h1>
          </div>
        </section>
      </header>

      <main>
        <section>
          <h2 className="outfit center">About Me</h2>
          <div className="about-container">
            <div className="bubble-image">
              <ScratchReveal
                topImage={meDrawn}
                bottomImage={meirl2}
                width={300}
                height={300}
              />
            </div>
            <img src={arrow} className="arrow" />
            <p className="text-gap">memememememe</p>
          </div>
        </section>

        {/*Projects CS*/}
        <section>
          <h2 className="outfit center">Projects</h2>
          <div className="project-category-buttons">
            <button
              className="category-btn"
              onClick={() => setShowCS((prev) => !prev)}
            >
              CS
            </button>
            <button
              className="category-btn"
              onClick={() => setShowArch((prev) => !prev)}
            >
              ARCHITECTURE
            </button>
            <button className="category-btn">OTHER</button>
          </div>

          <div
            ref={containerRef}
            className={`cs-card-container ${showCS ? "show" : ""}`}
            style={{ overflow: "hidden", transition: "max-height 0.5s ease" }}
          >
            {projects.map((project, i) => (
              <div className="cs-card" key={i}>
                <div className="cs-card-header">Project {i + 1}</div>
                <div className="cs-card-content">
                  <img
                    src={project.image}
                    alt={project.name}
                    onClick={() => setLightboxImage(project.image)}
                  />
                </div>
                <div className="cs-card-footer">
                  <button>View</button>
                  <button>Code</button>
                </div>
              </div>
            ))}
          </div>

          {/* Projects Archi */}
          <div
            ref={archRef}
            className={`arch-card-container ${showArch ? "show" : ""}`}
          >
            {architectureProjects.map((project, i) => (
              <div className="arch-card" key={i}>
                {/* Tape pieces */}
                <div className="tape top-left"></div>
                <div className="tape top-right"></div>

                <div className="arch-card-header">{project.name}</div>
                <div className="arch-card-content">
                  <img
                    src={project.image}
                    alt={project.name}
                    onClick={() => setLightboxImage(project.image)}
                  />
                </div>
                <div className="arch-card-footer"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Lightbox */}
        {lightboxImage && (
          <div
            className="lightbox-overlay"
            onClick={() => setLightboxImage(null)}
          >
            <img
              className="lightbox-image"
              src={lightboxImage}
              alt="Large view"
            />
          </div>
        )}

        <section>
          <h2 className="outfit center">Contact</h2>
          <p>brrbrr</p>
        </section>
      </main>
    </div>
  );
}

export default App;
