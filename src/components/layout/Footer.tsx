
import { Facebook, Instagram, Twitter, Youtube, ArrowRight, MagicWand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8">
          <div>
            <div className="mb-4">
              <a href="#" className="flex items-center">
                <MagicWand className="h-6 w-6 mr-2 text-gigilove-orange" />
                <span className="text-2xl font-bold font-poppins bg-gradient-to-r from-gigilove-orange to-gigilove-purple bg-clip-text text-transparent">
                  Recreación
                </span>
                <span className="text-2xl font-poppins ml-1 text-white">y Magia</span>
              </a>
            </div>
            <p className="text-gray-400 mb-6 font-roboto">
              Creando momentos mágicos y experiencias inolvidables para niños de todas las edades. Magia, diversión y aprendizaje en cada evento.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gigilove-purple/20 hover:bg-gigilove-purple/30 p-2 rounded-full transition-colors">
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a href="#" className="bg-gigilove-purple/20 hover:bg-gigilove-purple/30 p-2 rounded-full transition-colors">
                <Instagram className="h-5 w-5 text-white" />
              </a>
              <a href="#" className="bg-gigilove-purple/20 hover:bg-gigilove-purple/30 p-2 rounded-full transition-colors">
                <Twitter className="h-5 w-5 text-white" />
              </a>
              <a href="#" className="bg-gigilove-purple/20 hover:bg-gigilove-purple/30 p-2 rounded-full transition-colors">
                <Youtube className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 font-poppins">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#hero" className="text-gray-400 hover:text-white transition-colors">Inicio</a>
              </li>
              <li>
                <a href="#activities" className="text-gray-400 hover:text-white transition-colors">Actividades</a>
              </li>
              <li>
                <a href="#events" className="text-gray-400 hover:text-white transition-colors">Eventos</a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">Sobre Nosotros</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contacto</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 font-poppins">Servicios</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Shows de Magia</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Animación Infantil</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Fiestas Temáticas</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Cumpleaños Mágicos</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Talleres Creativos</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 font-poppins">Boletín Informativo</h3>
            <p className="text-gray-400 mb-4 font-roboto">
              Suscríbete para recibir nuestras últimas novedades y promociones.
            </p>
            <div className="flex space-x-2">
              <Input
                placeholder="Tu correo electrónico"
                className="bg-gray-800 border-gray-700 focus:border-gigilove-purple"
              />
              <Button className="bg-gradient-to-r from-gigilove-orange to-gigilove-purple hover:opacity-90">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 pb-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Recreación y Magia. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
                Términos y Condiciones
              </a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
                Política de Privacidad
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
