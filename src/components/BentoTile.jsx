import React from 'react';
import { motion } from 'framer-motion';

export const BentoTile = ({ className, children, delay = 0, style }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1] 
      }}
      className={`bento-tile ${className || ''}`}
      style={style}
    >
      {children}
    </motion.div>
  );
};
