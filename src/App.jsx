import "./App.css";
import Navbar from "./Components/Home/Navbar";
import HeroSection from "./Components/Home/HeroSection";
import AboutMe from "./Components/Home/AboutMe";
import MySkills from "./Components/Home/MySkills";
import Testimonial from "./Components/Home/Testimonial";
import ContactMe from "./Components/Home/ContactMe";
import Footer from "./Components/Home/Footer";

const App = () => {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutMe />
        <MySkills />
        <Testimonial />
        <ContactMe />
      </main>
      <Footer />
    </>
  );
};

export default App;