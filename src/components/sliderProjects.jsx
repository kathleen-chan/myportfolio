import "../styles/slider.css";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { InertiaPlugin } from "gsap/InertiaPlugin";

import A100 from "../assets/arch/A100.png";
import A101 from "../assets/arch/A101.png";
import A102 from "../assets/arch/A102.png";
import A201 from "../assets/arch/A201.png";
import A301 from "../assets/arch/A301.png";
import A501 from "../assets/arch/A501.png";
import A601 from "../assets/arch/A601.png";
import T1 from "../assets/arch/townhouseBasement.png";
import T2 from "../assets/arch/townhouseFirst.png";
import T3 from "../assets/arch/townhouseFront.png";
import T4 from "../assets/arch/townhouseLeft.png";
import T5 from "../assets/arch/townhouseRight.png";
import T6 from "../assets/arch/townhouseRear.png";
import T7 from "../assets/arch/townhouseSecond.png";

import E from "../assets/arch/exploaded.jpg";
import S from "../assets/arch/section.jpg";
import M from "../assets/arch/MorrisHouse.png";
import W from "../assets/arch/water.png";
import Ear from "../assets/arch/ear.png";
import T from "../assets/arch/townhouse.png";
import Ess from "../assets/arch/essentials.png";

import chicken from "../assets/crochet/chicken.png";
import digimon from "../assets/crochet/digimon.png";
import dino from "../assets/crochet/dino.png";
import duck from "../assets/crochet/duck.png";
import mouse from "../assets/crochet/mouse.png";
import pochacco from "../assets/crochet/pochacco.png";
import totoro from "../assets/crochet/totoro.png";
import turtle from "../assets/crochet/turtle.png";
import house from "../assets/crochet/house.jpg";
import pot from "../assets/crochet/pot.png";
import cat from "../assets/arch/cat.jpg";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(InertiaPlugin);

