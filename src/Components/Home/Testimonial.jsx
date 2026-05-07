import "../../styles/Testimonial.css";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Manager, Acme Inc.",
    quote:
      "Gilbert delivered our platform ahead of schedule with exceptional polish. His attention to UX detail is rare and refreshing.",
  },
  {
    name: "David Kim",
    role: "CTO, NovaLabs",
    quote:
      "Reliable, communicative, and technically sharp. Gilbert ramped up on our codebase faster than anyone we've hired.",
  },
  {
    name: "Aïsha Ndiaye",
    role: "Founder, Bloomly",
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
          What people <span className="gradient-text">say about me</span>
        </h2>
      </div>

      <div className="testimonial-grid">
        {testimonials.map((t) => (
          <article key={t.name} className="testimonial-card">
            <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
            <div className="testimonial-author">
              <div className="avatar" aria-hidden="true">
                {t.name.charAt(0)}
              </div>
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
