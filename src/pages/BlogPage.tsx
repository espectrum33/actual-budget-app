
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Search, Clock, Calendar, Tag, ChevronRight, User, ArrowRight, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardHeader
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { Link } from "react-router-dom";

// Tipo para los artículos del blog
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  category: string;
  author: string;
  authorImage: string;
  tags: string[];
  readTime: number;
}

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simular carga
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { id: "todos", name: "Todos" },
    { id: "eventos", name: "Eventos" },
    { id: "consejos", name: "Consejos" },
    { id: "magia", name: "Magia" },
    { id: "tendencias", name: "Tendencias" }
  ];

  const featuredPosts: BlogPost[] = [
    {
      id: 1,
      title: "5 Trucos de Magia Sorprendentes para Fiestas Infantiles",
      excerpt: "Aprende estos 5 trucos de magia fáciles pero impactantes que harán que los niños queden maravillados en cualquier celebración o evento infantil.",
      content: "Los shows de magia son uno de los elementos más populares en las fiestas infantiles, capaces de crear momentos de asombro y diversión que los niños recordarán por mucho tiempo. En este artículo, te enseñamos cinco trucos de magia sencillos pero impactantes que puedes incorporar en tu próximo evento infantil. Desde la clásica moneda que desaparece hasta efectos visuales con cartas especialmente diseñadas para audiencias infantiles, estos trucos garantizan risas y aplausos. Lo mejor es que no necesitas ser un mago profesional para realizarlos, solo seguir nuestras instrucciones paso a paso y practicar un poco antes del gran día.",
      date: "2023-11-15",
      image: "/lovable-uploads/eventos-magia-infantil-1.avif",
      category: "magia",
      author: "Carlos Martínez",
      authorImage: "/lovable-uploads/13ad09_c294a5a971414b109cc39b664b06c7c1.avif",
      tags: ["magia infantil", "trucos para niños", "animación de fiestas", "shows infantiles"],
      readTime: 5
    },
    {
      id: 2,
      title: "Decoración Temática: Cómo Crear Ambientes Mágicos para Fiestas Infantiles",
      excerpt: "Descubre las últimas tendencias en decoración temática y cómo transformar cualquier espacio en un mundo de fantasía para la fiesta perfecta.",
      content: "La decoración temática es el elemento que transforma una simple reunión en una experiencia inmersiva y mágica para los niños. En este artículo, exploramos las tendencias más populares en decoración para fiestas infantiles, desde los clásicos temas de superhéroes y princesas hasta conceptos más originales como expediciones espaciales o aventuras submarinas. Analizamos cómo utilizar elementos decorativos clave como backdrops personalizados, centros de mesa creativos, y efectos de iluminación para crear ambientes envolventes. También compartimos consejos prácticos para adaptar cualquier presupuesto a una decoración impactante, aprovechando recursos DIY y elementos reutilizables que maximizan el impacto visual sin comprometer la calidad.",
      date: "2023-10-28",
      image: "/lovable-uploads/fiesta-tematica-5.avif",
      category: "tendencias",
      author: "Laura Gómez",
      authorImage: "/lovable-uploads/13ad09_bbd20cdc1738855a64b9862b44be022c.avif",
      tags: ["decoración infantil", "fiestas temáticas", "tendencias en eventos", "ambientación"],
      readTime: 7
    },
    {
      id: 3,
      title: "Juegos Interactivos que Mantienen a los Niños Entretenidos Durante Todo el Evento",
      excerpt: "Estrategias probadas y juegos dinámicos para mantener a los pequeños invitados completamente entretenidos durante celebraciones largas.",
      content: "Mantener a los niños entretenidos durante todo un evento puede ser un desafío, especialmente cuando la celebración se extiende por varias horas. En este artículo, presentamos una selección de juegos interactivos y dinámicas grupales diseñadas específicamente para captar la atención de los más pequeños y evitar momentos de aburrimiento. Desde circuitos de actividades rotativas hasta concursos temáticos adaptados a diferentes edades, estas propuestas garantizan la participación activa de todos los invitados. Además, incluimos recomendaciones sobre cómo estructurar los tiempos de juego, alternando momentos de alta energía con actividades más tranquilas, y cómo adaptar las dinámicas según el espacio disponible y la cantidad de participantes.",
      date: "2023-10-15",
      image: "/lovable-uploads/actividades-recreativas-4.avif",
      category: "consejos",
      author: "María Rodríguez",
      authorImage: "/lovable-uploads/13ad09_8a164a297289401d88029134e418a87c.avif",
      tags: ["juegos infantiles", "animación de eventos", "actividades para niños", "entretenimiento infantil"],
      readTime: 6
    }
  ];

  const blogPosts: BlogPost[] = [
    {
      id: 10,
      title: "Animadores Infantiles: Cómo Elegir al Profesional Perfecto para tu Evento",
      excerpt: "Guía completa con los criterios esenciales para seleccionar al animador que garantizará el éxito de tu celebración infantil.",
      content: "Contratar al animador adecuado puede marcar la diferencia entre una fiesta ordinaria y una experiencia extraordinaria para los niños. Este artículo presenta los criterios fundamentales que debes considerar al seleccionar un profesional de la animación infantil, desde su experiencia y especialización hasta su capacidad para adaptarse a diferentes públicos y situaciones imprevistas. Analizamos la importancia de verificar referencias, revisar material audiovisual de eventos anteriores y mantener entrevistas previas para evaluar la conexión del animador con el perfil de los asistentes. También ofrecemos una lista de preguntas clave que debes hacer antes de contratar, relacionadas con el contenido del espectáculo, necesidades técnicas, política de cancelaciones y otros aspectos logísticos importantes. Complementamos esta información con testimonios de padres y organizadores sobre los beneficios de contar con animación profesional frente a soluciones improvisadas.",
      date: "2023-07-25",
      image: "/lovable-uploads/13ad09_462c6c457c8f52fdfa7e458aa26d30e3.avif",
      category: "eventos",
      author: "Javier Torres",
      authorImage: "/lovable-uploads/13ad09_f6109295874f456fa43ff9745c07abbf.avif",
      tags: ["animadores profesionales", "contratación de servicios", "shows infantiles", "organización de eventos"],
      readTime: 7
    },
    {
      id: 11,
      title: "Magia Educativa: Cómo los Trucos de Ilusionismo Potencian el Aprendizaje Infantil",
      excerpt: "Descubre cómo la magia puede convertirse en una poderosa herramienta pedagógica que estimula múltiples habilidades cognitivas y sociales en los niños.",
      content: "La magia va mucho más allá del entretenimiento cuando se aplica con objetivos educativos. Este artículo explora el concepto de 'magia educativa', una metodología innovadora que utiliza trucos e ilusiones como vehículo para el aprendizaje significativo. Analizamos los beneficios cognitivos que aporta la magia, como el desarrollo del pensamiento crítico, la mejora de la concentración, el estímulo de la creatividad y el refuerzo de habilidades matemáticas y científicas. También abordamos su impacto positivo en aspectos socioemocionales, ayudando a niños tímidos a ganar confianza, fomentando el trabajo en equipo y enseñando valores como la perseverancia. Presentamos ejemplos prácticos de trucos sencillos vinculados a diferentes áreas curriculares, desde matemáticas y física hasta literatura e historia, que padres y educadores pueden implementar tanto en entornos festivos como académicos.",
      date: "2023-07-10",
      image: "/lovable-uploads/Magia-y-recracion.avif",
      category: "magia",
      author: "Elena Vargas",
      authorImage: "/lovable-uploads/13ad09_b5f12e308c45464ba8d374300ba49c40.avif",
      tags: ["magia educativa", "aprendizaje lúdico", "desarrollo infantil", "pedagogía alternativa"],
      readTime: 9
    },
    {
      id: 4,
      title: "10 Actividades al Aire Libre para Animar Fiestas Infantiles",
      excerpt: "Descubre actividades divertidas y seguras para realizar en espacios abiertos que garantizarán el éxito de tu próxima fiesta infantil.",
      content: "Organizar actividades al aire libre es una excelente manera de aprovechar los espacios abiertos y permitir que los niños liberen energía de forma saludable durante las celebraciones. En este artículo, presentamos diez propuestas de juegos y dinámicas especialmente diseñadas para entretener a grupos de diferentes edades en jardines, parques o patios. Desde circuitos de obstáculos y búsquedas del tesoro temáticas hasta juegos de agua para días calurosos y actividades creativas con elementos naturales, estas ideas combinan diversión, ejercicio y aprendizaje. Además, incluimos recomendaciones de seguridad para cada actividad y alternativas para adaptar las propuestas según las condiciones climáticas.",
      date: "2023-09-20",
      image: "/lovable-uploads/actividades-recreacion-2.avif",
      category: "actividades",
      author: "Pedro Sánchez",
      authorImage: "/lovable-uploads/13ad09_a9b656a4c23343a1ac29e765273b82c7.avif",
      tags: ["juegos al aire libre", "actividades infantiles", "fiestas en exterior", "recreación infantil"],
      readTime: 6
    },
    {
      id: 5,
      title: "Guía Completa para Elegir la Temática Perfecta para el Cumpleaños de tu Hijo",
      excerpt: "Aprende a seleccionar la temática ideal que encantará a tu hijo y facilitará la organización de una celebración coherente y memorable.",
      content: "La elección de la temática es uno de los primeros y más importantes pasos en la planificación de un cumpleaños infantil exitoso. En esta guía completa, analizamos los factores clave que debes considerar para seleccionar un tema que no solo emocione al festejado, sino que también sea práctico de implementar. Exploramos cómo evaluar los intereses actuales del niño, considerar la edad y personalidad, y valorar las posibilidades que ofrece cada temática en términos de decoración, actividades y gastronomía. Presentamos un análisis detallado de las temáticas más populares por rangos de edad, desde opciones para preescolares hasta preadolescentes, con ejemplos concretos de cómo desarrollar cada concepto de manera integral y coherente en todos los aspectos de la celebración.",
      date: "2023-09-15",
      image: "/lovable-uploads/fiesta-infantil-3.avif",
      category: "consejos",
      author: "Ana Morales",
      authorImage: "/lovable-uploads/13ad09_6efb3142bba1429199dd1e52b6aaaa17.avif",
      tags: ["temáticas infantiles", "planificación de cumpleaños", "fiestas personalizadas", "celebraciones infantiles"],
      readTime: 8
    },
    {
      id: 6,
      title: "Psicología del Color: Cómo Crear Ambientes Emocionalmente Positivos en Eventos Infantiles",
      excerpt: "Descubre cómo utilizar estratégicamente los colores para estimular emociones específicas y crear espacios que potencien la diversión y el bienestar de los niños.",
      content: "Los colores tienen un impacto profundo en nuestras emociones y comportamiento, especialmente en los niños, quienes son particularmente sensibles a los estímulos visuales. Este artículo profundiza en la psicología del color aplicada a eventos infantiles, explicando cómo cada tonalidad puede influir en el estado de ánimo y la experiencia de los pequeños invitados. Analizamos las combinaciones cromáticas más efectivas según el tipo de evento y la edad de los participantes, desde paletas energizantes ideales para actividades dinámicas hasta esquemas más relajantes para momentos de creatividad o descanso. También ofrecemos pautas prácticas para implementar estas estrategias cromáticas en elementos decorativos, vestuario, iluminación y hasta en la presentación de alimentos, creando una experiencia visual coherente que refuerce el tema del evento y promueva las emociones deseadas.",
      date: "2023-09-05",
      image: "/lovable-uploads/13ad09_995212c57adaead909ed96c686ed9100.avif",
      category: "tendencias",
      author: "Miguel Herrera",
      authorImage: "/lovable-uploads/13ad09_4ac12714c20d44f3a3e0cde37694b036.avif",
      tags: ["psicología infantil", "decoración con colores", "ambientación de eventos", "diseño de experiencias"],
      readTime: 10
    },
    {
      id: 7,
      title: "Fotografía Infantil: Técnicas para Capturar Momentos Auténticos en Celebraciones",
      excerpt: "Aprende estrategias profesionales para documentar de manera natural y emotiva los momentos más especiales de las fiestas infantiles.",
      content: "Capturar la espontaneidad y alegría genuina de los niños durante una celebración requiere técnicas específicas que van más allá de la fotografía convencional. En este artículo, fotógrafos especializados en eventos infantiles comparten sus mejores estrategias para documentar momentos auténticos y emotivos. Desde la preparación del equipo adecuado y la configuración óptima de la cámara para diferentes condiciones de iluminación, hasta técnicas de composición que resaltan las expresiones naturales y la interacción entre los niños. Exploramos el enfoque documental que permite narrar visualmente la historia del evento, identificando momentos clave como la llegada de invitados, reacciones ante sorpresas, juegos grupales y, por supuesto, los rituales tradicionales como soplar las velas o abrir regalos. También incluimos consejos para involucrar a los niños en el proceso fotográfico de manera divertida, logrando su cooperación sin sacrificar la naturalidad.",
      date: "2023-08-28",
      image: "/lovable-uploads/13ad09_506ccb6588250eb61e68b7fb4d1d7e9b.avif",
      category: "consejos",
      author: "Lucía Jiménez",
      authorImage: "/lovable-uploads/13ad09_930ab2902b55450ba41d4d2e9cc6daab.avif",
      tags: ["fotografía infantil", "recuerdos de eventos", "técnicas fotográficas", "documentación de fiestas"],
      readTime: 7
    },
    {
      id: 8,
      title: "Juegos Tradicionales Reinventados: Cómo Adaptar Clásicos para las Nuevas Generaciones",
      excerpt: "Redescubre juegos de toda la vida con un toque moderno que fascinará a los niños de hoy mientras preservas la esencia de estas actividades atemporales.",
      content: "Los juegos tradicionales han entretenido a generaciones de niños gracias a su simplicidad y capacidad para fomentar habilidades fundamentales. Sin embargo, captar la atención de los más pequeños en la era digital puede requerir algunas adaptaciones creativas. Este artículo explora cómo reinventar juegos clásicos como la gallinita ciega, el escondite, las carreras de sacos o el pañuelo, incorporando elementos temáticos, tecnología accesible o variaciones en las reglas que los hagan más dinámicos y atractivos para los niños contemporáneos. Para cada juego, presentamos múltiples versiones adaptadas a diferentes edades, espacios y número de participantes, manteniendo siempre los beneficios originales en términos de desarrollo físico, cognitivo y social. Además, incluimos testimonios de educadores y animadores que han implementado estas versiones actualizadas con gran éxito en diversos eventos infantiles.",
      date: "2023-08-20",
      image: "/lovable-uploads/13ad09_cbc133ff8bcc4f43b5f98d92911385ac.avif",
      category: "actividades",
      author: "Roberto Díaz",
      authorImage: "/lovable-uploads/13ad09_861c2e3508be42bfa4df2b5ee1def88b.avif",
      tags: ["juegos tradicionales", "actividades grupales", "animación infantil", "juegos adaptados"],
      readTime: 8
    },
    {
      id: 9,
      title: "La Banda Sonora Perfecta: Creando Listas de Reproducción por Edades para Eventos Infantiles",
      excerpt: "Guía especializada para seleccionar la música ideal que mantendrá la energía y diversión en cada momento de la celebración según la edad de los participantes.",
      content: "La música es un elemento fundamental que establece el ritmo y la atmósfera de cualquier celebración infantil. Este artículo ofrece una guía completa para crear listas de reproducción efectivas y apropiadas para diferentes grupos de edad, desde bebés y preescolares hasta preadolescentes. Analizamos los géneros musicales más adecuados para cada etapa de desarrollo, considerando preferencias típicas, capacidad de atención y nivel de energía. Proporcionamos recomendaciones específicas de canciones organizadas por momentos del evento: música de bienvenida, canciones para actividades dirigidas, temas para bailes libres y melodías más tranquilas para momentos de comida o despedida. También incluimos consejos técnicos sobre equipos de sonido adecuados según el espacio, volumen recomendado para proteger los oídos infantiles y aplicaciones útiles para gestionar las listas de reproducción de manera eficiente durante el evento.",
      date: "2023-08-15",
      image: "/lovable-uploads/13ad09_d1314dfa45674cdebe64ba09122392f0.avif",
      category: "eventos",
      author: "Carmen Vega",
      authorImage: "/lovable-uploads/13ad09_6059cd25dee485b8d888f935c2bd4271.avif",
      tags: ["música infantil", "ambientación sonora", "listas de reproducción", "entretenimiento musical"],
      readTime: 6
    }
  ];

  // Filtrar posts según la categoría seleccionada y el término de búsqueda
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "todos" || post.category === selectedCategory;
    const matchesSearch = searchTerm === "" || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Variantes para animaciones
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
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-recreacion-blue/5 to-recreacion-purple/5">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="bg-recreacion-purple/20 text-recreacion-purple hover:bg-recreacion-purple/30 mb-4">
              Nuestro Blog
            </Badge>
            <h1 className="text-4xl md:text-5xl font-comic font-bold mb-6 text-gray-800">
              Blog y <span className="text-recreacion-purple">Noticias</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Descubre las últimas tendencias, consejos y trucos para hacer de cada evento una experiencia mágica e inolvidable.
            </p>
            
            {/* Buscador */}
            <div className="max-w-md mx-auto relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  type="text" 
                  placeholder="Buscar artículos..." 
                  className="pl-10 pr-4 py-6 rounded-full border-gray-300 focus:border-recreacion-purple focus:ring focus:ring-recreacion-purple/20 transition"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Posts Carousel */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 flex justify-between items-center">
            <h2 className="text-2xl md:text-3xl font-comic font-bold text-gray-800">
              Destacados <span className="text-recreacion-orange">esta semana</span>
            </h2>
            <Link to="/blog" className="text-recreacion-purple font-medium flex items-center hover:underline">
              Ver todos
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {featuredPosts.map((post) => (
                <CarouselItem key={post.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <motion.div 
                    initial="hidden"
                    animate={isLoaded ? "show" : "hidden"}
                    variants={itemVariants}
                    transition={{ duration: 0.5 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="h-full"
                  >
                    <Card className="overflow-hidden h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
                      <div className="relative h-60">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                        />
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-white/80 backdrop-blur-sm text-recreacion-purple hover:bg-white">
                            {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex items-center text-sm text-gray-500 space-x-4 mb-1">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(post.date).toLocaleDateString('es-ES', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {post.readTime} min
                          </span>
                        </div>
                        <h3 className="text-xl font-bold font-comic hover:text-recreacion-blue transition-colors duration-200 line-clamp-2">
                          <Link to={`/blog/${post.title.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-')}`}>
                            {post.title}
                          </Link>
                        </h3>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 line-clamp-3 mb-4 text-sm">
                          {post.excerpt}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <img 
                              src={post.authorImage} 
                              alt={post.author} 
                              className="w-8 h-8 rounded-full mr-2 object-cover"
                            />
                            <span className="text-sm font-medium">{post.author}</span>
                          </div>
                          <Button variant="ghost" className="text-recreacion-purple hover:bg-recreacion-purple/10 p-0 h-auto rounded-full" asChild>
                            <Link to={`/blog/${post.title.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-')}`}>
                              <ArrowRight className="h-5 w-5" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-6 bg-white border-0 shadow-md hover:bg-gray-50" />
            <CarouselNext className="-right-4 md:-right-6 bg-white border-0 shadow-md hover:bg-gray-50" />
          </Carousel>
        </div>
      </section>
      
      {/* Categories Filter */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-recreacion-purple text-white shadow-md"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-recreacion-purple/10"
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <motion.div
                  key={post.id}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card className="overflow-hidden h-full border-0 shadow hover:shadow-xl transition-all duration-300 rounded-xl">
                    <div className="relative h-48">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?q=80&w=2069&auto=format&fit=crop";
                        }}
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/80 backdrop-blur-sm text-recreacion-purple hover:bg-white">
                          {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-center text-sm text-gray-500 space-x-4 mb-1">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(post.date).toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {post.readTime} min
                        </span>
                      </div>
                      <h3 className="text-lg font-bold font-comic hover:text-recreacion-blue transition-colors duration-200 line-clamp-2">
                        <Link to={`/blog/${post.title.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-')}`}>
                          {post.title}
                        </Link>
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 line-clamp-2 mb-4 text-sm">
                        {post.excerpt}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <img 
                            src={post.authorImage} 
                            alt={post.author} 
                            className="w-8 h-8 rounded-full mr-2 object-cover"
                          />
                          <span className="text-sm font-medium">{post.author}</span>
                        </div>
                        <Button variant="ghost" className="text-recreacion-purple hover:bg-recreacion-purple/10 p-0 h-auto rounded-full" asChild>
                          <Link to={`/blog/${post.title.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-')}`}>
                            <ArrowRight className="h-5 w-5" />
                          </Link>
                        </Button>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="outline" className="bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 py-16 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Search className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-2xl font-comic font-bold text-gray-700 mb-2">No se encontraron artículos</h3>
                  <p className="text-gray-500 mb-6">Prueba con otros términos de búsqueda o selecciona otra categoría</p>
                  <Button 
                    onClick={() => {setSelectedCategory("todos"); setSearchTerm("");}}
                    className="bg-recreacion-orange hover:bg-recreacion-orange/90 text-white"
                  >
                    Ver todos los artículos
                  </Button>
                </motion.div>
              </div>
            )}
          </motion.div>
          
          {/* Pagination */}
          {filteredPosts.length > 0 && (
            <div className="mt-16 flex justify-center">
              <nav className="flex space-x-2" aria-label="Pagination">
                <Button 
                  variant="outline"
                  className="flex items-center gap-1 border-gray-200 rounded-lg"
                  disabled
                >
                  <ArrowLeft className="h-4 w-4" />
                  Anterior
                </Button>
                <Button
                  className="bg-recreacion-purple hover:bg-recreacion-purple/90 text-white rounded-lg"
                >
                  1
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-200 text-gray-700 rounded-lg"
                >
                  2
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-200 text-gray-700 rounded-lg"
                >
                  3
                </Button>
                <Button 
                  variant="outline"
                  className="flex items-center gap-1 border-gray-200 rounded-lg"
                >
                  Siguiente
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </nav>
            </div>
          )}
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-recreacion-purple/20 to-recreacion-blue/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-comic font-bold mb-4 text-gray-800">
                  ¿No quieres perderte <span className="text-recreacion-purple">ningún artículo</span>?
                </h2>
                <p className="text-lg text-gray-600">
                  Suscríbete a nuestro boletín y recibe contenido exclusivo directamente en tu bandeja de entrada.
                </p>
              </motion.div>
            </div>
            
            <div className="max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input 
                  type="email" 
                  placeholder="Tu correo electrónico" 
                  className="rounded-full py-6 border-gray-300 focus:border-recreacion-purple focus:ring focus:ring-recreacion-purple/20 transition"
                />
                <Button className="bg-gradient-to-r from-recreacion-orange to-recreacion-purple text-white rounded-full py-6 hover:opacity-90 transition">
                  Suscribirme
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-4 text-center">
                Al suscribirte, aceptas recibir nuestro boletín y nuestra política de privacidad.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      <WhatsAppButton phoneNumber="3114824976" />
    </div>
  );
};

export default BlogPage;
