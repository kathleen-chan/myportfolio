import { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

import cursor from "../assets/cursor.png";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const email = "kathleenchan31@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };

  return (
    <>
    <section id="contact">
      <footer className="dark-footer">
        <img src={cursor} className="footer-star" />
        <div className="connect">
          <h2 className="con brogetta">Con</h2>
          <h2 className="nect pinyon-script-regular">nect!</h2>
        </div>
        <div className="footer-icons">
        <div onClick={handleCopyEmail}>
          <FaEnvelope size={24} />
          {copied}
        </div>

        <a
          href="https://github.com/kathleen-chan"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          <FaGithub size={24} />
        </a>

        <a
          href="https://www.linkedin.com/in/kathleen-chan-a1a64a38b/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          <FaLinkedin size={24} />
        </a>
        </div>
      </footer>

      {/* Floating notification */}
      {copied && (
        <div className="copied montserrat">
          Email copied to clipboard!
        </div>
      )}
    </section>
    </>
  );
}
