import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import "../../styles/Navbar.css";
import { useTheme } from "../../hooks/useTheme";

const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
};

const SunIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="4.25" fill="currentColor" />
    <path
      d="M12 2.75v2.1M12 19.15v2.1M4.85 4.85l1.48 1.48M17.67 17.67l1.48 1.48M2.75 12h2.1M19.15 12h2.1M4.85 19.15l1.48-1.48M17.67 6.33l1.48-1.48"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

const MoonIcon = () => (
  <svg {...iconProps}>
    <path
      fill="currentColor"
      d="M15.6 2.7a8.35 8.35 0 1 0 5.7 13.93 7.14 7.14 0 0 1-7.3-11.3 8.41 8.41 0 0 0 1.6-2.63Z"
    />
  </svg>
);

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
    { to: "Projects", label: "Projects" },
    { to: "Experience", label: "Experience" },
    { to: "Services", label: "Services" },
    { to: "MySkills", label: "Skills" },
    { to: "Resume", label: "Resume" },
    { to: "Contact", label: "Contact" },
  ];

  return (
    <nav className={`navbar ${navActive ? "navActive" : ""}`}>
      <div className="navbar-brand">
        <Link
          to="herosection"
          spy
          smooth={false}
          offset={-80}
          duration={0}
          onClick={closeMenu}
        >
          <span className="brand-mark">G</span>
          <span className="brand-name">{"<Gilbert/>"}</span>
        </Link>
      </div>

      <div className="navbar-actions">
        <ul className={`nav-links ${navActive ? "open" : ""}`}>
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                spy
                smooth={false}
                offset={-80}
                duration={0}
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
          {theme === "light" ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>

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
