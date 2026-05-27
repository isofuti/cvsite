import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Shield, Compass, Search, ExternalLink, ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import initialPosts from '../data/blog.json';
import { playSound } from '../utils/sounds';

export const SafariApp = () => {
  const { t, i18n } = useTranslation();
  
  // Blog State
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch/load posts (initialized with JSON data, which might have new local additions if loaded from memory)
  useEffect(() => {
    // Try to fetch newest blog.json in dev mode, fall back to initialPosts
    const loadPosts = async () => {
      try {
        const response = await fetch('/src/data/blog.json');
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
          return;
        }
      } catch (e) {
        // Fallback to static import
      }
      setPosts(initialPosts || []);
    };
    loadPosts();
  }, []);

  const handlePostClick = (post) => {
    playSound('open');
    setSelectedPost(post);
  };

  const handleBackToList = () => {
    playSound('close');
    setSelectedPost(null);
  };

  // Helper: calculate reading time
  const getReadingTime = (text) => {
    const wpm = 200; // words per minute
    const words = text ? text.trim().split(/\s+/).length : 0;
    return Math.ceil(words / wpm) || 1;
  };

  // Filter and Search Logic
  const filteredPosts = posts.filter(post => {
    const title = (i18n.language === 'ru' ? (post.title_ru || post.title) : (post.title_en || post.title)) || '';
    const text = (i18n.language === 'ru' ? (post.text_ru || post.text) : (post.text_en || post.text)) || '';
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          text.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeCategory === 'All') return matchesSearch;
    return post.category === activeCategory && matchesSearch;
  });

  return (
    <div className="safari-container">
      {/* Safari Window Header Toolbar */}
      <div className="safari-toolbar">
        <div className="safari-nav-buttons">
          <button 
            className="safari-nav-btn" 
            disabled={!selectedPost} 
            onClick={handleBackToList}
            title="Назад"
          >
            <ArrowLeft size={16} />
          </button>
          <button className="safari-nav-btn" disabled title="Вперед">
            <ArrowRight size={16} />
          </button>
          <button className="safari-nav-btn" onClick={() => { playSound('open'); }} title="Обновить">
            <RotateCw size={14} />
          </button>
        </div>

        <div className="safari-search-bar">
          <Shield size={13} className="safari-secure-icon" />
          <div className="safari-url">
            theyoungest.ru/blog{selectedPost ? `/${selectedPost.id}` : ''}
          </div>
          <Compass size={14} className="safari-compass-icon" />
        </div>

        <div className="safari-window-actions">
          <div className="safari-search-input-wrapper">
            <Search size={14} className="safari-search-input-icon" />
            <input 
              type="text" 
              placeholder={i18n.language === 'ru' ? 'Поиск...' : 'Search...'} 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="safari-search-input"
            />
          </div>
        </div>
      </div>

      {/* Safari Main Content Area */}
      <div className="safari-body">
        {selectedPost ? (
          /* Reader View */
          <div className="safari-reader">
            <button className="safari-reader-back" onClick={handleBackToList}>
              <ChevronLeft size={16} /> 
              {i18n.language === 'ru' ? 'Назад к списку' : 'Back to list'}
            </button>

            <article className="safari-article">
              <div className="article-meta">
                <span className="article-category">{t(`blog_${selectedPost.category.toLowerCase()}`)}</span>
                <span className="article-dot">•</span>
                <span className="article-date">{selectedPost.date}</span>
                <span className="article-dot">•</span>
                <span className="article-read-time">
                  {getReadingTime((i18n.language === 'ru' ? selectedPost.text_ru : selectedPost.text_en) || selectedPost.text || '')} {t('blog_read_time')}
                </span>
              </div>

              <h1 className="article-title">
                {(i18n.language === 'ru' ? selectedPost.title_ru : selectedPost.title_en) || selectedPost.title || ''}
              </h1>

              {/* Cover image or fallback gradient */}
              {selectedPost.image && selectedPost.image !== '/blog/default.jpg' ? (
                <img src={selectedPost.image} alt={(i18n.language === 'ru' ? selectedPost.title_ru : selectedPost.title_en) || selectedPost.title || ''} className="article-cover" />
              ) : (
                <div className="article-cover-fallback">
                  <span>{(i18n.language === 'ru' ? selectedPost.title_ru : selectedPost.title_en) || selectedPost.title || ''}</span>
                </div>
              )}

              <div className="article-content">
                {((i18n.language === 'ru' ? selectedPost.text_ru : selectedPost.text_en) || selectedPost.text || '')
                  ?.split('\n\n')
                  .map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
              </div>

              <div className="article-footer">
                <a 
                  href={selectedPost.id === 'post_4' ? 'https://secrets.tbank.ru/blogi-kompanij/rynok-truda-uzbekistana-i-socmedia/' : selectedPost.url || 'https://t.me/nonenewfriends'} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-tenchat-link"
                >
                  {selectedPost.id === 'post_4' 
                    ? (i18n.language === 'ru' ? 'Читать оригинал на Т-Бизнес' : 'Read original on T-Business') 
                    : t('open_tenchat')} <ExternalLink size={14} />
                </a>
              </div>
            </article>
          </div>
        ) : (
          /* Blog Grid List View */
          <div className="safari-blog-list">
            <div className="safari-blog-header">
              <h1>{i18n.language === 'ru' ? 'Блог о Маркетинге & Аналитике' : 'Marketing & Analytics Blog'}</h1>
              <p>
                {i18n.language === 'ru' 
                  ? 'Экспертные статьи, разборы теории и личные тренды развития' 
                  : 'Expert articles, marketing theory breakdowns, and data automation trends'}
              </p>
            </div>

            {/* Category Pills */}
            <div className="category-pills">
              {['All', 'Theory', 'Analytics', 'Marketing'].map(cat => (
                <button
                  key={cat}
                  className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => { playSound('open'); setActiveCategory(cat); }}
                >
                  {cat === 'All' ? t('blog_all') : t(`blog_${cat.toLowerCase()}`)}
                </button>
              ))}
            </div>

            {/* Grid */}
            {filteredPosts.length === 0 ? (
              <div className="no-articles">
                {i18n.language === 'ru' ? 'Статьи не найдены.' : 'No articles found.'}
              </div>
            ) : (
              <div className="safari-blog-grid">
                {filteredPosts.map(post => {
                  const title = (i18n.language === 'ru' ? post.title_ru : post.title_en) || post.title || '';
                  const text = (i18n.language === 'ru' ? post.text_ru : post.text_en) || post.text || '';
                  const readingTime = getReadingTime(text);

                  return (
                    <div key={post.id} className="safari-blog-card" onClick={() => handlePostClick(post)}>
                      {post.image && post.image !== '/blog/default.jpg' ? (
                        <div className="safari-blog-card-img" style={{ backgroundImage: `url(${post.image})` }} />
                      ) : (
                        <div className="safari-blog-card-img-fallback">
                          <span>{t(`blog_${post.category.toLowerCase()}`)}</span>
                        </div>
                      )}
                      
                      <div className="safari-blog-card-content">
                        <div className="card-meta">
                          <span className="card-category">{t(`blog_${post.category.toLowerCase()}`)}</span>
                          <span className="card-date">{post.date}</span>
                        </div>
                        <h3>{title}</h3>
                        <p>{text?.substring(0, 110)}...</p>
                        <div className="card-footer">
                          <span>{readingTime} {t('blog_read_time')}</span>
                          <span className="read-more-link">
                            {i18n.language === 'ru' ? 'Читать →' : 'Read →'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
