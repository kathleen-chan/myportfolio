import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import arch1 from "../assets/arch1.png";
import arch2 from "../assets/arch2.png";
import arch3 from "../assets/arch3.png";

gsap.registerPlugin(ScrollTrigger);

export default function SliderProjects() {
  const sliderRef = useRef(null);

  useEffect(() => {
    if (!sliderRef.current) return;

    const cards = sliderRef.current.querySelectorAll(".slider-card");

    gsap.to(cards, {
      x: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sliderRef.current,
        start: "top 80%",
      },
    });
  }, []);

  return (
    <section className="slider-projects" ref={sliderRef}>
      <div className="projects">
        <h2 className="pro brogetta">More</h2>
        <h2 className="jects pinyon-script-regular">Projects</h2>
      </div>
      <div className="slider-container">
        <div className="slider-track">
          <div className="slider-card">
            <div className="project-image">
              <img src={arch1} alt="Project 1" />
            </div>
            <h3 className="project-title pixel">Project 1</h3>
          </div>
          <div className="slider-card">
            <div className="project-image">
              <img src={arch2} alt="Project 2" />
            </div>
            <h3 className="project-title pixel">Project 2</h3>
          </div>
          <div className="slider-card">
            <div className="project-image">
              <img src={arch3} alt="Project 3" />
            </div>
            <h3 className="project-title pixel">Project 3</h3>
          </div>
        </div>
      </div>
    </section>
  );
}