import "../../styles/Testimonial.css";

const testimonials = [
  {
    name: "Ramazani Mwemedi",
    role: "Co-founder and CEO of Opengates, a platform empowering youth through scalable and secure technologies.",
    avatar: "/images/Rama.jpg",
    quote:
      "Gilbert delivered our platform ahead of schedule with exceptional polish. His attention to UX detail is rare and refreshing.",
  },
  {
    name: "Fazili Ndarabu Nathanael",
    role: "FabLab Manager | STEM & Social Innovation Advocate",
    avatar: "/images/Fazili.jpg",
    quote:
      "Reliable, communicative, and technically sharp. Gilbert ramped up on our codebase faster than anyone we've hired.",
  },
  {
    name: "Aïsha Ndiaye",
    role: "Founder, Bloomly",
    avatar: "/images/testimonial-aisha.webp",
    quote:
      "He turned our messy MVP into a production-ready product. The code is clean and the UI feels premium.",
  },
];

const Testimonial = () => {
  return (
    <section id="Testimonial" className="testimonial-section">
      <div className="section-header">
        <span className="eyebrow">Testimonials</span>
        <h2 className="section-heading">
          Client feedback on <span className="gradient-text">delivery and results</span>
        </h2>
      </div>

      <div className="testimonial-grid">
        {testimonials.map((t) => (
          <article key={t.name} className="testimonial-card">
            <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
            <div className="testimonial-author">
              <img
                className="avatar"
                src={t.avatar}
                loading="lazy"
                decoding="async"
                alt={`${t.name} profile`}
              />
              <div>
                <p className="author-name">{t.name}</p>
                <p className="author-role">{t.role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
