
import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const fontClass = language === 'bn' ? 'font-bangla' : '';

  return (
    <>
      {/* Floating Chat Button */}
      <div 
        className={`fixed z-20 bottom-20 right-4 flex items-center ${isOpen ? 'bg-white rounded-full shadow-lg' : ''}`}
      >
        {isOpen && (
          <div className={`mr-3 pl-4 pr-1 py-2 ${fontClass}`}>
            {language === 'en' ? 'Chat with us' : 'আমাদের সাথে চ্যাট করুন'}
          </div>
        )}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg"
        >
          {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
        </button>
      </div>

      {/* Chat Panel - would be expanded in a real implementation */}
      {isOpen && (
        <div className="fixed z-10 bottom-20 right-4 w-72 bg-white rounded-lg shadow-xl transform transition-transform duration-300 ease-in-out">
          <div className="p-4 border-b border-gray-200">
            <h3 className={`font-bold text-lg ${fontClass}`}>
              {language === 'en' ? 'Customer Support' : 'গ্রাহক সহায়তা'}
            </h3>
          </div>
          <div className="p-4 h-60 overflow-y-auto bg-gray-50">
            <p className={`text-center text-sm text-gray-500 mt-20 ${fontClass}`}>
              {language === 'en' 
                ? 'How can we help you today?' 
                : 'আজ আমরা আপনাকে কিভাবে সাহায্য করতে পারি?'}
            </p>
          </div>
          <div className="p-2 border-t border-gray-200">
            <div className="flex gap-2">
              <input type="text" className="flex-1 border rounded-full px-4 py-2 text-sm" placeholder={language === 'en' ? 'Type a message...' : 'একটি বার্তা টাইপ করুন...'} />
              <button className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
                ▶
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatButton;
