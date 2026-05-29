import "./App.css";
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