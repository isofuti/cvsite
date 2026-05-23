import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Home, Search, Send, RotateCcw, ArrowLeft, ArrowRight, ArrowUp, ArrowDown, MessageSquare, ShieldAlert, Compass } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PhoneLockScreen } from './PhoneLockScreen';
import { PhoneStartScreen } from './PhoneStartScreen';
import { PhonePivot } from './PhonePivot';
import { playSound } from '../utils/sounds';
import avatarUrl from '../assets/avatar.jpg';
import initialPosts from '../data/blog.json';

export const PhoneInterface = () => {
  const { t, i18n } = useTranslation();
  const [isLocked, setIsLocked] = useState(true);
  const [activeAppId, setActiveAppId] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // App internal states
  const [aboutActiveTab, setAboutActiveTab] = useState('profile');
  const [expActiveTab, setExpActiveTab] = useState('summary');
  const [resumeActiveTab, setResumeActiveTab] = useState('view');
  const [caseActiveTab, setCaseActiveTab] = useState('context');
  const [showCookieNotice, setShowCookieNotice] = useState(false);

  const [capActiveTab, setCapActiveTab] = useState('data');
  const [posts, setPosts] = useState(initialPosts || []);
  const [wpSelectedPost, setWpSelectedPost] = useState(null);
  const [wpActiveCategory, setWpActiveCategory] = useState('All');
  
  // Telegram mock state
  const [tgMessage, setTgMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  // Adaptive Snake game state
  const SNAKE_GRID = 15;
  const [phoneSnake, setPhoneSnake] = useState([{ x: 7, y: 7 }]);
  const [phoneFood, setPhoneFood] = useState({ x: 3, y: 3 });
  const [phoneDir, setPhoneDir] = useState({ x: 0, y: -1 });
  const [phoneSnakeOver, setPhoneSnakeOver] = useState(false);
  const [phoneSnakeScore, setPhoneSnakeScore] = useState(0);

  // Update clock and load cookie notice
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);

    let cookieTimer;
    const consented = localStorage.getItem('cookies_accepted') === 'true';
    if (!consented) {
      cookieTimer = setTimeout(() => {
        setShowCookieNotice(true);
      }, 1500);
    }

    return () => {
      clearInterval(timer);
      if (cookieTimer) clearTimeout(cookieTimer);
    };
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetch('/src/data/blog.json');
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        }
      } catch (e) {}
    };
    loadPosts();
  }, []);

  useEffect(() => {
    if (showCookieNotice) {
      playSound('notification');
    }
  }, [showCookieNotice]);

  const formatShortTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Sound and action wrappers
  const handleNavHome = () => {
    playSound('close');
    setActiveAppId(null);
  };

  const handleNavBack = () => {
    playSound('close');
    if (activeAppId) {
      setActiveAppId(null);
    } else if (!isLocked) {
      setIsLocked(true);
    }
  };

  const handleNavSearch = () => {
    playSound('open');
    // Easter egg: open Telegram chat directly
    window.open('https://t.me/nonenewfriends', '_blank');
  };

  // Telegram Mock logic
  const handleTgSend = () => {
    if (!tgMessage.trim()) return;
    playSound('close'); // send sound fallback
    setChatHistory(prev => [...prev, { text: tgMessage, sender: 'user' }]);
    
    const messageToSend = tgMessage;
    setTgMessage('');

    // Wait a brief moment then open Telegram
    setTimeout(() => {
      const url = `https://t.me/nonenewfriends?text=${encodeURIComponent(messageToSend)}`;
      window.open(url, '_blank');
    }, 800);
  };

  // Adaptive Snake logic for phone
  const generatePhoneFood = useCallback(() => {
    return {
      x: Math.floor(Math.random() * SNAKE_GRID),
      y: Math.floor(Math.random() * SNAKE_GRID),
    };
  }, []);

  const resetPhoneSnake = () => {
    setPhoneSnake([{ x: 7, y: 7 }]);
    setPhoneDir({ x: 0, y: -1 });
    setPhoneFood(generatePhoneFood());
    setPhoneSnakeOver(false);
    setPhoneSnakeScore(0);
  };

  const handleSnakeDirChange = (newDir) => {
    playSound('close'); // button feedback
    setPhoneDir(current => {
      // Prevent reversing
      if (newDir.x !== 0 && current.x !== 0) return current;
      if (newDir.y !== 0 && current.y !== 0) return current;
      return newDir;
    });
  };

  useEffect(() => {
    if (activeAppId !== 'snake' || phoneSnakeOver) return;

    const moveSnake = () => {
      setPhoneSnake(prev => {
        const head = prev[0];
        const newHead = {
          x: head.x + phoneDir.x,
          y: head.y + phoneDir.y,
        };

        // Collision bounds
        if (
          newHead.x < 0 || newHead.x >= SNAKE_GRID ||
          newHead.y < 0 || newHead.y >= SNAKE_GRID
        ) {
          setPhoneSnakeOver(true);
          return prev;
        }

        // Collision self
        if (prev.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
          setPhoneSnakeOver(true);
          return prev;
        }

        const nextSnake = [newHead, ...prev];

        // Eat food
        if (newHead.x === phoneFood.x && newHead.y === phoneFood.y) {
          setPhoneFood(generatePhoneFood());
          setPhoneSnakeScore(s => s + 10);
        } else {
          nextSnake.pop();
        }

        return nextSnake;
      });
    };

    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [activeAppId, phoneDir, phoneFood, phoneSnakeOver, generatePhoneFood]);

  // App render maps
  const renderAppContent = (appId) => {
    switch (appId) {
      case 'about':
        return (
          <div className="wp-hub">
            <div className="wp-hub-header">
              <div className="wp-hub-meta">egor khromov</div>
              <div className="wp-hub-title">{t('about_me')}</div>
            </div>
            <PhonePivot
              activeTabId={aboutActiveTab}
              onTabChange={setAboutActiveTab}
              tabs={[
                {
                  id: 'profile',
                  title: 'профиль',
                  content: (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <img 
                        src={avatarUrl} 
                        alt={t('name')} 
                        style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid var(--wp-accent)', objectFit: 'cover' }}
                      />
                        <div>
                          <h3 style={{ fontSize: '20px', fontWeight: 600 }}>{t('name')}</h3>
                          <p style={{ fontSize: '12px', color: 'var(--wp-subtle)', marginTop: '4px' }}>{t('role')}</p>
                        </div>
                      </div>
                      <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#dddddd', whiteSpace: 'pre-line' }}>
                        {t('about')}
                      </p>
                    </div>
                  )
                },
                {
                  id: 'details',
                  title: 'контакты',
                  content: (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div className="wp-list-item">
                        <div className="wp-list-subtitle">telegram</div>
                        <div className="wp-list-title" style={{ color: 'var(--wp-accent-light)', cursor: 'pointer' }} onClick={handleNavSearch}>
                          @nonenewfriends
                        </div>
                      </div>
                      <div className="wp-list-item">
                        <div className="wp-list-subtitle">email</div>
                        <div className="wp-list-title">egor.khromov@example.com</div>
                      </div>
                      <div className="wp-list-item">
                        <div className="wp-list-subtitle">локация</div>
                        <div className="wp-list-title">Москва, Россия</div>
                      </div>
                    </div>
                  )
                }
              ]}
            />
          </div>
        );

      case 'experience':
        return (
          <div className="wp-hub">
            <div className="wp-hub-header">
              <div className="wp-hub-meta">резюме</div>
              <div className="wp-hub-title">{t('experience_folder')}</div>
            </div>
            <PhonePivot
              activeTabId={expActiveTab}
              onTabChange={setExpActiveTab}
              tabs={[
                {
                  id: 'summary',
                  title: 'обзор',
                  content: (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', lineHeight: 1.5 }}>
                      <p style={{ color: 'var(--wp-accent-light)', fontWeight: 600 }}>Маркетинг на основе данных</p>
                      <p>Управление воронками B2B, настройка веб-аналитики, автоматизация отчетности и CRM-процессов.</p>
                      <p style={{ marginTop: '10px', fontSize: '12px', color: 'var(--wp-subtle)' }}>Свайпните влево, чтобы прочесть о местах работы →</p>
                    </div>
                  )
                },
                {
                  id: 'toolkit',
                  title: 'tool-kit',
                  content: (
                    <div>
                      <div className="wp-list-subtitle">{i18n.language === 'ru' ? 'Февраль 2026 — н.в.' : 'Feb 2026 — Present'}</div>
                      <h3 style={{ fontSize: '18px', fontWeight: 600, marginTop: '4px' }}>Tool-Kit</h3>
                      <p style={{ fontSize: '12px', color: 'var(--wp-accent-light)', margin: '4px 0 12px 0' }}>{t('toolkit_role')}</p>
                      <p style={{ fontSize: '14px', lineHeight: 1.5, color: '#ccc', whiteSpace: 'pre-line' }}>
                        {t('toolkit_desc')}
                      </p>
                    </div>
                  )
                },
                {
                  id: 'daynet',
                  title: 'daynet',
                  content: (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxHeight: '100%', overflowY: 'auto' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 600 }}>DayNet</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', paddingLeft: '15px', borderLeft: '2px solid var(--wp-accent)' }}>
                        <div>
                          <div style={{ fontSize: '11px', color: 'var(--wp-accent-light)' }}>2025 — 2026</div>
                          <strong style={{ fontSize: '14px', color: '#fff' }}>{t('daynet_dev_role')}</strong>
                          <p style={{ fontSize: '12px', color: '#ccc', marginTop: '2px', whiteSpace: 'pre-line' }}>{t('daynet_dev_desc')}</p>
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', color: 'var(--wp-accent-light)' }}>2024 — 2025</div>
                          <strong style={{ fontSize: '14px', color: '#fff' }}>{t('daynet_senior_role')}</strong>
                          <p style={{ fontSize: '12px', color: '#ccc', marginTop: '2px', whiteSpace: 'pre-line' }}>{t('daynet_senior_desc')}</p>
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', color: 'var(--wp-accent-light)' }}>2023 — 2024</div>
                          <strong style={{ fontSize: '14px', color: '#fff' }}>{t('daynet_junior_role')}</strong>
                          <p style={{ fontSize: '12px', color: '#ccc', marginTop: '2px', whiteSpace: 'pre-line' }}>{t('daynet_junior_desc')}</p>
                        </div>
                      </div>
                    </div>
                  )
                },
                {
                  id: 'freelance',
                  title: 'freelance',
                  content: (
                    <div>
                      <div className="wp-list-subtitle">2021 — 2023</div>
                      <h3 style={{ fontSize: '18px', fontWeight: 600, marginTop: '4px' }}>Freelance</h3>
                      <p style={{ fontSize: '12px', color: 'var(--wp-accent-light)', margin: '4px 0 12px 0' }}>{t('freelance_role')}</p>
                      <p style={{ fontSize: '14px', lineHeight: 1.5, color: '#ccc', whiteSpace: 'pre-line' }}>
                        {t('freelance_desc')}
                      </p>
                    </div>
                  )
                }
              ]}
            />
          </div>
        );

      case 'skills':
        return (
          <div className="wp-hub">
            <div className="wp-hub-header">
              <div className="wp-hub-meta">компетенции</div>
              <div className="wp-hub-title">{t('skills_doc')}</div>
            </div>
            <PhonePivot
              activeTabId={capActiveTab}
              onTabChange={setCapActiveTab}
              tabs={[
                {
                  id: 'data',
                  title: 'аналитика',
                  content: (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', lineHeight: 1.4 }}>
                      <p style={{ color: 'var(--wp-accent-light)', fontWeight: 600 }}>Инженерия данных & ETL</p>
                      <p style={{ color: '#ccc' }}>Автоматизация сбора сырых данных из любых API, исключение ручного труда.</p>
                      <div className="wp-skills-grid" style={{ marginTop: '8px' }}>
                        {[
                          { name: 'Python (Pandas/NLP)', val: '90%' },
                          { name: 'SQL & ClickHouse', val: '85%' },
                          { name: 'API Integrations', val: '90%' }
                        ].map(s => (
                          <div className="wp-skill-card" key={s.name}>
                            <div className="wp-skill-name">{s.name}</div>
                            <div className="wp-skill-bar"><div className="wp-skill-progress" style={{ width: s.val }} /></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                },
                {
                  id: 'bi',
                  title: 'отчетность',
                  content: (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', lineHeight: 1.4 }}>
                      <p style={{ color: 'var(--wp-accent-light)', fontWeight: 600 }}>Сквозная аналитика & BI</p>
                      <p style={{ color: '#ccc' }}>Превращение сырых таблиц в дашборды для ЛПР.</p>
                      <div className="wp-skills-grid" style={{ marginTop: '8px' }}>
                        {[
                          { name: 'Yandex DataLens', val: '95%' },
                          { name: 'Tableau / BI Tools', val: '80%' },
                          { name: 'GA4 / Metrica', val: '95%' }
                        ].map(s => (
                          <div className="wp-skill-card" key={s.name}>
                            <div className="wp-skill-name">{s.name}</div>
                            <div className="wp-skill-bar"><div className="wp-skill-progress" style={{ width: s.val }} /></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                },
                {
                  id: 'traffic',
                  title: i18n.language === 'ru' ? 'трафик' : 'traffic',
                  content: (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', lineHeight: 1.4 }}>
                      <p style={{ color: 'var(--wp-accent-light)', fontWeight: 600 }}>Traffic & Performance</p>
                      <p style={{ color: '#ccc' }}>
                        {i18n.language === 'ru'
                          ? 'Настройка и ведение контекстной рекламы Яндекс.Директ и Google Ads. Ведение таргетированной рекламы ВКонтакте, META.'
                          : 'Setup and optimization of contextual ads (Yandex, Google) and targeted ads (VK, META).'}
                      </p>
                      <div className="wp-skills-grid" style={{ marginTop: '8px' }}>
                        {[
                          { name: 'Yandex.Direct', val: '95%' },
                          { name: 'Google Ads', val: '85%' },
                          { name: 'VK / META Ads', val: '90%' }
                        ].map(s => (
                          <div className="wp-skill-card" key={s.name}>
                            <div className="wp-skill-name">{s.name}</div>
                            <div className="wp-skill-bar"><div className="wp-skill-progress" style={{ width: s.val }} /></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                },
                {
                  id: 'growth',
                  title: 'маркетинг',
                  content: (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', lineHeight: 1.4 }}>
                      <p style={{ color: 'var(--wp-accent-light)', fontWeight: 600 }}>B2B Growth & Strategy</p>
                      <p style={{ color: '#ccc' }}>Привлечение enterprise-клиентов со средним чеком от 4 млн руб.</p>
                      <div className="wp-skills-grid" style={{ marginTop: '8px' }}>
                        {[
                          { name: 'Account-Based Marketing', val: '90%' },
                          { name: 'CAWI Research', val: '85%' },
                          { name: 'GTM Strategy', val: '90%' }
                        ].map(s => (
                          <div className="wp-skill-card" key={s.name}>
                            <div className="wp-skill-name">{s.name}</div>
                            <div className="wp-skill-bar"><div className="wp-skill-progress" style={{ width: s.val }} /></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                }
              ]}
            />
          </div>
        );
      case 'safari':
        return (
          <div className="wp-hub">
            <div className="wp-hub-header">
              <div className="wp-hub-meta">tenchat блог</div>
              <div className="wp-hub-title">{t('blog_title')}</div>
            </div>
            
            {wpSelectedPost ? (
              /* Mobile Reader */
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 24px 20px 24px', overflowY: 'auto' }}>
                <button 
                  onClick={() => { playSound('close'); setWpSelectedPost(null); }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--wp-accent-light)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px',
                    padding: 0,
                    marginBottom: '12px',
                    cursor: 'pointer',
                    textTransform: 'lowercase'
                  }}
                >
                  <ChevronLeft size={14} /> {i18n.language === 'ru' ? 'к списку' : 'back'}
                </button>
                
                <div style={{ fontSize: '11px', color: 'var(--wp-subtle)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {t(`blog_${wpSelectedPost.category.toLowerCase()}`)} • {wpSelectedPost.date}
                </div>
                
                <h3 style={{ fontSize: '18px', fontWeight: 600, margin: '6px 0 12px 0', lineHeight: 1.3 }}>
                  {i18n.language === 'ru' ? wpSelectedPost.title_ru : wpSelectedPost.title_en}
                </h3>
                
                <div style={{ 
                  fontSize: '13px', 
                  lineHeight: 1.5, 
                  color: '#ddd', 
                  whiteSpace: 'pre-line',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  paddingTop: '12px'
                }}>
                  {i18n.language === 'ru' ? wpSelectedPost.text_ru : wpSelectedPost.text_en}
                </div>
                
                <a 
                  href="https://t.me/nonenewfriends" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    background: 'var(--wp-accent)',
                    color: 'white',
                    padding: '10px',
                    textAlign: 'center',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    marginTop: '20px'
                  }}
                >
                  {t('open_tenchat')}
                </a>
              </div>
            ) : (
              /* Mobile Blog List */
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div className="category-pills" style={{ padding: '0 24px 8px 24px', display: 'flex', gap: '8px', overflowX: 'auto', flexShrink: 0 }}>
                  {['All', 'Theory', 'Analytics', 'Marketing'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => { playSound('open'); setWpActiveCategory(cat); }}
                      style={{
                        background: wpActiveCategory === cat ? 'var(--wp-accent)' : 'rgba(255,255,255,0.05)',
                        border: 'none',
                        color: '#fff',
                        padding: '4px 10px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      {cat === 'All' ? t('blog_all') : t(`blog_${cat.toLowerCase()}`)}
                    </button>
                  ))}
                </div>
                
                <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px 20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {posts.filter(p => wpActiveCategory === 'All' || p.category === wpActiveCategory).map(post => (
                    <div 
                      key={post.id} 
                      onClick={() => { playSound('open'); setWpSelectedPost(post); }}
                      style={{ 
                        background: 'rgba(255,255,255,0.03)', 
                        border: '1px solid rgba(255,255,255,0.06)',
                        padding: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '9px', color: 'var(--wp-accent-light)', textTransform: 'uppercase', fontWeight: 'bold' }}>
                        {t(`blog_${post.category.toLowerCase()}`)} • {post.date}
                      </div>
                      <h4 style={{ fontSize: '14px', fontWeight: 600, margin: '4px 0', lineHeight: 1.3 }}>
                        {i18n.language === 'ru' ? post.title_ru : post.title_en}
                      </h4>
                      <p style={{ fontSize: '12px', color: 'var(--wp-subtle)', margin: 0 }}>
                        {(i18n.language === 'ru' ? post.text_ru : post.text_en)?.substring(0, 80)}...
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'contact':
        return (
          <div className="wp-hub">
            <div className="wp-hub-header">
              <div className="wp-hub-meta">написать сообщение</div>
              <div className="wp-hub-title">{t('contact_app')}</div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 24px 20px 24px', overflow: 'hidden' }}>
              <div className="wp-chat-container">
                <div className="wp-chat-messages">
                  <div className="wp-chat-msg received">
                    {t('tg_welcome_msg')}
                  </div>
                  {chatHistory.map((msg, i) => (
                    <div key={i} className={`wp-chat-msg ${msg.sender === 'user' ? 'sent' : 'received'}`}>
                      {msg.text}
                    </div>
                  ))}
                </div>
                <div className="wp-chat-input-area">
                  <input
                    type="text"
                    className="wp-chat-input"
                    value={tgMessage}
                    onChange={e => setTgMessage(e.target.value)}
                    placeholder={t('tg_placeholder')}
                    onKeyDown={e => e.key === 'Enter' && handleTgSend()}
                  />
                  <button className="wp-chat-send" onClick={handleTgSend}>
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'snake':
        return (
          <div className="wp-hub">
            <div className="wp-hub-header" style={{ paddingBottom: 0 }}>
              <div className="wp-hub-meta">retro game</div>
              <div className="wp-hub-title">snake</div>
            </div>
            <div style={{ flex: 1, padding: '10px 24px 20px 24px', overflow: 'hidden' }}>
              <div className="wp-snake-container">
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', fontSize: '13px', color: 'var(--wp-accent-light)', fontWeight: 600 }}>
                  <span>счёт: {phoneSnakeScore}</span>
                  {phoneSnakeOver && <span style={{ color: '#ff3b30' }}>ИГРА ОКОНЧЕНА!</span>}
                </div>

                <div 
                  className="wp-snake-board" 
                  style={{ 
                    width: `${SNAKE_GRID * 16}px`, 
                    height: `${SNAKE_GRID * 16}px`,
                    background: '#111',
                    position: 'relative'
                  }}
                >
                  {phoneSnakeOver && (
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                      <button 
                        onClick={resetPhoneSnake} 
                        style={{ background: 'var(--wp-accent)', border: 'none', color: '#fff', padding: '8px 16px', fontSize: '14px', cursor: 'pointer', fontWeight: 600 }}
                      >
                        начать заново
                      </button>
                    </div>
                  )}

                  {/* Food */}
                  <div 
                    style={{ 
                      position: 'absolute', 
                      width: '16px', 
                      height: '16px', 
                      background: '#ff3b30', 
                      borderRadius: '50%',
                      left: `${phoneFood.x * 16}px`, 
                      top: `${phoneFood.y * 16}px` 
                    }} 
                  />

                  {/* Snake Segments */}
                  {phoneSnake.map((seg, i) => (
                    <div 
                      key={i} 
                      style={{ 
                        position: 'absolute', 
                        width: '16px', 
                        height: '16px', 
                        background: i === 0 ? 'var(--wp-accent-light)' : 'var(--wp-accent)', 
                        border: '1px solid #111',
                        left: `${seg.x * 16}px`, 
                        top: `${seg.y * 16}px` 
                      }} 
                    />
                  ))}
                </div>

                {/* D-Pad Buttons for Phone screen */}
                <div className="wp-snake-controls">
                  <div />
                  <button className="wp-snake-btn" onClick={() => handleSnakeDirChange({ x: 0, y: -1 })}>
                    <ArrowUp size={18} />
                  </button>
                  <div />

                  <button className="wp-snake-btn" onClick={() => handleSnakeDirChange({ x: -1, y: 0 })}>
                    <ArrowLeft size={18} />
                  </button>
                  <button className="wp-snake-btn" onClick={resetPhoneSnake} style={{ fontSize: '12px' }}>
                    <RotateCcw size={14} />
                  </button>
                  <button className="wp-snake-btn" onClick={() => handleSnakeDirChange({ x: 1, y: 0 })}>
                    <ArrowRight size={18} />
                  </button>

                  <div />
                  <button className="wp-snake-btn" onClick={() => handleSnakeDirChange({ x: 0, y: 1 })}>
                    <ArrowDown size={18} />
                  </button>
                  <div />
                </div>
              </div>
            </div>
          </div>
        );

      case 'resume':
        return (
          <div className="wp-hub">
            <div className="wp-hub-header">
              <div className="wp-hub-meta">резюме Егора</div>
              <div className="wp-hub-title">{t('resume_pdf')}</div>
            </div>
            <PhonePivot
              activeTabId={resumeActiveTab}
              onTabChange={setResumeActiveTab}
              tabs={[
                {
                  id: 'view',
                  title: 'просмотр',
                  content: (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', lineHeight: 1.5, maxHeight: '100%', overflowY: 'auto', paddingRight: '4px' }}>
                      <div className="wp-list-item">
                        <div className="wp-list-title" style={{ fontSize: '18px', color: 'var(--wp-accent-light)' }}>{t('name')}</div>
                        <div className="wp-list-subtitle">{t('role')}</div>
                      </div>
                      <div className="wp-list-item">
                        <div className="wp-list-title">{i18n.language === 'ru' ? 'Опыт работы' : 'Experience'}</div>
                        <div className="wp-list-desc" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <div>
                            <strong>Tool-Kit (2026 — {i18n.language === 'ru' ? 'н.в.' : 'present'})</strong><br />
                            {t('toolkit_role')}<br />
                            - {i18n.language === 'ru' ? 'Разработка B2B стратегии, ABM, лидогенерация' : 'B2B GTM strategy, ABM, enterprise lead gen'}
                          </div>
                          <div>
                            <strong>DayNet (2023 — 2026)</strong><br />
                            {t('daynet_dev_role')}<br />
                            - {i18n.language === 'ru' ? 'Оптимизация процессов компании, Python-скрипты, NLP репутации' : 'Company audits, Python data automation, NLP/reputation analysis'}
                          </div>
                          <div>
                            <strong>Freelance (2021 — 2023)</strong><br />
                            {t('freelance_role')}<br />
                            - {i18n.language === 'ru' ? 'Контекстная и таргетированная реклама' : 'Targeted & search ads, landing pages'}
                          </div>
                        </div>
                      </div>
                      <div className="wp-list-item">
                        <div className="wp-list-title">{i18n.language === 'ru' ? 'Ключевые навыки' : 'Key Skills'}</div>
                        <div className="wp-list-desc">
                          Python (Pandas, NLP), SQL, ClickHouse, DataLens, B2B Marketing, Account-Based Marketing (ABM), Google Analytics, Yandex.Metrica.
                        </div>
                      </div>
                      <div className="wp-list-item">
                        <div className="wp-list-title">Контакты</div>
                        <div className="wp-list-desc">
                          Telegram: @nonenewfriends<br />
                          Email: egor.khromov@example.com
                        </div>
                      </div>
                    </div>
                  )
                },
                {
                  id: 'download',
                  title: 'скачать',
                  content: (
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center', gap: '20px', padding: '20px 0' }}>
                      <div style={{ textAlign: 'center', color: 'var(--wp-subtle)', fontSize: '14px' }}>
                        Загрузите полное резюме Егора Хромова в формате PDF для печати или просмотра на ПК.
                      </div>
                      <a 
                        href={`${import.meta.env.BASE_URL}cv_ru.pdf`} 
                        download 
                        onClick={() => playSound('open')}
                        style={{ 
                          background: 'var(--wp-accent)', 
                          color: 'white', 
                          padding: '12px 24px', 
                          fontSize: '14px', 
                          fontWeight: 600, 
                          textDecoration: 'none',
                          textAlign: 'center',
                          width: '80%'
                        }}
                      >
                        {t('download_cv')}
                      </a>
                    </div>
                  )
                }
              ]}
            />
          </div>
        );

      case 'case_study':
        return (
          <div className="wp-hub">
            <div className="wp-hub-header">
              <div className="wp-hub-meta">{t('case_label')}</div>
              <div className="wp-hub-title">{t('brand_case')}</div>
            </div>
            <PhonePivot
              activeTabId={caseActiveTab}
              onTabChange={setCaseActiveTab}
              tabs={[
                {
                  id: 'context',
                  title: i18n.language === 'ru' ? 'задача' : 'challenge',
                  content: (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', lineHeight: 1.5 }}>
                      <h3 style={{ color: 'var(--wp-accent-light)', fontSize: '18px', fontWeight: 600 }}>{t('case_context_title')}</h3>
                      <p>{t('case_context_text')}</p>
                      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderLeft: '3px solid var(--wp-accent)', fontSize: '12px', marginTop: '10px' }}>
                        <strong>{i18n.language === 'ru' ? 'Бизнес-проблема:' : 'Business Issue:'}</strong> {i18n.language === 'ru' ? 'Компания с 25-летним опытом не знала розничного потребителя. На фоне ухода конкурентов нужно было за 2 недели перестроить стратегию.' : 'A company with 25 years of history did not know its retail customer. Amid competitors exit, we needed to pivot the strategy in 2 weeks.'}
                      </div>
                    </div>
                  )
                },
                {
                  id: 'stack',
                  title: i18n.language === 'ru' ? 'стек' : 'stack',
                  content: (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', lineHeight: 1.5 }}>
                      <h3 style={{ color: 'var(--wp-accent-light)', fontSize: '18px', fontWeight: 600 }}>{t('case_stack_title')}</h3>
                      <p>{t('case_stack_text')}</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', border: '1px solid rgba(255,255,255,0.1)' }}>
                          <strong>Brand Analytics API:</strong> {i18n.language === 'ru' ? 'Выгрузка и парсинг 150K+ сообщений.' : 'Harvesting and parsing 150K+ messages.'}
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', border: '1px solid rgba(255,255,255,0.1)' }}>
                          <strong>Python (NLP/ML):</strong> {i18n.language === 'ru' ? 'Обработка, очистка и классификация тональности.' : 'Data cleaning, sentiment and topic classification.'}
                        </div>
                      </div>
                    </div>
                  )
                },
                {
                  id: 'process',
                  title: i18n.language === 'ru' ? 'процесс' : 'process',
                  content: (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', lineHeight: 1.4, maxHeight: '100%', overflowY: 'auto' }}>
                      <h3 style={{ color: 'var(--wp-accent-light)', fontSize: '18px', fontWeight: 600 }}>{t('case_process_title')}</h3>
                      <p>{t('case_process_text')}</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', marginTop: '6px' }}>
                        <div>1. <strong>{i18n.language === 'ru' ? 'CAWI-опросы:' : 'CAWI Surveys:'}</strong> {i18n.language === 'ru' ? '1500 респондентов на платформе Opronix.' : '1500 respondents via Opronix platform.'}</div>
                        <div>2. <strong>{i18n.language === 'ru' ? 'Парсинг NLP:' : 'NLP Parsing:'}</strong> {i18n.language === 'ru' ? 'Обработка и фильтрация спама на Python.' : 'Processing and spam filtering in Python.'}</div>
                        <div>3. <strong>{i18n.language === 'ru' ? 'ML-модели:' : 'ML Classification:'}</strong> {i18n.language === 'ru' ? 'Разметка тональности отзывов.' : 'Sentiment and category tagging.'}</div>
                      </div>
                    </div>
                  )
                },
                {
                  id: 'results',
                  title: i18n.language === 'ru' ? 'результат' : 'results',
                  content: (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', lineHeight: 1.4, maxHeight: '100%', overflowY: 'auto' }}>
                      <div>
                        <h3 style={{ color: 'var(--wp-accent-light)', fontSize: '18px', fontWeight: 600, marginBottom: '6px' }}>{t('case_results_title')}</h3>
                        <p>{t('case_results_text')}</p>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ fontSize: '11px', color: 'var(--wp-subtle)', marginBottom: '8px', fontWeight: 600 }}>{i18n.language === 'ru' ? 'Пирамида узнаваемости бренда' : 'Brand Awareness Pyramid'}</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%', alignItems: 'center' }}>
                          <div style={{ width: '40%', height: '26px', background: '#ff3b30', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '8px', fontWeight: 'bold', clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)', textAlign: 'center' }}>
                            <span>Top of Mind &lt; 1%</span>
                          </div>
                          <div style={{ width: '65%', height: '26px', background: '#ff9500', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '8px', fontWeight: 'bold', clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)', textAlign: 'center' }}>
                            <span>{i18n.language === 'ru' ? 'Спонтанная 14%' : 'Spontaneous 14%'}</span>
                          </div>
                          <div style={{ width: '90%', height: '26px', background: '#007aff', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '8px', fontWeight: 'bold', clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)', textAlign: 'center' }}>
                            <span>{i18n.language === 'ru' ? 'Подсказанная 56%' : 'Aided 56%'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
              ]}
            />
          </div>
        );
      default:
        return null;
    }
  };

  // Handle i18n change inside WP Phone
  const handleToggleLanguage = () => {
    playSound('open');
    const newLng = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLng);
  };

  return (
    <div className="wp-phone-shell">
      {/* Metro Toast Notification (Cookie Banner) */}
      <AnimatePresence>
        {showCookieNotice && (
          <motion.div
            initial={{ y: -120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -120, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            onClick={() => {
              localStorage.setItem('cookies_accepted', 'true');
              setShowCookieNotice(false);
              playSound('close');
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              background: '#1f1f1f',
              borderBottom: '3px solid var(--wp-accent)',
              padding: '12px 16px',
              zIndex: 9999, // Overlay status bar
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
              cursor: 'pointer'
            }}
          >
            <div style={{
              background: 'var(--wp-accent)',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              flexShrink: 0
            }}>
              <ShieldAlert size={18} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                color: 'var(--wp-accent-light)',
                letterSpacing: '0.5px'
              }}>
                {t('cookie_title')}
              </div>
              <div style={{
                fontSize: '13px',
                color: '#fff',
                marginTop: '2px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {t('cookie_message')}
              </div>
            </div>
            <div style={{
              fontSize: '11px',
              fontWeight: 'bold',
              textTransform: 'lowercase',
              color: 'var(--wp-accent-light)',
              border: '1px solid var(--wp-accent)',
              padding: '4px 8px',
              flexShrink: 0
            }}>
              {t('cookie_accept')}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Bar */}
      <div className="wp-status-bar">
        <span>SIM_1</span>
        <div className="wp-status-right">
          <span>LTE</span>
          <span>📶</span>
          <span>🔋 100%</span>
          <span style={{ marginLeft: '4px' }}>{formatShortTime(currentTime)}</span>
        </div>
      </div>

      {/* Main Display screen */}
      <div className="wp-display">
        <AnimatePresence>
          {isLocked && (
            <PhoneLockScreen onUnlock={() => setIsLocked(false)} />
          )}
        </AnimatePresence>

        {/* Start Screen (Home page with Tiles) */}
        {!isLocked && !activeAppId && (
          <PhoneStartScreen 
            onOpenApp={setActiveAppId} 
            onToggleLanguage={handleToggleLanguage} 
          />
        )}

        {/* Metro App/Hub view with Turnstile transition */}
        <AnimatePresence>
          {activeAppId && (
            <motion.div
              initial={{ rotateY: 90, opacity: 0, scale: 0.9 }}
              animate={{ rotateY: 0, opacity: 1, scale: 1 }}
              exit={{ rotateY: -90, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 800,
                background: 'var(--wp-bg)'
              }}
            >
              {renderAppContent(activeAppId)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Physical Nav Bar */}
      <div className="wp-nav-bar">
        <button className="wp-nav-btn" onClick={handleNavBack} title="Back">
          <ChevronLeft size={24} />
        </button>
        <button className="wp-nav-btn" onClick={handleNavHome} title="Start">
          <Home size={20} />
        </button>
        <button className="wp-nav-btn" onClick={handleNavSearch} title="Messenger">
          <MessageSquare size={20} />
        </button>
      </div>
    </div>
  );
};
