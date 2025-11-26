export default function Navbar({ navNameRef }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = (e, id) => {
  e.preventDefault();
  const section = document.getElementById(id);
  if (!section) return;
  let yOffset = 0;
  if (id === "about") yOffset = -180;
  if (id === "projects") yOffset = 155;
  const y =
    section.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({ top: y, behavior: "smooth" });
};


  return (
    <nav className="glass-navbar">
      <div className="nav-name oblique" ref={navNameRef} onClick={scrollToTop}>
        Kathleen Chan
      </div>
      <ul className="nav-links">
        <li>
          <a href="#about" onClick={(e) => handleScroll(e, "about")}>
            about
          </a>
        </li>
        <li>
          <a href="#projects" onClick={(e) => handleScroll(e, "projects")}>
            projects
          </a>
        </li>
        <li>
          <a href="#contact" onClick={(e) => handleScroll(e, "contact")}>
            contact
          </a>
        </li>
      </ul>
    </nav>
  );
}
