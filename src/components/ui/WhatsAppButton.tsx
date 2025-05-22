
'use client'

import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { MessageCircle, Phone, Send, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Button } from './button';

interface WhatsAppButtonProps {
  phoneNumber: string;
  notificationCount?: number;
}

const WhatsAppButton = ({ phoneNumber = '573026836359', notificationCount = 3 }: WhatsAppButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();
  const buttonRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

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
      setIsExpanded(false);
    };
  }, []);

  // Efecto de animación periódica
  useEffect(() => {
    const interval = setInterval(() => {
      controls.start({
        scale: [1, 1.2, 1],
        rotate: [0, 5, -5, 0],
        transition: {
          duration: 2,
          ease: "easeInOut"
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [controls]);

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
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 }
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

  if (!isVisible) return null;

  return (
    <motion.div
      ref={buttonRef}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={buttonVariants}
      className={`fixed z-[9999] ${
        isMobile ? "bottom-16 right-4" : "bottom-12 right-12"
      } drop-shadow-2xl`}
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
            className={`bg-white rounded-2xl shadow-2xl ${isMobile ? 'p-3' : 'p-4'} mb-3 border-2 border-recreacion-green/20 backdrop-blur-sm bg-opacity-95 ${isMobile ? 'min-w-[240px]' : 'min-w-[280px]'}`}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className={`font-bold text-recreacion-green font-comic ${isMobile ? 'text-sm' : ''}`}>¡Contáctanos!</h3>
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
                className={`flex-1 bg-gradient-to-r from-recreacion-green to-recreacion-blue hover:from-recreacion-green/90 hover:to-recreacion-blue/90 text-white gap-2 ${isMobile ? 'py-2 text-xs' : 'py-3'} rounded-xl font-medium`}
              >
                <MessageCircle size={18} />
                <span>WhatsApp</span>
              </Button>
              
              <Button
                onClick={handleCallClick}
                className={`flex-1 bg-gradient-to-r from-recreacion-purple to-recreacion-pink hover:from-recreacion-purple/90 hover:to-recreacion-pink/90 text-white gap-2 ${isMobile ? 'py-2 text-xs' : 'py-3'} rounded-xl font-medium`}
              >
                <Phone size={18} />
                <span>Llamar</span>
              </Button>
            </div>
            
            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 text-center font-montserrat`}>
              ¡Estamos listos para atenderte!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.a
        href={`https://wa.me/${phoneNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          e.preventDefault();
          setIsExpanded(!isExpanded);
        }}
        onHoverStart={() => !isMobile && setIsHovered(true)}
        onHoverEnd={() => !isMobile && setIsHovered(false)}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        animate={controls}
        className="relative group"
      >
        <div className="relative">
          {/* Efecto de pulso múltiple */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 bg-recreacion-green rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Botón principal con efecto de brillo */}
          <motion.div 
            className="relative bg-gradient-to-r from-recreacion-green to-recreacion-blue p-4 rounded-full shadow-lg 
              hover:shadow-xl transition-all duration-300 group-hover:shadow-recreacion-green/50 overflow-hidden"
          >
            {/* Efecto de brillo */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            
            <FaWhatsapp className="text-white text-2xl relative z-10" />

            {/* Contador de mensajes */}
            {notificationCount > 0 && (
              <motion.div 
                className="absolute -top-2 -right-2 bg-recreacion-orange text-white text-xs font-bold 
                  w-5 h-5 rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 }}
              >
                {notificationCount}
              </motion.div>
            )}
          </motion.div>

          {/* Tooltip mejorado */}
          {(isHovered && !isExpanded && !isMobile) && (
            <motion.div 
              className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm 
                text-recreacion-green px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 
                pointer-events-none shadow-lg border border-recreacion-green/20"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <span className="text-sm whitespace-nowrap font-medium">¡Contáctanos!</span>
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 
                  border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent 
                  border-l-[8px] border-l-white/90" />
              </div>
            </motion.div>
          )}
        </div>
      </motion.a>
    </motion.div>
  );
};

export default WhatsAppButton;
