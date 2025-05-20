import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

const Avatar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleSplineError = (error: any) => {
    console.error('Spline error:', error);
    setHasError(true);
    setIsLoading(false);
  };

  const handleSplineLoad = () => {
    setIsLoading(false);
  };

  if (hasError) {
    return (
      <motion.div
        className="w-[600px] h-[600px] mx-auto flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          position: 'relative',
          right: '-100px',
          pointerEvents: 'none',
          touchAction: 'none'
        }}
      >
        <div className="text-center text-spa-secondary">
          <p className="text-xl mb-2">Unable to load 3D model</p>
          <p className="text-sm opacity-70">Please try refreshing the page</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-[600px] h-[600px] mx-auto relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        position: 'relative',
        right: '-100px',
        pointerEvents: 'none',
        touchAction: 'none'
      }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader className="w-8 h-8 animate-spin text-spa-secondary" />
        </div>
      )}
      <Spline 
        scene="https://prod.spline.design/ZSv9F0ChqKSFq1kn/scene.splinecode"
        onLoad={handleSplineLoad}
        onError={handleSplineError}
        style={{
          pointerEvents: 'none',
          touchAction: 'none'
        }}
      />
    </motion.div>
  );
};

export default Avatar;