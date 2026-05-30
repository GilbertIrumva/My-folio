import "../../styles/Services.css";

const services = [
  {
    title: "Frontend Development",
    image: "/images/experience-frontend.webp",
    text: "Transform Figma or product ideas into responsive, accessible interfaces engineered for speed and long-term maintainability.",
  },
  {
    title: "Full-Stack Web Apps",
    image: "/images/service-fullstack.webp",
    text: "Build complete products from UI to API, including authentication, data modeling, and deployment-ready backend services.",
  },
  {
    title: "API Integration",
    image: "/images/service-api.webp",
    text: "Integrate payments, auth, and third-party services into stable user flows with strong validation and error handling.",
  },
  {
    title: "Performance Optimization",
    image: "/images/project-dashboard.webp",
    text: "Improve Core Web Vitals, technical SEO, and UX responsiveness to increase engagement, conversion, and retention.",
  },
];

const Services = () => {
  return (
    <section id="Services" className="services-section">
      <div className="section-header">
        <span className="eyebrow">Services</span>
        <h2 className="section-heading">
          Services designed for <span className="gradient-text">confident delivery</span>
        </h2>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <article key={service.title} className="service-card">
            <img
              src={service.image}
              loading="lazy"
              decoding="async"
              alt={`${service.title} visual`}
            />
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
