import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const PhonePivot = ({ tabs, activeTabId, onTabChange }) => {
  const activeIndex = tabs.findIndex(t => t.id === activeTabId);

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold && activeIndex < tabs.length - 1) {
      // Swipe left -> next tab
      onTabChange(tabs[activeIndex + 1].id);
    } else if (info.offset.x > swipeThreshold && activeIndex > 0) {
      // Swipe right -> prev tab
      onTabChange(tabs[activeIndex - 1].id);
    }
  };

  return (
    <div className="wp-pivot">
      <div className="wp-pivot-headers">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`wp-pivot-header ${tab.id === activeTabId ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.title}
          </div>
        ))}
      </div>

      <motion.div
        className="wp-pivot-content"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        style={{ touchAction: 'pan-y' }} // Allow vertical scroll but capture horizontal drag
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTabId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            style={{ height: '100%' }}
          >
            {tabs[activeIndex]?.content}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
