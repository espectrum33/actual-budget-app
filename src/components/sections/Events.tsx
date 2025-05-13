
import { MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Festival de Juegos Infantiles",
      location: "Parque Central",
      image: "https://images.unsplash.com/photo-1544776193-2d1f2c937f93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2hpbGRyZW4lMjBwbGF5aW5nJTIwZ2FtZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      description: "Un día lleno de diversión con juegos tradicionales, inflables, pintura facial y mucho más."
    },
    {
      id: 2,
      title: "Taller de Recreación Familiar",
      location: "Centro Comunitario Las Palmas",
      image: "https://images.unsplash.com/photo-1607276624133-77380dfc5ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGZhbWlseSUyMGFjdGl2aXRpZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      description: "Aprende actividades divertidas que puedes realizar con toda la familia en casa."
    },
    {
      id: 3,
      title: "Fiesta de Disfraces",
      location: "Salón de Eventos Estrella",
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbGRyZW4lMjBjb3N0dW1lJTIwcGFydHl8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      description: "Ven con tu mejor disfraz y disfruta de una noche llena de música, concursos y premios."
    },
  ];

  return (
    <section id="events" className="py-20 bg-recreacion-yellow/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Eventos <span className="text-recreacion-orange">Próximos</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-montserrat">
            No te pierdas nuestras actividades programadas. ¡Diversión garantizada para toda la familia!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => (
            <div 
              key={event.id} 
              className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white group card-hover"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                  <h3 className="text-white text-xl font-semibold font-comic">{event.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-2 text-recreacion-pink" />
                  <span className="text-sm font-montserrat">{event.location}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <Clock className="h-4 w-4 mr-2 text-recreacion-blue" />
                  <span className="text-sm font-montserrat">Sábados, Domingos y Festivos</span>
                </div>
                <p className="text-gray-600 mb-6 font-montserrat">
                  {event.description}
                </p>
                <a href="#contact">
                  <Button 
                    className="w-full cloud-btn bg-recreacion-blue hover:bg-recreacion-blue/90 text-white transition-all"
                  >
                    Inscríbete
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button 
            variant="outline" 
            className="border-recreacion-purple text-recreacion-purple hover:bg-recreacion-purple/10 font-medium"
          >
            Ver Todos los Eventos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Events;
