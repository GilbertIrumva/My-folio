import "../../styles/Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="brand-mark">G.</span>
          <span>Gilbert &mdash; Full-Stack Developer</span>
        </div>

        <ul className="footer-socials">
          <li>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              Twitter
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
