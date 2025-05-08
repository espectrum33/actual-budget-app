
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center pt-16"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2742&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6 drop-shadow-lg">
            <span className="block">Diversión y</span>
            <span className="bg-gradient-to-r from-gigilove-yellow to-gigilove-blue bg-clip-text text-transparent">
              Recreación para Todos
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 font-roboto drop-shadow-md">
            Creando experiencias inolvidables para personas de todas las edades
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-gigilove-orange hover:bg-gigilove-orange/90 text-white px-8 py-6 rounded-full text-lg font-medium shadow-lg transition-transform hover:scale-105 flex items-center gap-2">
              Únete a Nuestras Actividades
              <ArrowRight className="w-5 h-5 animate-bounce-light" />
            </Button>
            <Button 
              variant="outline" 
              className="bg-white/10 backdrop-blur-sm border-white hover:bg-white/20 text-white px-8 py-6 rounded-full text-lg font-medium shadow-lg"
            >
              Ver Programación
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
