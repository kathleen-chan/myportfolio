import { useRef, useEffect } from "react";
import cursor from "../assets/cursor.png";

export default function AboutSection() {
  const aboutRef1 = useRef(null);
  const aboutRef2 = useRef(null);
  const aboutRef3 = useRef(null);
  const imaginationRef = useRef(null);
  const meetsRef = useRef(null);
  const techRef = useRef(null);
  const diamondRef = useRef(null);

  // Intersection Observer for float-up animations
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

  // Imagination scroll animation
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

      if (Math.abs(elementCenter - viewportCenter) <= 70) {
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

      accumulatedScroll += e.deltaY;

      const imaginationRect = imagination.getBoundingClientRect();
      const techRect = tech.getBoundingClientRect();

      if (!imagination.dataset.initialTop) {
        imagination.dataset.initialTop = imaginationRect.top + window.scrollY;
      }

      const initialTop = parseFloat(imagination.dataset.initialTop);
      const targetTop = techRect.top + window.scrollY;
      const travelDistance = targetTop - initialTop;

      const scrollNeeded = 1000;
      let progress = accumulatedScroll / scrollNeeded;
      progress = Math.max(0, Math.min(1, progress));

      const translateY = travelDistance * progress;

      imagination.style.transform = `translateY(${translateY}px)`;
      imagination.style.position = "relative";

      const cursorPositionY = imaginationRect.bottom + window.scrollY;
      if (progress >= 1 && !cursorShown && diamond) {
        cursorShown = true;
        diamond.style.opacity = "1";
        diamond.style.position = "absolute";
        diamond.style.top = `${cursorPositionY}px`;
        diamond.style.left = `49%`;
        diamond.style.transition = "transform 1s ease-out";
      }

      if (progress >= 1) {
        diamond.style.transform = `translateY(1000px)`;
      }

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
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      document.body.classList.remove("lock-scroll");
    };
  }, []);

  return (
    <section id="about" className="dark-about montserrat center">
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
      <img src={cursor} ref={diamondRef} className="diamond"/>
    </section>
  );
}