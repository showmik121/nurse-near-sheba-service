
import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BookingsList from "@/components/BookingsList";
import { useBooking } from "@/contexts/BookingContext";

const BookingHistory = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { historyBookings } = useBooking();
  const fontClass = language === 'bn' ? 'font-bangla' : '';
  const isDarkMode = theme === 'dark';

  return (
    <div className={`nurse-near-app p-4 ${fontClass} ${isDarkMode ? 'dark bg-gray-900 text-white' : ''}`}>
      <header className="mb-6 flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)} 
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">
          {language === 'en' ? 'Booking History' : 'বুকিং ইতিহাস'}
        </h1>
      </header>

      <div className={`rounded-xl shadow-sm p-6 mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <BookingsList bookings={historyBookings} showActions={false} />
      </div>
      
      <footer className={`fixed bottom-0 left-0 right-0 border-t p-2 shadow-lg ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="max-w-[500px] mx-auto flex justify-around">
          <Button 
            variant="ghost" 
            className={`flex flex-col items-center text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
            onClick={() => navigate('/')}
          >
            <span className="mb-1">🏠</span>
            {language === 'en' ? 'Home' : 'হোম'}
          </Button>
          <Button 
            variant="ghost" 
            className={`flex flex-col items-center text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
          >
            <span className="mb-1">📅</span>
            {language === 'en' ? 'Bookings' : 'বুকিংস'}
          </Button>
          <Button 
            variant="ghost" 
            className={`flex flex-col items-center text-xs ${isDarkMode ? 'text-primary' : 'text-primary'}`}
            onClick={() => navigate('/profile')}
          >
            <span className="mb-1">👤</span>
            {language === 'en' ? 'Profile' : 'প্রোফাইল'}
          </Button>
        </div>
      </footer>
      
      {/* Add padding to ensure footer doesn't cover content */}
      <div className="h-16"></div>
    </div>
  );
};

export default BookingHistory;
