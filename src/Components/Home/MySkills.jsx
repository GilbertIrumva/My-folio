import "../../styles/MySkills.css";

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
};

const ReactIcon = () => (
  <svg {...iconProps} aria-hidden="true">
    <circle cx="12" cy="12" r="2.2" fill="currentColor" />
    <ellipse cx="12" cy="12" rx="9" ry="3.8" stroke="currentColor" strokeWidth="1.6" />
    <ellipse cx="12" cy="12" rx="9" ry="3.8" stroke="currentColor" strokeWidth="1.6" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="9" ry="3.8" stroke="currentColor" strokeWidth="1.6" transform="rotate(120 12 12)" />
  </svg>
);

const JavaScriptIcon = () => (
  <svg {...iconProps} aria-hidden="true">
    <rect x="3.5" y="3.5" width="17" height="17" rx="3" fill="currentColor" />
    <path d="M10.1 8.2V15c0 1.5-.8 2.7-2.6 2.7-1.1 0-1.9-.4-2.5-1.1l1.2-1.2c.3.3.6.6 1.2.6.6 0 1-.3 1-1.1V8.2h1.7Z" fill="#10131A" />
    <path d="M13.8 17.7c-1.6 0-2.7-.8-3.2-1.8l1.3-.8c.3.6.8 1 1.8 1 .8 0 1.4-.4 1.4-1 0-.7-.5-.9-1.6-1.4l-.4-.2c-1.3-.5-2.1-1.2-2.1-2.6 0-1.3 1-2.3 2.6-2.3 1.1 0 1.9.4 2.5 1.4l-1.2.8c-.3-.5-.6-.7-1.3-.7-.6 0-1 .3-1 .7 0 .5.3.7 1.1 1l.4.2c1.5.6 2.4 1.2 2.4 2.8 0 1.6-1.2 2.5-2.8 2.5Z" fill="#10131A" />
  </svg>
);

const NodeIcon = () => (
  <svg {...iconProps} aria-hidden="true">
    <path d="M12 2.8 19.2 7v10L12 21.2 4.8 17V7L12 2.8Z" fill="currentColor" />
    <path d="M12 6.6 16 9v6l-4 2.4L8 15V9l4-2.4Z" fill="#0F131A" opacity="0.22" />
    <path d="M10.1 9.2v5.6H8.9V9.2h1.2Zm5 0v5.6h-1l-2.6-3.6v3.6h-1.2V9.2h1l2.6 3.6V9.2h1.2Z" fill="#F5F7FB" />
  </svg>
);

const TypeScriptIcon = () => (
  <svg {...iconProps} aria-hidden="true">
    <rect x="3.5" y="3.5" width="17" height="17" rx="3" fill="currentColor" />
    <path d="M8 9.1h5.7v1.4h-2.2v5.4h-1.4v-5.4H8V9.1Zm7.9 7c-1.3 0-2.3-.5-3-1.5l1.1-.9c.5.7 1 1 1.9 1 .8 0 1.3-.3 1.3-.8 0-.6-.5-.8-1.6-1.1-1.4-.4-2.3-1-2.3-2.4 0-1.4 1.1-2.2 2.6-2.2 1.2 0 2 .4 2.7 1.2l-1 .9c-.5-.5-.9-.7-1.6-.7-.7 0-1.1.3-1.1.8 0 .6.4.8 1.7 1.2 1.4.4 2.2 1 2.2 2.3 0 1.5-1.2 2.2-2.9 2.2Z" fill="#F5F7FB" />
  </svg>
);

const CssIcon = () => (
  <svg {...iconProps} aria-hidden="true">
    <path d="M5.2 3.8h13.6l-1.2 13.5-5.6 2-5.6-2L5.2 3.8Z" fill="currentColor" />
    <path d="M12 5.2v12.6l4.5-1.6 1-11H12Z" fill="#F5F7FB" opacity="0.18" />
    <path d="M8 6.7h8.2l-.2 1.8H9.9l.2 2h5.6l-.5 5.1-3.2 1.1-3.2-1.1-.2-2.3h1.8l.1 1 .5.2.9.3.9-.3.5-.2.2-2h-5.2L8 6.7Z" fill="#F5F7FB" />
  </svg>
);

const MongoIcon = () => (
  <svg {...iconProps} aria-hidden="true">
    <path d="M12 3.2c1.6 2.1 4.1 5 4.1 9.1 0 3.6-1.8 6.3-4.1 8.5-2.3-2.2-4.1-4.9-4.1-8.5 0-4.1 2.5-7 4.1-9.1Z" fill="currentColor" />
    <path d="M12 5.1c.8 1.5 2 3.6 2 6.4 0 2.5-.8 4.7-2 6.5-1.2-1.8-2-4-2-6.5 0-2.8 1.2-4.9 2-6.4Z" fill="#F5F7FB" opacity="0.25" />
    <path d="M12 7.1v9.8" stroke="#F5F7FB" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const GitIcon = () => (
  <svg {...iconProps} aria-hidden="true">
    <rect x="5.2" y="5.2" width="13.6" height="13.6" rx="2.8" transform="rotate(45 12 12)" fill="currentColor" />
    <path d="M9.4 10.1a1.5 1.5 0 1 1 1.1 1.5v2.1a1.5 1.5 0 1 1-1 0v-2.1a1.5 1.5 0 0 1-.1-1.5Zm4.1 0a1.5 1.5 0 1 1 1.1 1.5v1.1a1.5 1.5 0 1 1-1 0v-1.1a1.5 1.5 0 0 1-.1-1.5Z" fill="#F5F7FB" />
    <path d="M10.5 11.3h3.1" stroke="#F5F7FB" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const ApiIcon = () => (
  <svg {...iconProps} aria-hidden="true">
    <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="8" cy="8" r="1.5" fill="currentColor" />
    <circle cx="16" cy="16" r="1.5" fill="currentColor" />
  </svg>
);

const skills = [
  { name: "React", level: 92, icon: ReactIcon, tone: "react" },
  { name: "JavaScript", level: 90, icon: JavaScriptIcon, tone: "javascript" },
  { name: "Node.js", level: 85, icon: NodeIcon, tone: "node" },
  { name: "TypeScript", level: 80, icon: TypeScriptIcon, tone: "typescript" },
  { name: "CSS / SCSS", level: 88, icon: CssIcon, tone: "css" },
  { name: "MongoDB", level: 75, icon: MongoIcon, tone: "mongo" },
  { name: "Git & GitHub", level: 90, icon: GitIcon, tone: "git" },
  { name: "REST / GraphQL", level: 82, icon: ApiIcon, tone: "api" },
];

const MySkills = () => {
  return (
    <section id="MySkills" className="skills-section">
      <div className="section-header">
        <span className="eyebrow">My Skills</span>
        <h2 className="section-heading">
          Technical strengths for{" "}
          <span className="gradient-text">modern products</span>
        </h2>
      </div>

      <img
        className="skills-banner"
        src="/images/skills-banner.webp"
        loading="lazy"
        decoding="async"
        alt="Developer workflow across multiple displays"
      />

      <div className="skills-grid">
        {skills.map((skill) => (
          <div key={skill.name} className="skill-card">
            <div className="skill-head">
              <span className={`skill-icon skill-icon-${skill.tone}`}>
                <skill.icon />
              </span>
              <span className="skill-name">{skill.name}</span>
              <span className="skill-percent">{skill.level}%</span>
            </div>
            <div className="skill-bar">
              <div
                className="skill-bar-fill"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MySkills;
