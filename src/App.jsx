import "./App.css";
import { useEffect } from "react";
import Navbar from "./Components/Home/Navbar";
import HeroSection from "./Components/Home/HeroSection";
import AboutMe from "./Components/Home/AboutMe";
import Projects from "./Components/Home/Projects";
import Experience from "./Components/Home/Experience";
import Services from "./Components/Home/Services";
import MySkills from "./Components/Home/MySkills";
import Testimonial from "./Components/Home/Testimonial";
import ResumeCta from "./Components/Home/ResumeCta";
import ContactMe from "./Components/Home/ContactMe";
import Footer from "./Components/Home/Footer";

const App = () => {
  useEffect(() => {
    const sections = document.querySelectorAll("main section");

    if (!sections.length) {
      return undefined;
    }

    sections.forEach((section, index) => {
      section.classList.add("reveal-section");
      section.style.setProperty("--reveal-delay", `${Math.min(index * 70, 280)}ms`);
    });

    if (typeof window.IntersectionObserver === "undefined") {
      sections.forEach((section) => section.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutMe />
        <Projects />
        <Experience />
        <Services />
        <MySkills />
        <Testimonial />
        <ResumeCta />
        <ContactMe />
      </main>
      <Footer />
    </>
  );
};

export default App;