import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { MessageSquare, ShieldAlert } from 'lucide-react';
import { playSound } from '../utils/sounds';

export const PhoneLockScreen = ({ onUnlock }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formatDate = (date) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
  };

  // Framer Motion drag setup
  const y = useMotionValue(0);
  const opacity = useTransform(y, [-300, 0], [0, 1]);

  const handleDragEnd = (event, info) => {
    // If dragged up by more than 100px or fast swipe
    if (info.offset.y < -100 || info.velocity.y < -300) {
      playSound('open');
      onUnlock();
    }
  };

  return (
    <motion.div
      className="wp-lockscreen"
      style={{
        y,
        backgroundImage: `url('/bg.jpg')`, // Reuse background
      }}
      drag="y"
      dragConstraints={{ top: -1000, bottom: 0 }}
      dragElastic={{ top: 0.8, bottom: 0.1 }}
      onDragEnd={handleDragEnd}
    >
      <div className="wp-lockscreen-time">
        <div className="wp-lockscreen-clock">{formatTime(time)}</div>
        <div className="wp-lockscreen-date">{formatDate(time)}</div>
      </div>

      <div>
        <div className="wp-lockscreen-notifications">
          <div className="wp-lockscreen-notif-item">
            <MessageSquare size={20} color="#0078d7" />
            <span>1</span>
          </div>
        </div>
        <div className="wp-lockscreen-hint">
          проведите вверх для разблокировки
        </div>
      </div>
    </motion.div>
  );
};