export default function SliderProjects() {
  const sliderRef = useRef(null);
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const galleryRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const projects = [
    { img: A100, title: "Esherick House Cellular Plan" },
    { img: A101, title: "Esherick House First Floor Plan (AutoCAD)" },
    { img: A102, title: "Esherick House Second Floor Plan (AutoCAD)" },
    { img: A201, title: "Esherick House North & South Elevations (AutoCAD)" },
    { img: A301, title: "Esherick House Longitudinal Section (AutoCAD)" },
    { img: A501, title: "Esherick House Wall Section (AutoCAD)" },
    { img: A601, title: "Esherick House Site Plan (AutoCAD)" },
    { img: T3, title: "Townhouse Proposed Front Elevation" },
    { img: T4, title: "Townhouse Proposed Left Side Elevation" },
    { img: T5, title: "Townhouse Proposed Right Side Elevation" },
    { img: T6, title: "Townhouse Proposed Rear Elevation" },
    { img: T1, title: "Townhouse Proposed Basement" },
    { img: T2, title: "Townhouse Proposed First Floor" },
    { img: T7, title: "Townhouse Proposed Second Floor" },
  ];

  const projects2 = [
    { img: M, title: "Morris House Sketch" },
    { img: chicken, title: "Chimkin" },
    { img: W, title: "Water Sketch" },
    { img: duck, title: "Duck Crochet" },
    { img: house, title: "Batak House Model" },
    { img: digimon, title: "Digi Tailmon" },
    { img: E, title: "Exploaded View Of My Modified Room" },
    { img: dino, title: "Dino!" },
    { img: Ear, title: "Ear Sketch" },
    { img: pot, title: "Painted Flower Pot" },    
    { img: Ess, title: "My Essentials Sketch" },
    { img: pochacco, title: "Pochacco Pouch" },
    { img: S, title: "Section View Of My Modified Room" },
    { img: mouse, title: "Birthday Mouse" },
    { img: T, title: "Townhouse Floor Plan & Elevations" },
    { img: turtle, title: "Turtle Keychain Family" },
    { img: cat, title: "Cat Neon Painting" },
    { img: totoro, title: "First Crochet Project!" },
  ];

  // GSAP reveal
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

  // slide arrows
  const slideLeft = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
  };
  const slideRight = () => {
    setCurrentIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
  };

  // track slide using translateX
  useEffect(() => {
    if (!trackRef.current) return;
    const cardWidth = 420;
    trackRef.current.style.transform = `translateX(-${
      currentIndex * cardWidth
    }px)`;
  }, [currentIndex]);

  // drag-to-scroll handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopDrag = () => setIsDragging(false);

  // update index on scroll
  useEffect(() => {
    const container = containerRef.current;
    const cardWidth = 420;

    const handleScroll = () => {
      const newIndex = Math.round(container.scrollLeft / cardWidth);
      setCurrentIndex(newIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // lightbox controls
  const openLightbox = (img, index) => {
    setLightboxImage(img);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextImage = () => {
    const idx = (lightboxIndex + 1) % projects.length;
    setLightboxIndex(idx);
    setLightboxImage(projects[idx].img);
  };

  const prevImage = () => {
    const idx = (lightboxIndex - 1 + projects.length) % projects.length;
    setLightboxIndex(idx);
    setLightboxImage(projects[idx].img);
  };

  useEffect(() => {
    const root = galleryRef.current;
    if (!root) return;

    let oldX = 0;
    let oldY = 0;
    let deltaX = 0;
    let deltaY = 0;

    const handleMouseMove = (e) => {
      deltaX = e.clientX - oldX;
      deltaY = e.clientY - oldY;
      oldX = e.clientX;
      oldY = e.clientY;
    };

    root.addEventListener("mousemove", handleMouseMove);

    const items = root.querySelectorAll(".media");

    items.forEach((el) => {
      const handleEnter = () => {
        const image = el.querySelector("img");

        const tl = gsap.timeline({ onComplete: () => tl.kill() });
        tl.timeScale(1.2);

        tl.to(image, {
          inertia: {
            x: { velocity: deltaX * 30, end: 0 },
            y: { velocity: deltaY * 30, end: 0 },
          },
        });

        tl.fromTo(
          image,
          { rotate: 0 },
          {
            duration: 0.4,
            rotate: (Math.random() - 0.5) * 30,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
          },
          "<"
        );
      };

      el.addEventListener("mouseenter", handleEnter);

      return () => el.removeEventListener("mouseenter", handleEnter);
    });

    return () => {
      root.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="slider-projects" ref={sliderRef}>
      <div className="slider-wrapper">
        <button className="slider-nav-btn nav-left" onClick={slideLeft}>
          ‹
        </button>

        <div
          className="slider-container"
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseLeave={stopDrag}
          onMouseUp={stopDrag}
        >
          <div className="slider-track" ref={trackRef}>
            {projects.map((p, i) => (
              <div
                key={i}
                className="slider-card"
                onClick={() => openLightbox(p.img, i)}
              >
                <div className="project-image">
                  <img src={p.img} alt={p.title} />
                </div>
                <h3 className="project-title pixel">{p.title}</h3>
              </div>
            ))}
          </div>
        </div>

        <button className="slider-nav-btn nav-right" onClick={slideRight}>
          ›
        </button>
      </div>

      {/* dots */}
      <div className="slider-dots">
        {projects.map((_, i) => (
          <button
            key={i}
            className={`slider-dot ${i === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>

      <section className="gallery-section" ref={galleryRef}>
        <div className="medias">
          {projects2.map((project, index) => (
            <div
              key={index}
              className="media"
              onClick={() => openLightbox(project.img, index)}
            >
              <div className="gallery-image media-inner">
                <img src={project.img} alt={project.title} />
              </div>

            </div>
          ))}
        </div>
        <section className="gallery-section" ref={galleryRef}>
  <div className="medias">
    {projects2.map((project, index) => (
      <div
        key={index}
        className="media"
        onClick={() => openLightbox(project.img, index)}
      >
        <div className="gallery-image media-inner">
          <img src={project.img} alt={project.title} />
        </div>
      </div>
    ))}
  </div>

  {/* YouTube video under gallery */}
  <div className="youtube-video" style={{ marginTop: "200px", textAlign: "center" }}>
  <iframe
    width="700"
    height="350"
    src="https://www.youtube.com/embed/gus1iDvqTZY?si=sr4ZQFOEHRmHW4Pr"
    title="Rover Project"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
  ></iframe>
</div>
</section>

      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="lightbox-overlay">
          <button className="lightbox-close" onClick={closeLightbox}>
            ×
          </button>
          <button className="lightbox-nav lightbox-prev" onClick={prevImage}>
            ‹
          </button>

          <div className="lightbox-content">
            <img src={lightboxImage} />
            <p className="lightbox-caption pixel">{projects2[lightboxIndex].title}</p>
          </div>

          <button className="lightbox-nav lightbox-next" onClick={nextImage}>
            ›
          </button>
        </div>
      )}
    </section>
  );
}
