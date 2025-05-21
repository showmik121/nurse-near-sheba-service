
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { ChevronRight, User, Settings, Info, Shield, FileText, History, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { t, language } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<string | null>(null);
  const fontClass = language === 'bn' ? 'font-bangla' : '';

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatar(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const profileOptions = [
    { 
      id: "history", 
      icon: <History className="h-5 w-5 text-primary" />, 
      title: { en: "Booking History", bn: "বুকিং ইতিহাস" },
      path: "/booking-history"
    },
    { 
      id: "settings", 
      icon: <Settings className="h-5 w-5 text-primary" />, 
      title: { en: "Settings", bn: "সেটিংস" },
      path: "/settings"
    },
    { 
      id: "about", 
      icon: <Info className="h-5 w-5 text-primary" />, 
      title: { en: "About Us", bn: "আমাদের সম্পর্কে" },
      path: "/about"
    },
    { 
      id: "terms", 
      icon: <FileText className="h-5 w-5 text-primary" />, 
      title: { en: "Terms of Use", bn: "ব্যবহারের শর্তাবলী" },
      path: "/terms"
    },
    { 
      id: "privacy", 
      icon: <Shield className="h-5 w-5 text-primary" />, 
      title: { en: "Privacy Policy", bn: "গোপনীয়তা নীতি" },
      path: "/privacy"
    }
  ];

  return (
    <div className={`nurse-near-app p-4 ${fontClass}`}>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-center">
          {language === 'en' ? 'My Profile' : 'আমার প্রোফাইল'}
        </h1>
      </header>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <Avatar className="w-24 h-24 border-4 border-primary/20">
              <AvatarImage src={avatar || ""} />
              <AvatarFallback className="bg-primary/10 text-primary text-xl">
                <User size={32} />
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 inset-x-0 flex justify-center">
              <label className="bg-primary hover:bg-primary/90 text-white text-xs py-1 px-2 rounded-full cursor-pointer shadow-sm">
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileUpload}
                />
                {language === 'en' ? 'Change Photo' : 'ছবি পরিবর্তন'}
              </label>
            </div>
          </div>
          <h2 className="text-xl font-bold">John Doe</h2>
          <p className="text-gray-500 text-sm">
            {language === 'en' ? 'User ID: #123456' : 'ইউজার আইডি: #১২৩৪৫৬'}
          </p>
        </div>

        {/* Dark Mode Toggle */}
        <div className="mt-6 mb-6">
          <Card className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === 'dark' ? (
                <Moon className="h-5 w-5 text-primary" />
              ) : (
                <Sun className="h-5 w-5 text-primary" />
              )}
              <span>
                {language === 'en' 
                  ? (theme === 'dark' ? 'Dark Mode' : 'Light Mode') 
                  : (theme === 'dark' ? 'ডার্ক মোড' : 'লাইট মোড')
                }
              </span>
            </div>
            <Switch 
              checked={theme === 'dark'} 
              onCheckedChange={toggleTheme}
            />
          </Card>
        </div>

        <div className="space-y-1">
          {profileOptions.map((option) => (
            <Card 
              key={option.id}
              className="p-4 flex items-center justify-between hover:bg-secondary cursor-pointer"
              onClick={() => navigate(option.path)}
            >
              <div className="flex items-center gap-3">
                {option.icon}
                <span>{option.title[language as 'en' | 'bn']}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <Button 
            variant="outline" 
            className="w-full border-red-300 text-red-500 hover:bg-red-50"
          >
            {language === 'en' ? 'Logout' : 'লগ আউট'}
          </Button>
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 shadow-lg">
        <div className="max-w-[500px] mx-auto flex justify-around">
          <Button variant="ghost" className="flex flex-col items-center text-xs text-gray-500">
            <span className="mb-1">🏠</span>
            {language === 'en' ? 'Home' : 'হোম'}
          </Button>
          <Button variant="ghost" className="flex flex-col items-center text-xs text-gray-500">
            <span className="mb-1">📅</span>
            {language === 'en' ? 'Bookings' : 'বুকিংস'}
          </Button>
          <Button variant="ghost" className="flex flex-col items-center text-xs text-gray-500">
            <span className="mb-1">💬</span>
            {language === 'en' ? 'Chat' : 'চ্যাট'}
          </Button>
          <Button variant="ghost" className="flex flex-col items-center text-xs text-primary">
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

export default Profile;
