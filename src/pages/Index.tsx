
import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import ServiceCard from "@/components/ServiceCard";
import NurseCard from "@/components/NurseCard";
import { serviceCategories } from "@/data/servicesData";
import { nursesData } from "@/data/nursesData";
import { Button } from "@/components/ui/button";
import LoginDialog from "@/components/LoginDialog";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { UserIcon, MapPinIcon, Clock, HeartIcon, MessageSquare } from "lucide-react";

const Index = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { t, language } = useLanguage();
  const fontClass = language === 'bn' ? 'font-bangla' : '';

  return (
    <div className={`nurse-near-app p-4 ${fontClass}`}>
      <header className="mb-6 bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-primary">{t('appName')}</h1>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Button 
              variant="outline" 
              className="flex items-center gap-2 border-accent text-accent hover:bg-accent hover:text-white"
              onClick={() => setIsLoginOpen(true)}
            >
              <UserIcon size={18} />
              <span>{t('login')}</span>
            </Button>
          </div>
        </div>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold mb-2">{t('tagline')}</h2>
          <p className="text-gray-600">
            {language === 'en' 
              ? 'Professional nursing care at your home with trained and certified nurses.'
              : 'ট্রেইনড এবং সার্টিফাইড নার্সদের মাধ্যমে আপনার বাড়িতে পেশাদার নার্সিং সেবা।'}
          </p>
        </div>
        <SearchBar placeholder={t('search')} />
      </header>

      <section className="mb-8 bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{t('services')}</h2>
          <Button variant="ghost" className="text-sm text-primary p-0">{t('viewAll')}</Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {serviceCategories.slice(0, 4).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section className="mb-8 bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{t('popularNurses')}</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="text-sm py-1 px-3 h-8">
              {t('filter')}
            </Button>
            <Button variant="ghost" className="text-sm text-primary p-0">{t('viewAll')}</Button>
          </div>
        </div>
        <div className="space-y-4">
          {nursesData.map((nurse) => (
            <NurseCard key={nurse.id} nurse={nurse} />
          ))}
        </div>
      </section>

      <section className="mb-8 bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">
            {language === 'en' ? 'How it works' : 'কিভাবে কাজ করে?'}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="bg-blue-100 h-16 w-16 flex items-center justify-center rounded-full mx-auto mb-3">
              <UserIcon className="text-primary" size={24} />
            </div>
            <h3 className="font-semibold mb-2">
              {language === 'en' ? 'Register/Login' : 'রেজিস্টার/লগইন করুন'}
            </h3>
            <p className="text-sm text-gray-600">
              {language === 'en' 
                ? 'Create your account or login to access services' 
                : 'সেবা পেতে একাউন্ট তৈরি করুন অথবা লগইন করুন'}
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="bg-blue-100 h-16 w-16 flex items-center justify-center rounded-full mx-auto mb-3">
              <MapPinIcon className="text-primary" size={24} />
            </div>
            <h3 className="font-semibold mb-2">
              {language === 'en' ? 'Find Nurses' : 'নার্স খুঁজুন'}
            </h3>
            <p className="text-sm text-gray-600">
              {language === 'en'
                ? 'Search for nurses near your location'
                : 'আপনার কাছাকাছি অবস্থানে নার্স খুঁজুন'}
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="bg-blue-100 h-16 w-16 flex items-center justify-center rounded-full mx-auto mb-3">
              <Clock className="text-primary" size={24} />
            </div>
            <h3 className="font-semibold mb-2">
              {language === 'en' ? 'Book Appointment' : 'অ্যাপয়েন্টমেন্ট বুক করুন'}
            </h3>
            <p className="text-sm text-gray-600">
              {language === 'en'
                ? 'Schedule a time that works for you'
                : 'আপনার সুবিধাজনক সময়ে অ্যাপয়েন্টমেন্ট নিন'}
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="bg-blue-100 h-16 w-16 flex items-center justify-center rounded-full mx-auto mb-3">
              <HeartIcon className="text-primary" size={24} />
            </div>
            <h3 className="font-semibold mb-2">
              {language === 'en' ? 'Get Care' : 'সেবা নিন'}
            </h3>
            <p className="text-sm text-gray-600">
              {language === 'en'
                ? 'Receive professional nursing care at home'
                : 'বাড়িতে পেশাদার নার্সিং সেবা পান'}
            </p>
          </div>
        </div>
      </section>

      <LoginDialog isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 shadow-lg">
        <div className="max-w-[500px] mx-auto flex justify-around">
          <Button variant="ghost" className="flex flex-col items-center text-xs text-primary">
            <span className="material-icons mb-1">🏠</span>
            {t('home')}
          </Button>
          <Button variant="ghost" className="flex flex-col items-center text-xs text-gray-500">
            <span className="material-icons mb-1">📅</span>
            {t('bookings')}
          </Button>
          <Button variant="ghost" className="flex flex-col items-center text-xs text-gray-500">
            <span className="material-icons mb-1">💬</span>
            {t('chat')}
          </Button>
          <Button variant="ghost" className="flex flex-col items-center text-xs text-gray-500">
            <span className="material-icons mb-1">👤</span>
            {t('profile')}
          </Button>
        </div>
      </footer>
      
      {/* Add padding to ensure footer doesn't cover content */}
      <div className="h-16"></div>
    </div>
  );
};

export default Index;
