'use client';

import React, { createContext, useContext, useState, type ReactNode } from 'react';
import en from './locales/en.json';
import pt from './locales/pt.json';
import es from './locales/es.json';

export type Language = 'EN' | 'PT' | 'ES';

type TranslationDictionary = Record<string, string>;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, TranslationDictionary> = {
  EN: en,
  PT: pt,
  ES: es,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('EN');

  const t = (key: string): string => {
    return translations[language][key] ?? translations.EN[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
