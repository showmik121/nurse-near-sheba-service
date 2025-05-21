
import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BookingsList from "@/components/BookingsList";
import { useBooking } from "@/contexts/BookingContext";

const BookingHistory = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { historyBookings } = useBooking();
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
          {language === 'en' ? 'Booking History' : 'বুকিং ইতিহাস'}
        </h1>
      </header>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <BookingsList bookings={historyBookings} showActions={false} />
      </div>
    </div>
  );
};

export default BookingHistory;
