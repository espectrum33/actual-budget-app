
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white bg-opacity-95 shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="#" className="flex items-center">
              <span className="text-2xl font-bold font-poppins bg-gradient-to-r from-gigilove-orange to-gigilove-purple bg-clip-text text-transparent">
                GigiLove
              </span>
              <span className="text-2xl font-poppins ml-1">Recreaciones</span>
            </a>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-gigilove-purple hover:bg-gigilove-purple/10"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t mt-2 animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <NavLinks mobile onClick={toggleMenu} />
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinksProps {
  mobile?: boolean;
  onClick?: () => void;
}

const NavLinks = ({ mobile, onClick }: NavLinksProps) => {
  const navItems = [
    { name: "Inicio", href: "#hero" },
    { name: "Actividades", href: "#activities" },
    { name: "Eventos", href: "#events" },
    { name: "Sobre Nosotros", href: "#about" },
    { name: "Contacto", href: "#contact" },
  ];

  return (
    <>
      {navItems.map((item) => (
        <a
          key={item.name}
          href={item.href}
          onClick={onClick}
          className={`${
            mobile
              ? "block py-2 text-center"
              : "inline-block"
          } font-medium text-gray-600 hover:text-gigilove-purple transition-colors duration-200 relative group`}
        >
          {item.name}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gigilove-orange to-gigilove-purple transition-all duration-300 group-hover:w-full"></span>
        </a>
      ))}
      <Button
        className={`${
          mobile ? "w-full" : ""
        } bg-gradient-to-r from-gigilove-orange to-gigilove-purple hover:opacity-90 transition-all duration-300`}
      >
        ¡Regístrate!
      </Button>
    </>
  );
};

export default Header;
