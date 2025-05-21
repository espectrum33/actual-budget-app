
import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface WhatsAppButtonProps {
  phoneNumber: string;
}

const WhatsAppButton = ({ phoneNumber }: WhatsAppButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`fixed z-40 ${
        isMobile ? "bottom-4 right-4" : "bottom-8 right-8"
      } flex items-center shadow-lg`}
    >
      <motion.div
        animate={{
          width: isHovered || isMobile ? "auto" : "0px",
          opacity: isHovered || isMobile ? 1 : 0,
          marginRight: isHovered || isMobile ? "8px" : "0px",
        }}
        transition={{ duration: 0.3 }}
        className="bg-white text-green-600 font-medium px-3 py-2 rounded-l-full whitespace-nowrap overflow-hidden"
      >
        Chat WhatsApp
      </motion.div>
      <div className="bg-green-500 hover:bg-green-600 w-14 h-14 rounded-full flex items-center justify-center transition-colors">
        <Phone className="w-6 h-6 text-white" />
      </div>
    </motion.button>
  );
};

export default WhatsAppButton;
