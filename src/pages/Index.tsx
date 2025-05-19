
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
import { UserIcon, Filter, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { t, language } = useLanguage();
  const fontClass = language === 'bn' ? 'font-bangla' : '';
  const navigate = useNavigate();

  // Add promo tags to some services
  const servicesWithPromo = serviceCategories.map((service, index) => ({
    ...service,
    hasPromo: [0, 1, 3].includes(index) // Add promo to some services
  }));

  return (
    <div className={`nurse-near-app ${fontClass}`}>
      {/* Header with brand and language/login options */}
      <header className="bg-white p-4 border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center text-white font-bold mr-2">N</div>
            <h1 className="text-2xl font-bold text-primary flex items-center">
              {t('appName')}
              <span className="text-xs text-gray-500 ml-2 border-l border-gray-200 pl-2">
                {language === 'en' ? 'Nurse on Demand' : 'অন ডিমান্ড নার্স'}
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Button 
              variant="ghost"
              size="icon"
              className="rounded-full bg-gray-50 hover:bg-gray-100"
              onClick={() => navigate('/profile')}
            >
              <UserIcon size={18} className="text-gray-700" />
            </Button>
          </div>
        </div>
        
        <SearchBar placeholder={t('search')} />
      </header>

      <div className="p-4">
        {/* Banner/Hero Section */}
        <div className="mb-6 rounded-xl overflow-hidden bg-gradient-purple shadow-sm">
          <div className="p-5 flex flex-col md:flex-row items-center">
            <div className="mb-4 md:mb-0 md:mr-4">
              <h2 className="text-xl font-bold mb-2">
                {language === 'en' 
                  ? 'All our nurses are verified' 
                  : 'আমাদের সকল নার্স যাচাইকৃত'}
              </h2>
              <p className="text-sm text-gray-700 max-w-sm">
                {language === 'en' 
                  ? 'Professional care at your doorstep with our certified nurses' 
                  : 'আমাদের সার্টিফাইড নার্সদের সাথে আপনার দরজায় পেশাদার সেবা'}
              </p>
              <Button className="mt-4 bg-primary hover:bg-primary/90">
                {language === 'en' ? 'Book Now' : 'বুক করুন'}
              </Button>
            </div>
            <div className="flex-shrink-0 bg-white p-1 rounded-xl rotate-3">
              <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center">
                <div className="text-lg">✓</div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section (Uber Style) */}
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3">
            {language === 'en' ? 'What services do you need?' : 'আপনার কী সেবা প্রয়োজন?'}
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {servicesWithPromo.slice(0, 6).map((service) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                hasPromo={service.hasPromo}
              />
            ))}
          </div>
        </section>

        {/* No Ongoing Orders Section */}
        <section className="mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {language === 'en' ? 'You don\'t have any ongoing order' : 'আপনার কোন চলমান অর্ডার নেই'}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {language === 'en' ? 'Need a service today?' : 'আজ কোন সেবা দরকার?'}
                </p>
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                {language === 'en' ? 'Order now' : 'অর্ডার করুন'}
              </Button>
            </div>
          </div>
        </section>

        {/* Popular Nurses Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">{t('popularNurses')}</h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="text-xs py-1 px-3 h-7 flex items-center gap-1">
                <Filter size={12} />
                {t('filter')}
              </Button>
              <Button variant="ghost" size="sm" className="text-xs text-primary p-0 flex items-center gap-1">
                {t('viewAll')}
                <ChevronRight size={14} />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {nursesData.map((nurse) => (
              <NurseCard key={nurse.id} nurse={nurse} />
            ))}
          </div>
        </section>

        {/* Emergency Section */}
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

        {/* Testimonials Slider */}
        <section className="mb-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4 text-center">
            {language === 'en' ? 'What Our Clients Say' : 'আমাদের ক্লায়েন্টরা যা বলে'}
          </h2>
          <div className="bg-gradient-pink rounded-xl p-5">
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
      </div>

      <LoginDialog isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 shadow-lg">
        <div className="max-w-[500px] mx-auto flex justify-around">
          <Button variant="ghost" className="flex flex-col items-center text-xs text-primary">
            <span className="mb-1">🏠</span>
            {t('home')}
          </Button>
          <Button variant="ghost" className="flex flex-col items-center text-xs text-gray-500">
            <span className="mb-1">📅</span>
            {t('bookings')}
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center text-xs text-gray-500"
            onClick={() => navigate('/profile')}
          >
            <span className="mb-1">👤</span>
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
