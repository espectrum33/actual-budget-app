
import Header from "@/components/layout/Header";
import Activities from "@/components/sections/Activities";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const ActivitiesPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-24">
        <Activities />
      </div>
      <Footer />
      <WhatsAppButton phoneNumber="3114824976" />
    </div>
  );
};

export default ActivitiesPage;
