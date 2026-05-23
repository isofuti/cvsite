import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import { motion, AnimatePresence } from 'framer-motion';

export const MacWindow = ({ id, title, content, zIndex, isActive, isMinimized, isFullscreen, onFocus, onClose, onMinimize, onToggleFullscreen }) => {
  const [size, setSize] = useState({ width: 800, height: 500 });
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [prevSizePos, setPrevSizePos] = useState(null);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      setPrevSizePos({ size, position });
      setSize({ width: window.innerWidth, height: window.innerHeight - 28 }); // Subtract menu bar
      setPosition({ x: 0, y: 28 });
    } else if (prevSizePos) {
      setSize(prevSizePos.size);
      setPosition(prevSizePos.position);
    }
    onToggleFullscreen(id);
  };

  return (
    <Rnd
      size={{ width: size.width, height: size.height }}
      position={{ x: position.x, y: position.y }}
      onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
      onResizeStop={(e, direction, ref, delta, position) => {
        setSize({ width: ref.style.width, height: ref.style.height });
        setPosition(position);
      }}
      minWidth={400}
      minHeight={300}
      bounds="parent"
      dragHandleClassName="window-titlebar"
      style={{ zIndex, position: 'absolute', pointerEvents: isMinimized ? 'none' : 'auto' }}
      onMouseDown={() => onFocus(id)}
      disableDragging={isFullscreen || isMinimized}
      enableResizing={!isFullscreen && !isMinimized}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: isMinimized ? 0 : 1, 
          scale: isMinimized ? 0.2 : 1,
          y: isMinimized ? window.innerHeight / 2 : 0,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
        style={{ width: '100%', height: '100%' }}
        className={`mac-window ${isActive ? 'active' : 'inactive'}`}
      >
        <div className="window-titlebar" onDoubleClick={toggleFullscreen}>
          <div className="traffic-lights">
            <div className="traffic-light close" onClick={(e) => { e.stopPropagation(); onClose(id); }}>
              <svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <div className="traffic-light minimize" onClick={(e) => { e.stopPropagation(); onMinimize(id); }}>
              <svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M2 7h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <div className="traffic-light maximize" onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}>
              <svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M2 12V2h10v10H2z" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
            </div>
          </div>
          <div className="window-title">{title}</div>
        </div>
        <div className="window-content" onMouseDown={(e) => e.stopPropagation()}>
          {content}
        </div>
      </motion.div>
    </Rnd>
  );
};
