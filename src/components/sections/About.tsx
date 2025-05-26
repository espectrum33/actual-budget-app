
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Star, Heart, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Fixed image URLs
const ABOUT_IMAGES = {
  img1: "/lovable-uploads/eventos-magia-infantil-1.avif",
  img2: "/lovable-uploads/actividades-recreacion-2.avif",
  img3: "/lovable-uploads/fiesta-infantil-3.avif",
  img4: "/lovable-uploads/13ad09_506ccb6588250eb61e68b7fb4d1d7e9b.avif",
  fallback: "/lovable-uploads/13ad09_995212c57adaead909ed96c686ed9100.avif"
};

const About = () => {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Preload images
    Object.entries(ABOUT_IMAGES).forEach(([key, src]) => {
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
    
    const section = document.getElementById('about');
    if (section) observer.observe(section);
    
    return () => observer.disconnect();
  }, []);

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

  const imageHoverVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    }
  };

  return (
    <section id="about" className="py-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <h2 className="section-title text-left">
              Sobre <motion.span 
                className="text-recreacion-purple inline-block"
                animate={{ 
                  y: [0, -5, 0],
                  rotateZ: [0, 2, 0, -2, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}  
              >
                Nosotros
              </motion.span>
            </h2>
            <p className="text-gray-600 text-lg mb-6 font-montserrat">
              En Recreación y Magia nos dedicamos a crear experiencias memorables para personas de todas las edades. Fundada con la misión de llevar diversión y magia a cada evento, nuestra empresa se ha convertido en un referente de calidad y creatividad en el sector de la recreación y entretenimiento.
            </p>
            <p className="text-gray-600 text-lg mb-6 font-montserrat">
              Nuestro equipo está formado por profesionales apasionados que aportan energía, originalidad y entusiasmo a cada uno de nuestros eventos. Nos esforzamos por superar las expectativas de nuestros clientes, ofreciendo servicios personalizados que se adaptan a sus necesidades específicas.
            </p>
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={containerVariants}
            >
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                variants={itemVariants}
              >
                <motion.div 
                  className="bg-recreacion-orange/20 p-2 rounded-full"
                  animate={{ 
                    boxShadow: [
                      "0 0 0 rgba(255, 153, 102, 0)",
                      "0 0 10px rgba(255, 153, 102, 0.5)",
                      "0 0 0 rgba(255, 153, 102, 0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-4 h-4 text-recreacion-orange" />
                </motion.div>
                <span className="font-medium">Creatividad</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                variants={itemVariants}
              >
                <motion.div 
                  className="bg-recreacion-purple/20 p-2 rounded-full"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Star className="w-4 h-4 text-recreacion-purple" />
                </motion.div>
                <span className="font-medium">Profesionalismo</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                variants={itemVariants}
              >
                <motion.div 
                  className="bg-recreacion-blue/20 p-2 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Heart className="w-4 h-4 text-recreacion-blue" />
                </motion.div>
                <span className="font-medium">Diversión</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                variants={itemVariants}
              >
                <motion.div 
                  className="bg-recreacion-green/20 p-2 rounded-full"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ThumbsUp className="w-4 h-4 text-recreacion-green" />
                </motion.div>
                <span className="font-medium">Calidad</span>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div className="relative" variants={itemVariants}>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <motion.div 
                className="relative rounded-2xl shadow-lg overflow-hidden"
                whileHover="hover"
                variants={imageHoverVariants}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={ABOUT_IMAGES.img1}
                  alt="Niños jugando y divirtiéndose"
                  className="rounded-2xl object-cover h-48 md:h-64 w-full transition-opacity duration-500"
                  style={{ opacity: loadedImages.img1 ? 1 : 0 }}
                  onError={(e) => {
                    e.currentTarget.src = ABOUT_IMAGES.fallback;
                    setLoadedImages(prev => ({ ...prev, img1: true }));
                  }}
                />
                {!loadedImages.img1 && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                {/* Decorative elements */}
                <motion.div 
                  className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-recreacion-pink"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <motion.div 
                className="relative rounded-2xl shadow-lg overflow-hidden mt-8 md:mt-12"
                whileHover="hover"
                variants={imageHoverVariants}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={ABOUT_IMAGES.img2}
                  alt="Show de magia para niños"
                  className="rounded-2xl object-cover h-48 md:h-64 w-full transition-opacity duration-500"
                  style={{ opacity: loadedImages.img2 ? 1 : 0 }}
                  onError={(e) => {
                    e.currentTarget.src = ABOUT_IMAGES.fallback;
                    setLoadedImages(prev => ({ ...prev, img2: true }));
                  }}
                />
                {!loadedImages.img2 && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                {/* Decorative elements */}
                <motion.div 
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-recreacion-green"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
              </motion.div>
              <motion.div 
                className="relative rounded-2xl shadow-lg overflow-hidden"
                whileHover="hover"
                variants={imageHoverVariants}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={ABOUT_IMAGES.img3}
                  alt="Actividades infantiles al aire libre"
                  className="rounded-2xl object-cover h-48 md:h-64 w-full transition-opacity duration-500"
                  style={{ opacity: loadedImages.img3 ? 1 : 0 }}
                  onError={(e) => {
                    e.currentTarget.src = ABOUT_IMAGES.fallback;
                    setLoadedImages(prev => ({ ...prev, img3: true }));
                  }}
                />
                {!loadedImages.img3 && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                {/* Decorative elements */}
                <motion.div 
                  className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full bg-recreacion-blue"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
              </motion.div>
              <motion.div 
                className="relative rounded-2xl shadow-lg overflow-hidden mt-8 md:mt-12"
                whileHover="hover"
                variants={imageHoverVariants}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={ABOUT_IMAGES.img4}
                  alt="Animación infantil y recreación"
                  className="rounded-2xl object-cover h-48 md:h-64 w-full transition-opacity duration-500"
                  style={{ opacity: loadedImages.img4 ? 1 : 0 }}
                  onError={(e) => {
                    e.currentTarget.src = ABOUT_IMAGES.fallback;
                    setLoadedImages(prev => ({ ...prev, img4: true }));
                  }}
                />
                {!loadedImages.img4 && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                {/* Decorative elements */}
                <motion.div 
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-recreacion-orange"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                />
              </motion.div>
            </div>

            {/* Floating decoration */}
            <motion.div
              className="absolute -z-10 w-40 h-40 rounded-full bg-gradient-to-r from-recreacion-pink to-recreacion-purple opacity-20 blur-3xl"
              animate={{ 
                x: [0, 30, 0],
                y: [0, -30, 0],
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse" 
              }}
              style={{ top: '20%', right: '-10%' }}
            />
            <motion.div
              className="absolute -z-10 w-32 h-32 rounded-full bg-gradient-to-r from-recreacion-blue to-recreacion-green opacity-20 blur-3xl"
              animate={{ 
                x: [0, -20, 0],
                y: [0, 20, 0],
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse" 
              }}
              style={{ bottom: '10%', left: '-5%' }}
            />
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-20"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h3 
            className="section-title"
            variants={itemVariants}
          >
            Nuestro <span className="text-recreacion-green">Equipo</span>
          </motion.h3>
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            variants={itemVariants}
          >
            <motion.div 
              whileHover={{ 
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Card className="border-none shadow-lg overflow-hidden rounded-2xl bg-white p-8 backdrop-blur-sm bg-white/90">
                <CardContent className="p-0">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    <p className="text-lg text-gray-600 mb-6 font-montserrat leading-relaxed">
                      Contamos con un equipo dinámico de animadores, magos, recreacionistas y coordinadores de eventos, todos ellos profesionales en sus áreas y con amplia experiencia en entretenimiento infantil y empresarial.
                    </p>
                    <p className="text-lg text-gray-600 font-montserrat leading-relaxed">
                      Nuestro personal está capacitado para adaptarse a las necesidades específicas de cada evento, asegurando que tanto niños como adultos disfruten de una experiencia inolvidable.
                    </p>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
