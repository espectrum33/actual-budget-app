
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white bg-opacity-95 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <motion.div 
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="mr-2"
            >
              <Sparkles className="h-6 w-6 text-recreacion-purple" />
            </motion.div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="text-xl sm:text-2xl font-bold font-comic bg-gradient-to-r from-recreacion-orange to-recreacion-purple bg-clip-text text-transparent">
                Recreación
              </span>
              <span className="text-xl sm:text-2xl font-comic ml-1">y Magia</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLinks currentPath={location.pathname} />
          </nav>

          {/* Mobile Menu */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-recreacion-purple hover:bg-recreacion-purple/10 md:hidden"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] max-w-sm bg-white p-0">
                <div className="h-full bg-gradient-to-b from-white to-recreacion-blue/5 p-6">
                  <div className="flex items-center mb-8">
                    <Sparkles className="h-5 w-5 mr-2 text-recreacion-purple" />
                    <span className="text-xl font-bold font-comic bg-gradient-to-r from-recreacion-orange to-recreacion-purple bg-clip-text text-transparent">
                      Recreación y Magia
                    </span>
                  </div>
                  <nav className="flex flex-col space-y-6">
                    <NavLinks mobile currentPath={location.pathname} />
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
};

interface NavLinksProps {
  mobile?: boolean;
  currentPath: string;
  onClick?: () => void;
}

const NavLinks = ({ mobile, currentPath, onClick }: NavLinksProps) => {
  const navItems = [
    { name: "Inicio", href: "/" },
    { name: "Actividades", href: "/actividades" },
    { name: "Sobre Nosotros", href: "/sobre-nosotros" },
    { name: "Eventos", href: "/eventos" },
    { name: "Blog", href: "/blog" },
    { name: "Testimonios", href: "/testimonios" },
    { name: "Contacto", href: "/contacto" },
  ];

  return (
    <>
      {navItems.map((item) => {
        const isActive = 
          (item.href === "/" && currentPath === "/") || 
          (item.href !== "/" && currentPath.startsWith(item.href));

        return mobile ? (
          <motion.div
            key={item.name}
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link
              to={item.href}
              onClick={onClick}
              className={`flex items-center space-x-2 font-medium text-lg ${
                isActive ? "text-recreacion-purple" : "text-gray-600"
              } hover:text-recreacion-purple transition-colors duration-200`}
            >
              {isActive && (
                <motion.div 
                  layoutId="nav-indicator"
                  className="w-1 h-6 bg-gradient-to-b from-recreacion-orange to-recreacion-purple rounded-full mr-2"
                />
              )}
              <span>{item.name}</span>
            </Link>
          </motion.div>
        ) : (
          <Link
            key={item.name}
            to={item.href}
            onClick={onClick}
            className={`inline-block font-medium ${
              isActive ? "text-recreacion-purple" : "text-gray-600"
            } hover:text-recreacion-purple transition-colors duration-200 relative group`}
          >
            {item.name}
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-recreacion-orange to-recreacion-purple transition-all duration-300 ${
              isActive ? "w-full" : "w-0 group-hover:w-full"
            }`}></span>
          </Link>
        );
      })}
      <div className={mobile ? "pt-4" : ""}>
        <Link to="/contacto">
          <Button
            className={`${
              mobile ? "w-full" : ""
            } cloud-btn bg-recreacion-yellow text-black hover:opacity-90 transition-all duration-300 font-medium ${
              mobile ? "mt-4" : ""
            }`}
            onClick={onClick}
          >
            <span className="z-10 relative">¡Reserva Ahora!</span>
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Header;
