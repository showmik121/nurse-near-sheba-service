
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

      <section className="mb-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-sm p-4">
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

      {/* New Feature: Quick Emergency Section */}
      <section className="mb-8 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-xl font-bold text-red-600 mb-2">
              {language === 'en' ? 'Emergency Care' : 'জরুরী সেবা'}
            </h2>
            <p className="text-gray-700 max-w-md">
              {language === 'en' 
                ? 'Need immediate assistance? Connect with available nurses right now.'
                : 'অবিলম্বে সাহায্য প্রয়োজন? এখনই উপলব্ধ নার্সদের সাথে যোগাযোগ করুন।'}
            </p>
          </div>
          <Button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full shadow-lg animate-pulse">
            {language === 'en' ? 'Get Emergency Care' : 'জরুরী সেবা নিন'}
          </Button>
        </div>
      </section>

      {/* New Feature: Testimonials Slider */}
      <section className="mb-8 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4 text-center">
          {language === 'en' ? 'What Our Clients Say' : 'আমাদের ক্লায়েন্টরা যা বলে'}
        </h2>
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
              SR
            </div>
            <div className="ml-4">
              <h3 className="font-bold">
                {language === 'en' ? 'Sarah Rahman' : 'সারাহ রহমান'}
              </h3>
              <div className="flex star-rating">★★★★★</div>
            </div>
          </div>
          <p className="text-gray-700 italic">
            {language === 'en'
              ? '"The service was exceptional! The nurse was professional, caring, and arrived on time. Will definitely use NurseNear again."'
              : '"সেবাটি ছিল অসাধারণ! নার্স ছিলেন পেশাদার, যত্নশীল এবং সময়মত এসেছিলেন। নিশ্চয়ই আবার NurseNear ব্যবহার করব।"'}
          </p>
        </div>
        <div className="flex justify-center mt-4">
          <span className="mx-1 w-2 h-2 bg-primary rounded-full"></span>
          <span className="mx-1 w-2 h-2 bg-gray-300 rounded-full"></span>
          <span className="mx-1 w-2 h-2 bg-gray-300 rounded-full"></span>
        </div>
      </section>

      {/* New Feature: App Download CTA */}
      <section className="mb-8 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-green-600 mb-2">
              {language === 'en' ? 'Download Our Mobile App' : 'আমাদের মোবাইল অ্যাপ ডাউনলোড করুন'}
            </h2>
            <p className="text-gray-700 max-w-md">
              {language === 'en'
                ? 'Get faster access to nurses with our mobile app. Available for iOS and Android.'
                : 'আমাদের মোবাইল অ্যাপের মাধ্যমে নার্সদের সাথে দ্রুত যোগাযোগ করুন। iOS এবং Android-এ উপলব্ধ।'}
            </p>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
              <span className="mr-2">🍎</span> 
              {language === 'en' ? 'App Store' : 'অ্যাপ স্টোর'}
            </Button>
            <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
              <span className="mr-2">🤖</span>
              {language === 'en' ? 'Google Play' : 'গুগল প্লে'}
            </Button>
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
