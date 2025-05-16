
import { Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

const MaintenancePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-recreacion-blue/10 to-recreacion-purple/10 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-24 h-24 bg-recreacion-purple/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-recreacion-purple"
            >
              <path d="M15 21v-3a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
              <path d="M11 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
              <path d="m21.75 17.75-1.5-1.5" />
              <path d="m15.75 11.75-1.5-1.5" />
              <path d="m20.25 11.75 1.5-1.5" />
              <path d="m15.75 17.75 1.5-1.5" />
              <path d="M18 14.25a.25.25 0 1 0 .25.25.25.25 0 0 0-.25-.25" />
            </svg>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-3 text-gray-800"
          >
            Sitio en Mantenimiento
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-lg text-gray-600 mb-8"
          >
            Estamos trabajando para mejorar tu experiencia. Volveremos pronto.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="border-t border-gray-200 pt-8"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Para más información</h2>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a 
                href="mailto:info@rapidsitepro.com" 
                className="flex items-center justify-center gap-2 bg-recreacion-blue/10 hover:bg-recreacion-blue/20 text-recreacion-blue px-4 py-3 rounded-lg transition-colors duration-300"
              >
                <Mail className="w-5 h-5" />
                <span>info@rapidsitepro.com</span>
              </a>
              
              <a 
                href="https://wa.me/3022323472" 
                className="flex items-center justify-center gap-2 bg-green-100 hover:bg-green-200 text-green-700 px-4 py-3 rounded-lg transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="w-5 h-5" />
                <span>WhatsApp: 3022323472</span>
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default MaintenancePage;
