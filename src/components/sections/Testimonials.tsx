import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Ana Rodríguez",
      role: "Madre",
      content: "Contratamos a Recreación y Magia para el cumpleaños de mi hija y fue una experiencia increíble. Los animadores fueron energéticos y muy profesionales. Todos los niños se divirtieron muchísimo.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
    },
    {
      id: 2,
      name: "Roberto Gómez",
      role: "Director de Recursos Humanos",
      content: "Organizaron un evento corporativo para nuestra empresa que superó todas nuestras expectativas. Las dinámicas fueron muy originales y fomentaron el trabajo en equipo.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
    },
    {
      id: 3,
      name: "Carolina Martínez",
      role: "Organizadora de eventos",
      content: "He trabajado con Recreación y Magia en múltiples ocasiones y siempre entregan un servicio de primera. Su equipo es responsable y profesional, y saben adaptarse a cualquier tipo de evento.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
    },
    {
      id: 4,
      name: "Miguel Ángel Pérez",
      role: "Padre",
      content: "La animación que ofrecieron en la fiesta de cumpleaños de mi hijo fue espectacular. Los juegos, la música y las actividades mantuvieron a todos entretenidos durante horas.",
      rating: 4,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const prevSlide = () => {
    setActiveIndex((current) => 
      current === 0 ? Math.ceil(testimonials.length / 3) - 1 : current - 1
    );
  };

  const nextSlide = () => {
    setActiveIndex((current) => 
      current === Math.ceil(testimonials.length / 3) - 1 ? 0 : current + 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const touchEnd = e.touches[0].clientX;
    const diff = touchStart - touchEnd;

    // If diff is positive, swipe left (next slide)
    // If diff is negative, swipe right (prev slide)
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setTouchStart(null);
    }
  };

  const visibleTestimonials = [];
  for (let i = 0; i < 3; i++) {
    const index = (activeIndex * 3 + i) % testimonials.length;
    if (index < testimonials.length) {
      visibleTestimonials.push(testimonials[index]);
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
            Lo que Nuestros <span className="bg-gradient-to-r from-gigilove-blue to-gigilove-purple bg-clip-text text-transparent">Clientes Dicen</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-roboto">
            Nos enorgullece ofrecer experiencias memorables que dejen huella en nuestros clientes
          </p>
        </div>

        <div 
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              <div className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                  <Card 
                    key={testimonial.id}
                    className="border-none shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <CardContent className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg font-poppins">{testimonial.name}</h4>
                            <p className="text-gray-500 text-sm">{testimonial.role}</p>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 font-roboto italic">"{testimonial.content}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="absolute top-1/2 left-0 right-0 flex justify-between -translate-y-1/2 px-2 md:px-6">
            <Button
              onClick={prevSlide}
              variant="outline"
              size="icon"
              className="bg-white rounded-full shadow-lg hover:bg-gigilove-purple/10"
            >
              <ChevronLeft className="w-5 h-5 text-gigilove-purple" />
            </Button>
            <Button
              onClick={nextSlide}
              variant="outline"
              size="icon"
              className="bg-white rounded-full shadow-lg hover:bg-gigilove-purple/10"
            >
              <ChevronRight className="w-5 h-5 text-gigilove-purple" />
            </Button>
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {[...Array(Math.ceil(testimonials.length / 3))].map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeIndex === index ? "bg-gigilove-purple scale-125" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
