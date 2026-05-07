import "../../styles/MySkills.css";

const skills = [
  { name: "React", level: 92, icon: "⚛️" },
  { name: "JavaScript", level: 90, icon: "🟨" },
  { name: "Node.js", level: 85, icon: "🟩" },
  { name: "TypeScript", level: 80, icon: "🔷" },
  { name: "CSS / SCSS", level: 88, icon: "🎨" },
  { name: "MongoDB", level: 75, icon: "🍃" },
  { name: "Git & GitHub", level: 90, icon: "🐙" },
  { name: "REST / GraphQL", level: 82, icon: "🔌" },
];

const MySkills = () => {
  return (
    <section id="MySkills" className="skills-section">
      <div className="section-header">
        <span className="eyebrow">My Skills</span>
        <h2 className="section-heading">
          Tools I use to build{" "}
          <span className="gradient-text">great products</span>
        </h2>
      </div>

      <div className="skills-grid">
        {skills.map((skill) => (
          <div key={skill.name} className="skill-card">
            <div className="skill-head">
              <span className="skill-icon" aria-hidden="true">
                {skill.icon}
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
