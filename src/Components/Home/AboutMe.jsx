import "../../styles/AboutMe.css";

const AboutMe = () => {
  return (
    <section id="AboutMe" className="about-section">
      <div className="about-header">
        <span className="eyebrow">About Me</span>
        <h2 className="section-heading">
          Crafting digital experiences with{" "}
          <span className="gradient-text">passion & precision</span>
        </h2>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <h3>Who I am</h3>
          <p>
            I&apos;m Gilbert, a full-stack developer passionate about building
            performant, accessible, and beautifully designed web products. I
            bridge the gap between design and engineering with a focus on
            clean, maintainable code.
          </p>
        </div>

        <div className="about-card">
          <h3>What I do</h3>
          <p>
            I design and build modern web applications using React, Node.js,
            and scalable API architectures. From idea to deployment, I love
            turning complex problems into intuitive solutions.
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
