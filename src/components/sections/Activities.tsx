
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Music, Users, Gift, Camera, Heart } from "lucide-react";

const Activities = () => {
  const activities = [
    {
      title: "Animación Infantil",
      description: "Contamos con un equipo de animadores profesionales que harán de tu evento una experiencia inolvidable.",
      icon: <Users className="h-10 w-10 text-gigilove-purple" />,
      color: "bg-gigilove-purple/10",
    },
    {
      title: "Shows Musicales",
      description: "Presentaciones musicales en vivo para amenizar cualquier tipo de evento o celebración.",
      icon: <Music className="h-10 w-10 text-gigilove-orange" />,
      color: "bg-gigilove-orange/10",
    },
    {
      title: "Juegos y Dinámicas",
      description: "Gran variedad de actividades lúdicas y recreativas para todas las edades.",
      icon: <Activity className="h-10 w-10 text-gigilove-blue" />,
      color: "bg-gigilove-blue/10",
    },
    {
      title: "Eventos Corporativos",
      description: "Organización de eventos para empresas, team building y actividades para empleados.",
      icon: <Gift className="h-10 w-10 text-gigilove-purple" />,
      color: "bg-gigilove-purple/10",
    },
    {
      title: "Fotografía y Video",
      description: "Capturamos los momentos más especiales de tu evento para que puedas revivirlos cuando quieras.",
      icon: <Camera className="h-10 w-10 text-gigilove-orange" />,
      color: "bg-gigilove-orange/10",
    },
    {
      title: "Eventos Especiales",
      description: "Celebraciones temáticas, cumpleaños, bodas, baby showers y mucho más.",
      icon: <Heart className="h-10 w-10 text-gigilove-blue" />,
      color: "bg-gigilove-blue/10",
    },
  ];

  return (
    <section id="activities" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
            Nuestras <span className="bg-gradient-to-r from-gigilove-orange to-gigilove-purple bg-clip-text text-transparent">Actividades</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-roboto">
            Ofrecemos una amplia gama de servicios de recreación para todo tipo de eventos y celebraciones.
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
