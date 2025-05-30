
import React from "react";
import { ServiceCategory } from "../data/servicesData";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

interface ServiceCardProps {
  service: ServiceCategory;
  hasPromo?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, hasPromo = false }) => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const fontClass = language === 'bn' ? 'font-bangla' : '';
  const navigate = useNavigate();
  const isDarkMode = theme === 'dark';
  
  const handleServiceClick = () => {
    navigate(`/service/${service.id}`);
  };

  // Enhanced card styling with more professional look
  const cardBgClass = isDarkMode 
    ? 'bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800'
    : 'bg-gradient-to-br from-white to-gray-50 hover:from-gray-50 hover:to-white';

  // Enhanced icon styling with more attractive, professional look
  const iconContainerClass = isDarkMode
    ? 'bg-gradient-to-br from-gray-700 to-gray-800 text-primary shadow-inner'
    : 'bg-gradient-to-br from-primary/10 to-primary/5 text-primary shadow-md';
  
  return (
    <div 
      className={`relative service-card flex flex-col items-center justify-center ${fontClass} cursor-pointer rounded-xl shadow-md p-4 transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-lg ${cardBgClass}`}
      onClick={handleServiceClick}
    >
      {hasPromo && (
        <span className="absolute -top-2 -right-2 bg-gradient-to-r from-primary to-accent text-white text-xs py-1 px-3 rounded-full font-medium animate-pulse shadow-md">
          {language === 'en' ? 'Promo' : 'প্রমো'}
        </span>
      )}
      <div className={`w-16 h-16 rounded-full ${iconContainerClass} flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-105`}>
        <div className="text-4xl">{service.icon}</div>
      </div>
      <p className={`text-sm font-medium text-center ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        {language === 'en' ? service.name : service.name_bn || service.name}
      </p>
    </div>
  );
};

export default ServiceCard;
