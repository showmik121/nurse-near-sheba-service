
import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const fontClass = language === 'bn' ? 'font-bangla' : '';

  return (
    <div className={`nurse-near-app p-4 ${fontClass}`}>
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
          {language === 'en' ? 'About Us' : 'আমাদের সম্পর্কে'}
        </h1>
      </header>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <p className="text-center text-gray-500">
          {language === 'en' ? 'About Us content will go here' : 'আমাদের সম্পর্কে কনটেন্ট এখানে যাবে'}
        </p>
      </div>
    </div>
  );
};

export default About;
