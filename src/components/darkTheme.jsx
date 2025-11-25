import "../styles/dark.css";
import { useState, useRef } from "react";
import Header from "./header";
import Navbar from "./navbar";
import AboutSection from "./aboutSection";
import ProjectsSection from "./projectsSection";
import SliderProjects from "./sliderProjects";
import Footer from "./footer";
import { useCursorEffect } from "../hooks/userCursorEffect";
import { useScrollLock } from "../hooks/useScrollLock";

export default function DarkTheme() {
  const [showSecret, setShowSecret] = useState(false);
  
  // Refs
  const glowRef = useRef(null);
  const headerRef = useRef(null);
  const portfRef = useRef(null);
  const cutLineRef = useRef(null);
  const kathleenRef = useRef(null);
  const chanRef = useRef(null);
  const titleRowRef = useRef(null);
  const navNameRef = useRef(null);

  // Custom hooks
  useCursorEffect();
  useScrollLock();

  return (
    <div className="dark-app-container">
      <Header
        headerRef={headerRef}
        glowRef={glowRef}
        kathleenRef={kathleenRef}
        titleRowRef={titleRowRef}
        portfRef={portfRef}
        cutLineRef={cutLineRef}
        chanRef={chanRef}
      />

      <Navbar navNameRef={navNameRef} />

      <main className="dark-main">
        <AboutSection />
        <ProjectsSection />
        <SliderProjects />
      </main>

      <Footer />
    </div>
  );
}