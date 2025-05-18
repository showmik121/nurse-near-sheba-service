
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'bn';

type Translations = {
  [key: string]: {
    en: string;
    bn: string;
  };
};

const translations: Translations = {
  appName: {
    en: 'NurseNear',
    bn: 'নার্সনিয়ার'
  },
  tagline: {
    en: 'Healthcare at your doorstep',
    bn: 'আপনার বাড়িতেই পেশাদার নার্সিং সেবা'
  },
  login: {
    en: 'Login',
    bn: 'লগইন'
  },
  register: {
    en: 'Register',
    bn: 'রেজিস্টার'
  },
  search: {
    en: 'Search for services',
    bn: 'সেবা খুঁজুন'
  },
  services: {
    en: 'Services',
    bn: 'সেবাসমূহ'
  },
  viewAll: {
    en: 'View All',
    bn: 'সব দেখুন'
  },
  popularNurses: {
    en: 'Popular Nurses',
    bn: 'জনপ্রিয় নার্স'
  },
  filter: {
    en: 'Filter',
    bn: 'ফিল্টার'
  },
  home: {
    en: 'Home',
    bn: 'হোম'
  },
  bookings: {
    en: 'Bookings',
    bn: 'বুকিং'
  },
  chat: {
    en: 'Chat',
    bn: 'চ্যাট'
  },
  profile: {
    en: 'Profile',
    bn: 'প্রোফাইল'
  },
  loginTitle: {
    en: 'Login to NurseNear',
    bn: 'নার্সনিয়ারে লগইন করুন'
  },
  loginSubtitle: {
    en: 'Enter your credentials to access your account',
    bn: 'আপনার অ্যাকাউন্টে প্রবেশ করতে লগইন করুন'
  },
  email: {
    en: 'Email',
    bn: 'ইমেইল'
  },
  password: {
    en: 'Password',
    bn: 'পাসওয়ার্ড'
  },
  loginAs: {
    en: 'Login as',
    bn: 'লগইন করুন এভাবে'
  },
  user: {
    en: 'User',
    bn: 'ইউজার'
  },
  nurse: {
    en: 'Nurse',
    bn: 'নার্স'
  },
  admin: {
    en: 'Admin',
    bn: 'অ্যাডমিন'
  },
  forgotPassword: {
    en: 'Forgot password?',
    bn: 'পাসওয়ার্ড ভুলে গেছেন?'
  },
  loginButton: {
    en: 'Login',
    bn: 'লগইন'
  },
  loggingIn: {
    en: 'Logging in...',
    bn: 'লগইন হচ্ছে...'
  },
  noAccount: {
    en: 'Don\'t have an account?',
    bn: 'অ্যাকাউন্ট নেই?'
  },
  registerButton: {
    en: 'Register',
    bn: 'রেজিস্টার করুন'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key "${key}" not found.`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
