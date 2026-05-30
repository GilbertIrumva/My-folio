import "../../styles/Projects.css";

const projects = [
  {
    title: "Full-Stack Portfolio Platform",
    image: "/images/project-portfolio.webp",
    summary:
      "Designed and launched a personal brand website to showcase technical depth, credibility, and hiring readiness through a modern full-stack experience.",
    achievements: [
      "Implemented a production-ready contact workflow with a React form and Express API endpoint, including validation and submission feedback.",
      "Improved recruiter scanability by structuring content into projects, experience, services, and resume CTA sections with clear conversion paths.",
    ],
    stack: "Tech Stack: React, Vite, Node.js, Express, CSS",
    demoUrl: "https://github.com/GilbertIrumva",
    repoUrl: "https://github.com/GilbertIrumva/My-folio",
  },
  {
    title: "E-Commerce Operations Dashboard",
    image: "/images/project-dashboard.webp",
    summary:
      "Built an internal dashboard for order tracking, inventory visibility, and support workflows to help operations teams resolve issues faster.",
    achievements: [
      "Reduced average order-resolution time by centralizing order, payment, and fulfillment status into one interface.",
      "Improved team productivity with role-based views, search filters, and actionable status alerts.",
    ],
    stack: "Tech Stack: React, TypeScript, Express, PostgreSQL, Chart.js",
    demoUrl: "https://github.com/GilbertIrumva",
    repoUrl: "https://github.com/GilbertIrumva",
  },
  {
    title: "Client Reporting Automation Tool",
    image: "/images/project-reporting.webp",
    summary:
      "Created an automated reporting workflow that collects campaign data, generates stakeholder-ready summaries, and distributes reports on schedule.",
    achievements: [
      "Replaced manual weekly reporting with an automated pipeline, saving significant recurring team time.",
      "Increased report accuracy and consistency by validating data inputs and standardizing output templates.",
    ],
    stack: "Tech Stack: Node.js, React, REST APIs, MongoDB, Cron Jobs",
    demoUrl: "https://github.com/GilbertIrumva",
    repoUrl: "https://github.com/GilbertIrumva",
  },
];

const Projects = () => {
  return (
    <section id="Projects" className="projects-section">
      <div className="section-header">
        <span className="eyebrow">Projects</span>
        <h2 className="section-heading">
          Selected projects for <span className="gradient-text">real outcomes</span>
        </h2>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <article key={project.title} className="project-card">
            <img
              src={project.image}
              loading="lazy"
              decoding="async"
              alt={`${project.title} preview`}
            />
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
            {project.achievements && project.achievements.length > 0 && (
              <ul className="project-achievements">
                {project.achievements.map((achievement) => (
                  <li key={achievement}>{achievement}</li>
                ))}
              </ul>
            )}
            <p className="project-stack">{project.stack}</p>
            <div className="project-links">
              <a href={project.demoUrl} target="_blank" rel="noreferrer">
                Live Demo
              </a>
              <a href={project.repoUrl} target="_blank" rel="noreferrer">
                Source Code
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
