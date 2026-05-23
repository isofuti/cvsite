import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useTranslation } from 'react-i18next';

export const ControlCenter = ({ isOpen, onOpenContact, onClose }) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        style={{
          position: 'absolute',
          top: '38px',
          right: '10px',
          width: '320px',
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '16px',
          padding: '16px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          zIndex: 10000,
          color: '#000',
        }}
      >
        {/* Notification / Easter Egg */}
        <div 
          onClick={() => {
            if (onOpenContact) onOpenContact();
            if (onClose) onClose();
          }}
          style={{ 
            background: 'rgba(255,255,255,0.7)', 
            padding: '12px', 
            borderRadius: '12px', 
            marginBottom: '16px', 
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <div style={{ width: '24px', height: '24px', background: '#007aff', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>E</div>
            <div style={{ fontSize: '13px', fontWeight: 'bold' }}>Egor Khromov</div>
            <div style={{ fontSize: '11px', color: '#666', marginLeft: 'auto' }}>{t('tg_online')}</div>
          </div>
          <div style={{ fontSize: '13px', lineHeight: 1.4 }}>
            {t('notification_msg')}
          </div>
        </div>

        {/* Calendar Widget */}
        <div style={{ background: 'rgba(255,255,255,0.7)', padding: '16px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#ff3b30', marginBottom: '12px' }}>
            {today.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', fontSize: '12px' }}>
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
              <div key={d} style={{ color: '#666', fontWeight: 'bold', paddingBottom: '4px' }}>{d}</div>
            ))}
            {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const date = i + 1;
              const isToday = date === today.getDate();
              return (
                <div key={date} style={{ 
                  width: '28px', height: '28px', lineHeight: '28px', margin: 'auto',
                  background: isToday ? '#ff3b30' : 'transparent',
                  color: isToday ? '#fff' : '#000',
                  borderRadius: '50%',
                  fontWeight: isToday ? 'bold' : 'normal'
                }}>
                  {date}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
