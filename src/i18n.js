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
      "role": "Lead Data-Driven Marketer / Marketing Analyst / T-Shaped Manager",
      "about": "Hi! I am Egor Khromov, a T-shaped marketing leader operating at the intersection of strategic marketing management, paid traffic, and marketing data engineering (Python/SQL). I bridge the gap between technical, sales, and creative teams, translating raw data into business outcomes.\n\nI bring over 4+ years of hands-on experience in business development, market research, brand reputation analysis, and team leadership across B2B enterprise and high-volume B2C sectors.\n\nKey Highlights & Achievements:\n• High-Ticket B2B & High-Volume B2C: Scaled B2B enterprise sales pipelines (4M+ RUB check) and designed retail GTM launch strategies for B2C FMCG brands in Kazakhstan (high-volume, low-ticket consumer market).\n• Leadership & Communication: Led cross-functional marketing teams of up to 5 FTE, coordinated external contractors, and aligned sales scripts with brand strategies.\n• Production-Ready MarTech: Built robust, automated data pipelines (Python/SQL/ClickHouse ETLs) running on production schedules to scrape competitor e-shelves and classify reputation sentiment via NLP/ML.\n• Professional Languages: English: Upper-Intermediate (B2) — fluent professional/technical communication, Russian: Native.\n\nMy approach is strictly ROI/ROMI-focused: for example, I doubled commercial proposal conversion rates by implementing a SMART sales framework and applying behavioral economics (nudges) to consumer touchpoints.",
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
      "toolkit_desc": "Managing B2B marketing strategy and lead generation pipelines for complex high-tech products with an average check from 4M RUB. Overseeing a cross-functional marketing team and coordinating with sales to secure enterprise SQLs. Deployed production-ready Python scraping pipelines for e-shelf analytics and designed live Tableau dashboards for executives.\n\nKey Activities & Achievements:\n• Developed and executed the full B2B marketing strategy, reducing B2B acquisition CPL by 35%.\n• Coordinated sales-marketing alignment via Account-Based Marketing (ABM) sequences, growing active SQL pipeline value by 45%.\n• Built and launched production scraping pipelines (Python, Pandas) to extract live competitor pricing and inventory data.\n• Managed external contractor networks (designers, copywriters, publishers) and steered product roadmap updates.\n• Designed and defended strategic Go-To-Market plans for new product lines, bridging complex technical features into simple, value-driven sales copy.",
      
      "daynet_dev_role": "Director of Development",
      "daynet_dev_desc": "Conducted a comprehensive audit of business processes, identified growth bottlenecks, and optimized marketing budgets (saving 20% in operational waste). Developed and defended a long-term business scaling strategy from scratch and coordinated cross-departmental operations, acting as a bridge between IT developers, creative teams, and sales.\n\nResponsibilities:\n• Analyzing company business processes and evaluating business growth potential.\n• Identifying negative and positive operational trends, formulating corrective and scaling measures.\n• Defining the long-term concept and development goals of the enterprise.\n• Designing development strategies and core sections of the business plan.\n• Architecting business restructuring programs and assessing financial feasibility.\n• Setting budget priorities and monitoring operational expenses to ensure cash stability (managed annual marketing budget of 15M+ RUB).\n• Formulating market expansion proposals, technical modernization, and administrative updates.\n• Coordinating target licensing, certification, and compliance documentation.\n• Delivering approved project schedules and roadmaps to department leads.\n• Assigning project roles, establishing clear KPIs, and coordinating cross-functional teams.\n• Aligning corporate structures to execute strategic developmental plans.\n• Coordinating project phases and verifying alignment with core business principles.\n• Auditing financial and economic indicators across each developmental phase.\n• Designing crisis management plans for non-standard operational challenges.\n• Expanding vendor and partner networks.\n• Conducting market research to identify geographical and vertical scaling vectors.",
      
      "daynet_senior_role": "Senior Marketer",
      "daynet_senior_desc": "Led the marketing team and managed brand reputation analysis. Created production-ready Python scripts running on scheduled ETL processes to automate brand reputation data harvesting, sentiment classification (using NLP model Spacy/NLTK), and data cleaning. Conducted product training and directed campaign pitch presentations to clients.\n\nResponsibilities:\n• Auditing brand reputation indicators to frame strategic commercial proposals.\n• Operating programmatic, manual, and hybrid media/social monitoring streams.\n• Organizing daily activities and workflows of the marketing team.\n• Sourcing and developing custom production-grade scripts/tools to automate marketing operations and data workflows.\n• Leading product and process training programs for internal employees.\n• Sourcing client briefings and presenting GTM strategy pitches.",
      
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
      "open_tenchat": "Open original in TenChat",
      "uzbekistan_case": "Uzbekistan Labor Market",
      "uzbekistan_case_title": "Uzbekistan Labor Market Analysis",
      "uzbekistan_case_tab": "Uzbekistan Case",
      "back_to_list": "back to list",
      "uz_case_context_title": "Situation & Challenge",
      "uz_case_context_text": "Analyzing the real state of the labor market in Uzbekistan using social listening. Macroeconomic indicators (GDP, inflation) showed positive trends, but qualitative metrics like candidate sentiment, linguistic distributions, and recruitment channel preferences were undocumented.",
      "uz_case_stack_title": "Tools & Tech",
      "uz_case_stack_text": "Brand Analytics (Social Listening API), Python (Pandas, NumPy, NLP for parsing & text clustering), SQL/ClickHouse (data storage), Yandex DataLens (interactive BI dashboard).",
      "uz_case_process_title": "Methodology & Process",
      "uz_case_process_text": "Analyzed 373,000 social media and press messages from Jan to Apr 2025. Removed spam and irrelevant ads. Employed Natural Language Processing (NLP) to classify topics (salary, job search, requirements) and linguistic balance (Uzbek vs. Russian).",
      "uz_case_results_title": "Results & Impact",
      "uz_case_results_text": "Discovered a massive salary discrepancy between candidates and employers. Identified that 32% of users rely heavily on social networks (primarily Telegram channels like CareerUz, UzDev Jobs) for recruitment. Prepared actionable GTM and employer branding guidelines.",
      "contact_email": "egor@theyoungest.ru",
      "contact_phone": "89200700406",
      "contact_location": "Nizhny Novgorod, RF",
      "contact_telegram": "@nonenewfriends",
      "kazakhstan_case": "Kazakhstan Grocery GTM",
      "kazakhstan_case_title": "Kazakhstan Grocery GTM Launch Strategy",
      "kazakhstan_case_tab": "Kazakhstan Case",
      "kaz_case_context_title": "Context & Challenge",
      "kaz_case_context_text": "Launching a local B2C grocery brand in Kazakhstan amid heavy import dominance. Shelves are controlled by import giants, buyers avoid unknown brands, and consumers buy established marks on autopilot. Furthermore, local products are often perceived as cheap, low-quality compromises.",
      "kaz_case_stack_title": "Framework & Rules",
      "kaz_case_stack_text": "Built on the C.O.M.P.A.S.S. GTM framework. Covered Commercial Orientation (digital compliance in National Product Catalog, Standard tax LLP entity, 3-month fee-free trial), Market Planning (100% clean closed-loop product on Swiss machinery, Affordable Clean Eating positioning), and Strategic Scalability.",
      "kaz_case_process_title": "Funnel & Nudging",
      "kaz_case_process_text": "Implemented a Two-Phase Funnel. Phase 1 (Pull) validated demand online via Meta/TikTok ads, building a data-backed Partner Kit. Phase 2 (Push) entered retail shelves using these proven sales metrics. Handled consumer autopilot via 'transparent window' packaging and trade marketing nudges.",
      "kaz_case_results_title": "MarTech & Impact",
      "kaz_case_results_text": "Designed a python-based digital shelf scraping pipeline for regional delivery apps (Magnum Go, Arbuz) to enable dynamic pricing, and WhatsApp API webhooks to automate customer reviews. The strategy was successfully approved by the client and is now in initial digital deployment.",
      
      // Certificates translations
      "certificates_title": "Certificates",
      "cert_issuer": "Issuer",
      "cert_id": "Credential ID",
      "cert_valid": "Valid Until",
      "cert_verify": "Verify Online",
      "cert_download": "Open File",
      "cert_all": "All Certificates",
      "cert_yandex": "Yandex",
      "cert_vk": "VK",
      "cert_hubspot": "HubSpot",
      "cert_brand_analytics": "Brand Analytics",
      "cert_preview_placeholder": "Select a certificate to view details and preview",
      "cert_no_preview": "Preview is not embedded. Click the button above to view the certificate file."
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
      "role": "Ведущий Data-Driven Маркетолог / Аналитик / T-Shaped Менеджер",
      "about": "Привет! Я Егор Хромов, T-shaped маркетинг-лидер на стыке глубокого стратегического маркетинга, платного трафика и инженерии данных (Python/SQL). Я выступаю связующим звеном (мостом) между техническими специалистами, креативными командами и отделом продаж, переводя сложные метрики в понятные бизнес-результаты.\n\nУ меня за плечами 4+ года практического опыта управления развитием бизнеса, бюджетами, исследованиями рынков и кросс-функциональными командами в B2B (Enterprise) и B2C (FMCG ритейл).\n\nКлючевые факты и достижения:\n• Масштаб B2B и B2C: Успешно строил ABM-кампании для сложных продуктов с чеком 4M+ руб. и разрабатывал GTM-стратегии для вывода брендов в массовый B2C-ритейл (Казахстан) с многомиллионной аудиторией.\n• Управление и Лидерство: Управлял внутренними командами маркетинга до 5 человек, координировал работу внешних подрядчиков, выстраивал кросс-департаментное взаимодействие на позиции Директора по развитию.\n• Production-ready решения: Разрабатывал и внедрял надежные, работающие в продакшене Python ETL-скрипты на расписании для автоматического сбора e-shelf аналитики и NLP/ML-классификации тональности отзывов.\n• Профессиональный английский: Upper-Intermediate (B2) — свободное ведение переговоров, написание англоязычных материалов, чтение технической документации.\n\nМой подход полностью ROI/ROMI-ориентирован: например, я увеличил конверсию коммерческих предложений в 2 раза благодаря внедрению SMART-подхода и работе с когнитивными искажениями потребителей (Nudging).",
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
      "toolkit_desc": "Управление маркетинговой стратегией и генерацией enterprise-лидов для сложных высокотехнологичных продуктов со средним чеком от 4 млн рублей. Координация кросс-функциональной команды маркетинга и тесное взаимодействие с отделом продаж для выстраивания стабильного пайплайна SQL-лидов. Внедрение автоматизированных парсеров цен конкурентов и интерактивных дашбордов в продакшене.\n\nКлючевые обязанности и результаты:\n• Разработка и реализация маркетинговой стратегии B2B-направления, позволившая снизить CPL (стоимость лида) на 35%.\n• Реализация и оптимизация ABM (Account-Based Marketing) цепочек касаний совместно с отделом продаж (прирост объема пайплайна SQL на 45%).\n• Создание и развертывание в продакшене автоматических парсеров (Python, Pandas) для мониторинга цен на e-shelf.\n• Управление командой подрядчиков (дизайнеры, копирайтеры, верстальщики) и руководство выходом продуктов на рынок.\n• Разработка Go-To-Market стратегии для новых сложных релизов, перевод инженерных фич на понятный клиенту язык выгод.\n• Составление сквозной отчетности и планирование маркетингового бюджета.",
      
      "daynet_dev_role": "Директор по развитию и внешним коммуникациям",
      "daynet_dev_desc": "Проводил глубокий аудит бизнес-процессов компании, выявлял точки роста и оптимизировал маркетинговые бюджеты (сократил нецелевые расходы на 20%). С нуля разработал и защитил долгосрочную стратегию масштабирования бизнеса, координировал взаимодействие между отделами разработки, продаж и маркетинга.\n\nОбязанности:\n• Исследование и анализ бизнес-процессов компании, оценка её потенциала.\n• Выявление операционных тенденций, разработка и защита стратегии масштабирования бизнеса.\n• Установка приоритетов бюджетирования и мониторинг расходов (управлял годовым маркетинговым бюджетом в 15+ млн рублей) для обеспечения финансовой стабильности реализуемых программ.\n• Назначение работников, ответственных за реализацию проектов, дача общих указаний, руководство и координация их деятельности (команда до 5 сотрудников).\n• Организация взаимодействия всех структур компании по реализации проектов развития предприятия (выступал мостом между IT-разработчиками и коммерческим отделом).\n• Координация работы по реализации проектов на всех этапах, контроль соответствия принимаемых решений и совершаемых действий основной концепции развития компании.\n• Анализ экономических и финансовых показателей на каждом этапе реализации проектов развития.\n• Разработка методик по оперативному реагированию на кризисные и нестандартные ситуации.\n• Расширение партнёрской сети компании.\n• Анализ новых рынков с целью расширения географии работ.",
      
      "daynet_senior_role": "Старший маркетолог",
      "daynet_senior_desc": "Возглавлял команду маркетинга, занимался репутационным анализом. Разработал и вывел в продакшен (запуск по Cron-расписанию с логированием ошибок) Python-скрипты для автоматизации сбора и NLP-классификации отзывов о бренде (библиотеки Spacy, Pandas, NLTK). Проводил тренинги по продукту и руководил защитой рекламных концепций перед заказчиками.\n\nОбязанности:\n• Проведение аналитики репутации компаний для формирования коммерческого предложения (комплексный анализ; разработка стратегий).\n• Программный, ручной и комбинированный мониторинг СМИ и соц-медиа.\n• Организация работы маркетинговой команды и выстраивание внутренних коммуникаций.\n• Разработка и поддержка в продакшене скриптов/инструментов на Python для автоматизации сбора и очистки данных (библиотеки Spacy, Pandas, NLTK).\n• Проведение обучающих тренингов для сотрудников.\n• Проведение встречи с заказчиками, брифы, защита стратегий.",
      
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
      "open_tenchat": "Открыть оригинал в TenChat",
      "uzbekistan_case": "Кейс: Рынок труда Узбекистана",
      "uzbekistan_case_title": "Анализ рынка труда Узбекистана",
      "uzbekistan_case_tab": "Кейс: Узбекистан",
      "back_to_list": "назад к списку",
      "uz_case_context_title": "Ситуация и Задача",
      "uz_case_context_text": "Анализ реального состояния рынка труда в Узбекистане через призму социальных медиа. Официальные макроэкономические показатели демонстрировали стабильный рост, но качественные метрики (настроения соискателей, языковые барьеры, предпочтения каналов найма) оставались не оцифрованы.",
      "uz_case_stack_title": "Стек и Инструменты",
      "uz_case_stack_text": "Brand Analytics (Social Listening API), Python (Pandas, NumPy, NLP для парсинга и кластеризации текстов), SQL/ClickHouse для хранения массивов данных, Yandex DataLens для интерактивного дашборда.",
      "uz_case_process_title": "Методология и Процесс",
      "uz_case_process_text": "Собрано и проанализировано 373 000 сообщений в соцсетях и СМИ с января по апрель 2025 года. Проведена автоматическая очистка от спама. С помощью NLP-методов классифицированы основные темы обсуждений (зарплаты, вакансии, требования) и соотношение языков (узбекский/русский).",
      "uz_case_results_title": "Результаты и Влияние",
      "uz_case_results_text": "Выявлен резкий разрыв между зарплатными ожиданиями соискателей и предложениями бизнеса. 32% соискателей используют соцсети (в первую очередь Telegram-каналы вроде CareerUz, UzDev Jobs) как основной инструмент найма. Сформированы рекомендации по выстраиванию бренда работодателя в регионе.",
      "contact_email": "egor@theyoungest.ru",
      "contact_phone": "89200700406",
      "contact_location": "Нижний Новгород, РФ",
      "contact_telegram": "@nonenewfriends",
      "kazakhstan_case": "Кейс: GTM в Казахстане",
      "kazakhstan_case_title": "Вывод бренда бакалеи на рынок Казахстана",
      "kazakhstan_case_tab": "Кейс: Казахстан",
      "kaz_case_context_title": "Ситуация и Задача",
      "kaz_case_context_text": "Вывод нового локального B2C-бренда бакалеи на рынок Казахстана в условиях доминирования крупных импортных марок. Полки супермаркетов заняты импортом, байеры сетей минимизируют риски и не берут новичков, а потребители покупают привычное на автопилоте, считывая местный бренд как дешевый компромисс.",
      "kaz_case_stack_title": "Фреймворк C.O.M.P.A.S.S.",
      "kaz_case_stack_text": "Стратегия построена на авторском фреймворке C.O.M.P.A.S.S. Включает Commercial Orientation (цифровой комплаенс в НКТ, ТОО на общем режиме, 3 месяца тест-буста без листинга), Market Planning (100% чистый продукт на швейцарском оборудовании Булер, позиционирование 'Доступного Правильного Питания') и Strategic Scalability.",
      "kaz_case_process_title": "Воронка и Подталкивание",
      "kaz_case_process_text": "Внедрена двухфазная воронка. Фаза 1 (Pull) — онлайн-тесты трафика (Meta, TikTok) и e-com продаж для упаковки цифр в Partner Kit. Фаза 2 (Push) — экспансия в ритейл с доказанной оборачиваемостью. Для обхода автопилота разработана упаковка с прозрачным окном (чистота крупы) и трейд-маркетинг nudging.",
      "kaz_case_results_title": "MarTech и Результаты",
      "kaz_case_results_text": "Спроектирован Python-парсер цифровых полок доставки (Magnum Go, Arbuz) для динамического ценообразования и WhatsApp API вебхуки для автоматического сбора отзывов. Стратегия успешно защищена перед заказчиком и находится на этапе запуска инфраструктуры продаж.",
      
      // Certificates translations
      "certificates_title": "Сертификаты",
      "cert_issuer": "Организация",
      "cert_id": "ID сертификата",
      "cert_valid": "Действителен до",
      "cert_verify": "Проверить онлайн",
      "cert_download": "Открыть файл",
      "cert_all": "Все сертификаты",
      "cert_yandex": "Яндекс",
      "cert_vk": "VK",
      "cert_hubspot": "HubSpot",
      "cert_brand_analytics": "Brand Analytics",
      "cert_preview_placeholder": "Выберите сертификат для просмотра деталей и превью",
      "cert_no_preview": "Предпросмотр не встроен. Нажмите на кнопку выше, чтобы открыть файл сертификата."
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
