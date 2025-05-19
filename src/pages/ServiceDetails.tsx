
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { serviceCategories } from '../data/servicesData';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const fontClass = language === 'bn' ? 'font-bangla' : '';

  // Find the selected service
  const service = serviceCategories.find(s => s.id === id);

  if (!service) {
    return (
      <div className="p-4">
        <p className="text-center py-10">Service not found</p>
        <Button onClick={() => navigate('/')}>
          {language === 'en' ? 'Go back to home' : 'হোম পেজে ফিরে যান'}
        </Button>
      </div>
    );
  }

  return (
    <div className={`p-4 ${fontClass}`}>
      {/* Header */}
      <header className="bg-white p-4 border-b border-gray-100 fixed top-0 left-0 right-0 z-10 shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ChevronLeft />
          </Button>
          <h1 className="text-xl font-semibold ml-2">
            {language === 'en' ? service.name : service.name_bn || service.name}
          </h1>
        </div>
      </header>

      {/* Content with spacing for the fixed header */}
      <div className="pt-16 pb-20">
        <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="text-5xl">{service.icon}</div>
          </div>
          <h2 className="text-xl font-bold text-center mb-2">
            {language === 'en' ? service.name : service.name_bn || service.name}
          </h2>
          <p className="text-gray-600 text-center mb-4">
            {language === 'en' 
              ? 'Professional care services at your doorstep' 
              : 'আপনার দরজায় পেশাদার পরিচর্যা পরিষেবা'}
          </p>
        </div>

        {/* Service Details */}
        {service.details && service.details.length > 0 ? (
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-lg mb-4">
              {language === 'en' ? 'Available Services' : 'উপলব্ধ পরিষেবাসমূহ'}
            </h3>
            <div className="space-y-3">
              {service.details.map(detail => (
                <div key={detail.id} className="flex justify-between py-2 border-b border-gray-100">
                  <span>
                    {language === 'en' ? detail.name_en : detail.name_bn}
                  </span>
                  <span className="font-semibold">৳{detail.price}</span>
                </div>
              ))}
            </div>
            <Button className="w-full mt-6">
              {language === 'en' ? 'Book Service' : 'সেবা বুক করুন'}
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-xl p-5 shadow-sm text-center">
            {language === 'en' 
              ? 'Detailed services coming soon' 
              : 'বিস্তারিত সেবাসমূহ শীঘ্রই আসছে'}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetails;
