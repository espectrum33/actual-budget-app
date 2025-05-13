
import Header from "@/components/layout/Header";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const TestimonialsPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-24">
        <Testimonials />
      </div>
      <Footer />
      <WhatsAppButton phoneNumber="3114824976" />
    </div>
  );
};

export default TestimonialsPage;
