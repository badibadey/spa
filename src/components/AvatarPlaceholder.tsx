import React from 'react';
import { Loader } from 'lucide-react';
import { motion } from 'framer-motion';

const AvatarPlaceholder: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-spa-background">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "linear" 
        }}
      >
        <Loader size={48} className="text-spa-primary" />
      </motion.div>
    </div>
  );
};

export default AvatarPlaceholder;