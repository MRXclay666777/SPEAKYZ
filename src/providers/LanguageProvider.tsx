import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Language {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
}

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

interface LanguageContextType {
  currentLanguage: Language;
  availableLanguages: Language[];
  t: (key: string) => string;
  changeLanguage: (languageCode: string) => void;
  isChanging: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const availableLanguages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺', nativeName: 'Русский' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', flag: '🇮🇹', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹', nativeName: 'Português' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷', nativeName: '한국어' },
];

const translations: Translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.courses': 'Courses',
    'nav.teachers': 'Teachers',
    'nav.schedule': 'Schedule',
    'nav.contact': 'Contact',
    'nav.about': 'About',
    
    // Hero Section
    'hero.title': 'Level Up Your English with Speakyz',
    'hero.subtitle': 'Transform your English skills with our innovative learning platform. Join thousands of students worldwide who have achieved fluency with our expert teachers and cutting-edge methods.',
    'hero.cta.primary': 'Start Learning Now',
    'hero.cta.secondary': 'Book Free Trial',
    'hero.stats.students': 'Happy Students',
    'hero.stats.teachers': 'Expert Teachers',
    'hero.stats.countries': 'Countries',
    'hero.stats.lessons': 'Lessons Completed',
    
    // Features
    'features.title': 'Why Choose Speakyz?',
    'features.subtitle': 'Discover the features that make our platform the best choice for learning English',
    'features.interactive.title': 'Interactive Learning',
    'features.interactive.desc': 'Engage with dynamic content, games, and real-time exercises',
    'features.native.title': 'Native Teachers',
    'features.native.desc': 'Learn from certified native English speakers with years of experience',
    'features.flexible.title': 'Flexible Schedule',
    'features.flexible.desc': 'Study at your own pace with classes available 24/7',
    'features.progress.title': 'Progress Tracking',
    'features.progress.desc': 'Monitor your improvement with detailed analytics and reports',
    'features.community.title': 'Global Community',
    'features.community.desc': 'Connect with students worldwide and practice together',
    'features.certification.title': 'Certification',
    'features.certification.desc': 'Earn recognized certificates upon course completion',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Something went wrong',
    'common.retry': 'Try Again',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.submit': 'Submit',
    'common.close': 'Close',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.continue': 'Continue',
    'common.get_started': 'Get Started',
    'common.learn_more': 'Learn More',
    'common.view_all': 'View All',
    'common.read_more': 'Read More',
    'common.show_less': 'Show Less',
  },
  ru: {
    // Navigation
    'nav.home': 'Главная',
    'nav.courses': 'Курсы',
    'nav.teachers': 'Преподаватели',
    'nav.schedule': 'Расписание',
    'nav.contact': 'Контакты',
    'nav.about': 'О нас',
    
    // Hero Section
    'hero.title': 'Прокачай свой английский с Speakyz',
    'hero.subtitle': 'Трансформируй свои навыки английского с нашей инновационной платформой обучения. Присоединяйся к тысячам студентов по всему миру, которые достигли беглости с нашими экспертными преподавателями и передовыми методами.',
    'hero.cta.primary': 'Начать обучение',
    'hero.cta.secondary': 'Записаться на пробный урок',
    'hero.stats.students': 'Довольных студентов',
    'hero.stats.teachers': 'Экспертных преподавателей',
    'hero.stats.countries': 'Стран',
    'hero.stats.lessons': 'Проведенных уроков',
    
    // Features
    'features.title': 'Почему выбрать Speakyz?',
    'features.subtitle': 'Откройте для себя функции, которые делают нашу платформу лучшим выбором для изучения английского',
    'features.interactive.title': 'Интерактивное обучение',
    'features.interactive.desc': 'Взаимодействуйте с динамическим контентом, играми и упражнениями в реальном времени',
    'features.native.title': 'Носители языка',
    'features.native.desc': 'Учитесь у сертифицированных носителей английского языка с многолетним опытом',
    'features.flexible.title': 'Гибкое расписание',
    'features.flexible.desc': 'Учитесь в своем темпе с занятиями, доступными 24/7',
    'features.progress.title': 'Отслеживание прогресса',
    'features.progress.desc': 'Следите за своим улучшением с помощью подробной аналитики и отчетов',
    'features.community.title': 'Глобальное сообщество',
    'features.community.desc': 'Общайтесь со студентами по всему миру и практикуйтесь вместе',
    'features.certification.title': 'Сертификация',
    'features.certification.desc': 'Получайте признанные сертификаты по завершении курса',
    
    // Common
    'common.loading': 'Загрузка...',
    'common.error': 'Что-то пошло не так',
    'common.retry': 'Попробовать снова',
    'common.save': 'Сохранить',
    'common.cancel': 'Отмена',
    'common.submit': 'Отправить',
    'common.close': 'Закрыть',
    'common.next': 'Далее',
    'common.previous': 'Назад',
    'common.continue': 'Продолжить',
    'common.get_started': 'Начать',
    'common.learn_more': 'Узнать больше',
    'common.view_all': 'Посмотреть все',
    'common.read_more': 'Читать далее',
    'common.show_less': 'Скрыть',
  },
  // Add more languages as needed...
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(availableLanguages[0]);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    // Get saved language or detect browser language
    const savedLanguage = localStorage.getItem('speakyz-language');
    const browserLanguage = navigator.language.split('-')[0];
    
    const targetLanguage = savedLanguage || browserLanguage;
    const foundLanguage = availableLanguages.find(lang => lang.code === targetLanguage);
    
    if (foundLanguage && foundLanguage !== currentLanguage) {
      setCurrentLanguage(foundLanguage);
    }
  }, []);

  const t = (key: string): string => {
    const currentTranslations = translations[currentLanguage.code] || translations.en;
    return currentTranslations[key] || key;
  };

  const changeLanguage = async (languageCode: string) => {
    const newLanguage = availableLanguages.find(lang => lang.code === languageCode);
    if (!newLanguage || newLanguage === currentLanguage) return;

    setIsChanging(true);
    
    // Simulate loading time for smooth transition
    await new Promise(resolve => setTimeout(resolve, 200));
    
    setCurrentLanguage(newLanguage);
    localStorage.setItem('speakyz-language', languageCode);
    
    setTimeout(() => setIsChanging(false), 300);
  };

  const value: LanguageContextType = {
    currentLanguage,
    availableLanguages,
    t,
    changeLanguage,
    isChanging,
  };

  return (
    <LanguageContext.Provider value={value}>
      <AnimatePresence mode="wait">
        {isChanging ? (
          <motion.div
            key="changing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl"
            >
              <div className="flex items-center space-x-3">
                <div className="animate-spin w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full"></div>
                <span className="text-lg font-medium">
                  Switching to {currentLanguage.name}...
                </span>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key={currentLanguage.code}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;