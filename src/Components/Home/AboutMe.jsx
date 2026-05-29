import "../../styles/AboutMe.css";

const AboutMe = () => {
  return (
    <section id="AboutMe" className="about-section">
      <div className="about-header">
        <span className="eyebrow">About Me</span>
        <h2 className="section-heading">
          Product engineering for{" "}
          <span className="gradient-text">clarity and impact</span>
        </h2>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <h3>Who I am</h3>
          <p>
            I&apos;m Gilbert, a full-stack developer who builds reliable web
            products that balance user experience, performance, and business
            goals. I care about clear architecture, thoughtful UI decisions,
            and maintainable code that teams can scale.
          </p>
        </div>

        <div className="about-card">
          <h3>What I do</h3>
          <p>
            I design and deliver modern applications with React, Node.js, and
            scalable API architecture. From discovery to deployment, I turn
            product requirements into fast, accessible, and production-ready
            solutions.
          </p>
        </div>

        <div className="about-stats">
          <div className="stat">
            <span className="stat-value">3+</span>
            <span className="stat-label">Years coding</span>
          </div>
          <div className="stat">
            <span className="stat-value">20+</span>
            <span className="stat-label">Projects shipped</span>
          </div>
          <div className="stat">
            <span className="stat-value">10+</span>
            <span className="stat-label">Happy clients</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
