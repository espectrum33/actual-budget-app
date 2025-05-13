
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Users, PartyPopper, Music, Cake, Gift, Briefcase, PresentationChart } from "lucide-react";

const Activities = () => {
  const activities = [
    {
      title: "Shows de Magia",
      description: "Espectáculos de magia e ilusionismo profesionales especialmente diseñados para niños y familias.",
      icon: <Sparkles className="h-10 w-10 text-recreacion-purple" />,
      color: "bg-recreacion-purple/10",
      type: "infantil"
    },
    {
      title: "Animación Infantil",
      description: "Juegos, dinámicas y actividades divertidas dirigidas por nuestro equipo de animadores profesionales.",
      icon: <Users className="h-10 w-10 text-recreacion-orange" />,
      color: "bg-recreacion-orange/10",
      type: "infantil"
    },
    {
      title: "Fiestas Temáticas",
      description: "Organizamos fiestas con temáticas personalizadas según los gustos y preferencias de los niños.",
      icon: <PartyPopper className="h-10 w-10 text-recreacion-blue" />,
      color: "bg-recreacion-blue/10",
      type: "infantil"
    },
    {
      title: "Música y Baile",
      description: "Actividades musicales interactivas que fomentan el movimiento y la expresión corporal.",
      icon: <Music className="h-10 w-10 text-recreacion-pink" />,
      color: "bg-recreacion-pink/10",
      type: "infantil"
    },
    {
      title: "Integraciones Empresariales",
      description: "Actividades especializadas para potenciar el trabajo en equipo y mejorar el clima laboral.",
      icon: <Briefcase className="h-10 w-10 text-recreacion-blue" />,
      color: "bg-recreacion-blue/10",
      type: "empresarial"
    },
    {
      title: "Eventos Corporativos",
      description: "Organizamos y animamos eventos corporativos, lanzamientos de producto y celebraciones de empresa.",
      icon: <PresentationChart className="h-10 w-10 text-recreacion-green" />,
      color: "bg-recreacion-green/10",
      type: "empresarial"
    },
    {
      title: "Celebraciones Especiales",
      description: "Organizamos cumpleaños, bautizos, comuniones y todo tipo de celebraciones infantiles.",
      icon: <Cake className="h-10 w-10 text-recreacion-orange" />,
      color: "bg-recreacion-orange/10",
      type: "infantil"
    },
    {
      title: "Talleres Creativos",
      description: "Talleres de manualidades, arte y creatividad para desarrollar la imaginación de los pequeños.",
      icon: <Gift className="h-10 w-10 text-recreacion-green" />,
      color: "bg-recreacion-green/10",
      type: "infantil"
    },
  ];

  return (
    <section id="activities" className="py-20 bg-gradient-to-b from-white to-recreacion-blue/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Nuestros <span className="text-recreacion-blue">Servicios Mágicos</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-montserrat">
            Ofrecemos una amplia gama de actividades para hacer de cada evento una experiencia única.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-comic text-center mb-8 text-recreacion-orange">
            Servicios para Fiestas Infantiles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.filter(activity => activity.type === "infantil").map((activity, index) => (
              <Card 
                key={index}
                className="border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group rounded-2xl card-hover bg-white"
              >
                <CardContent className="p-8">
                  <div className={`${activity.color} p-4 rounded-full inline-block mb-6 transition-transform group-hover:scale-110`}>
                    {activity.icon}
                  </div>
                  <h3 className="text-2xl font-comic mb-4 group-hover:text-recreacion-blue transition-colors">
                    {activity.title}
                  </h3>
                  <p className="text-gray-600 font-montserrat">
                    {activity.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-comic text-center mb-8 text-recreacion-blue">
            Servicios Empresariales
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activities.filter(activity => activity.type === "empresarial").map((activity, index) => (
              <Card 
                key={index}
                className="border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group rounded-2xl card-hover bg-white"
              >
                <CardContent className="p-8">
                  <div className={`${activity.color} p-4 rounded-full inline-block mb-6 transition-transform group-hover:scale-110`}>
                    {activity.icon}
                  </div>
                  <h3 className="text-2xl font-comic mb-4 group-hover:text-recreacion-blue transition-colors">
                    {activity.title}
                  </h3>
                  <p className="text-gray-600 font-montserrat">
                    {activity.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Activities;
