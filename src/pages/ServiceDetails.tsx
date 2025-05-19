
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { serviceCategories, ServiceDetail } from '../data/servicesData';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ChevronLeft, CalendarClock } from 'lucide-react';
import ServiceMenu from '@/components/ServiceMenu';
import BookingDrawer from '@/components/BookingDrawer';

const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const fontClass = language === 'bn' ? 'font-bangla' : '';
  
  const [bookingItems, setBookingItems] = useState<ServiceDetail[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

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
      <div className="p-4">
        <p className="text-center py-10">Service not found</p>
        <Button onClick={() => navigate('/')}>
          {language === 'en' ? 'Go back to home' : 'হোম পেজে ফিরে যান'}
        </Button>
      </div>
    );
  }

  return (
    <div className={`pb-20 ${fontClass}`}>
      {/* Header */}
      <header className="bg-white p-4 border-b border-gray-100 fixed top-0 left-0 right-0 z-10 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ChevronLeft />
            </Button>
            <h1 className="text-xl font-semibold ml-2">
              {language === 'en' ? service.name : service.name_bn || service.name}
            </h1>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            className="relative flex items-center gap-2"
            onClick={() => setIsBookingOpen(true)}
            disabled={bookingItems.length === 0}
          >
            <CalendarClock className="h-4 w-4" />
            <span>{language === 'en' ? 'View Booking' : 'বুকিং দেখুন'}</span>
            {bookingItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {bookingItems.length}
              </span>
            )}
          </Button>
        </div>
      </header>

      {/* Content with spacing for the fixed header */}
      <div className="pt-16 px-4">
        <div className="bg-gradient-to-r from-secondary via-secondary/70 to-secondary/30 rounded-xl p-5 shadow-sm mb-6">
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

        {/* Service Menu */}
        {service.details && service.details.length > 0 ? (
          <ServiceMenu 
            services={service.details} 
            onAddToBooking={handleAddToBooking} 
          />
        ) : (
          <div className="bg-white rounded-xl p-5 shadow-sm text-center">
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
