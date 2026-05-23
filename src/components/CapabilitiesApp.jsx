import React, { useState } from 'react';
import { Database, BarChart3, TrendingUp, Layers, HelpCircle, Award, CheckSquare, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { playSound } from '../utils/sounds';

export const CapabilitiesApp = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('data');

  const handleTabChange = (tabId) => {
    playSound('open');
    setActiveTab(tabId);
  };

  const tabs = [
    {
      id: 'data',
      title: i18n.language === 'ru' ? 'Аналитика и ETL' : 'Data & ETL Pipelines',
      icon: Database,
      color: '#007aff'
    },
    {
      id: 'bi',
      title: i18n.language === 'ru' ? 'BI и Отчетность' : 'BI & Dashboards',
      icon: BarChart3,
      color: '#34c759'
    },
    {
      id: 'traffic',
      title: i18n.language === 'ru' ? 'Трафик и Перформанс' : 'Traffic & Performance',
      icon: Target,
      color: '#ff9500'
    },
    {
      id: 'growth',
      title: i18n.language === 'ru' ? 'Рост и Стратегия' : 'Growth & Strategy',
      icon: TrendingUp,
      color: '#af52de'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'data':
        return (
          <div className="cap-content-section animate-fade-in">
            <div className="cap-meta-header">
              <Database size={32} style={{ color: '#007aff' }} />
              <div>
                <h3>{i18n.language === 'ru' ? 'Юнит Инженерии Данных & ETL' : 'Data Engineering & ETL Unit'}</h3>
                <p className="cap-subtitle">Python / SQL / ClickHouse / NLP</p>
              </div>
            </div>

            <div className="cap-value-box">
              <HelpCircle size={18} style={{ color: '#007aff', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>{i18n.language === 'ru' ? 'Ценность для бизнеса:' : 'Business Value:'}</strong>
                <p>
                  {i18n.language === 'ru'
                    ? 'Автоматизация сбора сырых данных из любых API, исключение ручного труда и создание «единого источника правды» (SSOT) для маркетинга и продаж.'
                    : 'Automation of raw data harvesting from any API, eliminating manual sheets and creating a Single Source of Truth (SSOT) for marketing and sales metrics.'}
                </p>
              </div>
            </div>

            <div className="cap-details-grid">
              <div className="cap-detail-col">
                <h4>{i18n.language === 'ru' ? 'Технологический стек' : 'Technology Stack'}</h4>
                <ul className="cap-list">
                  <li><strong>Python:</strong> Pandas, NumPy, requests, beautifulsoup, NLP (sentiment taggers)</li>
                  <li><strong>SQL:</strong> ClickHouse, PostgreSQL (разработка схем, сложные джойны, оконные функции)</li>
                  <li><strong>Интеграции:</strong> API Brand Analytics, TG-боты, CRM (amoCRM/Bitrix24), вебхуки</li>
                </ul>
              </div>

              <div className="cap-detail-col">
                <h4>{i18n.language === 'ru' ? 'Решаемые задачи' : 'Key Capabilities'}</h4>
                <ul className="cap-list">
                  <li>
                    <CheckSquare size={14} className="cap-check-icon" /> 
                    {i18n.language === 'ru' ? 'Парсинг и очистка массивов данных (150K+ упоминаний бренда в сжатые сроки)' : 'Parsing and cleaning large text datasets (150K+ mentions in tight schedules)'}
                  </li>
                  <li>
                    <CheckSquare size={14} className="cap-check-icon" />
                    {i18n.language === 'ru' ? 'Автоматизация выгрузок из рекламных кабинетов и CRM' : 'Automating exports from performance ads platforms and CRMs'}
                  </li>
                  <li>
                    <CheckSquare size={14} className="cap-check-icon" />
                    {i18n.language === 'ru' ? 'Классификация тональности и тем отзывов с помощью Python NLP-моделей' : 'Sentiment and topic classification of customer reviews using Python NLP models'}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'bi':
        return (
          <div className="cap-content-section animate-fade-in">
            <div className="cap-meta-header">
              <BarChart3 size={32} style={{ color: '#34c759' }} />
              <div>
                <h3>{i18n.language === 'ru' ? 'Юнит Сквозной Аналитики & BI' : 'End-to-End Analytics & BI Unit'}</h3>
                <p className="cap-subtitle">Yandex DataLens / Tableau / Web Analytics</p>
              </div>
            </div>

            <div className="cap-value-box">
              <HelpCircle size={18} style={{ color: '#34c759', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>{i18n.language === 'ru' ? 'Ценность для бизнеса:' : 'Business Value:'}</strong>
                <p>
                  {i18n.language === 'ru'
                    ? 'Оцифровка всей воронки от клика до сделки. Перевод сложных таблиц данных в понятные интерактивные дашборды для мгновенного контроля окупаемости (ROI/ROAS).'
                    : 'Digitizing the entire customer journey from click to closed contract. Translating heavy raw spreadsheets into clean interactive dashboards for instant ROI/ROAS control.'}
                </p>
              </div>
            </div>

            <div className="cap-details-grid">
              <div className="cap-detail-col">
                <h4>{i18n.language === 'ru' ? 'Технологический стек' : 'Technology Stack'}</h4>
                <ul className="cap-list">
                  <li><strong>BI-платформы:</strong> Yandex DataLens, Tableau, Looker Studio</li>
                  <li><strong>Веб-аналитика:</strong> Google Analytics 4, Яндекс.Метрика (настройка e-commerce, целей, ClientID)</li>
                  <li><strong>Метрики:</strong> CAC, LTV, ROMI, Cohort Analysis, Churn Rate, воронки лидогенерации</li>
                </ul>
              </div>

              <div className="cap-detail-col">
                <h4>{i18n.language === 'ru' ? 'Решаемые задачи' : 'Key Capabilities'}</h4>
                <ul className="cap-list">
                  <li>
                    <CheckSquare size={14} className="cap-check-icon" />
                    {i18n.language === 'ru' ? 'Проектирование интерактивных дашбордов для топ-менеджмента' : 'Designing executive business intelligence dashboards for management'}
                  </li>
                  <li>
                    <CheckSquare size={14} className="cap-check-icon" />
                    {i18n.language === 'ru' ? 'Настройка веб-аналитики для отслеживания пути пользователя на лендингах' : 'Setting up web analytics to track user journeys on custom landing pages'}
                  </li>
                  <li>
                    <CheckSquare size={14} className="cap-check-icon" />
                    {i18n.language === 'ru' ? 'Когортный анализ базы клиентов для оптимизации повторных продаж' : 'Cohort analysis of database records to optimize retention rates'}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'traffic':
        return (
          <div className="cap-content-section animate-fade-in">
            <div className="cap-meta-header">
              <Target size={32} style={{ color: '#ff9500' }} />
              <div>
                <h3>{i18n.language === 'ru' ? 'Юнит Трафика & Перформанс-Маркетинга' : 'Traffic & Performance Marketing Unit'}</h3>
                <p className="cap-subtitle">Yandex.Direct / Google Ads / VK Ads / META</p>
              </div>
            </div>

            <div className="cap-value-box">
              <HelpCircle size={18} style={{ color: '#ff9500', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>{i18n.language === 'ru' ? 'Ценность для бизнеса:' : 'Business Value:'}</strong>
                <p>
                  {i18n.language === 'ru'
                    ? 'Стабильный поток целевых лидов с контролируемой стоимостью привлечения (CPL/CPA). Управление рекламными бюджетами на основе данных о реальных сделках, а не пустых кликах.'
                    : 'Stable stream of targeted leads with controlled acquisition costs (CPL/CPA). Managing ad budgets based on actual sales data rather than vanity clicks.'}
                </p>
              </div>
            </div>

            <div className="cap-details-grid">
              <div className="cap-detail-col">
                <h4>{i18n.language === 'ru' ? 'Рекламные каналы' : 'Advertising Channels'}</h4>
                <ul className="cap-list">
                  <li><strong>Контекст:</strong> Яндекс.Директ (Поиск, РСЯ, Мастер Кампаний), Google Ads (Search, Display, Performance Max)</li>
                  <li><strong>Таргет:</strong> ВКонтакте (VK Реклама, ретаргетинг), META (Facebook, Instagram Ads Manager)</li>
                  <li><strong>Оптимизация:</strong> Сплит-тестирование креативов, когортный анализ трафика, UTM-архитектура</li>
                </ul>
              </div>

              <div className="cap-detail-col">
                <h4>{i18n.language === 'ru' ? 'Решаемые задачи' : 'Key Capabilities'}</h4>
                <ul className="cap-list">
                  <li>
                    <CheckSquare size={14} className="cap-check-icon" />
                    {i18n.language === 'ru' ? 'Настройка и ведение контекстной рекламы Яндекс.Директ и Google Ads' : 'Setup and optimization of search & contextual ads in Yandex.Direct & Google Ads'}
                  </li>
                  <li>
                    <CheckSquare size={14} className="cap-check-icon" />
                    {i18n.language === 'ru' ? 'Запуск и оптимизация таргетированной рекламы ВКонтакте и META' : 'Launching and optimizing targeted ads in VK and META'}
                  </li>
                  <li>
                    <CheckSquare size={14} className="cap-check-icon" />
                    {i18n.language === 'ru' ? 'Связка рекламных кампаний со сквозной аналитикой и CRM для контроля ROI' : 'Integrating traffic sources with CRM and BI to control end-to-end ROI'}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'growth':
        return (
          <div className="cap-content-section animate-fade-in">
            <div className="cap-meta-header">
              <TrendingUp size={32} style={{ color: '#af52de' }} />
              <div>
                <h3>{i18n.language === 'ru' ? 'Юнит B2B-Маркетинга & Роста' : 'B2B Growth Marketing Unit'}</h3>
                <p className="cap-subtitle">Account-Based Marketing (ABM) / GTM / Research</p>
              </div>
            </div>

            <div className="cap-value-box">
              <HelpCircle size={18} style={{ color: '#af52de', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>{i18n.language === 'ru' ? 'Ценность для бизнеса:' : 'Business Value:'}</strong>
                <p>
                  {i18n.language === 'ru'
                    ? 'Привлечение квалифицированных лидов (MQL/SQL) на дорогие enterprise-продукты (чек 4+ млн руб.). Выстраивание коммуникации с лицами принимающими решения (ЛПР).'
                    : 'Securing enterprise-level qualified leads (MQL/SQL) for high-ticket solutions (checks 4M+ RUB). Establishing direct relationship channels with target decision-makers.'}
                </p>
              </div>
            </div>

            <div className="cap-details-grid">
              <div className="cap-detail-col">
                <h4>{i18n.language === 'ru' ? 'Стратегический стек' : 'Strategy Stack'}</h4>
                <ul className="cap-list">
                  <li><strong>Кампании:</strong> Account-Based Marketing (ABM), Lead Generation, Content Marketing</li>
                  <li><strong>Исследования:</strong> Разработка CAWI-опросов (до 1500+ респондентов), конкурентный анализ</li>
                  <li><strong>Копирайтинг & ToV:</strong> Написание экспертных текстов, разработка Tone of Voice бренда</li>
                </ul>
              </div>

              <div className="cap-detail-col">
                <h4>{i18n.language === 'ru' ? 'Решаемые задачи' : 'Key Capabilities'}</h4>
                <ul className="cap-list">
                  <li>
                    <CheckSquare size={14} className="cap-check-icon" />
                    {i18n.language === 'ru' ? 'Разработка GTM (вывод продукта на рынок) стратегий с нуля' : 'Developing GTM (Go-To-Market) strategies from scratch'}
                  </li>
                  <li>
                    <CheckSquare size={14} className="cap-check-icon" />
                    {i18n.language === 'ru' ? 'Запуск точечного таргетинга на ЛПР конкретных корпораций' : 'Launching IP-targeted performance ads focused on enterprise CTOs/executives'}
                  </li>
                  <li>
                    <CheckSquare size={14} className="cap-check-icon" />
                    {i18n.language === 'ru' ? 'Аудит узнаваемости бренда и реструктуризация медиа-бюджетов' : 'Auditing brand awareness equity and restructuring media budgets'}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="capabilities-container">
      {/* Sidebar Tabs */}
      <div className="capabilities-sidebar">
        <div className="capabilities-sidebar-header">
          <Award size={20} style={{ color: '#ff9500' }} />
          <h3>{i18n.language === 'ru' ? 'Компетенции' : 'Capabilities'}</h3>
        </div>
        <div className="capabilities-tabs">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`cap-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => handleTabChange(tab.id)}
              >
                <Icon size={18} style={{ color: tab.color }} />
                <span>{tab.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="capabilities-body">
        {renderTabContent()}
      </div>
    </div>
  );
};
