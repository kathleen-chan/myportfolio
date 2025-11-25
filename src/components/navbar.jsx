export default function Navbar({ navNameRef }) {
  return (
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
  );
}