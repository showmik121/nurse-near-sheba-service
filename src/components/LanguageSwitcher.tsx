
import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={language === 'en' ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage('en')}
        className="text-xs px-2 py-1 h-8"
      >
        English
      </Button>
      <Button
        variant={language === 'bn' ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage('bn')}
        className="font-bangla text-xs px-2 py-1 h-8"
      >
        বাংলা
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
