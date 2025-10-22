import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Clock, Calendar, Tag, ChevronLeft, User, Share2, Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";


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

// Datos de ejemplo para los artículos del blog (en producción, esto vendría de una API o CMS)
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "5 Trucos de Magia Sorprendentes para Fiestas Infantiles",
    excerpt: "Aprende estos 5 trucos de magia fáciles pero impactantes que harán que los niños queden maravillados en cualquier celebración o evento infantil.",
    content: `Los shows de magia son uno de los elementos más populares en las fiestas infantiles, capaces de crear momentos de asombro y diversión que los niños recordarán por mucho tiempo. En este artículo, te enseñamos cinco trucos de magia sencillos pero impactantes que puedes incorporar en tu próximo evento infantil. Desde la clásica moneda que desaparece hasta efectos visuales con cartas especialmente diseñadas para audiencias infantiles, estos trucos garantizan risas y aplausos. Lo mejor es que no necesitas ser un mago profesional para realizarlos, solo seguir nuestras instrucciones paso a paso y practicar un poco antes del gran día.

# Introducción a la Magia Infantil
La magia infantil es una disciplina que combina entretenimiento, creatividad y pedagogía. Los niños, por su naturaleza curiosa y su imaginación desbordante, son el público perfecto para los espectáculos de magia. Un show bien estructurado puede fomentar valores como la cooperación, la paciencia y la confianza en sí mismos. Además, la magia es una herramienta ideal para romper el hielo en fiestas y eventos, facilitando la integración de los pequeños invitados.

## Primer truco: La moneda viajera
Este clásico truco de la moneda que desaparece de una mano y aparece en otra siempre causa asombro entre los más pequeños. Para realizarlo, necesitarás una moneda y un poco de práctica en la técnica del "empalme francés", que consiste en ocultar la moneda en la palma de la mano mientras los dedos permanecen naturalmente extendidos. La clave está en la misdirección: mientras todos miran la mano que supuestamente contiene la moneda, la otra mano se prepara para revelarla en el momento adecuado. Practica frente al espejo y utiliza frases como "¿Dónde está la moneda?" para captar la atención.

![Moneda viajera](/lovable-uploads/eventos-magia-infantil-1.avif)

## Segundo truco: Cartas mágicas
Para este efecto, necesitarás un mazo de cartas especialmente preparado o puedes crear el tuyo propio con un poco de manualidad. El truco consiste en que el niño seleccione una carta, la devuelva al mazo, y tú, como mago, la encuentres de manera espectacular. Existen muchas variaciones de este efecto, desde encontrar la carta tras un abanico dramático hasta hacer que "salte" del mazo cuando lo lanzas al aire. Recuerda personalizar la historia para que los niños se sientan parte de la magia.

## Tercer truco: El lápiz flexible
Este es un efecto visual muy impactante que requiere un objeto cotidiano: un lápiz común. La ilusión consiste en hacer que el lápiz parezca volverse flexible como si fuera de goma. El secreto está en un movimiento específico de los dedos que crea esta ilusión óptica. La ventaja de este truco es que puede realizarse improvisadamente en cualquier momento de la fiesta, utilizando materiales que seguramente estarán disponibles.

## Cuarto truco: El pañuelo que cambia de color
Para este efecto necesitarás dos pañuelos de diferentes colores y un pequeño dispositivo llamado "thumb tip" que se puede adquirir en tiendas de magia. El truco consiste en hacer que un pañuelo de un color se transforme mágicamente en otro de diferente color. Este efecto visual es perfecto para integrar con la temática de la fiesta, utilizando los colores del evento o del personaje favorito del festejado.

## Quinto truco: Levitación de objetos pequeños
Este último truco permite hacer levitar pequeños objetos como clips, anillos o incluso golosinas. Existen varios métodos para lograr este efecto, desde el uso de hilos invisibles hasta técnicas más avanzadas con imanes o principios físicos. La versión más sencilla utiliza un hilo de nylon fino adherido estratégicamente a tu ropa, permitiéndote controlar el movimiento del objeto de manera que parezca desafiar la gravedad.

### Consejos para presentar los trucos
Recuerda que en la magia infantil, la presentación es tan importante como el truco en sí. Crea pequeñas historias alrededor de cada efecto, involucra a los niños haciéndolas preguntas o pidiéndoles que digan palabras mágicas. Mantén un ritmo dinámico y, sobre todo, practica lo suficiente para que los trucos fluyan naturalmente, permitiéndote concentrar en la interacción con tu joven audiencia.

### SEO y magia: cómo posicionar tu show
Además de aprender los trucos, es importante que los padres y organizadores de eventos encuentren tu espectáculo en internet. Utiliza palabras clave como "magia infantil", "shows para fiestas", "animación de eventos" y "trucos para niños" en la descripción de tus servicios. Incluye imágenes optimizadas y testimonios de clientes satisfechos para mejorar tu posicionamiento en buscadores.

### Conclusión
Estos cinco trucos son solo el comienzo. A medida que ganes confianza, podrás explorar efectos más elaborados o personalizar estos básicos para crear tu propio estilo de magia infantil. Lo más importante es divertirse y crear momentos mágicos que tanto los niños como tú disfrutaréis recordando. ¡Atrévete a sorprender y deja que la magia transforme cada celebración en un recuerdo inolvidable!

<meta name="description" content="Descubre los mejores trucos de magia para fiestas infantiles, consejos de presentación y cómo destacar tu show en internet. Artículo SEO completo para animadores y padres." />
`,
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
    content: "La decoración temática es el elemento que transforma una simple reunión en una experiencia inmersiva y mágica para los niños. En este artículo, exploramos las tendencias más populares en decoración para fiestas infantiles, desde los clásicos temas de superhéroes y princesas hasta conceptos más originales como expediciones espaciales o aventuras submarinas. Analizamos cómo utilizar elementos decorativos clave como backdrops personalizados, centros de mesa creativos, y efectos de iluminación para crear ambientes envolventes. También compartimos consejos prácticos para adaptar cualquier presupuesto a una decoración impactante, aprovechando recursos DIY y elementos reutilizables que maximizan el impacto visual sin comprometer la calidad.\n\nGuía Completa de Decoración Temática\nLa decoración temática es mucho más que globos y serpentinas. Es la oportunidad de crear un universo paralelo donde los niños puedan sumergirse y dejar volar su imaginación. Desde la elección del tema hasta la disposición de los elementos, cada detalle cuenta para lograr un ambiente mágico y memorable.\n\nSelección del tema adecuado\nEl primer paso para una decoración exitosa es elegir un tema que realmente emocione al festejado. Más allá de los personajes de moda, considera los intereses genuinos del niño: ¿le fascinan los dinosaurios, el espacio, los océanos o tal vez tiene una afición por la ciencia? Los temas conceptuales suelen ofrecer más posibilidades creativas que los basados únicamente en personajes comerciales. Además, pueden crecer con el niño, siendo adaptables a diferentes edades con solo ajustar el nivel de sofisticación de los elementos.\n\nCreación de zonas temáticas\nUna estrategia efectiva es dividir el espacio en diferentes áreas o estaciones, cada una representando un aspecto del tema elegido. Por ejemplo, para una fiesta de exploradores podrías tener: una zona de campamento con tiendas de campaña decorativas, un área de 'safari fotográfico' con props y backdrops de animales, y un rincón de 'supervivencia en la selva' donde se sirvan los alimentos. Esta segmentación no solo enriquece la experiencia visual sino que también ayuda a organizar las diferentes actividades de la celebración.\n\nEl poder de los backdrops\nEl telón de fondo o backdrop se ha convertido en un elemento imprescindible en las fiestas modernas. Actúa como punto focal para fotografías y define visualmente el tema. Existen múltiples opciones según presupuesto y habilidades: desde estructuras elaboradas con globos y flores, hasta sencillos fondos de tela con elementos superpuestos. Una tendencia creciente son los backdrops interactivos, que incorporan elementos con los que los niños pueden jugar o que pueden modificarse durante la fiesta, añadiendo un componente dinámico a la decoración.\n\nIluminación estratégica\nLa iluminación es quizás el recurso más infrautilizado en decoración infantil, pero tiene el poder de transformar dramáticamente cualquier espacio con una inversión relativamente pequeña. Tiras de luces LED en colores acordes al tema, proyectores de patrones simples, o incluso el uso estratégico de luces navideñas pueden crear ambientes mágicos. Para fiestas de día, considera el uso de elementos que interactúen con la luz natural, como móviles colgantes de materiales translúcidos que proyecten sombras coloridas.\n\nDecoración de mesas\nLas mesas, tanto la principal donde se exhibe la torta como las auxiliares para invitados, ofrecen oportunidades perfectas para reforzar el tema. Más allá de los tradicionales centros de mesa, considera crear pequeños escenarios temáticos utilizando juguetes, figuras en miniatura o elementos naturales. Los individuales personalizados, los portavasos temáticos y los marcadores de lugar creativos son detalles que elevan la experiencia y pueden servir también como recuerdos para los invitados.\n\nDecoración vertical y aprovechamiento del espacio",
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
    content: "Mantener a los niños entretenidos durante todo un evento puede ser un desafío, especialmente cuando la celebración se extiende por varias horas. En este artículo, presentamos una selección de juegos interactivos y dinámicas grupales diseñadas específicamente para captar la atención de los más pequeños y evitar momentos de aburrimiento. Desde circuitos de actividades rotativas hasta concursos temáticos adaptados a diferentes edades, estas propuestas garantizan la participación activa de todos los invitados. Además, incluimos recomendaciones sobre cómo estructurar los tiempos de juego, alternando momentos de alta energía con actividades más tranquilas, y cómo adaptar las dinámicas según el espacio disponible y la cantidad de participantes.\n\nPlanificación estratégica de actividades\n\nLa clave para mantener el interés de los niños durante todo el evento es la planificación estratégica de las actividades. Esto implica diseñar una secuencia de juegos que mantenga un ritmo dinámico, alternando momentos de alta energía con periodos más tranquilos. Comienza con actividades de bienvenida que permitan la integración gradual de los invitados a medida que van llegando, seguidas por juegos grupales más estructurados cuando ya estén todos presentes. Reserva las actividades que requieren mayor concentración para la mitad del evento, cuando los niños ya han liberado su energía inicial pero aún no están cansados.\n\nCircuitos de actividades rotativas\n\nUna estrategia efectiva para eventos largos es implementar circuitos de actividades donde los niños se dividen en pequeños grupos que van rotando por diferentes estaciones. Cada estación puede ofrecer una actividad distinta relacionada con el tema de la fiesta: desde manualidades sencillas y juegos de precisión hasta mini-competencias o experimentos. La rotación puede ocurrir cada 10-15 minutos, manteniendo la novedad constante y evitando que los niños pierdan interés. Esta modalidad también facilita la supervisión por parte de los adultos, ya que cada estación puede estar a cargo de un responsable específico.\n\nJuegos adaptables a diferentes edades\n\nUno de los mayores desafíos en fiestas infantiles es entretener a niños de diferentes edades simultáneamente. Para abordar esta situación, es recomendable incluir juegos con \"niveles\" adaptables. Por ejemplo, en una búsqueda del tesoro, los más pequeños pueden buscar objetos más visibles o recibir pistas adicionales, mientras que los mayores enfrentan desafíos más complejos. Otra alternativa es designar a los niños mayores como \"ayudantes\" o \"líderes de equipo\", otorgándoles responsabilidades que los mantengan comprometidos mientras apoyan a los más pequeños.\n\nJuegos que fomentan la creatividad\n\nLas actividades que estimulan la imaginación y creatividad suelen mantener el interés de los niños por periodos más prolongados. Considera incluir estaciones de arte con materiales diversos para creaciones libres, juegos de improvisación teatral donde deban representar situaciones divertidas, o desafíos de construcción con materiales reciclados. Estas actividades no solo entretienen sino que también permiten a cada niño expresarse a su manera y al ritmo que le resulte cómodo, reduciendo la presión competitiva que algunos juegos pueden generar.\n\nDinámicas musicales y de movimiento\n\nLa música es una herramienta poderosa para mantener la energía y el entusiasmo. Incorpora juegos clásicos como las sillas musicales o el baile de las estatuas, pero con variaciones temáticas acordes a la celebración. Las coreografías sencillas que los niños pueden aprender durante la fiesta también son excelentes recursos, especialmente si incluyen movimientos divertidos o exagerados. Para los momentos en que se necesite canalizar un exceso de energía, los circuitos de obstáculos o las mini-olimpiadas con pruebas físicas sencillas resultan ideales.\n\nJuegos tecnológicos moderados\n\nIncorporar elementos tecnológicos de manera moderada puede ser un complemento interesante. Aplicaciones interactivas proyectadas en una pared, juegos de realidad aumentada que combinen el mundo físico con elementos virtuales, o incluso sesiones breves de videojuegos colaborativos pueden ofrecer momentos de fascinación. Lo importante es que estos elementos tecnológicos fomenten la interacción entre los participantes en lugar de aislarlos, y que se utilicen como un componente más dentro de una variedad de actividades, no como el centro de la celebración.\n\nActividades sorpresa y momentos especiales\n\nPara mantener la expectativa durante todo el evento, es efectivo programar \"momentos especiales\" o actividades sorpresa en puntos estratégicos. Puede ser la aparición inesperada de un personaje, el descubrimiento colectivo de un mensaje secreto que lleva a una nueva actividad, o la revelación de un juego o premio especial. Estos elementos sorpresa renuevan la atención cuando el entusiasmo comienza a decaer y crean picos de emoción que los niños recordarán después del evento.\n\nEstrategias para el cierre del evento\n\nTan importante como mantener el entretenimiento durante la celebración es planificar adecuadamente el cierre. Las actividades finales deben permitir una disminución gradual de la energía, preparando a los niños para la transición hacia la despedida. Un proyecto colaborativo final donde todos contribuyan a crear algo que luego puedan llevarse como recuerdo, una sesión de cuentacuentos relacionada con el tema de la fiesta, o una actividad tranquila de cierre como soplar burbujas o liberar globos biodegradables puede proporcionar un final significativo y ordenado para la celebración.\n\nImplementar estas estrategias y juegos interactivos garantizará que los pequeños invitados permanezcan entretenidos y comprometidos durante toda la duración del evento, creando una experiencia fluida y placentera tanto para ellos como para los adultos acompañantes. La clave está en la variedad, la planificación estratégica y la capacidad de adaptación según se desarrolle la dinámica del grupo.",
    date: "2023-10-15",
    image: "/lovable-uploads/actividades-recreativas-4.avif",
    category: "consejos",
    author: "María Rodríguez",
    authorImage: "/lovable-uploads/13ad09_8a164a297289401d88029134e418a87c.avif",
    tags: ["juegos infantiles", "animación de eventos", "actividades para niños", "entretenimiento infantil"],
    readTime: 6
  },
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
    tags: ["animadores profesionales", "contratación de servicios", "fiestas infantiles", "eventos para niños"],
    readTime: 8
  }
];

const BlogArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<BlogPost | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<BlogPost[]>([]);

  useEffect(() => {
    // En un entorno real, aquí se haría una llamada a la API para obtener el artículo
    const articleId = parseInt(id || "1");
    const foundArticle = blogPosts.find(post => post.id === articleId);
    
    if (foundArticle) {
      setArticle(foundArticle);
      
      // Obtener artículos relacionados (misma categoría, excluyendo el actual)
      const related = blogPosts
        .filter(post => post.category === foundArticle.category && post.id !== foundArticle.id)
        .slice(0, 3);
      setRelatedArticles(related);
    }
  }, [id]);

  if (!article) {
    return <div className="container mx-auto px-4 py-20 text-center">Cargando artículo...</div>;
  }

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Breadcrumbs */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Inicio</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/blog">Blog</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{article.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Back button */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="group">
              <Link to="/blog" className="flex items-center text-gray-600 hover:text-recreacion-purple transition-colors">
                <ChevronLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Volver al blog
              </Link>
            </Button>
          </div>

          {/* Article header */}
          <div className="mb-8 text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-recreacion-purple/10 text-recreacion-purple hover:bg-recreacion-purple/20">
              {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-comic text-gray-900">
              {article.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6 font-montserrat">
              {article.excerpt}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                {new Date(article.date).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                {article.readTime} min de lectura
              </div>
              <div className="flex items-center">
                <User className="mr-1 h-4 w-4" />
                {article.author}
              </div>
            </div>
          </div>

          {/* Featured image */}
          <div className="mb-12 rounded-2xl overflow-hidden shadow-lg max-w-4xl mx-auto">
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-auto object-cover"
              style={{ maxHeight: '500px' }}
            />
          </div>

          {/* Article content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-8">
              <div className="prose prose-lg max-w-none font-montserrat">
                {article.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.includes(':\n')) {
                    const [title, content] = paragraph.split(':\n');
                    return (
                      <div key={index} className="mb-6">
                        <h3 className="text-xl font-bold mb-3 font-comic text-recreacion-blue">{title}:</h3>
                        <p>{content}</p>
                      </div>
                    );
                  }
                  return <p key={index} className="mb-6">{paragraph}</p>;
                })}
              </div>

              {/* Tags */}
              <div className="mt-8 flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-100 hover:bg-gray-200 text-gray-800">
                    <Tag className="mr-1 h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Author info */}
              <div className="mt-12 p-6 bg-gray-50 rounded-xl">
                <div className="flex items-center">
                  <img 
                    src={article.authorImage} 
                    alt={article.author} 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{article.author}</h3>
                    <p className="text-gray-600">Especialista en eventos infantiles y animación</p>
                  </div>
                </div>
              </div>

              {/* Share buttons */}
              <div className="mt-8">
                <h3 className="font-bold mb-4 flex items-center">
                  <Share2 className="mr-2 h-4 w-4" /> Compartir artículo
                </h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="rounded-full">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-full">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-full">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-full">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                {/* Related articles */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 font-comic text-recreacion-purple flex items-center">
                    <Sparkles className="mr-2 h-5 w-5" /> Artículos relacionados
                  </h3>
                  <div className="space-y-4">
                    {relatedArticles.length > 0 ? (
                      relatedArticles.map((related) => (
                        <Card key={related.id} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-4 flex items-center gap-4">
                            <img src={related.image} alt={related.title} className="w-16 h-16 object-cover rounded-lg" />
                            <div>
                              <Link to={`/blog/${related.id}`} className="font-bold text-recreacion-purple hover:underline">
                                {related.title}
                              </Link>
                              <p className="text-sm text-gray-500">{related.excerpt}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <p className="text-gray-500">No hay artículos relacionados.</p>
                    )}
                  </div>
                </div>
                {/* WhatsApp Button */}
                <div className="mt-8">
                  <WhatsAppButton phoneNumber="5215512345678" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default BlogArticlePage;