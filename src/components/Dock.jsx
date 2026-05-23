import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const DockItem = ({ icon: Icon, label, isOpen, onClick, color }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {isHovered && (
        <div style={{ position: 'absolute', top: '-35px', background: 'rgba(0,0,0,0.5)', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', whiteSpace: 'nowrap' }}>
          {label}
        </div>
      )}
      <motion.div
        className="dock-item"
        onClick={onClick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.4, y: -10, margin: '0 10px' }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <Icon size={28} color={color || '#000'} />
        {isOpen && <div className="dock-indicator" />}
      </motion.div>
    </div>
  );
};

export const Dock = ({ apps, runningApps = [], openWindows, onAppClick, isDockHidden, onMouseEnter, onMouseLeave }) => {
  return (
    <motion.div 
      className="dock-container"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      initial={{ y: 100, x: "-50%" }}
      animate={{ y: isDockHidden ? 110 : 0, x: "-50%" }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
    >
      {apps.map(app => (
        <DockItem
          key={app.id}
          icon={app.icon}
          label={app.title}
          color={app.color}
          isOpen={openWindows.some(w => w.appId === app.id)}
          onClick={() => onAppClick(app.id)}
        />
      ))}

      {runningApps.length > 0 && (
        <div style={{
          width: '1px',
          height: '32px',
          background: 'rgba(255, 255, 255, 0.35)',
          margin: '0 4px',
          marginBottom: '9px',
          alignSelf: 'center'
        }} />
      )}

      {runningApps.map(app => (
        <DockItem
          key={app.id}
          icon={app.icon}
          label={app.title}
          color={app.color}
          isOpen={true}
          onClick={() => onAppClick(app.id)}
        />
      ))}
    </motion.div>
  );
};
