
import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-white rounded-full shadow-sm border border-gray-100 p-1">
      <Globe size={16} className="ml-2 text-gray-500" />
      <Button
        variant={language === 'en' ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage('en')}
        className={`text-xs px-3 py-1 h-8 rounded-full ${language === 'en' ? 'bg-primary text-white' : 'text-gray-600'}`}
      >
        English
      </Button>
      <Button
        variant={language === 'bn' ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage('bn')}
        className={`font-bangla text-xs px-3 py-1 h-8 rounded-full ${language === 'bn' ? 'bg-primary text-white' : 'text-gray-600'}`}
      >
        বাংলা
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
