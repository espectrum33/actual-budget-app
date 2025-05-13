
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
      title: "Los mejores trucos de magia para sorprender a los niños",
      excerpt: "Descubre los trucos de magia más impresionantes y fáciles de aprender para entretener a los niños en cualquier evento.",
      content: "Contenido completo del artículo...",
      date: "2025-05-01",
      image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=2070&auto=format&fit=crop",
      category: "magia",
      author: "Carlos Mágico",
      authorImage: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop",
      tags: ["magia", "niños", "eventos"],
      readTime: 5
    },
    {
      id: 2,
      title: "Tendencias en decoración para fiestas infantiles en 2025",
      excerpt: "Las últimas tendencias en decoración que harán que tu fiesta sea inolvidable para los más pequeños.",
      content: "Contenido completo del artículo...",
      date: "2025-04-28",
      image: "https://images.unsplash.com/photo-1524117074681-31bd4de22ad3?q=80&w=2070&auto=format&fit=crop",
      category: "tendencias",
      author: "Laura Diseñadora",
      authorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2076&auto=format&fit=crop",
      tags: ["decoración", "fiestas", "tendencias"],
      readTime: 7
    },
    {
      id: 3,
      title: "Cómo mantener entretenidos a los niños durante un evento largo",
      excerpt: "Consejos prácticos para que los niños no se aburran durante eventos que pueden resultar largos para ellos.",
      content: "Contenido completo del artículo...",
      date: "2025-04-15",
      image: "https://images.unsplash.com/photo-1576404425726-000c751eecda?q=80&w=1974&auto=format&fit=crop",
      category: "consejos",
      author: "María Educadora",
      authorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
      tags: ["niños", "eventos", "entretenimiento"],
      readTime: 6
    }
  ];

  const blogPosts: BlogPost[] = [
    {
      id: 4,
      title: "Actividades al aire libre para fiestas infantiles",
      excerpt: "Descubre las mejores actividades para realizar al aire libre y mantener entretenidos a los niños.",
      content: "Contenido completo del artículo...",
      date: "2025-03-20",
      image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?q=80&w=2069&auto=format&fit=crop",
      category: "actividades",
      author: "Pedro Animador",
      authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
      tags: ["juegos", "exterior", "diversión"],
      readTime: 4
    },
    {
      id: 5,
      title: "Cómo elegir la temática perfecta para un cumpleaños",
      excerpt: "Guía paso a paso para seleccionar la temática ideal según los gustos y edad del niño.",
      content: "Contenido completo del artículo...",
      date: "2025-03-15",
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=2070&auto=format&fit=crop",
      category: "consejos",
      author: "Ana Planificadora",
      authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
      tags: ["temáticas", "cumpleaños", "planificación"],
      readTime: 8
    },
    {
      id: 6,
      title: "Los colores y su efecto psicológico en la decoración de eventos",
      excerpt: "Aprende cómo utilizar el poder de los colores para crear el ambiente perfecto en cualquier celebración.",
      content: "Contenido completo del artículo...",
      date: "2025-03-05",
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=2070&auto=format&fit=crop",
      category: "tendencias",
      author: "Miguel Psicólogo",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
      tags: ["psicología", "colores", "decoración"],
      readTime: 10
    },
    {
      id: 7,
      title: "Trucos para fotos memorables en eventos infantiles",
      excerpt: "Consejos de fotógrafos profesionales para capturar los mejores momentos en las celebraciones de los más pequeños.",
      content: "Contenido completo del artículo...",
      date: "2025-02-28",
      image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=2075&auto=format&fit=crop",
      category: "consejos",
      author: "Lucía Fotógrafa",
      authorImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071&auto=format&fit=crop",
      tags: ["fotografía", "momentos", "recuerdos"],
      readTime: 6
    },
    {
      id: 8,
      title: "Juegos tradicionales que nunca pasan de moda",
      excerpt: "Una recopilación de juegos clásicos que siguen divirtiendo a generaciones de niños.",
      content: "Contenido completo del artículo...",
      date: "2025-02-20",
      image: "https://images.unsplash.com/photo-1610890778028-b89d3b37ae3e?q=80&w=1996&auto=format&fit=crop",
      category: "actividades",
      author: "Roberto Historiador",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
      tags: ["juegos", "tradición", "diversión"],
      readTime: 7
    },
    {
      id: 9,
      title: "La importancia de la música en las fiestas infantiles",
      excerpt: "Cómo elegir la música adecuada para crear el ambiente perfecto para cada edad.",
      content: "Contenido completo del artículo...",
      date: "2025-02-15",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop",
      category: "eventos",
      author: "Carmen Musicóloga",
      authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop",
      tags: ["música", "ambiente", "celebración"],
      readTime: 5
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
                          {post.title}
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
                          <Button variant="ghost" className="text-recreacion-purple hover:bg-recreacion-purple/10 p-0 h-auto rounded-full">
                            <ArrowRight className="h-5 w-5" />
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
                        {post.title}
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
                        <Button variant="ghost" className="text-recreacion-purple hover:bg-recreacion-purple/10 p-0 h-auto rounded-full">
                          <ArrowRight className="h-5 w-5" />
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
