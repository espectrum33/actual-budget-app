import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Users, PartyPopper, Music, Cake, Gift } from "lucide-react";

const Activities = () => {
  const activities = [
    {
      title: "Shows de Magia",
      description: "Espectáculos de magia e ilusionismo profesionales especialmente diseñados para niños y familias.",
      icon: <Sparkles className="h-10 w-10 text-gigilove-purple" />,
      color: "bg-gigilove-purple/10",
    },
    {
      title: "Animación Infantil",
      description: "Juegos, dinámicas y actividades divertidas dirigidas por nuestro equipo de animadores profesionales.",
      icon: <Users className="h-10 w-10 text-gigilove-orange" />,
      color: "bg-gigilove-orange/10",
    },
    {
      title: "Fiestas Temáticas",
      description: "Organizamos fiestas con temáticas personalizadas según los gustos y preferencias de los niños.",
      icon: <PartyPopper className="h-10 w-10 text-gigilove-blue" />,
      color: "bg-gigilove-blue/10",
    },
    {
      title: "Música y Baile",
      description: "Actividades musicales interactivas que fomentan el movimiento y la expresión corporal.",
      icon: <Music className="h-10 w-10 text-gigilove-purple" />,
      color: "bg-gigilove-purple/10",
    },
    {
      title: "Celebraciones Especiales",
      description: "Organizamos cumpleaños, bautizos, comuniones y todo tipo de celebraciones infantiles.",
      icon: <Cake className="h-10 w-10 text-gigilove-orange" />,
      color: "bg-gigilove-orange/10",
    },
    {
      title: "Talleres Creativos",
      description: "Talleres de manualidades, arte y creatividad para desarrollar la imaginación de los pequeños.",
      icon: <Gift className="h-10 w-10 text-gigilove-blue" />,
      color: "bg-gigilove-blue/10",
    },
  ];

  return (
    <section id="activities" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
            Nuestros <span className="bg-gradient-to-r from-gigilove-orange to-gigilove-purple bg-clip-text text-transparent">Servicios Mágicos</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-roboto">
            Ofrecemos una amplia gama de actividades y espectáculos de magia para hacer de cada evento una experiencia única.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <Card 
              key={index}
              className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <CardContent className="p-8">
                <div className={`${activity.color} p-4 rounded-full inline-block mb-6 transition-transform group-hover:scale-110`}>
                  {activity.icon}
                </div>
                <h3 className="text-2xl font-semibold font-poppins mb-4 group-hover:text-gigilove-purple transition-colors">
                  {activity.title}
                </h3>
                <p className="text-gray-600 font-roboto">
                  {activity.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Activities;
