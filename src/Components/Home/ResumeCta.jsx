import "../../styles/ResumeCta.css";

const ResumeCta = () => {
  return (
    <section id="Resume" className="resume-section">
      <div className="resume-card">
        <img
          className="resume-visual"
          src="/images/resume-visual.webp"
          loading="lazy"
          decoding="async"
          alt="Professional discussion over laptop and resume materials"
        />

        <div>
          <span className="eyebrow">Resume + CTA</span>
          <h2 className="section-heading">
            Available for <span className="gradient-text">high-impact roles</span>
          </h2>
          <p>
            Currently exploring Full-Stack Developer and Frontend Engineer roles
            in SaaS, fintech, and digital product teams, based in Nairobi and
            open to remote and hybrid collaboration.
            Download my CV for projects, outcomes, and technical strengths.
          </p>
        </div>

        <div className="resume-actions">
          <a className="btn btn-primary" href="/resume.pdf" download>
            Download Resume
          </a>
          <a
            className="btn resume-outline"
            href="https://scheduler.zoom.us/gilbert-irumva/portfolio-intro-call"
            target="_blank"
            rel="noreferrer"
          >
            Schedule a Call
          </a>
        </div>
        <p>
          If the resume download is unavailable, connect via LinkedIn and I will
          share the latest version directly.
        </p>
      </div>
    </section>
  );
};

export default ResumeCta;
