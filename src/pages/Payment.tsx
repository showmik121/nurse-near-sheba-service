
import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, CreditCard, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

const Payment = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const fontClass = language === 'bn' ? 'font-bangla' : '';
  const isDarkMode = theme === 'dark';

  return (
    <div className={`nurse-near-app p-4 ${fontClass} ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-background'}`}>
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
          {language === 'en' ? 'Payment' : 'পেমেন্ট'}
        </h1>
      </header>

      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm p-6 mb-6`}>
        <h2 className="text-lg font-semibold mb-4">
          {language === 'en' ? 'Select Payment Method' : 'পেমেন্ট পদ্ধতি নির্বাচন করুন'}
        </h2>
        
        <div className="space-y-3">
          <div className={`border rounded-lg p-4 flex items-center cursor-pointer ${isDarkMode ? 'hover:bg-gray-700 border-gray-700' : 'hover:bg-gray-50 border-gray-200'}`}>
            <CreditCard className="h-6 w-6 text-primary mr-3" />
            <div>
              <p className="font-medium">{language === 'en' ? 'Credit/Debit Card' : 'ক্রেডিট/ডেবিট কার্ড'}</p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {language === 'en' ? 'Pay with Visa, Mastercard' : 'ভিসা, মাস্টারকার্ড দিয়ে পেমেন্ট করুন'}
              </p>
            </div>
          </div>
          
          <div className={`border rounded-lg p-4 flex items-center cursor-pointer ${isDarkMode ? 'hover:bg-gray-700 border-gray-700' : 'hover:bg-gray-50 border-gray-200'}`}>
            <Wallet className="h-6 w-6 text-primary mr-3" />
            <div>
              <p className="font-medium">{language === 'en' ? 'Mobile Banking' : 'মোবাইল ব্যাংকিং'}</p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {language === 'en' ? 'bKash, Nagad, Rocket' : 'বিকাশ, নগদ, রকেট'}
              </p>
            </div>
          </div>
          
          <div className={`border rounded-lg p-4 flex items-center cursor-pointer ${isDarkMode ? 'hover:bg-gray-700 border-gray-700' : 'hover:bg-gray-50 border-gray-200'}`}>
            <CreditCard className="h-6 w-6 text-primary mr-3" />
            <div>
              <p className="font-medium">{language === 'en' ? 'Cash on Delivery' : 'ক্যাশ অন ডেলিভারি'}</p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {language === 'en' ? 'Pay after service' : 'সেবা নেওয়ার পরে অর্থপ্রদান করুন'}
              </p>
            </div>
          </div>
        </div>
        
        <Button className="w-full mt-6 bg-primary hover:bg-primary/90">
          {language === 'en' ? 'Confirm Payment' : 'পেমেন্ট নিশ্চিত করুন'}
        </Button>
      </div>
    </div>
  );
};

export default Payment;
