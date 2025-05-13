
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Star, Heart, ThumbsUp } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-title text-left">
              Sobre <span className="text-recreacion-purple">Nosotros</span>
            </h2>
            <p className="text-gray-600 text-lg mb-6 font-montserrat">
              En Recreación y Magia nos dedicamos a crear experiencias memorables para personas de todas las edades. Fundada con la misión de llevar diversión y magia a cada evento, nuestra empresa se ha convertido en un referente de calidad y creatividad en el sector de la recreación y entretenimiento.
            </p>
            <p className="text-gray-600 text-lg mb-6 font-montserrat">
              Nuestro equipo está formado por profesionales apasionados que aportan energía, originalidad y entusiasmo a cada uno de nuestros eventos. Nos esforzamos por superar las expectativas de nuestros clientes, ofreciendo servicios personalizados que se adaptan a sus necesidades específicas.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="bg-recreacion-orange/20 p-2 rounded-full">
                  <Sparkles className="w-4 h-4 text-recreacion-orange" />
                </div>
                <span className="font-medium">Creatividad</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-recreacion-purple/20 p-2 rounded-full">
                  <Star className="w-4 h-4 text-recreacion-purple" />
                </div>
                <span className="font-medium">Profesionalismo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-recreacion-blue/20 p-2 rounded-full">
                  <Heart className="w-4 h-4 text-recreacion-blue" />
                </div>
                <span className="font-medium">Diversión</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-recreacion-green/20 p-2 rounded-full">
                  <ThumbsUp className="w-4 h-4 text-recreacion-green" />
                </div>
                <span className="font-medium">Calidad</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <img
                src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                alt="Niños jugando y divirtiéndose"
                className="rounded-2xl shadow-lg object-cover h-48 md:h-64 w-full"
              />
              <img
                src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                alt="Show de magia para niños"
                className="rounded-2xl shadow-lg object-cover h-48 md:h-64 w-full mt-8 md:mt-12"
              />
              <img
                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNoaWxkcmVuJTIwcGxheWluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Actividades infantiles al aire libre"
                className="rounded-2xl shadow-lg object-cover h-48 md:h-64 w-full"
              />
              <img
                src="https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y2hpbGRyZW4lMjBwYXJ0eXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Animación infantil y recreación"
                className="rounded-2xl shadow-lg object-cover h-48 md:h-64 w-full mt-8 md:mt-12"
              />
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="section-title">
            Nuestro <span className="text-recreacion-green">Equipo</span>
          </h3>
          <div className="max-w-2xl mx-auto text-center">
            <Card className="border-none shadow-lg overflow-hidden rounded-2xl bg-white p-8">
              <CardContent className="p-0">
                <p className="text-lg text-gray-600 mb-6 font-montserrat">
                  Contamos con un equipo dinámico de animadores, magos, recreacionistas y coordinadores de eventos, todos ellos profesionales en sus áreas y con amplia experiencia en entretenimiento infantil y empresarial.
                </p>
                <p className="text-lg text-gray-600 font-montserrat">
                  Nuestro personal está capacitado para adaptarse a las necesidades específicas de cada evento, asegurando que tanto niños como adultos disfruten de una experiencia inolvidable.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
