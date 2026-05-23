import React, { useState, useEffect, useRef } from 'react';
import { Apple, Wifi, Battery, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ControlCenter } from './ControlCenter';

export const MenuBar = ({ activeApp, onOpenContact }) => {
  const [time, setTime] = useState(new Date());
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const menuRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Close control center on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsControlCenterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', weekday: 'short', month: 'short', day: 'numeric' });
  };

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <div className="menu-bar" ref={menuRef}>
      <div className="menu-left">
        <div className="menu-item"><Apple size={16} fill="currentColor" /></div>
        <div className="menu-item active">{activeApp || 'Finder'}</div>
        <div className="menu-item">File</div>
        <div className="menu-item">Edit</div>
        <div className="menu-item">View</div>
        <div className="menu-item">Go</div>
        <div className="menu-item">Window</div>
        <div className="menu-item">Help</div>
      </div>
      <div className="menu-right">
        <div className="menu-item" onClick={toggleLang} style={{ fontWeight: 'bold' }}>
          {i18n.language === 'ru' ? 'RU' : 'EN'}
        </div>
        <div className="menu-item"><Battery size={16} /></div>
        <div className="menu-item"><Wifi size={16} /></div>
        <div className="menu-item"><Search size={16} /></div>
        <div className="menu-item" onClick={() => setIsControlCenterOpen(!isControlCenterOpen)} style={{ cursor: 'pointer' }}>
          {formatTime(time)}
        </div>
      </div>
      <ControlCenter 
        isOpen={isControlCenterOpen} 
        onOpenContact={onOpenContact} 
        onClose={() => setIsControlCenterOpen(false)} 
      />
    </div>
  );
};
