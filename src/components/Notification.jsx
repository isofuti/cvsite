import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../utils/sounds';

export const Notification = ({ 
  show, 
  title, 
  message, 
  onClose, 
  onClick, 
  position = 'right', 
  disableAutoClose = false, 
  buttonText = '',
  icon: IconComponent = null,
  top = '38px'
}) => {
  useEffect(() => {
    if (show) {
      playSound('notification');
      if (!disableAutoClose) {
        const timer = setTimeout(() => {
          onClose();
        }, 6000); // Auto close after 6 seconds
        return () => clearTimeout(timer);
      }
    }
  }, [show, onClose, disableAutoClose]);

  const handleClick = () => {
    if (buttonText) return; // If there is a button, click the button instead
    if (onClick) onClick();
    else onClose();
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          layout
          initial={{ opacity: 0, x: position === 'right' ? 300 : -300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: position === 'right' ? 300 : -300 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={handleClick}
          style={{
            position: 'absolute',
            top: top,
            ...(position === 'right' ? { right: '10px' } : { left: '10px' }),
            width: '320px',
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '16px',
            padding: '16px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            zIndex: 10001,
            cursor: buttonText ? 'default' : 'pointer',
            display: 'flex',
            gap: '12px'
          }}
        >
          <div style={{ 
            width: '40px', 
            height: '40px', 
            background: position === 'right' ? '#007aff' : '#ff9500', 
            borderRadius: '10px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: '#fff', 
            fontSize: '20px', 
            fontWeight: 'bold', 
            flexShrink: 0 
          }}>
            {IconComponent ? <IconComponent size={20} /> : 'E'}
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#000', marginBottom: '4px' }}>{title}</div>
            <div style={{ fontSize: '13px', color: '#333', lineHeight: 1.4 }}>{message}</div>
            
            {buttonText && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  if (onClick) onClick();
                }}
                style={{
                  alignSelf: 'flex-start',
                  marginTop: '10px',
                  padding: '6px 14px',
                  background: '#007aff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseOver={(e) => e.target.style.background = '#0062cc'}
                onMouseOut={(e) => e.target.style.background = '#007aff'}
              >
                {buttonText}
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

