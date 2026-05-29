import "../../styles/HeroSection.css";

const HeroSection = () => {
  return (
    <section id="herosection" className="hero-section">
      <div className="hero-section-content-box">
        <div className="hero-section-content">
          <p className="section-title">Hey, I&apos;m Gilbert</p>

          <h1 className="hero-section-title">
            <span className="hero-section-title-color">Full-Stack</span>
            <br />
            Developer
          </h1>

          <p className="hero-section-description">
            I specialize in React, modern JavaScript ecosystems, and scalable
            backend systems &mdash; building responsive, high-performance web
            applications with a focus on clean code and intuitive user
            experiences.
          </p>
        </div>

        <a href="#Contact">
          <button type="button" className="btn btn-primary">
            Get In Touch
          </button>
        </a>
      </div>

      <div className="hero-section-img">
        <img
          src="/Reagan.png"
          alt="Reagan portrait"
        />
      </div>
    </section>
  );
};

export default HeroSection;