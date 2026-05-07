import { useState } from "react";
import "../../styles/ContactMe.css";

const ContactMe = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: "error", text: "Please fill in all fields." });
      return;
    }
    setStatus({
      type: "success",
      text: "Thanks! Your message has been sent.",
    });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="Contact" className="contact-section">
      <div className="section-header">
        <span className="eyebrow">Contact</span>
        <h2 className="section-heading">
          Let&apos;s build something{" "}
          <span className="gradient-text">together</span>
        </h2>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <h3>Get in touch</h3>
          <p>
            Have a project in mind, an opportunity, or just want to say hi?
            Drop a message and I&apos;ll get back to you within 24 hours.
          </p>
          <ul className="contact-list">
            <li>
              <span className="contact-label">Email</span>
              <a href="mailto:gilbertirumva25@gmail.com">gilbertirumva25@gmail.com</a>
            </li>
            <li>
              <span className="contact-label">Location</span>
              <span>Nairobi, Kenya</span>
            </li>
            <li>
              <span className="contact-label">Available for</span>
              <span>Freelance & full-time</span>
            </li>
          </ul>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
            />
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </div>

          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
            />
          </div>

          {status && (
            <p className={`form-status ${status.type}`} role="status">
              {status.text}
            </p>
          )}

          <button type="submit" className="btn btn-primary">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactMe;
