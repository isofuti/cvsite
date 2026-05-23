import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const PhonePivot = ({ tabs, activeTabId, onTabChange }) => {
  const activeIndex = tabs.findIndex(t => t.id === activeTabId);

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

      <div className="wp-pivot-content">
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
      </div>
    </div>
  );
};
