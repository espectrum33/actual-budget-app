
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const team = [
    {
      name: "Gisela López",
      role: "Directora Creativa",
      bio: "Con más de 10 años de experiencia en recreación y animación infantil, Gisela es el corazón de GigiLove Recreaciones.",
      image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
    },
    {
      name: "Carlos Mendoza",
      role: "Coordinador de Eventos",
      bio: "Especialista en logística y organización de eventos masivos. Garantiza que cada detalle esté perfectamente ejecutado.",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
    },
    {
      name: "Mariana Torres",
      role: "Animadora Principal",
      bio: "Su energía contagiosa y creatividad hacen que cada evento sea único. Especialista en dinámicas grupales y entretenimiento.",
      image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
    },
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">
              Sobre <span className="bg-gradient-to-r from-gigilove-orange to-gigilove-purple bg-clip-text text-transparent">Nosotros</span>
            </h2>
            <p className="text-gray-600 text-lg mb-6 font-roboto">
              En GigiLove Recreaciones nos dedicamos a crear experiencias memorables para personas de todas las edades. Fundada en 2015, nuestra empresa ha crecido hasta convertirse en un referente de calidad y creatividad en el sector de la recreación y entretenimiento.
            </p>
            <p className="text-gray-600 text-lg mb-6 font-roboto">
              Nuestro equipo está formado por profesionales apasionados que aportan energía, originalidad y entusiasmo a cada uno de nuestros eventos. Nos esforzamos por superar las expectativas de nuestros clientes, ofreciendo servicios personalizados que se adaptan a sus necesidades específicas.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="bg-gigilove-orange/20 p-2 rounded-full">
                  <div className="w-3 h-3 bg-gigilove-orange rounded-full"></div>
                </div>
                <span className="font-medium">Creatividad</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-gigilove-purple/20 p-2 rounded-full">
                  <div className="w-3 h-3 bg-gigilove-purple rounded-full"></div>
                </div>
                <span className="font-medium">Profesionalismo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-gigilove-blue/20 p-2 rounded-full">
                  <div className="w-3 h-3 bg-gigilove-blue rounded-full"></div>
                </div>
                <span className="font-medium">Diversión</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-gigilove-yellow/20 p-2 rounded-full">
                  <div className="w-3 h-3 bg-gigilove-yellow rounded-full"></div>
                </div>
                <span className="font-medium">Calidad</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <img
                src="https://images.unsplash.com/photo-1491013516836-7db643ee125a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                alt="Niños jugando y divirtiéndose"
                className="rounded-lg shadow-lg object-cover h-48 md:h-64 w-full"
              />
              <img
                src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                alt="Show de magia para niños"
                className="rounded-lg shadow-lg object-cover h-48 md:h-64 w-full mt-8 md:mt-12"
              />
              <img
                src="https://images.unsplash.com/photo-1535572290543-960a8046f5af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                alt="Actividades infantiles al aire libre"
                className="rounded-lg shadow-lg object-cover h-48 md:h-64 w-full"
              />
              <img
                src="https://images.unsplash.com/photo-1576687790126-2c1ffdc94d99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                alt="Animación infantil y recreación"
                className="rounded-lg shadow-lg object-cover h-48 md:h-64 w-full mt-8 md:mt-12"
              />
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl md:text-3xl font-bold font-poppins text-center mb-12">
            Nuestro <span className="bg-gradient-to-r from-gigilove-purple to-gigilove-blue bg-clip-text text-transparent">Equipo</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-none shadow-lg overflow-hidden group">
                <CardContent className="p-0">
                  <div className="overflow-hidden h-64">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold mb-1 font-poppins">{member.name}</h4>
                    <p className="text-gigilove-purple font-medium mb-4">{member.role}</p>
                    <p className="text-gray-600 font-roboto">{member.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
