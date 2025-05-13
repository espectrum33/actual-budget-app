
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState, useEffect } from "react";
import { Sparkles, Users, PartyPopper, Music, Cake, Gift, Briefcase, Presentation } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Activities = () => {
  const [activeTab, setActiveTab] = useState<"infantil" | "empresarial">("infantil");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const activities = [
    {
      title: "Shows de Magia",
      description: "Espectáculos de magia e ilusionismo profesionales especialmente diseñados para niños y familias.",
      icon: <Sparkles className="h-10 w-10 text-recreacion-purple" />,
      color: "bg-recreacion-purple/10",
      borderColor: "border-recreacion-purple/30",
      gradientFrom: "from-recreacion-purple/5",
      gradientTo: "to-recreacion-purple/20",
      type: "infantil",
      image: "https://images.unsplash.com/photo-1528495612343-9ca9f4a9f67c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800"
    },
    {
      title: "Animación Infantil",
      description: "Juegos, dinámicas y actividades divertidas dirigidas por nuestro equipo de animadores profesionales.",
      icon: <Users className="h-10 w-10 text-recreacion-orange" />,
      color: "bg-recreacion-orange/10",
      borderColor: "border-recreacion-orange/30",
      gradientFrom: "from-recreacion-orange/5",
      gradientTo: "to-recreacion-orange/20",
      type: "infantil",
      image: "https://images.unsplash.com/photo-1544776193-2d1f2c937f93?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Fiestas Temáticas",
      description: "Organizamos fiestas con temáticas personalizadas según los gustos y preferencias de los niños.",
      icon: <PartyPopper className="h-10 w-10 text-recreacion-blue" />,
      color: "bg-recreacion-blue/10",
      borderColor: "border-recreacion-blue/30",
      gradientFrom: "from-recreacion-blue/5",
      gradientTo: "to-recreacion-blue/20",
      type: "infantil",
      image: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?q=80&w=2072&auto=format&fit=crop"
    },
    {
      title: "Música y Baile",
      description: "Actividades musicales interactivas que fomentan el movimiento y la expresión corporal.",
      icon: <Music className="h-10 w-10 text-recreacion-pink" />,
      color: "bg-recreacion-pink/10",
      borderColor: "border-recreacion-pink/30",
      gradientFrom: "from-recreacion-pink/5",
      gradientTo: "to-recreacion-pink/20",
      type: "infantil",
      image: "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Integraciones Empresariales",
      description: "Actividades especializadas para potenciar el trabajo en equipo y mejorar el clima laboral.",
      icon: <Briefcase className="h-10 w-10 text-recreacion-blue" />,
      color: "bg-recreacion-blue/10",
      borderColor: "border-recreacion-blue/30",
      gradientFrom: "from-recreacion-blue/5",
      gradientTo: "to-recreacion-blue/20",
      type: "empresarial",
      image: "https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Eventos Corporativos",
      description: "Organizamos y animamos eventos corporativos, lanzamientos de producto y celebraciones de empresa.",
      icon: <Presentation className="h-10 w-10 text-recreacion-green" />,
      color: "bg-recreacion-green/10",
      borderColor: "border-recreacion-green/30",
      gradientFrom: "from-recreacion-green/5",
      gradientTo: "to-recreacion-green/20",
      type: "empresarial",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Celebraciones Especiales",
      description: "Organizamos cumpleaños, bautizos, comuniones y todo tipo de celebraciones infantiles.",
      icon: <Cake className="h-10 w-10 text-recreacion-orange" />,
      color: "bg-recreacion-orange/10",
      borderColor: "border-recreacion-orange/30",
      gradientFrom: "from-recreacion-orange/5",
      gradientTo: "to-recreacion-orange/20",
      type: "infantil",
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b19f?q=80&w=2036&auto=format&fit=crop"
    },
    {
      title: "Talleres Creativos",
      description: "Talleres de manualidades, arte y creatividad para desarrollar la imaginación de los pequeños.",
      icon: <Gift className="h-10 w-10 text-recreacion-green" />,
      color: "bg-recreacion-green/10",
      borderColor: "border-recreacion-green/30",
      gradientFrom: "from-recreacion-green/5",
      gradientTo: "to-recreacion-green/20",
      type: "infantil",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const tabVariants = {
    inactive: { scale: 1 },
    active: { scale: 1.05, transition: { type: "spring", stiffness: 300, damping: 20 } }
  };

  return (
    <section id="activities" className="py-20 bg-gradient-to-b from-white to-recreacion-blue/10">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-title">
            Nuestros <span className="text-recreacion-blue">Servicios Mágicos</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-montserrat">
            Ofrecemos una amplia gama de actividades para hacer de cada evento una experiencia única.
          </p>
        </motion.div>

        <div className="flex justify-center mb-10">
          <div className="flex p-1 bg-gray-100 rounded-full">
            <button
              onClick={() => setActiveTab("infantil")}
              className={cn(
                "px-6 py-3 rounded-full font-comic text-lg transition-all duration-300",
                activeTab === "infantil" 
                  ? "bg-white text-recreacion-orange shadow-md" 
                  : "text-gray-600 hover:text-recreacion-orange"
              )}
            >
              <motion.span
                variants={tabVariants}
                animate={activeTab === "infantil" ? "active" : "inactive"}
                className="flex items-center gap-2"
              >
                <Cake className="h-5 w-5" />
                Infantiles
              </motion.span>
            </button>
            <button
              onClick={() => setActiveTab("empresarial")}
              className={cn(
                "px-6 py-3 rounded-full font-comic text-lg transition-all duration-300",
                activeTab === "empresarial" 
                  ? "bg-white text-recreacion-blue shadow-md" 
                  : "text-gray-600 hover:text-recreacion-blue"
              )}
            >
              <motion.span 
                variants={tabVariants}
                animate={activeTab === "empresarial" ? "active" : "inactive"}
                className="flex items-center gap-2"
              >
                <Briefcase className="h-5 w-5" />
                Empresariales
              </motion.span>
            </button>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "show" : "hidden"}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities
              .filter(activity => activity.type === activeTab)
              .map((activity, index) => (
                <motion.div
                  key={activity.title}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="h-full"
                >
                  <Card 
                    className={cn(
                      "h-full border border-transparent hover:border-opacity-100 transition-all duration-300 overflow-hidden group rounded-3xl shadow-lg hover:shadow-xl bg-white",
                      activity.borderColor
                    )}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <AspectRatio ratio={16/9}>
                        <img 
                          src={activity.image} 
                          alt={activity.title} 
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=2070";
                            console.error(`Failed to load image for ${activity.title}`);
                          }}
                        />
                      </AspectRatio>
                      <div className={cn(
                        "absolute inset-0 bg-gradient-to-t opacity-70",
                        activity.gradientFrom,
                        activity.gradientTo
                      )} />
                    </div>
                    <CardContent className="p-8 relative">
                      <div className={cn(
                        "absolute -top-8 left-6 rounded-2xl p-4 shadow-lg transform transition-transform duration-300 group-hover:scale-110 border border-white/25",
                        activity.color
                      )}>
                        {activity.icon}
                      </div>
                      <h3 className="text-2xl font-comic mb-4 mt-4 group-hover:text-recreacion-blue transition-colors">
                        {activity.title}
                      </h3>
                      <p className="text-gray-600 font-montserrat">
                        {activity.description}
                      </p>
                      
                      <div className="mt-8 flex justify-end">
                        <button className="px-4 py-2 text-sm font-medium rounded-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 flex items-center gap-2 group-hover:border-recreacion-blue/30 transition-all">
                          <span>Más información</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                            <path d="m9 18 6-6-6-6"/>
                          </svg>
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl mx-auto border border-gray-100">
            <h3 className="text-2xl font-comic mb-4 text-recreacion-purple">¿Necesitas un servicio personalizado?</h3>
            <p className="text-gray-600 mb-6 font-montserrat">
              Contamos con un equipo de profesionales listos para crear una experiencia a la medida de tus necesidades.
            </p>
            <a href="/contacto" className="inline-block cloud-btn px-8 py-3 rounded-full text-lg font-comic bg-gradient-to-r from-recreacion-purple via-recreacion-blue to-recreacion-green bg-size-200 bg-pos-0 hover:bg-pos-100 text-white transition-all duration-500">
              ¡Contáctanos ahora!
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Activities;
