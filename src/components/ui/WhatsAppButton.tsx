
import { MessageCircle, Phone, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface WhatsAppButtonProps {
  phoneNumber: string;
}

const WhatsAppButton = ({ phoneNumber }: WhatsAppButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  const handleCallClick = () => {
    window.open(`tel:${phoneNumber}`, "_blank");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => {
      clearTimeout(timer);
      // Make sure to set isExpanded to false when unmounting to avoid transition issues
      setIsExpanded(false);
    };
  }, []);

  // Handle clicks outside the component to close expanded menu
  useEffect(() => {
    if (!isExpanded) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  const buttonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.5
      } 
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 10
      } 
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const textVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: { 
      width: "auto", 
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const expandedVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop" as const
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      ref={buttonRef}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={buttonVariants}
      className={`fixed z-50 ${
        isMobile ? "bottom-6 right-4" : "bottom-8 right-8"
      }`}
      key="whatsapp-button"
    >
      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div 
            key="expanded-content"
            variants={expandedVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-4 mb-3 border border-green-500/20 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-80"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-green-600 dark:text-green-400">Contáctanos</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30"
                onClick={() => setIsExpanded(false)}
              >
                <X size={14} className="text-red-500" />
              </Button>
            </div>
            
            <div className="flex gap-2 mb-3">
              <Button
                onClick={handleWhatsAppClick}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white gap-2"
              >
                <MessageCircle size={18} />
                <span>WhatsApp</span>
              </Button>
              
              <Button
                onClick={handleCallClick}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white gap-2"
              >
                <Phone size={18} />
                <span>Llamar</span>
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Te responderemos lo más pronto posible
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        onHoverStart={() => !isMobile && setIsHovered(true)}
        onHoverEnd={() => !isMobile && setIsHovered(false)}
        whileHover="hover"
        animate={isExpanded ? {} : pulseAnimation}
        className="flex items-center shadow-lg relative group"
      >
        <AnimatePresence mode="wait">
          {(isHovered && !isExpanded) || isMobile ? (
            <motion.div
              key="hover-text"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                "bg-white dark:bg-slate-800 text-green-600 dark:text-green-400 font-bold px-4 py-2 rounded-l-full whitespace-nowrap overflow-hidden",
                "border-t border-l border-b border-green-500/30 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-80"
              )}
            >
              Chat WhatsApp
            </motion.div>
          ) : null}
        </AnimatePresence>
        
        <motion.div 
          className={cn(
            "relative z-10 w-14 h-14 rounded-full flex items-center justify-center transition-all",
            "bg-gradient-to-br from-green-500 to-green-600 hover:from-green-400 hover:to-green-500",
            isExpanded ? "rotate-0" : "rotate-0"
          )}
          whileHover={{ rotate: [0, -10, 10, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
        >
          {isExpanded ? (
            <Send className="w-5 h-5 text-white" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white" />
          )}
          
          <AnimatePresence>
            {!isExpanded && (
              <motion.div
                key="notification-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold"
              >
                1
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Glowing effect behind button */}
        <motion.div 
          className="absolute inset-0 bg-green-400 rounded-full blur-md opacity-30 -z-10"
          animate={{ 
            scale: isExpanded ? [1, 1.2, 1] : [1, 1.2, 1], 
            opacity: isExpanded ? [0.3, 0.5, 0.3] : [0.3, 0.5, 0.3] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
      </motion.button>
    </motion.div>
  );
};

export default WhatsAppButton;
