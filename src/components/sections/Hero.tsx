
import { Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";

const Hero = () => {
  const isMobile = useIsMobile();
  const [isLoaded, setIsLoaded] = useState(false);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  
  // Imágenes de eventos y fiestas temáticas
  const backgroundImage = "/lovable-uploads/Magia-y-recracion.avif";
  const secondaryImage = "/lovable-uploads/fiesta-tematica-5.avif";
  const logoImage = "/lovable-uploads/13ad09_995212c57adaead909ed96c686ed9100.avif";
  
  useEffect(() => {
    // Preload images
    const bgImg = new Image();
    bgImg.src = backgroundImage;
    bgImg.onload = () => setBackgroundLoaded(true);
    
    const logoImg = new Image();
    logoImg.src = logoImage;
    logoImg.onload = () => setIsLoaded(true);
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };
  
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[100vh] flex items-center justify-center pt-16"
      style={{
        backgroundImage: backgroundLoaded 
          ? `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.8)), url('${backgroundImage}')`
          : `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9))`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: isMobile ? 'scroll' : 'fixed'
      }}
    >
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-recreacion-purple/20 w-4 h-4 rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.5 + 0.5 
            }}
            animate={{ 
              x: [
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%"
              ],
              y: [
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%",
                Math.random() * 100 + "%"
              ]
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-recreacion-blue/10"></div>
      <motion.div 
        className="container mx-auto px-4 md:px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div 
            className="mb-8 rounded-full bg-white p-4 shadow-lg inline-block relative overflow-hidden"
            variants={itemVariants}
            animate={floatingAnimation}
          >
            {/* Glowing border */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-recreacion-pink via-recreacion-purple to-recreacion-blue animate-spin opacity-20" style={{ animationDuration: '8s' }}></div>
            
            <div className="relative rounded-full overflow-hidden bg-white p-1">
              <img 
                src={logoImage}
                alt="Recreación y Magia" 
                className="h-24 sm:h-32 w-24 sm:w-32 object-cover rounded-full mx-auto"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1528495612343-9ca9f4a9f67c?q=80&w=800&auto=format&fit=crop";
                }}
              />
            </div>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-comic mb-4 sm:mb-6 drop-shadow-sm relative"
          >
            <span className="block text-recreacion-blue relative">
              Recreación y
              <motion.span 
                className="absolute -right-6 top-0 text-yellow-400 text-lg"
                animate={{ rotate: [0, 10, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨
              </motion.span>
            </span>
            <motion.span 
              className="bg-gradient-to-r from-recreacion-purple to-recreacion-orange bg-clip-text text-transparent inline-block"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ 
                backgroundSize: '300% auto'
              }}
            >
              Magia para Niños
            </motion.span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-gray-700 font-montserrat px-2"
          >
            Creamos momentos mágicos y experiencias inolvidables para los pequeños de la casa
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link to="/contacto" className="w-full sm:w-auto">
              <Button className="cloud-btn bg-recreacion-yellow hover:bg-recreacion-yellow/90 text-black px-8 py-6 rounded-full text-lg font-medium flex items-center gap-2 w-full sm:w-auto justify-center group">
                <span className="z-10 relative">Reserva Tu Evento</span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="relative z-10"
                >
                  <Calendar className="w-5 h-5" />
                </motion.div>
              </Button>
            </Link>
            <Link to="/actividades" className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                className="border-2 border-recreacion-purple hover:bg-recreacion-purple/10 text-recreacion-purple px-8 py-6 rounded-full text-lg font-medium flex items-center gap-2 w-full sm:w-auto justify-center group"
              >
                <span className="z-10 relative">Servicios de Magia</span>
                <motion.div
                  animate={{ 
                    rotate: [0, 20, -20, 20, 0],
                    scale: [1, 1.2, 1, 1.2, 1] 
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="relative z-10"
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
      
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,197.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            className="animate-pulse"
            style={{ animationDuration: '4s' }}
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
