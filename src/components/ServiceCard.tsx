
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
  
  return (
    <div 
      className={`relative service-card flex flex-col items-center justify-center ${fontClass} cursor-pointer rounded-xl shadow-sm p-4 
        ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}`}
      onClick={handleServiceClick}
    >
      {hasPromo && (
        <span className="absolute -top-2 -right-2 bg-primary text-white text-xs py-1 px-2 rounded-full">
          {language === 'en' ? 'Promo' : 'প্রমো'}
        </span>
      )}
      <div className="text-4xl mb-3">{service.icon}</div>
      <p className={`text-sm font-medium text-center ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        {language === 'en' ? service.name : service.name_bn || service.name}
      </p>
    </div>
  );
};

export default ServiceCard;
