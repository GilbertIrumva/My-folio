import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import "../../styles/Navbar.css";
import { useTheme } from "../../hooks/useTheme";

function Navbar() {
  const [navActive, setNavActive] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleNav = () => setNavActive((v) => !v);
  const closeMenu = () => setNavActive(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1200) {
        closeMenu();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const links = [
    { to: "herosection", label: "Home" },
    { to: "AboutMe", label: "About" },
    { to: "MySkills", label: "Skills" },
    { to: "Testimonial", label: "Testimonials" },
    { to: "Contact", label: "Contact" },
  ];

  return (
    <nav className={`navbar ${navActive ? "navActive" : ""}`}>
      <div className="navbar-brand">
        <Link
          to="herosection"
          spy
          smooth
          offset={-80}
          duration={500}
          onClick={closeMenu}
        >
          <span className="brand-mark">G.</span>
          <span className="brand-name">Gilbert</span>
        </Link>
      </div>

      <ul className={`nav-links ${navActive ? "open" : ""}`}>
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              spy
              smooth
              offset={-80}
              duration={500}
              activeClass="active"
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <button
        type="button"
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        className="theme-toggle"
        onClick={toggleTheme}
      >
        {theme === "light" ? "\u{1F319}" : "\u2600\uFE0F"}
      </button>

      <button
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={navActive}
        className={`nav-hamburger ${navActive ? "active" : ""}`}
        onClick={toggleNav}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}

export default Navbar;
