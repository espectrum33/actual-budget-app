
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Activities from "@/components/sections/Activities";
import About from "@/components/sections/About";
import Events from "@/components/sections/Events";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Activities />
      <About />
      <Events />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
