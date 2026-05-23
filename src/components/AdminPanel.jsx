import React, { useState } from 'react';
import { LogOut, Trash2, PlusCircle, Globe, Settings, Eye, CheckCircle, ArrowLeft } from 'lucide-react';
import initialPosts from '../data/blog.json';
import { playSound } from '../utils/sounds';

export const AdminPanel = ({ onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab: 'create' or 'manage'
  const [activeTab, setActiveTab] = useState('create');
  
  // Post List State
  const [posts, setPosts] = useState(initialPosts || []);

  // Form Fields
  const [titleRu, setTitleRu] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [textRu, setTextRu] = useState('');
  const [textEn, setTextEn] = useState('');
  const [category, setCategory] = useState('Theory');
  const [date, setDate] = useState(new Date().toLocaleDateString('ru-RU'));
  const [imageBase64, setImageBase64] = useState('');
  const [imageName, setImageName] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  // Status & Success Messages
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [generatedJson, setGeneratedJson] = useState('');

  const isProduction = import.meta.env.PROD;

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'egor' && password === 'khromov2026') {
      setIsAuthenticated(true);
      playSound('open');
      setLoginError('');
    } else {
      setLoginError('Неверный логин или пароль / Invalid credentials');
      playSound('close'); // error sound
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!titleRu || !titleEn || !textRu || !textEn) {
      setStatusMsg({ type: 'error', text: 'Пожалуйста, заполните все обязательные текстовые поля.' });
      return;
    }

    const payload = {
      title_ru: titleRu,
      title_en: titleEn,
      text_ru: textRu,
      text_en: textEn,
      category,
      date,
      imageBase64,
      imageName
    };

    if (isProduction) {
      // In production, we cannot write to disk, so we generate JSON for the user to copy
      const localPostMock = {
        id: `post_${Date.now()}`,
        ...payload,
        image: '/blog/default.jpg' // fallback
      };
      delete localPostMock.imageBase64;
      delete localPostMock.imageName;

      setGeneratedJson(JSON.stringify(localPostMock, null, 2));
      setStatusMsg({
        type: 'warning',
        text: 'Вы находитесь в продакшене. Запись на диск невозможна. Скопируйте сгенерированный JSON поста ниже и добавьте его в src/data/blog.json.'
      });
      playSound('notification');
      return;
    }

    // In local dev mode, call our Vite middleware endpoint
    try {
      setStatusMsg({ type: 'info', text: 'Сохранение поста...' });
      const response = await fetch('/api/add-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const resData = await response.json();
      if (resData.success) {
        playSound('open');
        setStatusMsg({ type: 'success', text: 'Пост успешно сохранен на диск!' });
        
        // Update local state so user sees it in the management tab
        // Merge translations for local state display
        const addedPost = {
          id: resData.post.id,
          title_ru: titleRu,
          title_en: titleEn,
          text_ru: textRu,
          text_en: textEn,
          category: resData.post.category,
          date: resData.post.date,
          image: resData.post.image
        };
        setPosts(prev => [addedPost, ...prev]);

        // Reset form
        setTitleRu('');
        setTitleEn('');
        setTextRu('');
        setTextEn('');
        setImageBase64('');
        setImageName('');
        setImagePreview('');
      } else {
        throw new Error(resData.error || 'Ошибка записи');
      }
    } catch (err) {
      playSound('close');
      setStatusMsg({ type: 'error', text: `Ошибка сохранения: ${err.message}` });
    }
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот пост?')) return;

    if (isProduction) {
      // In production, just filter local state
      setPosts(prev => prev.filter(p => p.id !== id));
      setStatusMsg({ type: 'warning', text: 'Пост удален из локального вида, но для постоянного удаления отредактируйте src/data/blog.json в коде.' });
      playSound('close');
      return;
    }

    try {
      const response = await fetch('/api/delete-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const resData = await response.json();
      if (resData.success) {
        playSound('close');
        setPosts(prev => prev.filter(p => p.id !== id));
        setStatusMsg({ type: 'success', text: 'Пост удален с диска!' });
      } else {
        throw new Error(resData.error || 'Ошибка удаления');
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: `Не удалось удалить: ${err.message}` });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-overlay">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <Settings size={28} className="spin-slow" style={{ color: '#007aff' }} />
            <h2>Вход в панель управления</h2>
            <p>Панель управления резюме Егора Хромова</p>
          </div>
          
          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="form-group">
              <label>Логин / Username</label>
              <input 
                type="text" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                required 
                placeholder="egor"
              />
            </div>
            <div className="form-group">
              <label>Пароль / Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
                placeholder="••••••••"
              />
            </div>
            {loginError && <div className="login-error">{loginError}</div>}
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button 
                type="button" 
                onClick={onClose} 
                className="btn-secondary"
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <ArrowLeft size={16} /> На сайт
              </button>
              <button type="submit" className="btn-primary" style={{ flex: 2 }}>Войти</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="admin-sidebar-header">
          <Settings size={24} style={{ color: '#007aff' }} />
          <h3>Egor Admin</h3>
        </div>
        <div className="admin-nav-links">
          <button 
            className={`admin-nav-btn ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => { setActiveTab('create'); setStatusMsg({ type: '', text: '' }); }}
          >
            <PlusCircle size={18} /> Добавить пост
          </button>
          <button 
            className={`admin-nav-btn ${activeTab === 'manage' ? 'active' : ''}`}
            onClick={() => { setActiveTab('manage'); setStatusMsg({ type: '', text: '' }); }}
          >
            <Eye size={18} /> Управление ({posts.length})
          </button>
        </div>
        <div className="admin-sidebar-footer">
          <button onClick={onClose} className="admin-back-btn">
            <ArrowLeft size={16} /> Вернуться на сайт
          </button>
          <button onClick={() => { setIsAuthenticated(false); playSound('close'); }} className="admin-logout-btn">
            <LogOut size={16} /> Выйти
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="admin-main-content">
        <div className="admin-header">
          <h2>{activeTab === 'create' ? 'Создать новый пост в блог' : 'Управление постами'}</h2>
          <div className="admin-badge">
            <Globe size={14} /> 
            {isProduction ? 'Режим: Продакшн (Экспорт)' : 'Режим: Локальный (Запись на диск)'}
          </div>
        </div>

        {statusMsg.text && (
          <div className={`status-banner ${statusMsg.type}`}>
            {statusMsg.type === 'success' && <CheckCircle size={18} style={{ color: '#34c759' }} />}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {activeTab === 'create' && (
          <div className="admin-form-container">
            <form onSubmit={handleCreatePost} className="admin-post-form">
              <div className="form-row-two">
                <div className="form-group">
                  <label>Заголовок (RU) <span style={{ color: '#ff3b30' }}>*</span></label>
                  <input 
                    type="text" 
                    value={titleRu} 
                    onChange={e => setTitleRu(e.target.value)} 
                    placeholder="Например: Как автоматизировать B2B-маркетинг"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Заголовок (EN) <span style={{ color: '#ff3b30' }}>*</span></label>
                  <input 
                    type="text" 
                    value={titleEn} 
                    onChange={e => setTitleEn(e.target.value)} 
                    placeholder="Example: How to Automate B2B Marketing"
                    required
                  />
                </div>
              </div>

              <div className="form-row-three">
                <div className="form-group">
                  <label>Категория</label>
                  <select value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="Theory">Теория / Theory</option>
                    <option value="Analytics">Аналитика / Analytics</option>
                    <option value="Marketing">Маркетинг / Marketing</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Дата создания</label>
                  <input 
                    type="text" 
                    value={date} 
                    onChange={e => setDate(e.target.value)} 
                    placeholder="23.05.2026"
                  />
                </div>
                <div className="form-group">
                  <label>Обложка поста (Картинка)</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ padding: '4px' }}
                  />
                </div>
              </div>

              {imagePreview && (
                <div className="image-upload-preview">
                  <p>Предпросмотр обложки:</p>
                  <img src={imagePreview} alt="Preview" />
                </div>
              )}

              <div className="form-group">
                <label>Содержание поста на русском (RU) <span style={{ color: '#ff3b30' }}>*</span></label>
                <textarea 
                  value={textRu} 
                  onChange={e => setTextRu(e.target.value)} 
                  rows="8"
                  placeholder="Основной текст поста..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Содержание поста на английском (EN) <span style={{ color: '#ff3b30' }}>*</span></label>
                <textarea 
                  value={textEn} 
                  onChange={e => setTextEn(e.target.value)} 
                  rows="8"
                  placeholder="Main post content..."
                  required
                />
              </div>

              <button type="submit" className="btn-submit">
                <PlusCircle size={18} /> Сохранить и Опубликовать
              </button>
            </form>

            {generatedJson && (
              <div className="json-export-box">
                <h4>Сгенерированный JSON для вставки в `blog.json`:</h4>
                <textarea 
                  readOnly 
                  value={generatedJson} 
                  onClick={e => e.target.select()}
                  rows="10"
                />
                <p>Кликните по полю, чтобы выделить весь код, скопируйте его и вставьте в `src/data/blog.json`.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'manage' && (
          <div className="admin-manage-container">
            {posts.length === 0 ? (
              <div className="no-posts-banner">Пока нет созданных постов в блоге.</div>
            ) : (
              <div className="admin-posts-list">
                {posts.map(post => (
                  <div key={post.id} className="admin-post-card">
                    <div className="admin-post-card-img" style={{ backgroundImage: post.image && post.image !== '/blog/default.jpg' ? `url(${post.image})` : 'linear-gradient(135deg, #85ffbd 0%, #fffb7d 100%)' }} />
                    <div className="admin-post-card-info">
                      <div className="admin-post-card-meta">
                        <span className="post-category-tag">{post.category}</span>
                        <span className="post-date">{post.date}</span>
                      </div>
                      <h4>{post.title_ru || post.title}</h4>
                      <p>{(post.text_ru || post.text || '').substring(0, 120)}...</p>
                    </div>
                    <button 
                      onClick={() => handleDeletePost(post.id)}
                      className="admin-delete-btn"
                      title="Удалить пост"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
