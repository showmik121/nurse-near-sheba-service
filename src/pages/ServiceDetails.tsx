
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { serviceCategories, ServiceDetail } from '../data/servicesData';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import ServiceMenu from '@/components/ServiceMenu';
import BookingDrawer from '@/components/BookingDrawer';

const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const fontClass = language === 'bn' ? 'font-bangla' : '';
  
  const [bookingItems, setBookingItems] = useState<ServiceDetail[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  // Force light mode on this page
  useEffect(() => {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
    
    // Apply light mode styles to root
    const root = document.documentElement;
    root.style.setProperty('--background', '#FDFAFC');
    root.style.setProperty('--foreground', '#000000');
    root.style.setProperty('--card', '#ffffff');
    root.style.setProperty('--card-foreground', '#000000');
    
  }, []);

  // Find the selected service
  const service = serviceCategories.find(s => s.id === id);

  const handleAddToBooking = (selectedServices: ServiceDetail[]) => {
    // Filter out any duplicates
    const updatedBooking = [...bookingItems];
    
    selectedServices.forEach(service => {
      if (!updatedBooking.some(item => item.id === service.id)) {
        updatedBooking.push(service);
      }
    });
    
    setBookingItems(updatedBooking);
    setIsBookingOpen(true);
  };
  
  const handleRemoveFromBooking = (itemId: string) => {
    setBookingItems(bookingItems.filter(item => item.id !== itemId));
  };

  if (!service) {
    return (
      <div className="p-4 bg-white text-gray-900">
        <p className="text-center py-10">Service not found</p>
        <Button onClick={() => navigate('/')}>
          {language === 'en' ? 'Go back to home' : 'হোম পেজে ফিরে যান'}
        </Button>
      </div>
    );
  }

  // Light mode gradient background
  const gradientBg = 'bg-gradient-to-r from-secondary via-secondary/70 to-secondary/30';
  const headerBg = 'bg-white border-gray-100';

  return (
    <div className={`pb-20 ${fontClass} bg-white text-gray-900`}>
      {/* Header */}
      <header className={`p-4 border-b fixed top-0 left-0 right-0 z-10 shadow-sm ${headerBg}`}>
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/')}
            className="text-gray-700 hover:text-gray-900"
          >
            <ChevronLeft />
          </Button>
          <h1 className="text-xl font-semibold ml-2 text-gray-900">
            {language === 'en' ? service.name : service.name_bn || service.name}
          </h1>
        </div>
      </header>

      {/* Content with spacing for the fixed header */}
      <div className="pt-16 px-4 bg-white">
        <div className={`${gradientBg} rounded-xl p-5 shadow-sm mb-6`}>
          <div className="flex items-center justify-center mb-4 w-20 h-20 mx-auto rounded-full bg-primary/10">
            <div className="text-5xl">{service.icon}</div>
          </div>
          <h2 className="text-xl font-bold text-center mb-2 text-gray-900">
            {language === 'en' ? service.name : service.name_bn || service.name}
          </h2>
          <p className="text-center mb-4 text-gray-600">
            {language === 'en' 
              ? 'Professional care services at your doorstep' 
              : 'আপনার দরজায় পেশাদার পরিচর্যা পরিষেবা'}
          </p>
        </div>

        {/* Service Menu */}
        {service.details && service.details.length > 0 ? (
          <ServiceMenu 
            services={service.details} 
            onAddToBooking={handleAddToBooking} 
          />
        ) : (
          <div className="rounded-xl p-5 shadow-sm text-center bg-white text-gray-900">
            {language === 'en' 
              ? 'Detailed services coming soon' 
              : 'বিস্তারিত সেবাসমূহ শীঘ্রই আসছে'}
          </div>
        )}
      </div>
      
      {/* Booking Drawer */}
      <BookingDrawer 
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        bookingItems={bookingItems}
        onRemoveItem={handleRemoveFromBooking}
      />
    </div>
  );
};

export default ServiceDetails;
