
import { ArrowRight, Sparkles, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center pt-16"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url('/lovable-uploads/38572e00-c447-4f9a-a673-0f2652b53da4.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-recreacion-blue/20"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-float mb-8">
            <img 
              src="/lovable-uploads/38572e00-c447-4f9a-a673-0f2652b53da4.png" 
              alt="Recreación y Magia" 
              className="h-32 mx-auto"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-comic mb-6 drop-shadow-sm">
            <span className="block text-recreacion-blue">Recreación y</span>
            <span className="bg-gradient-to-r from-recreacion-purple to-recreacion-orange bg-clip-text text-transparent">
              Magia para Niños
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-700 font-montserrat">
            Creamos momentos mágicos y experiencias inolvidables para los pequeños de la casa
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#contact">
              <Button className="cloud-btn bg-recreacion-yellow hover:bg-recreacion-yellow/90 text-black px-8 py-6 rounded-full text-lg font-medium flex items-center gap-2">
                Reserva Tu Evento
                <Calendar className="w-5 h-5" />
              </Button>
            </a>
            <Button 
              variant="outline" 
              className="border-2 border-recreacion-purple hover:bg-recreacion-purple/10 text-recreacion-purple px-8 py-6 rounded-full text-lg font-medium flex items-center gap-2"
            >
              Servicios de Magia
              <Sparkles className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,197.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
