import "../../styles/Experience.css";

const experiences = [
  {
    period: "Jan 2024 - Present",
    role: "Full-Stack Developer",
    company: "Freelance / Product Projects",
    image: "/images/experience-freelance.webp",
    details:
      "Deliver end-to-end web products for clients and personal initiatives, from requirements and UI implementation to backend APIs and deployment.",
    highlights: [
      "Shipped multiple production-ready features using React and Node.js while maintaining clean architecture and reusable components.",
      "Improved delivery speed by standardizing project setup, reducing repeated configuration work across new builds.",
    ],
  },
  {
    period: "May 2023 - Dec 2023",
    role: "Frontend Developer",
    company: "Digital Product Team",
    image: "/images/experience-frontend.webp",
    details:
      "Built responsive user interfaces and collaborated with design and backend teams to deliver consistent product experiences.",
    highlights: [
      "Improved page performance and UX quality through component refactoring and lighter render paths.",
      "Raised code quality with peer reviews, naming conventions, and maintainable styling patterns.",
    ],
  },
  {
    period: "Jan 2022 - Apr 2023",
    role: "Software Developer Intern",
    company: "Engineering Internship Program",
    image: "/images/experience-intern.webp",
    details:
      "Supported feature delivery across frontend and backend tasks while building strong fundamentals in production workflows.",
    highlights: [
      "Contributed to release cycles by fixing bugs, implementing small features, and validating QA feedback.",
      "Built confidence in API integration, debugging, and team communication in an agile development environment.",
    ],
  },
];

const Experience = () => {
  return (
    <section id="Experience" className="experience-section">
      <div className="section-header">
        <span className="eyebrow">Experience</span>
        <h2 className="section-heading">
          Career growth through <span className="gradient-text">measurable impact</span>
        </h2>
      </div>

      <div className="timeline">
        {experiences.map((item) => (
          <article key={`${item.period}-${item.role}`} className="timeline-item">
            <img src={item.image} loading="lazy" decoding="async" alt={`${item.role} work visual`} />
            <p className="timeline-period">{item.period}</p>
            <h3>{item.role}</h3>
            <p className="timeline-company">{item.company}</p>
            <p className="timeline-details">{item.details}</p>
            {item.highlights && item.highlights.length > 0 && (
              <ul className="timeline-highlights">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default Experience;
