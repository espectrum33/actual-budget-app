
import Header from "@/components/layout/Header";
import Events from "@/components/sections/Events";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const EventsPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-24">
        <Events />
      </div>
      <Footer />
      <WhatsAppButton phoneNumber="3114824976" />
    </div>
  );
};

export default EventsPage;
