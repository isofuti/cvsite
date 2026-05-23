import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Folder, User, Image as ImageIcon, Send, Gamepad2, BarChart3, ShieldAlert, BookOpen } from 'lucide-react';
import { MenuBar } from './components/MenuBar';
import { Dock } from './components/Dock';
import { MacWindow } from './components/Window';
import { DesktopIcon } from './components/DesktopIcon';
import { SnakeGame } from './components/SnakeGame';
import { Notification } from './components/Notification';
import { TelegramApp } from './components/TelegramApp';
import { PhoneInterface } from './components/PhoneInterface';
import { BrandCaseApp } from './components/BrandCaseApp';
import { SafariApp } from './components/SafariApp';
import { AdminPanel } from './components/AdminPanel';
import { CapabilitiesApp } from './components/CapabilitiesApp';
import { playSound } from './utils/sounds';
import avatarUrl from './assets/avatar.jpg';
import './index.css';

// --- APP CONTENT DEFINITIONS ---
const getApps = (t) => [
  { id: 'about', title: t('about_me') || 'About Me', icon: User, color: '#ff3b30' },
  { id: 'experience', title: t('experience_folder') || 'Experience', icon: Folder, color: '#007aff' },
  { id: 'skills', title: t('skills_doc') || 'Capabilities', icon: FileText, color: '#34c759' },
  { id: 'resume', title: t('resume_pdf') || 'Resume', icon: ImageIcon, color: '#ff2d55' },
  { id: 'cases', title: t('cases_folder') || 'Cases', icon: Folder, color: '#007aff' },
  { id: 'safari', title: t('blog_title') || 'Blog', icon: BookOpen, color: '#007aff' },
  { id: 'contact', title: t('contact_app') || 'Contact', icon: Send, color: '#00bcd4' },
  { id: 'snake', title: 'Snake Game', icon: Gamepad2, color: '#ff9500' },
];

const getSubApps = (t) => [
  { id: 'toolkit', title: 'Tool-Kit', icon: Folder, color: '#007aff' },
  { id: 'daynet', title: 'DayNet', icon: Folder, color: '#007aff' },
  { id: 'freelance', title: 'Freelance', icon: Folder, color: '#007aff' },
  { id: 'case_study', title: t('brand_case') || 'Brand Case Study', icon: BarChart3, color: '#af52de' }
];

