
import { useState, useEffect } from "react";
import { WhatsApp, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  phoneNumber: string;
}

const WhatsAppButton = ({ phoneNumber }: WhatsAppButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    } else {
      window.open(`https://wa.me/${phoneNumber}`, "_blank");
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 transition-all duration-500",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      )}
    >
      <div
        onClick={handleClick}
        className={cn(
          "flex items-center cursor-pointer transition-all duration-500 shadow-lg",
          isOpen
            ? "bg-white rounded-xl p-4 pr-6"
            : "bg-green-500 hover:bg-green-600 rounded-full p-3"
        )}
      >
        {isOpen && (
          <button
            onClick={handleClose}
            className="absolute top-1 right-1 bg-gray-100 rounded-full p-1 hover:bg-gray-200 transition-colors"
          >
            <X size={14} />
          </button>
        )}
        <div
          className={cn(
            "flex items-center gap-2 justify-center",
            isAnimating && "animate-bounce-light"
          )}
        >
          <div className="relative">
            <WhatsApp
              size={isOpen ? 28 : 32}
              className={cn(
                "text-white transition-all duration-300",
                isOpen && "text-green-500"
              )}
            />
            {!isOpen && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            )}
          </div>
          {isOpen && (
            <div className="ml-2">
              <p className="font-bold text-gray-800 text-sm">¡Contáctanos ahora!</p>
              <p className="text-xs text-gray-600">Respuesta inmediata</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhatsAppButton;
