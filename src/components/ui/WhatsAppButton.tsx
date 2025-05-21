
import { MessageCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  phoneNumber: string;
}

const WhatsAppButton = ({ phoneNumber }: WhatsAppButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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
      scale: 1.1,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 10
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
    }
  };

  if (!isVisible) return null;

  return (
    <motion.button
      onClick={handleClick}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={buttonVariants}
      onHoverStart={() => !isMobile && setIsHovered(true)}
      onHoverEnd={() => !isMobile && setIsHovered(false)}
      className={`fixed z-40 ${
        isMobile ? "bottom-4 right-4" : "bottom-8 right-8"
      } flex items-center shadow-lg`}
    >
      <motion.div
        variants={textVariants}
        animate={isHovered || isMobile ? "visible" : "hidden"}
        className={cn(
          "bg-white text-green-600 font-bold px-4 py-2 rounded-l-full whitespace-nowrap overflow-hidden",
          "border-t border-l border-b border-green-500/30"
        )}
      >
        Chat WhatsApp
      </motion.div>
      <motion.div 
        className="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 w-14 h-14 rounded-full flex items-center justify-center transition-colors"
        whileHover={{ rotate: [0, -10, 10, -10, 10, 0] }}
        transition={{ duration: 0.5 }}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </motion.div>
    </motion.button>
  );
};

export default WhatsAppButton;
