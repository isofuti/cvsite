import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Compass, ShoppingCart, Calendar, Layers, Sparkles, CheckCircle2, ChevronRight, Terminal } from 'lucide-react';

export const KazakhstanCaseApp = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('context');
  const [activeCompassKey, setActiveCompassKey] = useState(0);
  const [activeRoadmapMonth, setActiveRoadmapMonth] = useState('june');

  const tabs = [
    { id: 'context', label: t('kaz_case_context_title') || 'Situation', icon: Layers },
    { id: 'compass', label: i18n.language === 'ru' ? 'Фреймворк C.O.M.P.A.S.S.' : 'C.O.M.P.A.S.S. GTM', icon: Compass },
    { id: 'funnel', label: t('kaz_case_process_title') || 'Funnel', icon: ShoppingCart },
    { id: 'roadmap', label: i18n.language === 'ru' ? 'Карта запуска' : 'Roadmap', icon: Calendar }
  ];

  const compassPoints = [
    {
      num: '1',
      abbr: 'C',
      name: i18n.language === 'ru' ? 'Commercial Orientation (Коммерция)' : 'Commercial Orientation',
      desc: i18n.language === 'ru' 
        ? 'Жесткий комплаенс сетей: регистрация SKU в Национальном каталоге товаров (НКТ), ТОО на ОУР для налоговой прозрачности, 3-месячный буст-тест без листинга.'
        : 'Strict compliance: SKU registration in the National Product Catalog, Standard tax LLP entity, and listing-fee-free entry for an initial 3-month trial.',
      icon: CheckCircle2,
      color: '#007aff'
    },
    {
      num: '2',
      abbr: 'O',
      name: i18n.language === 'ru' ? 'Optimal Positioning (Позиционирование)' : 'Optimal Positioning',
      desc: i18n.language === 'ru'
        ? 'Отстройка от лозунгов здоровья. УТП: 100% чистый продукт полного цикла на швейцарских станках Bühler. Позиция: Доступное Правильное Питание для реальной жизни.'
        : 'Unique USP: 100% clean, closed-loop local product processed on Swiss Bühler machinery. Positioning: Affordable Clean Eating for real daily life.',
      icon: Sparkles,
      color: '#34c759'
    },
    {
      num: '3',
      abbr: 'M',
      name: i18n.language === 'ru' ? 'Market Planning (Гибридный Funnel)' : 'Market Planning & Funnel',
      desc: i18n.language === 'ru'
        ? 'Двухфазная воронка. Pull-фаза в e-com для сбора метрик спроса. Push-фаза в ритейл с готовым Partner Kit доказательств, снимающим риски байера.'
        : 'Two-phase hybrid funnel: Digital Pull phase to validate demand online, followed by a Retail Push phase backed by solid sales performance data.',
      icon: ShoppingCart,
      color: '#ff9500'
    },
    {
      num: '4',
      abbr: 'P',
      name: i18n.language === 'ru' ? 'Psychology & Nudging (Психология)' : 'Psychology & Nudging',
      desc: i18n.language === 'ru'
        ? 'Прозрачное окно на плотном пакете для мгновенного обхода автопилота бакалеи (визуальное подтверждение чистоты крупы). Трейд-маркетинговое подталкивание на полках.'
        : 'Transparent window on packaging to bypass grocery autopilot (instant visual proof of grain cleanliness) combined with retail shelf nudges.',
      icon: Compass,
      color: '#af52de'
    },
    {
      num: '5',
      abbr: 'S',
      name: i18n.language === 'ru' ? 'Strategic Scalability (MarTech)' : 'Strategic Scalability & MarTech',
      desc: i18n.language === 'ru'
        ? 'Парсер e-shelf конкурентов в Magnum Go/Arbuz для динамического прайсинга на Python. Автоматизированные WhatsApp API вебхуки для сбора отзывов.'
        : 'Python e-shelf scrapers to monitor delivery apps (Magnum Go, Arbuz) for dynamic pricing. Automated WhatsApp feedback loops to rank products.',
      icon: Terminal,
      color: '#ff2d55'
    }
  ];

  const roadmapData = {
    june: {
      title: i18n.language === 'ru' ? 'Июнь: e-com запуск и Pull-тесты' : 'June: E-com Launch & Pull Tests',
      pct: '25%',
      color: '#007aff',
      details: i18n.language === 'ru'
        ? ['Запуск онлайн-продаж на маркетплейсах', 'Настройка пикселей аналитики на Landing Page', '20-30 бартерных интеграций с микро-блогерами', 'Сбор первых отзывов и конверсий для Partner Kit']
        : ['Launch digital sales on regional marketplaces', 'Configure tracking pixels on the Landing Page', 'Deploy 20-30 micro-influencer campaigns', 'Collect initial feedback and conversion data for Partner Kit']
    },
    july_august: {
      title: i18n.language === 'ru' ? 'Июль-Август: Тестовый офлайн' : 'July-August: Controlled Offline Test',
      pct: '50%',
      color: '#34c759',
      details: i18n.language === 'ru'
        ? ['Точечные отгрузки в 10-15 магазинов-партнеров', 'Гиперлокальный геотаргетинг в радиусе 1-2 км вокруг точек', 'Тестирование выкладки и оценка оборачиваемости', 'Упаковка финальных кейс-цифр для крупных сетей']
        : ['Ship initial trial batches to 10-15 retail points', 'Launch local geotargeted ads within 1-2 km radius of outlets', 'Track shelf placement and analyze sales turnover', 'Finalize metrics for enterprise chain negotiations']
    },
    september: {
      title: i18n.language === 'ru' ? 'Сентябрь: Масштабный ритейл' : 'September: Mass Retail Expansion',
      pct: '75%',
      color: '#ff9500',
      details: i18n.language === 'ru'
        ? ['Полный листинг во всей сети ритейлера', 'Запуск паллетных зон и ярких шелфтокеров в залах', 'Масштабный флайт охватной рекламы к началу учебного года', 'Запуск Python-скрипта мониторинга цен конкурентов']
        : ['Execute full listing across major regional networks', 'Set up high-visibility branded pallet displays', 'Launch outreach ad campaigns aligned with back-to-school', 'Initiate automated Python digital shelf price monitoring']
    },
    october_december: {
      title: i18n.language === 'ru' ? 'Октябрь-Декабрь: Оптимизация' : 'October-December: Optimization & Scale',
      pct: '100%',
      color: '#af52de',
      details: i18n.language === 'ru'
        ? ['Оценка окупаемости POS-материалов и паллет', 'Расчет коэффициента повторных покупок (Retention)', 'Развертывание WhatsApp ORM-цепочки для отзывов', 'Планирование поставок и контрактов на следующий год']
        : ['Evaluate ROI of trade marketing and shelf materials', 'Measure client retention and repeat purchase rates', 'Deploy automated WhatsApp ORM review acquisition loop', 'Finalize supply agreements and contracts for next year']
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'context':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '20px', color: '#ff2d55', margin: 0 }}>{t('kaz_case_context_title')}</h3>
            <p style={{ lineHeight: 1.6, fontSize: '14.5px', color: '#333', margin: 0 }}>
              {t('kaz_case_context_text')}
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '10px' }}>
              <div style={{ background: '#fff0f2', borderLeft: '4px solid #ff2d55', padding: '14px', borderRadius: '4px' }}>
                <strong style={{ color: '#c91e3e', display: 'block', marginBottom: '4px' }}>
                  {i18n.language === 'ru' ? 'Главная проблема полки:' : 'Retail Shelf Pain:'}
                </strong>
                {i18n.language === 'ru'
                  ? 'Привычка потребителя покупать крупы "на автопилоте" и нежелание байеров рисковать полкой ради неизвестной новинки.'
                  : 'Autopilot consumer behavior on basic grocery staples and retail buyers unwilling to test unproven brands.'}
              </div>
              <div style={{ background: '#e8f5e9', borderLeft: '4px solid #34c759', padding: '14px', borderRadius: '4px' }}>
                <strong style={{ color: '#1b5e20', display: 'block', marginBottom: '4px' }}>
                  {i18n.language === 'ru' ? 'Уязвимость конкурентов:' : 'Competitor Vulnerability:'}
                </strong>
                {i18n.language === 'ru'
                  ? 'Хлопья большинства импортных лидеров содержат шелуху и мусор, вызывая стабильное раздражение у покупателей.'
                  : 'Major import brands often suffer from poor sorting, leaving husks and debris in the cereals, frustrating buyers.'}
              </div>
            </div>
          </div>
        );

      case 'compass':
        return (
          <div style={{ display: 'flex', gap: '24px' }}>
            {/* Left side: Interactive Compass list */}
            <div style={{ flex: '1.2', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h3 style={{ fontSize: '18px', color: '#007aff', margin: '0 0 10px 0' }}>
                {i18n.language === 'ru' ? 'Элементы фреймворка' : 'Framework Pillars'}
              </h3>
              {compassPoints.map((pt, idx) => {
                const Icon = pt.icon;
                const isActive = activeCompassKey === idx;
                return (
                  <motion.div
                    key={idx}
                    onClick={() => setActiveCompassKey(idx)}
                    whileHover={{ scale: 1.01 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      background: isActive ? '#f0f6ff' : '#fafafa',
                      border: isActive ? '1px solid #007aff' : '1px solid #e5e5e5',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  >
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: isActive ? pt.color : '#e0e0e0',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '14px'
                    }}>
                      {pt.abbr}
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: isActive ? 600 : 500, color: isActive ? '#007aff' : '#333' }}>
                      {pt.name}
                    </span>
                    <ChevronRight size={16} style={{ marginLeft: 'auto', color: isActive ? '#007aff' : '#bbb' }} />
                  </motion.div>
                );
              })}
            </div>

            {/* Right side: Detailed key view with glass card */}
            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', background: '#f5f5f7', padding: '20px', borderRadius: '12px', border: '1px solid #e5e5e5', justifyContent: 'center' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCompassKey}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: compassPoints[activeCompassKey].color,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {React.createElement(compassPoints[activeCompassKey].icon, { size: 20 })}
                    </div>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#111' }}>
                      {compassPoints[activeCompassKey].name}
                    </h4>
                  </div>
                  <p style={{ fontSize: '13.5px', lineHeight: 1.5, color: '#444', margin: 0 }}>
                    {compassPoints[activeCompassKey].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        );

      case 'funnel':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '380px', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '18px', color: '#ff9500', margin: 0 }}>{i18n.language === 'ru' ? 'Двухфазная гибридная воронка (Pull to Push)' : 'Two-Phase Hybrid Funnel (Pull to Push)'}</h3>
            
            <div style={{ display: 'flex', gap: '20px', alignItems: 'stretch', marginTop: '10px' }}>
              {/* Phase 1: Pull */}
              <div style={{ flex: 1, background: '#fcf8f2', border: '1px solid #ffe6cc', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ background: '#ff9500', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', alignSelf: 'flex-start' }}>
                  PHASE 1: ONLINE PULL
                </div>
                <h4 style={{ margin: 0, fontSize: '15px', color: '#b36b00' }}>
                  {i18n.language === 'ru' ? 'Валидация цифрового спроса' : 'Digital Demand Validation'}
                </h4>
                <p style={{ fontSize: '12.5px', color: '#555', margin: 0, lineHeight: 1.5 }}>
                  {i18n.language === 'ru'
                    ? 'Трафик из Meta/TikTok направляется в e-com каналы и Landing Page. Это обходит "искажение статус-кво" в привычной для потребителя цифровой среде, собирая отзывы и чистые продажи.'
                    : 'Targeted Meta and TikTok traffic is driven to online marketplaces and landing pages. This establishes early sales traction and collects user reviews in a low-friction digital environment.'}
                </p>
                <div style={{ background: '#fff', border: '1px dashed #ff9500', borderRadius: '6px', padding: '10px', fontSize: '11px', color: '#666', marginTop: 'auto' }}>
                  <strong>{i18n.language === 'ru' ? 'Артефакт фазы:' : 'Phase Deliverable:'}</strong> Partner Kit {i18n.language === 'ru' ? '(реальные цифры оборачиваемости для розницы)' : '(real sales metrics for retail buyers)'}
                </div>
              </div>

              {/* Connector Arrow */}
              <div style={{ display: 'flex', alignItems: 'center', color: '#bbb' }}>
                <ChevronRight size={32} />
              </div>

              {/* Phase 2: Push */}
              <div style={{ flex: 1, background: '#f0f7f4', border: '1px solid #d1ebd5', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ background: '#34c759', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', alignSelf: 'flex-start' }}>
                  PHASE 2: RETAIL PUSH
                </div>
                <h4 style={{ margin: 0, fontSize: '15px', color: '#1b5e20' }}>
                  {i18n.language === 'ru' ? 'Экспансия и захват полок' : 'Retail Expansion & Shelf Conquest'}
                </h4>
                <p style={{ fontSize: '12.5px', color: '#555', margin: 0, lineHeight: 1.5 }}>
                  {i18n.language === 'ru'
                    ? 'Команда идет к байерам торговых сетей не с пустыми руками, а с Partner Kit. Байер видит спрос и снижает риски. На полке включаетсяnudging: упаковка с прозрачным окном ломает автопилот.'
                    : 'Sales teams approach major retail buyers armed with the Partner Kit. Satisfying their risk aversion, we secure shelf space. Autopilot is broken on-shelf with transparent windows showing product purity.'}
                </p>
                <div style={{ background: '#fff', border: '1px dashed #34c759', borderRadius: '6px', padding: '10px', fontSize: '11px', color: '#666', marginTop: 'auto' }}>
                  <strong>{i18n.language === 'ru' ? 'Ломаем барьер:' : 'Overcoming Barrier:'}</strong> {i18n.language === 'ru' ? 'Доказанная окупаемость + визуальное доверие' : 'Risk reduction + immediate shelf validation'}
                </div>
              </div>
            </div>
          </div>
        );

      case 'roadmap':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '18px', color: '#af52de', margin: 0 }}>
              {i18n.language === 'ru' ? 'Карта запуска проекта (2026)' : 'Launch Roadmap & Milestones (2026)'}
            </h3>

            {/* Horizontal Timeline selectors */}
            <div style={{ display: 'flex', background: '#fafafa', borderRadius: '10px', padding: '8px', border: '1px solid #e5e5e5', justifyContent: 'space-between', gap: '8px' }}>
              {Object.keys(roadmapData).map((mKey) => {
                const isActive = activeRoadmapMonth === mKey;
                const mData = roadmapData[mKey];
                return (
                  <button
                    key={mKey}
                    onClick={() => setActiveRoadmapMonth(mKey)}
                    style={{
                      flex: 1,
                      border: 'none',
                      background: isActive ? mData.color : 'transparent',
                      color: isActive ? 'white' : '#555',
                      padding: '10px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '12px',
                      transition: 'all 0.2s',
                      textAlign: 'center'
                    }}
                  >
                    {mKey === 'june' ? (i18n.language === 'ru' ? 'Июнь' : 'June') :
                     mKey === 'july_august' ? (i18n.language === 'ru' ? 'Июль-Август' : 'July-August') :
                     mKey === 'september' ? (i18n.language === 'ru' ? 'Сентябрь' : 'September') :
                     (i18n.language === 'ru' ? 'Октябрь-Декабрь' : 'October-December')}
                  </button>
                );
              })}
            </div>

            {/* Detailed milestones with status percentage bar */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRoadmapMonth}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                style={{ background: '#fcfcfc', border: '1px solid #e5e5e5', padding: '16px', borderRadius: '10px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ margin: 0, fontSize: '15px', color: roadmapData[activeRoadmapMonth].color, fontWeight: 700 }}>
                    {roadmapData[activeRoadmapMonth].title}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11px', color: '#666', fontWeight: 600 }}>
                      {i18n.language === 'ru' ? 'Прогресс:' : 'Progress:'}
                    </span>
                    <span style={{ fontSize: '12px', color: roadmapData[activeRoadmapMonth].color, fontWeight: 'bold' }}>
                      {roadmapData[activeRoadmapMonth].pct}
                    </span>
                  </div>
                </div>

                <div style={{ width: '100%', height: '6px', background: '#eaeaea', borderRadius: '3px', marginBottom: '16px', overflow: 'hidden' }}>
                  <div style={{ width: roadmapData[activeRoadmapMonth].pct, height: '100%', background: roadmapData[activeRoadmapMonth].color, borderRadius: '3px' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {roadmapData[activeRoadmapMonth].details.map((detail, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '12.5px', color: '#444' }}>
                      <CheckCircle2 size={14} style={{ color: roadmapData[activeRoadmapMonth].color, flexShrink: 0, marginTop: '2px' }} />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
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
