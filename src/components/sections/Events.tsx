
import { MapPin, Clock, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// Fixed reliable images
const EVENT_IMAGES = {
  festival: "https://images.unsplash.com/photo-1544776193-2d1f2c937f93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2hpbGRyZW4lMjBwbGF5aW5nJTIwZ2FtZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  workshop: "https://images.unsplash.com/photo-1607276624133-77380dfc5ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGZhbWlseSUyMGFjdGl2aXRpZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  costume: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbGRyZW4lMjBjb3N0dW1lJTIwcGFydHl8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  fallback: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=800"
};

const Events = () => {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [inView, setInView] = useState(false);
  
  // Preload images
  useEffect(() => {
    Object.entries(EVENT_IMAGES).forEach(([key, src]) => {
      const img = new Image();
      img.src = src;
      img.onload = () => setLoadedImages(prev => ({ ...prev, [key]: true }));
      img.onerror = () => console.error(`Failed to load image: ${key}`);
    });
    
    // Simple intersection observer for animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const section = document.getElementById('events');
    if (section) observer.observe(section);
    
    return () => observer.disconnect();
  }, []);

  const upcomingEvents = [
    {
      id: 1,
      title: "Festival de Juegos Infantiles",
      location: "Parque Central",
      date: "15 de Junio, 2023",
      time: "9:00 AM - 5:00 PM",
      image: "festival",
      description: "Un día lleno de diversión con juegos tradicionales, inflables, pintura facial y mucho más."
    },
    {
      id: 2,
      title: "Taller de Recreación Familiar",
      location: "Centro Comunitario Las Palmas",
      date: "22 de Junio, 2023",
      time: "2:00 PM - 6:00 PM",
      image: "workshop",
      description: "Aprende actividades divertidas que puedes realizar con toda la familia en casa."
    },
    {
      id: 3,
      title: "Fiesta de Disfraces",
      location: "Salón de Eventos Estrella",
      date: "30 de Junio, 2023",
      time: "4:00 PM - 8:00 PM",
      image: "costume",
      description: "Ven con tu mejor disfraz y disfruta de una noche llena de música, concursos y premios."
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
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

  return (
    <section id="events" className="py-20 bg-recreacion-yellow/10 relative overflow-hidden">
      {/* Decorative backgrounds */}
      <motion.div 
        className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-recreacion-orange/10 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-recreacion-blue/10 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />
      
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-title">
            Eventos <span className="text-recreacion-orange">Próximos</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-montserrat">
            No te pierdas nuestras actividades programadas. ¡Diversión garantizada para toda la familia!
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {upcomingEvents.map((event) => (
            <motion.div 
              key={event.id} 
              className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white group card-hover"
              variants={itemVariants}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" 
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="h-48 overflow-hidden relative">
                <motion.img
                  src={EVENT_IMAGES[event.image] || EVENT_IMAGES.fallback}
                  alt={event.title}
                  className={cn(
                    "w-full h-full object-cover",
                    "transition-all duration-700 group-hover:scale-110"
                  )}
                  style={{ opacity: loadedImages[event.image] ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  onError={(e) => {
                    e.currentTarget.src = EVENT_IMAGES.fallback;
                    setLoadedImages(prev => ({ ...prev, [event.image]: true }));
                  }}
                />
                {!loadedImages[event.image] && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                    <Calendar className="w-10 h-10 text-gray-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-4">
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-white text-xl font-semibold font-comic">{event.title}</h3>
                  </motion.div>
                </div>
                {/* Date badge */}
                <motion.div 
                  className="absolute top-4 right-4 bg-white text-recreacion-orange font-bold py-1 px-3 rounded-full shadow-lg text-sm flex items-center gap-1"
                  whileHover={{ scale: 1.05 }}
                >
                  <Calendar className="w-3 h-3" />
                  <span>{event.date.split(',')[0]}</span>
                </motion.div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-2 text-recreacion-pink" />
                  <span className="text-sm font-montserrat">{event.location}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <Clock className="h-4 w-4 mr-2 text-recreacion-blue" />
                  <span className="text-sm font-montserrat">{event.time}</span>
                </div>
                <p className="text-gray-600 mb-6 font-montserrat">
                  {event.description}
                </p>
                <a href="#contact">
                  <Button 
                    className="w-full cloud-btn bg-recreacion-blue hover:bg-recreacion-blue/90 text-white transition-all group"
                  >
                    <span className="mr-2">Inscríbete</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                    >
                      <ArrowRight className="w-4 h-4 inline-block" />
                    </motion.div>
                  </Button>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="outline" 
              className="border-recreacion-purple text-recreacion-purple hover:bg-recreacion-purple/10 font-medium px-8 py-6"
              size="lg"
            >
              <span>Ver Todos los Eventos</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                className="ml-2"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Events;
