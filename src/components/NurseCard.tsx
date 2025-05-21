
import React from "react";
import { Nurse } from "../data/nursesData";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface NurseCardProps {
  nurse: Nurse;
}

const NurseCard: React.FC<NurseCardProps> = ({ nurse }) => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDarkMode = theme === 'dark';
  
  // Helper function to render stars
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push(
          <span key={i} className="text-accent">
            ★
          </span>
        );
      } else if (i === Math.floor(rating) && rating % 1 > 0) {
        stars.push(
          <span key={i} className="text-accent">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className={`${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}>
            ★
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <div className={`p-4 rounded-lg shadow-sm mb-4 flex items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="mr-3">
        <img
          src={nurse.imageUrl}
          alt={nurse.name}
          className="w-16 h-16 rounded-full object-cover"
        />
      </div>
      <div className="flex-grow">
        <h3 className={`font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>{nurse.name}</h3>
        <div className="flex items-center gap-1 my-1">
          {renderStars(nurse.rating)}
          <span className={`text-xs ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {nurse.distance} km away
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm">
            <span className={`font-medium ${
              nurse.available 
                ? isDarkMode ? 'text-green-400' : 'text-green-600' 
                : isDarkMode ? 'text-red-400' : 'text-red-500'
            }`}>
              {nurse.available 
                ? language === 'en' ? 'Available' : 'উপলব্ধ'
                : language === 'en' ? 'Unavailable' : 'অনুপলব্ধ'
              }
            </span>
            <span className={`ml-2 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {nurse.hourlyRate} tk/hr
            </span>
          </p>
        </div>
      </div>
      <div className="ml-2">
        <Button 
          variant="default" 
          className="bg-primary hover:bg-primary/90"
          disabled={!nurse.available}
        >
          {language === 'en' ? 'Hire Now' : 'নিয়োগ করুন'}
        </Button>
      </div>
    </div>
  );
};

export default NurseCard;
