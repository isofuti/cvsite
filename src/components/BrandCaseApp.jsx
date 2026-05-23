import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BarChart3, Database, Layers, CheckCircle2 } from 'lucide-react';

export const BrandCaseApp = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('context');

  const tabs = [
    { id: 'context', label: t('case_context_title'), icon: Layers },
    { id: 'stack', label: t('case_stack_title'), icon: Database },
    { id: 'process', label: t('case_process_title'), icon: BarChart3 },
    { id: 'results', label: t('case_results_title'), icon: CheckCircle2 },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'context':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '20px', color: '#ff9500' }}>{t('case_context_title')}</h3>
            <p style={{ lineHeight: 1.6, fontSize: '14px', color: '#333' }}>
              {t('case_context_text')}
            </p>
            <div style={{ marginTop: '15px', padding: '15px', background: '#fff9e6', borderLeft: '4px solid #ff9500', borderRadius: '4px' }}>
              <strong style={{ color: '#b36b00' }}>Бизнес-проблема:</strong> Компания с 25-летним опытом продавала электротехническое оборудование дистрибьюторам, но не понимала, как бренд воспринимается конечными розничными потребителями (B2C). С уходом европейских брендов-лидеров возникла критическая необходимость быстро перестроить маркетинг.
            </div>
          </div>
        );
      case 'stack':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '20px', color: '#007aff' }}>{t('case_stack_title')}</h3>
            <p style={{ lineHeight: 1.6, fontSize: '14px', color: '#333' }}>
              {t('case_stack_text')}
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '10px' }}>
              <div style={{ background: '#f5f5f7', padding: '12px', borderRadius: '8px' }}>
                <strong style={{ color: '#007aff', display: 'block', marginBottom: '4px' }}>Brand Analytics</strong>
                Парсинг упоминаний и отзывов в социальных медиа и СМИ по API. Собрано более 150 000 сообщений.
              </div>
              <div style={{ background: '#f5f5f7', padding: '12px', borderRadius: '8px' }}>
                <strong style={{ color: '#007aff', display: 'block', marginBottom: '4px' }}>Python (NLP / ML)</strong>
                Библиотеки Pandas, NumPy, NLTK/Spacy. Классификация тональности отзывов, фильтрация спама и кластеризация тем.
              </div>
            </div>
          </div>
        );
      case 'process':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '380px', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '20px', color: '#34c759' }}>{t('case_process_title')}</h3>
            <p style={{ lineHeight: 1.6, fontSize: '14px', color: '#333' }}>
              {t('case_process_text')}
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#34c759', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</div>
                <div><strong>Методология CAWI:</strong> Проведение опросов 1500 респондентов на платформе Opronix.</div>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#34c759', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>2</div>
                <div><strong>NLP Парсинг сообщений:</strong> Обработка массива из 150K постов с помощью скриптов Python.</div>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#34c759', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>3</div>
                <div><strong>ML-классификация:</strong> Автоматическое разделение упоминаний на продуктовые категории и оценку тональности.</div>
              </div>
            </div>
          </div>
        );
      case 'results':
        return (
          <div style={{ display: 'flex', gap: '20px', maxHeight: '380px', overflowY: 'auto' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ fontSize: '20px', color: '#ff2d55' }}>{t('case_results_title')}</h3>
              <p style={{ lineHeight: 1.5, fontSize: '13px', color: '#333' }}>
                {t('case_results_text')}
              </p>
              <div style={{ background: '#e6f9ed', borderLeft: '4px solid #34c759', padding: '10px', borderRadius: '4px', fontSize: '13px', color: '#1a5f2b' }}>
                <strong>Бизнес-эффект:</strong> Переход от точечного перфоманса к охватному маркетингу (ТВ, радио, инфлюенс) позволил занять долю ушедшего лидера в течение полугода после исследования.
              </div>
            </div>

            {/* Brand Pyramid Visualizer */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fafafa', padding: '15px', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
              <h4 style={{ fontSize: '12px', fontWeight: 600, color: '#666', marginBottom: '15px' }}>Пирамида узнаваемости бренда</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%', alignItems: 'center' }}>
                {/* Top of Mind */}
                <div style={{
                  width: '40%', height: '35px', background: '#ff3b30', color: '#fff',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  fontSize: '9px', fontWeight: 'bold', clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
                  textAlign: 'center'
                }}>
                  <span>Top of Mind</span>
                  <span style={{ fontSize: '10px' }}>&lt; 1%</span>
                </div>
                
                {/* Spontaneous */}
                <div style={{
                  width: '70%', height: '35px', background: '#ff9500', color: '#fff',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  fontSize: '9px', fontWeight: 'bold', clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
                  textAlign: 'center'
                }}>
                  <span>Спонтанная</span>
                  <span style={{ fontSize: '10px' }}>14%</span>
                </div>

                {/* Aided */}
                <div style={{
                  width: '100%', height: '35px', background: '#007aff', color: '#fff',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  fontSize: '9px', fontWeight: 'bold', clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)',
                  textAlign: 'center'
                }}>
                  <span>Подсказанная (Aided)</span>
                  <span style={{ fontSize: '10px' }}>56%</span>
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
