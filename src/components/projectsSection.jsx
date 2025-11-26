import { useEffect, useRef } from "react";
import gsap from "gsap";
import umi from "../assets/u-mi.jpg";
import brainrot from "../assets/brainrot!...ish.png";
import oubaitori from "../assets/oubaitori.jpg";

export default function ProjectsSection() {
  const projectsRef = useRef(null);

  // Card animation on scroll
  useEffect(() => {
    const cards = document.querySelectorAll(".dark-card");
    const rotations = [-5, 0, 5];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!entry.target.classList.contains("animated")) {
              entry.target.classList.add("animated");

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
            entry.target.classList.remove("animated");
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  // Cursor bubble effect
  useEffect(() => {
    const cards = document.querySelectorAll(".dark-card");
    const bubble = document.getElementById("cursor-bubble");
    if (!bubble) return;

    bubble.style.pointerEvents = "none";

    const moveBubble = (e) => {
      bubble.style.left = `${e.clientX}px`;
      bubble.style.top = `${e.clientY}px`;
    };

    const handleMouseEnter = () => {
      bubble.classList.add("active");
      window.addEventListener("mousemove", moveBubble);
    };

    const handleMouseLeave = () => {
      bubble.classList.remove("active");
      window.removeEventListener("mousemove", moveBubble);
    };

    const clickHandlers = [];

    cards.forEach((card) => {
      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      const clickHandler = () => {
        const link = card.dataset.link;
        if (link) window.open(link, "_blank");
      };

      card.addEventListener("click", clickHandler);
      clickHandlers.push({ card, clickHandler });
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      });
      clickHandlers.forEach(({ card, clickHandler }) => {
        card.removeEventListener("click", clickHandler);
      });
      window.removeEventListener("mousemove", moveBubble);
    };
  }, []);

  return (
    <section id="projects" className="dark-projects" ref={projectsRef}>
      <div className="projects">
        <h2 className="pro brogetta">Pro</h2>
        <h2 className="jects pinyon-script-regular">jects</h2>
      </div>
      <div className="dark-grid">
        <div className="cursor-bubble" id="cursor-bubble"></div>
        
        <div className="dark-card" data-link="https://u-mi.vercel.app/">
          <div className="project-image">
            <img src={umi} alt="U-mi project" />
          </div>
          <h3 className="project-title pixel">U-mi</h3>
          <p className="desc pixel">
            Planning app with dynamic calendar conflict detection, note
            taking, to-do list, study timer.
          </p>
        </div>

        <div className="dark-card" data-link="https://kathleen-chan.github.io/garden/garden">
          <div className="project-image">
            <img src={oubaitori} alt="Oubaitori project" />
          </div>
          <h3 className="project-title pixel">Oubaitori</h3>
          <p className="desc pixel">Ongoing in-game world building project.</p>
        </div>

        <div className="dark-card" data-link="https://kathleen-chan.github.io/hangman/">
          <div className="project-image">
            <img src={brainrot} alt="Brainrot project" />
          </div>
          <h3 className="project-title pixel">Brainrot!..ish</h3>
          <p className="desc pixel">
            Ongoing design and integration of interactive multiplayer minigames.
          </p>
        </div>
      </div>
    </section>
  );
}