import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Code, FileDown, MessageSquare, Gamepad2, Languages, BarChart3, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { playSound } from '../utils/sounds';

export const PhoneStartScreen = ({ onOpenApp, onToggleLanguage }) => {
  const { t, i18n } = useTranslation();
  const [isFlipped, setIsFlipped] = useState(false);
  const [experienceIndex, setExperienceIndex] = useState(0);

  // Live Tile Flip effect
  useEffect(() => {
    const flipTimer = setInterval(() => {
      setIsFlipped(prev => !prev);
    }, 6000);

    const expTimer = setInterval(() => {
      setExperienceIndex(prev => (prev === 0 ? 1 : 0));
    }, 4000);

    return () => {
      clearInterval(flipTimer);
      clearInterval(expTimer);
    };
  }, []);

  const handleTileClick = (appId) => {
    playSound('open');
    onOpenApp(appId);
  };

  const experienceLabels = ['Tool-Kit', 'DayNet'];

  // Animation constants for turnstile entry
  const tileVariants = {
    hidden: { opacity: 0, rotateY: 90, scale: 0.8 },
    show: (i) => ({
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  const tiltStyle = {
    transformTemplate: ({ rotateX, rotateY, scale }) => 
      `perspective(1000px) rotateX(${rotateX}) rotateY(${rotateY}) scale(${scale})`,
  };

  return (
    <div className="wp-start-screen">
      <div className="wp-tiles-grid">
        
        {/* Profile Tile (Wide, 4x2) with Auto Flip */}
        <motion.div
          custom={0}
          variants={tileVariants}
          initial="hidden"
          animate="show"
          whileTap={{ scale: 0.96, rotateX: -2, rotateY: 2 }}
          style={tiltStyle}
          className="wp-tile wide flip"
          onClick={() => handleTileClick('about')}
        >
          <div className={`wp-tile-flipper`} style={{ transform: isFlipped ? 'rotateY(180deg)' : 'none' }}>
            {/* Front Side */}
            <div className="wp-tile-front wp-tile-content">
              <div className="wp-tile-wide-avatar" style={{ backgroundImage: "url('/avatar.jpg')" }} />
              <div className="wp-tile-wide-info">
                <div className="wp-tile-wide-name">{t('name')}</div>
                <div className="wp-tile-wide-role">{t('role')}</div>
              </div>
              <div className="wp-tile-label">{t('about_me')}</div>
            </div>
            {/* Back Side */}
            <div className="wp-tile-back">
              <p style={{ padding: '0 10px', fontSize: '11px', lineHeight: 1.4 }}>
                {t('about').substring(0, 100)}...
              </p>
            </div>
          </div>
        </motion.div>

        {/* Experience Tile (Medium, 2x2) */}
        <motion.div
          custom={1}
          variants={tileVariants}
          initial="hidden"
          animate="show"
          whileTap={{ scale: 0.95, rotateX: -4, rotateY: 4 }}
          style={tiltStyle}
          className="wp-tile medium"
          onClick={() => handleTileClick('experience')}
        >
          <div className="wp-tile-content">
            <div className="wp-tile-icon-center">
              <Briefcase size={36} />
            </div>
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              fontSize: '14px',
              fontWeight: 300,
              opacity: 0.9
            }}>
              {experienceLabels[experienceIndex]}
            </div>
            <div className="wp-tile-label">{t('experience_folder')}</div>
          </div>
        </motion.div>

        {/* Skills Tile (Medium, 2x2) */}
        <motion.div
          custom={2}
          variants={tileVariants}
          initial="hidden"
          animate="show"
          whileTap={{ scale: 0.95, rotateX: -4, rotateY: -4 }}
          style={tiltStyle}
          className="wp-tile medium"
          onClick={() => handleTileClick('skills')}
        >
          <div className="wp-tile-content">
            <div className="wp-tile-icon-center">
              <Code size={36} />
            </div>
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              fontSize: '11px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              opacity: 0.8
            }}>
              <div>• Python & SQL</div>
              <div>• B2B Marketing</div>
              <div>• Web Analytics</div>
            </div>
            <div className="wp-tile-label">{t('skills_doc')}</div>
          </div>
        </motion.div>

        {/* Contact Tile (Medium, 2x2) */}
        <motion.div
          custom={3}
          variants={tileVariants}
          initial="hidden"
          animate="show"
          whileTap={{ scale: 0.95, rotateX: 4, rotateY: 4 }}
          style={tiltStyle}
          className="wp-tile medium"
          onClick={() => handleTileClick('contact')}
        >
          <div className="wp-tile-content" style={{ background: '#0088cc' /* Telegram Color */ }}>
            <div className="wp-tile-icon-center">
              <MessageSquare size={36} />
            </div>
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: '#ff3b30',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              fontWeight: 'bold'
            }}>
              1
            </div>
            <div className="wp-tile-label">{t('contact_app')}</div>
          </div>
        </motion.div>

        {/* Brand Case Study Tile (Medium, 2x2) */}
        <motion.div
          custom={4}
          variants={tileVariants}
          initial="hidden"
          animate="show"
          whileTap={{ scale: 0.95, rotateX: 4, rotateY: -4 }}
          style={tiltStyle}
          className="wp-tile medium"
          onClick={() => handleTileClick('case_study')}
          style={{ ...tiltStyle, background: '#af52de' /* Purple */ }}
        >
          <div className="wp-tile-content">
            <div className="wp-tile-icon-center">
              <BarChart3 size={36} />
            </div>
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              fontSize: '11px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              opacity: 0.8
            }}>
              <div>• {t('case_label')}</div>
              <div>• Brand Awareness</div>
              <div>• Top of Mind &lt; 1%</div>
            </div>
            <div className="wp-tile-label">{t('brand_case')}</div>
          </div>
        </motion.div>

        {/* Safari Blog Tile (Medium, 2x2) */}
        <motion.div
          custom={5}
          variants={tileVariants}
          initial="hidden"
          animate="show"
          whileTap={{ scale: 0.95, rotateX: 4, rotateY: -4 }}
          style={tiltStyle}
          className="wp-tile medium"
          onClick={() => handleTileClick('safari')}
          style={{ ...tiltStyle, background: '#00aba9' /* Classic Windows Phone Teal */ }}
        >
          <div className="wp-tile-content">
            <div className="wp-tile-icon-center">
              <BookOpen size={36} />
            </div>
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              fontSize: '11px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              opacity: 0.8
            }}>
              <div>• {t('blog_theory')}</div>
              <div>• {t('blog_analytics')}</div>
              <div>• {t('blog_marketing')}</div>
            </div>
            <div className="wp-tile-label">{t('blog_title')}</div>
          </div>
        </motion.div>

        {/* Snake Game Tile (Medium, 2x2) */}
        <motion.div
          custom={6}
          variants={tileVariants}
          initial="hidden"
          animate="show"
          whileTap={{ scale: 0.95, rotateX: 4, rotateY: -4 }}
          style={tiltStyle}
          className="wp-tile medium"
          onClick={() => handleTileClick('snake')}
          style={{ ...tiltStyle, background: '#ff9500' }}
        >
          <div className="wp-tile-content">
            <div className="wp-tile-icon-center">
              <Gamepad2 size={36} />
            </div>
            <div className="wp-tile-label">Snake Game</div>
          </div>
        </motion.div>

        {/* Language Tile (Small, 1x1) */}
        <motion.div
          custom={7}
          variants={tileVariants}
          initial="hidden"
          animate="show"
          whileTap={{ scale: 0.92, rotateX: 5, rotateY: -5 }}
          style={tiltStyle}
          className="wp-tile small"
          onClick={onToggleLanguage}
          style={{ ...tiltStyle, background: '#1f1f1f', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div className="wp-tile-content" style={{ justifyContent: 'center', alignItems: 'center', padding: '4px' }}>
            <Languages size={18} style={{ opacity: 0.6, marginBottom: '2px' }} />
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
              {i18n.language === 'ru' ? 'EN' : 'RU'}
            </div>
          </div>
        </motion.div>

        {/* Resume PDF Tile (Small, 1x1) */}
        <motion.div
          custom={8}
          variants={tileVariants}
          initial="hidden"
          animate="show"
          whileTap={{ scale: 0.92, rotateX: 5, rotateY: 5 }}
          style={tiltStyle}
          className="wp-tile small"
          onClick={() => handleTileClick('resume')}
          style={{ ...tiltStyle, background: '#e01b3c' }}
        >
          <div className="wp-tile-content" style={{ justifyContent: 'center', alignItems: 'center', padding: '4px' }}>
            <FileDown size={18} style={{ marginBottom: '2px' }} />
            <div style={{ fontSize: '9px', fontWeight: 'bold', textTransform: 'uppercase' }}>PDF</div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
