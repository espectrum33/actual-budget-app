
import { Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Festival de Juegos Infantiles",
      date: "15 de Junio, 2023",
      time: "10:00 AM - 4:00 PM",
      location: "Parque Central",
      image: "https://images.unsplash.com/photo-1576328077645-8dd5cedd4237?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNoaWxkcmVuJTIwcGxheWluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      description: "Un día lleno de diversión con juegos tradicionales, inflables, pintura facial y mucho más."
    },
    {
      id: 2,
      title: "Taller de Recreación Familiar",
      date: "22 de Junio, 2023",
      time: "2:00 PM - 6:00 PM",
      location: "Centro Comunitario Las Palmas",
      image: "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGZhbWlseSUyMGFjdGl2aXRpZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      description: "Aprende actividades divertidas que puedes realizar con toda la familia en casa."
    },
    {
      id: 3,
      title: "Fiesta de Disfraces",
      date: "30 de Junio, 2023",
      time: "7:00 PM - 10:00 PM",
      location: "Salón de Eventos Estrella",
      image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29zdHVtZSUyMHBhcnR5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      description: "Ven con tu mejor disfraz y disfruta de una noche llena de música, concursos y premios."
    },
  ];

  return (
    <section id="events" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
            Eventos <span className="bg-gradient-to-r from-gigilove-yellow to-gigilove-orange bg-clip-text text-transparent">Próximos</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-roboto">
            No te pierdas nuestras actividades programadas. ¡Diversión garantizada para toda la familia!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => (
            <div 
              key={event.id} 
              className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white group"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-white text-xl font-semibold font-poppins">{event.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-gray-600 mb-3">
                  <Calendar className="h-4 w-4 mr-2 text-gigilove-orange" />
                  <span className="text-sm font-roboto">{event.date}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-3">
                  <Clock className="h-4 w-4 mr-2 text-gigilove-purple" />
                  <span className="text-sm font-roboto">{event.time}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-2 text-gigilove-blue" />
                  <span className="text-sm font-roboto">{event.location}</span>
                </div>
                <p className="text-gray-600 mb-6 font-roboto">
                  {event.description}
                </p>
                <Button 
                  className="w-full bg-gradient-to-r from-gigilove-purple to-gigilove-blue text-white hover:opacity-90 transition-all"
                >
                  Inscríbete
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button 
            variant="outline" 
            className="border-gigilove-purple text-gigilove-purple hover:bg-gigilove-purple/10"
          >
            Ver Todos los Eventos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Events;
