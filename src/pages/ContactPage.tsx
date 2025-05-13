
import Header from "@/components/layout/Header";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const ContactPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-24">
        <Contact />
      </div>
      <Footer />
      <WhatsAppButton phoneNumber="3114824976" />
    </div>
  );
};

export default ContactPage;
