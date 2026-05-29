import "../../styles/Footer.css";

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
};

const GitHubIcon = () => (
  <svg {...iconProps}>
    <path
      fill="currentColor"
      d="M12 2C6.48 2 2 6.58 2 12.24c0 4.53 2.87 8.38 6.84 9.74.5.1.68-.22.68-.48v-1.68c-2.78.62-3.37-1.37-3.37-1.37-.46-1.2-1.12-1.52-1.12-1.52-.92-.65.07-.63.07-.63 1.02.07 1.56 1.08 1.56 1.08.91 1.6 2.39 1.14 2.97.87.09-.67.35-1.14.63-1.4-2.22-.26-4.56-1.13-4.56-5.03 0-1.11.38-2.01 1.01-2.72-.1-.26-.44-1.29.1-2.68 0 0 .82-.27 2.7 1.04a9.02 9.02 0 0 1 4.92 0c1.88-1.31 2.7-1.04 2.7-1.04.54 1.39.2 2.42.1 2.68.63.7 1 1.61 1 2.72 0 3.91-2.34 4.77-4.57 5.02.36.32.68.94.68 1.9v2.82c0 .26.18.59.69.48A10.03 10.03 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg {...iconProps}>
    <path
      fill="currentColor"
      d="M6.94 6.5A1.94 1.94 0 1 1 3.06 6.5a1.94 1.94 0 0 1 3.88 0ZM3.5 8.75h3V21h-3V8.75ZM9.75 8.75h2.87v1.68h.04c.4-.76 1.42-1.56 2.93-1.56 3.13 0 3.71 2.06 3.71 4.74V21h-3v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.91V21h-3V8.75Z"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg {...iconProps}>
    <path
      fill="currentColor"
      d="M13.3 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 4v2.2H7.8v3h2.5V21h3Z"
    />
  </svg>
);

const XIcon = () => (
  <svg {...iconProps}>
    <path
      fill="currentColor"
      d="M18.9 3H21l-5.88 6.7L22 21h-5.57l-4.35-5.69L6.1 21H4l6.33-7.22L2 3h5.72l3.91 5.13L18.9 3Zm-1 16h1.16L7.1 4.97H5.85L17.9 19Z"
    />
  </svg>
);

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="brand-mark">G</span>
          <span> {"<Gilbert/>"} &mdash; Full-Stack Developer</span>
        </div>

        <ul className="footer-socials">
          <li>
            <a
              href="https://github.com/GilbertIrumva"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              <GitHubIcon />
              <span>GitHub</span>
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/irumva.gilbert/about/?fb_profile_edit_entry_point=%7B%22click_point%22%3A%22edit_profile_button%22%2C%22feature%22%3A%22profile_header%22%7D&id=100048757662489&sk=about"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              title="Facebook"
            >
              <FacebookIcon />
              <span>Facebook</span>
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/gilbert-irumva"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <LinkedInIcon />
              <span>LinkedIn</span>
            </a>
          </li>
          <li>
            <a
              href="https://x.com/Gilbert79819991"
              target="_blank"
              rel="noreferrer"
              aria-label="X / Twitter"
              title="X / Twitter"
            >
              <XIcon />
              <span>Twitter</span>
            </a>
          </li>
        </ul>

        <p className="footer-copy">
          &copy; {year} Gilbert. Built with React &amp; lots of coffee.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
