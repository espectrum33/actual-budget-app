
import Header from "@/components/layout/Header";
import About from "@/components/sections/About";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-24">
        <About />
      </div>
      <Footer />
      <WhatsAppButton phoneNumber="3114824976" />
    </div>
  );
};

export default AboutPage;
