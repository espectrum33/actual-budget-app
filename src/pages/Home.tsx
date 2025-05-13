
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Footer />
      <WhatsAppButton phoneNumber="3114824976" />
    </div>
  );
};

export default Home;
