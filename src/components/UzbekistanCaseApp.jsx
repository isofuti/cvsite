import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BarChart3, Database, Layers, CheckCircle2 } from 'lucide-react';

export const UzbekistanCaseApp = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('context');

  const tabs = [
    { id: 'context', label: t('uz_case_context_title') || 'Situation', icon: Layers },
    { id: 'stack', label: t('uz_case_stack_title') || 'Tools', icon: Database },
    { id: 'process', label: t('uz_case_process_title') || 'Methodology', icon: BarChart3 },
    { id: 'results', label: t('uz_case_results_title') || 'Results', icon: CheckCircle2 },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'context':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '20px', color: '#ff9500' }}>{t('uz_case_context_title')}</h3>
            <p style={{ lineHeight: 1.6, fontSize: '14px', color: '#333' }}>
              {t('uz_case_context_text')}
            </p>
            <div style={{ marginTop: '15px', padding: '15px', background: '#fff9e6', borderLeft: '4px solid #ff9500', borderRadius: '4px' }}>
              <strong style={{ color: '#b36b00' }}>{i18n.language === 'ru' ? 'Бизнес-проблема:' : 'Business Issue:'}</strong>{' '}
              {i18n.language === 'ru' 
                ? 'Растущий разрыв в понимании ожиданий соискателей и реальных предложений на рынке труда Узбекистана. Отсутствие оцифрованных данных о каналах рекрутинга и языковых предпочтениях мешало выстраиванию эффективного бренда работодателя для DAYNET.' 
                : 'An increasing gap in understanding employee expectations vs. actual market offers in Uzbekistan. The lack of digitized data on recruitment channel preferences and language distribution hindered building a strong employer brand for DAYNET.'}
            </div>
            <div style={{ marginTop: '5px' }}>
              <a 
                href="https://secrets.tbank.ru/blogi-kompanij/rynok-truda-uzbekistana-i-socmedia/" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  background: '#ffdd2d', 
                  color: '#000', 
                  padding: '8px 16px', 
                  borderRadius: '6px', 
                  fontSize: '12px', 
                  fontWeight: 'bold', 
                  textDecoration: 'none' 
                }}
              >
                {i18n.language === 'ru' ? 'Читать полную статью на Т-Бизнес' : 'Read Full Article on T-Business'}
              </a>
            </div>
          </div>
        );
      case 'stack':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '20px', color: '#007aff' }}>{t('uz_case_stack_title')}</h3>
            <p style={{ lineHeight: 1.6, fontSize: '14px', color: '#333' }}>
              {t('uz_case_stack_text')}
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '10px' }}>
              <div style={{ background: '#f5f5f7', padding: '12px', borderRadius: '8px' }}>
                <strong style={{ color: '#007aff', display: 'block', marginBottom: '4px' }}>Brand Analytics API</strong>
                {i18n.language === 'ru' 
                  ? 'Сбор постов, комментариев и статей в соцсетях и СМИ Узбекистана. Всего выгружено и структурировано 373 000 сообщений.' 
                  : 'Harvesting public discussions, comments, and press articles in Uzbekistan. Successfully parsed and structured 373,000 messages.'}
              </div>
              <div style={{ background: '#f5f5f7', padding: '12px', borderRadius: '8px' }}>
                <strong style={{ color: '#007aff', display: 'block', marginBottom: '4px' }}>Python (NLP & BI)</strong>
                {i18n.language === 'ru' 
                  ? 'Библиотеки Pandas, NumPy, NLTK/SpaCy. Очистка рекламного шума, кластеризация тем и лингвистическая разметка (соотношение узбекский/русский).' 
                  : 'Pandas, NumPy, SpaCy libraries. Spam and duplicate filtering, topic clustering, and language distribution mapping.'}
              </div>
            </div>
          </div>
        );
      case 'process':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '380px', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '20px', color: '#34c759' }}>{t('uz_case_process_title')}</h3>
            <p style={{ lineHeight: 1.6, fontSize: '14px', color: '#333' }}>
              {t('uz_case_process_text')}
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#34c759', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>1</div>
                <div>
                  <strong>{i18n.language === 'ru' ? 'Парсинг сообщений:' : 'Parsing Mentions:'}</strong>{' '}
                  {i18n.language === 'ru' ? 'Автоматическая выгрузка за период с января по апрель 2025 года.' : 'Automated harvesting of data for the period from January to April 2025.'}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#34c759', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>2</div>
                <div>
                  <strong>{i18n.language === 'ru' ? 'NLP-очистка и разметка:' : 'NLP-Cleaning & Tagging:'}</strong>{' '}
                  {i18n.language === 'ru' ? 'Фильтрация спама и объявлений о вакансиях с помощью скриптов Python.' : 'Removing commercial spam and vacancy duplicates using custom Python scripts.'}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#34c759', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>3</div>
                <div>
                  <strong>{i18n.language === 'ru' ? 'Тематический анализ:' : 'Thematic Analysis:'}</strong>{' '}
                  {i18n.language === 'ru' ? 'Анализ зарплатных ожиданий, миграционных настроений и языковых барьеров.' : 'Extracting salary concerns, migration sentiments, and language barriers.'}
                </div>
              </div>
            </div>
          </div>
        );
      case 'results':
        return (
          <div style={{ display: 'flex', gap: '20px', maxHeight: '380px', overflowY: 'auto' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ fontSize: '20px', color: '#ff2d55' }}>{t('uz_case_results_title')}</h3>
              <p style={{ lineHeight: 1.5, fontSize: '13px', color: '#333' }}>
                {t('uz_case_results_text')}
              </p>
              <div style={{ background: '#e6f9ed', borderLeft: '4px solid #34c759', padding: '10px', borderRadius: '4px', fontSize: '13px', color: '#1a5f2b' }}>
                <strong>{i18n.language === 'ru' ? 'Бизнес-эффект:' : 'Business Effect:'}</strong>{' '}
                {i18n.language === 'ru' 
                  ? 'Исследование доказало неэффективность традиционных джоб-бордов в Узбекистане и позволило перераспределить бюджет рекрутинга в сторону Telegram-каналов, снизив CPL в 2.4 раза.' 
                  : 'The study demonstrated the inefficiency of traditional job boards in Uzbekistan and redirected recruitment budgets towards Telegram channels, decreasing CPL by 2.4x.'}
              </div>
            </div>

            {/* Custom Bar Chart Visualizer */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fafafa', padding: '15px', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
              <h4 style={{ fontSize: '11px', fontWeight: 600, color: '#666', marginBottom: '15px', textAlign: 'center', textTransform: 'uppercase' }}>
                {i18n.language === 'ru' ? 'Каналы поиска работы в Узбекистане (2025)' : 'Job Search Channels in Uzbekistan (2025)'}
              </h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                {/* Telegram */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 'bold', marginBottom: '3px' }}>
                    <span>Telegram (UzDev, CareerUz...)</span>
                    <span style={{ color: '#007aff' }}>52%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#e5e5e7', borderRadius: '4px', overflow: 'hidden' }}>
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: '52%' }} 
                      transition={{ duration: 0.8, delay: 0.1 }}
                      style={{ height: '100%', background: '#007aff', borderRadius: '4px' }} 
                    />
                  </div>
                </div>

                {/* Job Boards */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 'bold', marginBottom: '3px' }}>
                    <span>{i18n.language === 'ru' ? 'Сайты вакансий (hh.uz...)' : 'Job Boards (hh.uz...)'}</span>
                    <span style={{ color: '#ff9500' }}>28%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#e5e5e7', borderRadius: '4px', overflow: 'hidden' }}>
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: '28%' }} 
                      transition={{ duration: 0.8, delay: 0.2 }}
                      style={{ height: '100%', background: '#ff9500', borderRadius: '4px' }} 
                    />
                  </div>
                </div>

                {/* Referrals */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 'bold', marginBottom: '3px' }}>
                    <span>{i18n.language === 'ru' ? 'Рекомендации и связи' : 'Referrals & Word of Mouth'}</span>
                    <span style={{ color: '#34c759' }}>12%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#e5e5e7', borderRadius: '4px', overflow: 'hidden' }}>
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: '12%' }} 
                      transition={{ duration: 0.8, delay: 0.3 }}
                      style={{ height: '100%', background: '#34c759', borderRadius: '4px' }} 
                    />
                  </div>
                </div>

                {/* Professional Networks */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 'bold', marginBottom: '3px' }}>
                    <span>LinkedIn</span>
                    <span style={{ color: '#ff2d55' }}>8%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#e5e5e7', borderRadius: '4px', overflow: 'hidden' }}>
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: '8%' }} 
                      transition={{ duration: 0.8, delay: 0.4 }}
                      style={{ height: '100%', background: '#ff2d55', borderRadius: '4px' }} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fff', color: '#333' }}>
      {/* Horizontal Tabs Header */}
      <div style={{ display: 'flex', background: '#f5f5f7', borderBottom: '1px solid #dcdcdc', padding: '0 10px' }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === activeTab;
          return (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 16px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#007aff' : '#666',
                borderBottom: isActive ? '3px solid #007aff' : '3px solid transparent',
                transition: 'all 0.2s'
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </div>
          );
        })}
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