function App() {
  const { t, i18n } = useTranslation();
  const apps = getApps(t);
  const subApps = getSubApps(t);

  const [isAdminView, setIsAdminView] = useState(
    window.location.pathname === '/admin' || 
    window.location.search.includes('view=admin')
  );

  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [selectedIconId, setSelectedIconId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showNotification, setShowNotification] = useState(false);
  const [showCookieNotice, setShowCookieNotice] = useState(false);
  const [isDockHovered, setIsDockHovered] = useState(false);

  const isAnyWindowFullscreen = windows.some(w => w.isFullscreen && !w.isMinimized);
  const isDockHidden = isAnyWindowFullscreen && !isDockHovered;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    
    // Spawn notification after 5 seconds
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 5000);

    // Spawn cookie notice after 1.5 seconds if not accepted
    let cookieTimer;
    const consented = localStorage.getItem('cookies_accepted') === 'true';
    if (!consented) {
      cookieTimer = setTimeout(() => {
        setShowCookieNotice(true);
      }, 1500);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
      if (cookieTimer) clearTimeout(cookieTimer);
    };
  }, []);

  const openWindow = (appId) => {
    const existingWindow = windows.find(w => w.appId === appId);
    if (existingWindow) {
      if (existingWindow.id === activeWindowId && !existingWindow.isMinimized) {
        // Toggle minimize if already active and clicked in dock
        playSound('close');
        minimizeWindow(existingWindow.id);
      } else {
        // Un-minimize and focus
        playSound('open');
        setWindows(prev => prev.map(w => w.id === existingWindow.id ? { ...w, isMinimized: false } : w));
        focusWindow(existingWindow.id);
      }
      return;
    }

    const app = [...apps, ...subApps].find(a => a.id === appId);
    if (!app) return;

    playSound('open');

    const newWindowId = `win_${Date.now()}`;
    const newWindow = {
      id: newWindowId,
      appId: app.id,
      title: app.title,
      isMinimized: false,
      isFullscreen: false
    };

    setWindows([...windows, newWindow]);
    setActiveWindowId(newWindowId);
  };

  const toggleFullscreenWindow = (windowId) => {
    setWindows(prev => prev.map(w => w.id === windowId ? { ...w, isFullscreen: !w.isFullscreen } : w));
  };

  const closeWindow = (windowId) => {
    playSound('close');
    setWindows(prev => {
      const remaining = prev.filter(w => w.id !== windowId);
      setActiveWindowId(currentActive => {
        if (currentActive === windowId) {
          return remaining.length > 0 ? remaining[remaining.length - 1].id : null;
        }
        return currentActive;
      });
      return remaining;
    });
  };

  const minimizeWindow = (windowId) => {
    setWindows(prev => prev.map(w => w.id === windowId ? { ...w, isMinimized: true } : w));
    // Focus the next available window
    setActiveWindowId(currentActive => {
      if (currentActive === windowId) {
        const remaining = windows.filter(w => w.id !== windowId && !w.isMinimized);
        return remaining.length > 0 ? remaining[remaining.length - 1].id : null;
      }
      return currentActive;
    });
  };

  const focusWindow = (windowId) => {
    // Also unminimize when focusing
    setWindows(prev => prev.map(w => w.id === windowId ? { ...w, isMinimized: false } : w));
    setActiveWindowId(windowId);
  };

  const handleDesktopClick = () => {
    setSelectedIconId(null);
    setActiveWindowId(null);
  };

  // --- WINDOW CONTENT RENDERING ---
  const renderContent = (appId) => {
    switch(appId) {
      case 'about':
        return (
          <div style={{ padding: '2rem', fontFamily: 'sans-serif', fontSize: '14px', lineHeight: 1.6, color: '#333' }}>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #eaeaea', paddingBottom: '20px' }}>
              <img 
                src={avatarUrl} 
                alt={t('name')} 
                style={{ width: '90px', height: '90px', borderRadius: '50%', border: '3px solid #007aff', objectFit: 'cover' }}
              />
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>{t('name')}</h1>
                <h2 style={{ fontSize: '15px', fontWeight: 500, color: '#666', marginTop: '4px' }}>{t('role')}</h2>
              </div>
            </div>
            <p style={{ whiteSpace: 'pre-line', fontSize: '14px', lineHeight: 1.6 }}>{t('about')}</p>
          </div>
        );
      case 'experience':
        return (
          <div style={{ padding: '2rem', display: 'flex', gap: '30px' }}>
            <div style={{ textAlign: 'center', cursor: 'pointer' }} onDoubleClick={() => openWindow('toolkit')}>
              <Folder size={64} color="#007aff" />
              <div style={{ marginTop: '8px', fontSize: '12px', fontWeight: 500 }}>Tool-Kit</div>
            </div>
            <div style={{ textAlign: 'center', cursor: 'pointer' }} onDoubleClick={() => openWindow('daynet')}>
              <Folder size={64} color="#007aff" />
              <div style={{ marginTop: '8px', fontSize: '12px', fontWeight: 500 }}>DayNet</div>
            </div>
            <div style={{ textAlign: 'center', cursor: 'pointer' }} onDoubleClick={() => openWindow('freelance')}>
              <Folder size={64} color="#007aff" />
              <div style={{ marginTop: '8px', fontSize: '12px', fontWeight: 500 }}>Freelance</div>
            </div>
          </div>
        );
      case 'toolkit':
        return (
          <div style={{ padding: '2rem', fontFamily: 'sans-serif', color: '#333', lineHeight: 1.6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #eaeaea', paddingBottom: '10px', marginBottom: '15px' }}>
              <h2 style={{ margin: 0, fontSize: '22px', color: '#007aff' }}>Tool-Kit</h2>
              <span style={{ fontSize: '13px', color: '#888', fontWeight: 500 }}>
                {i18n.language === 'ru' ? 'Февраль 2026 — н.в.' : 'February 2026 — Present'}
              </span>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#555', marginBottom: '10px' }}>
              {t('toolkit_role')}
            </h3>
            <p style={{ fontSize: '14px', whiteSpace: 'pre-line' }}>{t('toolkit_desc')}</p>
          </div>
        );
      case 'daynet':
        return (
          <div style={{ padding: '2rem', fontFamily: 'sans-serif', color: '#333', lineHeight: 1.5, maxHeight: '100%', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #eaeaea', paddingBottom: '10px', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, fontSize: '22px', color: '#007aff' }}>DayNet</h2>
              <span style={{ fontSize: '13px', color: '#888', fontWeight: 500 }}>2023 — 2026 (3 {i18n.language === 'ru' ? 'года' : 'years'})</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative', paddingLeft: '20px', borderLeft: '2px solid #007aff' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-27px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', background: '#007aff', border: '2px solid #fff' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '15px', color: '#000' }}>{t('daynet_dev_role')}</strong>
                  <span style={{ fontSize: '12px', color: '#888', fontWeight: 500 }}>2025 — 2026</span>
                </div>
                <p style={{ fontSize: '13px', margin: 0 }}>{t('daynet_dev_desc')}</p>
              </div>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-27px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', background: '#888', border: '2px solid #fff' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '15px', color: '#333' }}>{t('daynet_senior_role')}</strong>
                  <span style={{ fontSize: '12px', color: '#888', fontWeight: 500 }}>2024 — 2025</span>
                </div>
                <p style={{ fontSize: '13px', margin: 0 }}>{t('daynet_senior_desc')}</p>
              </div>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-27px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', background: '#ccc', border: '2px solid #fff' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '15px', color: '#555' }}>{t('daynet_junior_role')}</strong>
                  <span style={{ fontSize: '12px', color: '#888', fontWeight: 500 }}>2023 — 2024</span>
                </div>
                <p style={{ fontSize: '13px', margin: 0 }}>{t('daynet_junior_desc')}</p>
              </div>
            </div>
          </div>
        );
      case 'freelance':
        return (
          <div style={{ padding: '2rem', fontFamily: 'sans-serif', color: '#333', lineHeight: 1.6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #eaeaea', paddingBottom: '10px', marginBottom: '15px' }}>
              <h2 style={{ margin: 0, fontSize: '22px', color: '#007aff' }}>Freelance</h2>
              <span style={{ fontSize: '13px', color: '#888', fontWeight: 500 }}>2021 — 2023</span>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#555', marginBottom: '10px' }}>
              {t('freelance_role')}
            </h3>
            <p style={{ fontSize: '14px', whiteSpace: 'pre-line' }}>{t('freelance_desc')}</p>
          </div>
        );
      case 'skills':
        return <CapabilitiesApp />;
      case 'safari':
        return <SafariApp />;
      case 'resume':
        return (
          <iframe src={`${import.meta.env.BASE_URL}cv_ru.pdf`} width="100%" height="100%" style={{ border: 'none' }} title="Resume PDF" />
        );
      case 'cases':
        return (
          <div style={{ padding: '2rem', display: 'flex', gap: '30px' }}>
            <div style={{ textAlign: 'center', cursor: 'pointer', width: '80px' }} onDoubleClick={() => openWindow('case_study')}>
              <BarChart3 size={64} color="#af52de" />
              <div style={{ marginTop: '8px', fontSize: '12px', fontWeight: 500, lineHeight: 1.2 }}>
                {t('brand_case')}
              </div>
            </div>
          </div>
        );
      case 'case_study':
        return <BrandCaseApp />;
      case 'contact':
        return <TelegramApp />;
      case 'snake':
        return <SnakeGame />;
      default:
        return <div>Empty</div>;
    }
  };

  const runningApps = [];
  windows.forEach(w => {
    if (!apps.some(a => a.id === w.appId)) {
      const subApp = subApps.find(sa => sa.id === w.appId);
      if (subApp && !runningApps.some(ra => ra.id === subApp.id)) {
        runningApps.push(subApp);
      }
    }
  });

  if (isAdminView) {
    return (
      <AdminPanel 
        onClose={() => {
          setIsAdminView(false);
          window.history.pushState({}, '', '/');
        }} 
      />
    );
  }

  if (isMobile) {
    return <PhoneInterface />;
  }

  const activeAppTitle = activeWindowId 
    ? windows.find(w => w.id === activeWindowId)?.title 
    : 'Finder';

  return (
    <div className="desktop-container" onClick={handleDesktopClick}>
      <MenuBar activeApp={activeAppTitle} onOpenContact={() => openWindow('contact')} />
      
      <div className="desktop-area">
        {apps.filter(app => app.id !== 'contact').map(app => (
          <DesktopIcon
            key={app.id}
            id={app.id}
            icon={app.icon}
            label={app.title}
            color={app.color}
            isSelected={selectedIconId === app.id}
            onClick={setSelectedIconId}
            onDoubleClick={openWindow}
          />
        ))}
      </div>

      {windows.map((w, index) => {
        const zIndex = w.id === activeWindowId ? 100 : 10 + index;
        // Dynamic title resolution for i18n
        const appDef = [...apps, ...subApps].find(a => a.id === w.appId);
        const windowTitle = appDef ? appDef.title : w.title;

        return (
          <MacWindow
            key={w.id}
            id={w.id}
            title={windowTitle}
            zIndex={zIndex}
            isActive={w.id === activeWindowId}
            isMinimized={w.isMinimized}
            isFullscreen={w.isFullscreen}
            onFocus={focusWindow}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onToggleFullscreen={toggleFullscreenWindow}
            content={renderContent(w.appId)}
          />
        );
      })}

      <Dock 
        apps={apps} 
        runningApps={runningApps} 
        openWindows={windows} 
        onAppClick={openWindow} 
        isDockHidden={isDockHidden}
        onMouseEnter={() => setIsDockHovered(true)}
        onMouseLeave={() => setIsDockHovered(false)}
      />
      {isAnyWindowFullscreen && (
        <div 
          className="dock-trigger-zone" 
          onMouseEnter={() => setIsDockHovered(true)}
        />
      )}
      <Notification 
        show={showNotification} 
        title="Egor Khromov" 
        message={t('notification_msg')} 
        top={showCookieNotice ? '195px' : '38px'}
        onClose={() => setShowNotification(false)} 
        onClick={() => {
          openWindow('contact');
          setShowNotification(false);
        }}
      />
      <Notification 
        show={showCookieNotice} 
        title={t('cookie_title')} 
        message={t('cookie_message')} 
        position="right"
        disableAutoClose={true}
        buttonText={t('cookie_accept')}
        icon={ShieldAlert}
        top="38px"
        onClose={() => setShowCookieNotice(false)} 
        onClick={() => {
          localStorage.setItem('cookies_accepted', 'true');
          setShowCookieNotice(false);
          playSound('close');
        }}
      />
    </div>
  );
}

export default App;
