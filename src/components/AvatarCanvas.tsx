import React from 'react';
import { motion } from 'framer-motion';
import { AvatarCanvasProps } from '../types';
import Avatar from './Avatar';

const AvatarCanvas: React.FC<AvatarCanvasProps> = ({ isActive }) => {
  return (
    <motion.div 
      className="w-full h-full relative flex items-center justify-center bg-spa-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.4 }}
    >
      {isActive && <Avatar />}
    </motion.div>
  );
};

export default AvatarCanvas;