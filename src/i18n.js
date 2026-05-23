import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "about_me": "About Me",
      "experience_folder": "Experience",
      "skills_doc": "Capabilities",
      "resume_pdf": "Resume",
      "contact_app": "Messenger",
      "brand_case": "Brand Case Study",
      "name": "Egor Khromov",
      "role": "Lead Data-Driven Marketer / Marketing Analyst",
      "about": "Hi! I am Egor Khromov. I specialize at the intersection of strategic B2B marketing, paid traffic, and technical data engineering.\n\nI bring over 4+ years of hands-on experience in business development, market research, brand reputation analysis, and team leadership.\n\nWhat I deliver for businesses:\n• High-Ticket B2B Growth: Building GTM strategies for complex high-tech products with average checks exceeding 4M RUB, launching Account-Based Marketing (ABM) plays, and securing enterprise MQLs/SQLs.\n• Paid Traffic Acquisition: Sourcing, setting up, and optimizing high-performance ad campaigns across Yandex.Direct, Google Ads, VK, and META.\n• Data Automation & BI: Writing custom Python scripts for data harvesting, routine automation, and NLP review analysis. Querying SQL/ClickHouse databases and designing executive BI dashboards in Yandex DataLens and Tableau.\n• Market Research: Designing CAWI brand equity surveys (sample size 1500+ respondents, 150k+ mentions parsed) that challenge client assumptions and optimize multi-million ad budgets.\n\nMy approach is entirely data-driven and results-oriented. For instance, I doubled commercial proposal conversion rates by implementing a SMART sales framework and addressing cognitive biases in customer journeys. I focus on scaling ROI and building predictable client acquisition channels.",
      "download_cv": "Download Resume PDF",
      "contact_cta": "Let's work together",
      "experience": "Experience",
      "skills": "Competencies",
      "notification_msg": "Ready to work! Let's discuss a project. Open to offers. 🚀",
      "tg_online": "online",
      "tg_welcome_msg": "Hi there! Write your message below, and it will be sent directly to my Telegram.",
      "tg_placeholder": "Write a message...",
      
      // Detailed Experience
      "toolkit_role": "Lead Marketer",
      "toolkit_desc": "Developed a B2B marketing strategy for a complex high-tech product with an average check from 4M RUB. In 3 months, launched ABM (Account-Based Marketing) and content marketing, securing the first qualified enterprise leads (MQL/SQL). Managed the strategic direction and automated marketing reporting.\n\nResponsibilities:\n• Development and execution of marketing strategy.\n• Social media management.\n• Product development and promotion.\n• Conducting internal employee and external customer surveys.\n• Directing B2B market promotion initiatives alongside vendors and partners.\n• Managing a team of external contractors and partners to promote core products.\n• Designing Go-To-Market strategies for new product releases.\n• Creating and executing Account-Based Marketing (ABM) sequences in alignment with sales.\n• Compiling analytics reports and media plans.",
      
      "daynet_dev_role": "Director of Development",
      "daynet_dev_desc": "Conducted a comprehensive audit of business processes, identified growth bottlenecks, and optimized budgets. Developed and defended a long-term business scaling strategy from scratch and coordinated cross-departmental operations.\n\nResponsibilities:\n• Analyzing company business processes and evaluating business growth potential.\n• Identifying negative and positive operational trends, formulating corrective and scaling measures.\n• Defining the long-term concept and development goals of the enterprise.\n• Designing development strategies and core sections of the business plan.\n• Architecting business restructuring programs and assessing financial feasibility.\n• Setting budget priorities and monitoring operational expenses to ensure cash stability.\n• Formulating market expansion proposals, technical modernization, and administrative updates.\n• Coordinating target licensing, certification, and compliance documentation.\n• Delivering approved project schedules and roadmaps to department leads.\n• Assigning project roles, establishing clear KPIs, and coordinating cross-functional teams.\n• Aligning corporate structures to execute strategic developmental plans.\n• Coordinating project phases and verifying alignment with core business principles.\n• Auditing financial and economic indicators across each developmental phase.\n• Designing crisis management plans for non-standard operational challenges.\n• Expanding vendor and partner networks.\n• Conducting market research to identify geographical and vertical scaling vectors.",
      
      "daynet_senior_role": "Senior Marketer",
      "daynet_senior_desc": "Led the marketing team and managed reputation analysis. Created Python scripts to automate brand reputation data harvesting and cleaning. Conducted product training and directed campaign pitch presentations to clients.\n\nResponsibilities:\n• Auditing brand reputation indicators to frame strategic commercial proposals.\n• Operating programmatic, manual, and hybrid media/social monitoring streams.\n• Organizing daily activities and workflows of the marketing team.\n• Sourcing and developing custom scripts/tools to automate marketing operations and data workflows.\n• Leading product and process training programs for internal employees.\n• Sourcing client briefings and presenting GTM strategy pitches.",
      
      "daynet_junior_role": "Junior Marketer",
      "daynet_junior_desc": "Tracked advertising performance metrics and gathered reputation analytics from media and social networks. Developed media plans and coordinated advertising vendors.\n\nResponsibilities:\n• Sourcing reputation analytics data to support commercial proposal generation.\n• Running search monitoring queries across press and social media.\n• Collaborating with media planning agencies and advertising vendors.\n• Tracking and reporting performance metrics (CTR, CPC, CPA) of active ad campaigns.",
      
      "freelance_role": "Internet Marketer (Freelance)",
      "freelance_desc": "Setup and optimization of targeted and contextual ad campaigns (Yandex.Direct, VK), target audience and competitor analysis, landing page development, and content planning.",
      
      // Brand Case Translations
      "case_label": "case study",
      "case_context_title": "Situation & Challenge",
      "case_context_text": "A major electrical equipment brand (25 years on the market) lacked digitized data on B2C perception. Amid the exit of Western players, it was crucial to assess current positions, analyze competitors, and rebuild the marketing strategy in tight deadlines (2 weeks).",
      "case_stack_title": "Tools & Tech",
      "case_stack_text": "Brand Analytics (Social Listening API), Opronix (CAWI surveys, ~1500 respondents), Python (Pandas, NumPy, NLP for text review analysis).",
      "case_process_title": "What Was Done",
      "case_process_text": "Developed CAWI survey methodology to evaluate aided and unaided brand awareness. Harvested and parsed 150,000 social media messages. Wrote Python scripts to clean data and classify mentions using ML (NLP) models, quickly visualising the Brand Awareness Pyramid.",
      "case_results_title": "Results & Impact",
      "case_results_text": "Discovered a paradox: aided awareness was 56%, but Top of Mind was less than 1%! Strong passive knowledge with zero active recall. Based on the insights, advertising budgets were shifted to broad outreach channels (TV, radio, video). The client has been successfully executing this strategy for over 6 months.",
      
      // Cookie Consent
      "cookie_title": "System Notification",
      "cookie_message": "This website uses cookies to analyze traffic and optimize your experience. By continuing to browse, you agree to their use.",
      "cookie_accept": "Accept",
      "cases_folder": "Cases",
      "blog_title": "Blog",
      "blog_read_time": "min read",
      "blog_theory": "Theory",
      "blog_analytics": "Analytics",
      "blog_marketing": "Marketing",
      "blog_cases": "Case Studies",
      "blog_all": "All Posts",
      "open_tenchat": "Open original in TenChat"
    }
  },
  ru: {
    translation: {
      "about_me": "Обо мне",
      "experience_folder": "Опыт работы",
      "skills_doc": "Компетенции",
      "resume_pdf": "Резюме",
      "contact_app": "Мессенджер",
      "brand_case": "Кейс: Узнаваемость",
      "name": "Егор Хромов",
      "role": "Ведущий Data-Driven Маркетолог / Аналитик",
      "about": "Привет! Я Егор Хромов. Моя специализация — на стыке глубокой маркетинговой стратегии, трафика и технологичной инженерии данных.\n\nУ меня за плечами 4+ года практического опыта управления развитием бизнеса, исследования рынков, репутационного менеджмента и координации команд.\n\nЧто я делаю для бизнеса:\n• B2B-Маркетинг & Рост: Строю GTM-стратегии для сложных технологических продуктов со средним чеком от 4 млн рублей, запускаю ABM (Account-Based Marketing) кампании и привлекаю enterprise-клиентов.\n• Трафик & Перформанс: Настраиваю и оптимизирую перформанс-рекламу любой сложности: контекстная реклама (Яндекс.Директ, Google Ads) и таргет (VK Ads, META).\n• Инженерия Данных & BI: Программирую на Python для парсинга, автоматизации рутины и NLP/ML-анализа тональности отзывов, проектирую базы данных ClickHouse/SQL и создаю интерактивные дашборды в Yandex DataLens/Tableau для ЛПР.\n• Исследования Рынков: Провожу масштабные CAWI-исследования узнаваемости бренда (выборка 1500+ респондентов, 150к+ упоминаний), помогающие распределять миллионные рекламные бюджеты на основе данных.\n\nМой подход базируется на оцифровке каждого шага воронки. Например, я увеличил конверсию коммерческих предложений в 2 раза благодаря внедрению SMART-подхода и работе с когнитивными искажениями. Всегда нацелен на окупаемость инвестиций (ROI/ROMI) и построение понятных, управляемых систем привлечения клиентов.",
      "download_cv": "Скачать PDF Резюме",
      "contact_cta": "Давайте поработаем",
      "experience": "Опыт работы",
      "skills": "Компетенции",
      "notification_msg": "Готов к работе! Давайте обсудим проект. Открыт к предложениям. 🚀",
      "tg_online": "в сети",
      "tg_welcome_msg": "Привет! Напиши сообщение ниже, и оно отправится мне прямо в Telegram.",
      "tg_placeholder": "Написать сообщение...",
      
      // Detailed Experience
      "toolkit_role": "Ведущий маркетолог",
      "toolkit_desc": "Выстраивал стратегию B2B-маркетинга для сложного высокотехнологичного продукта со средним чеком от 4 млн рублей. За 3 месяца внедрил ABM (Account-Based Marketing) и контент-маркетинг, что принесло первые квалифицированные лиды (MQL/SQL). Руководил стратегическим направлением и автоматизировал отчетность.\n\nОбязанности:\n• Разработка и реализация маркетинговой стратегии\n• Ведение социальных сетей\n• Разработка и продвижение продуктов компании\n• Проведение исследований среди сотрудников компании и клиентов\n• Проведение работ по продвижению компании на B2B рынке совместно с подрядчиками и партнерами.\n• Управление командой подрядчиков и партнеров по продвижению ключевых продуктов компании.\n• Разработка Go-To-Market стратегии для новых продуктов компании.\n• Разработка и реализация ABM-стратегии совместно с отделом продаж компании.\n• Составление отчетности и медиапланов по итогам работ.",
      
      "daynet_dev_role": "Директор по развитию и внешним коммуникациям",
      "daynet_dev_desc": "Проводил глубокий аудит бизнес-процессов компании, выявлял точки роста и оптимизировал бюджеты. С нуля разработал и защитил долгосрочную стратегию масштабирования бизнеса, координировал взаимодействие между отделами.\n\nОбязанности:\n• Исследование и анализ бизнес-процессов компании, оценка её потенциала.\n• Выявление негативных и позитивных тенденций компании, разработка мероприятий по устранению первых и стимулированию вторых.\n• Определение общей концепции и цели развития компании.\n• Разработка эффективной стратегии развития и основных разделов плана развития компании.\n• Разработка программ развития и реструктуризации компании, анализ возможностей финансового обеспечения программ.\n• Установка приоритетов бюджетирования и мониторинг расходов для обеспечения финансовой стабильности реализуемых программ.\n• Подготовка предложений по освоению новых направлений бизнеса и рынков, разработка проектов технической и административной модернизации компании.\n• Организация подготовки соответствующей документации, получение лицензий и разрешений.\n• Доведение утверждённых графиков проведения работ по реализации проектов до руководителей структурных подразделений компании.\n• Назначение работников, ответственных за реализацию проектов, дача общих указаний, руководство и координация их деятельности.\n• Организация взаимодействия всех структур компании по реализации проектов развития предприятия.\n• Координация работы по реализации проектов на всех этапах, контроль соответствия принимаемых решений и совершаемых действий основной концепции развития компании.\n• Анализ экономических и финансовых показателей на каждом этапе реализации проектов развития.\n• Разработка методик по оперативному реагированию на кризисные и нестандартные ситуации, которые могут привести к срыву плана развития компании.\n• Расширение партнёрской сети компании.\n• Анализ новых рынков с целью расширения географии работ.",
      
      "daynet_senior_role": "Старший маркетолог",
      "daynet_senior_desc": "Возглавлял команду маркетинга, занимался репутационным анализом. Разработал Python-скрипты для автоматизации сбора и очистки данных о репутации бренда. Проводил тренинги по продукту и руководил защитой рекламных концепций перед заказчиками.\n\nОбязанности:\n• Проведение аналитики репутации компаний для формирования коммерческого предложения (комплексный анализ; разработка стратегий).\n• Программный, ручной и комбинированный мониторинг СМИ и соц-медиа.\n• Организация работы маркетинговой команды.\n• Разработка и поиск инструментов, позволяющих упростить анализ данных, автоматизировать маркетинг.\n• Проведение обучающих тренингов для сотрудников.\n• Проведение встречи с заказчиками, брифы, защита стратегий.",
      
      "daynet_junior_role": "Младший маркетолог",
      "daynet_junior_desc": "Отслеживал показатели эффективности рекламы, собирал репутационную аналитику СМИ и соцсетей. Занимался медиапланированием и координировал работу с рекламными подрядчиками.\n\nОбязанности:\n• Проведение аналитики репутации компаний для формирования коммерческого предложения (комплексный анализ; разработка стратегий)\n• Программный, ручной и комбинированный мониторинг СМИ и соц-медиа\n• Работа с партнерами и подрядчиками для составления медиапланов клиентов\n• Отслеживание показателей эффективности рекламных кампаний для передачи менеджерам",
      
      "freelance_role": "Интернет-маркетолог (фриланс)",
      "freelance_desc": "Настройка таргетированной и контекстной рекламы (Яндекс.Директ, VK), аудит целевой аудитории и конкурентов, разработка посадочных страниц (лендингов) и контент-планов.",

      // Brand Case Translations
      "case_label": "исследование бренда",
      "case_context_title": "Ситуация и Задача",
      "case_context_text": "Крупный бренд электротехнического оборудования (25 лет на рынке) не имел оцифрованных данных о восприятии в B2C. На фоне ухода западных игроков было критически важно выявить текущие позиции, проанализировать конкурентов и перестроить стратегию в сжатые сроки (2 недели).",
      "case_stack_title": "Стек и Инструменты",
      "case_stack_text": "Brand Analytics (Social Listening API), Opronix (CAWI-опросы, выборка ~1500 респондентов), Python (Pandas, NumPy, NLP для анализа текстовых отзывов).",
      "case_process_title": "Что Было Сделано",
      "case_process_text": "Разработана методология опросов CAWI для оценки спонтанной и подсказанной узнаваемости. Собрано и пропарсено 150 000 сообщений в соцсетях. Написаны скрипты на Python для очистки данных и классификации упоминаний с использованием ML-моделей (NLP), что позволило быстро визуализировать Пирамиду узнаваемости.",
      "case_results_title": "Результаты и Влияние",
      "case_results_text": "Выявлен парадокс: подсказанная узнаваемость составляла 56%, но Top of Mind — менее 1%! Огромное пассивное знание при отсутствии активного. Благодаря исследованию рекламные бюджеты были перераспределены на охватные каналы (ТВ, радио, видеохостинги). Клиент успешно реализует эту стратегию уже более полугода.",
      
      // Cookie Consent
      "cookie_title": "Системное уведомление",
      "cookie_message": "Этот сайт использует куки-файлы для анализа трафика и удобства пользователей. Продолжая работу, вы соглашаетесь с этим.",
      "cookie_accept": "Принять",
      "cases_folder": "Кейсы",
      "blog_title": "Блог",
      "blog_read_time": "мин",
      "blog_theory": "Теория",
      "blog_analytics": "Аналитика",
      "blog_marketing": "Маркетинг",
      "blog_cases": "Кейсы",
      "blog_all": "Все посты",
      "open_tenchat": "Открыть оригинал в TenChat"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
