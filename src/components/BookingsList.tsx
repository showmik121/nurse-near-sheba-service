
import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

export type Booking = {
  id: string;
  services: string[];
  date: string;
  time: string;
  price: number;
  status: 'pending' | 'processed' | 'cancelled';
  careProvider: 'male' | 'female';
}

interface BookingsListProps {
  bookings: Booking[];
  onStatusChange?: (id: string, status: 'processed' | 'cancelled') => void;
  showActions?: boolean;
}

const BookingsList: React.FC<BookingsListProps> = ({
  bookings,
  onStatusChange,
  showActions = true
}) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const fontClass = language === 'bn' ? 'font-bangla' : '';

  const handleProceed = (id: string) => {
    if (onStatusChange) {
      onStatusChange(id, 'processed');
    }
    // Navigate to payment page
    navigate('/payment');
    toast({
      title: language === 'en' ? "Proceeding to payment" : "পেমেন্টে এগিয়ে যাচ্ছে",
      description: language === 'en' ? "Please complete your payment" : "আপনার পেমেন্ট সম্পন্ন করুন",
    });
  };

  const handleCancel = (id: string) => {
    if (onStatusChange) {
      onStatusChange(id, 'cancelled');
    }
    toast({
      title: language === 'en' ? "Booking Cancelled" : "বুকিং বাতিল করা হয়েছে",
      description: language === 'en' ? "Your booking has been cancelled" : "আপনার বুকিং বাতিল করা হয়েছে",
      variant: "destructive",
    });
  };

  if (bookings.length === 0) {
    return (
      <div className={`text-center py-8 text-gray-500 ${fontClass}`}>
        {language === 'en' ? "No bookings found" : "কোন বুকিং পাওয়া যায়নি"}
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${fontClass}`}>
      {bookings.map((booking) => (
        <Card key={booking.id} className="bg-white border-gray-100">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">
                {language === 'en' ? "Booking ID: " : "বুকিং আইডি: "}
                <span className="font-semibold">{booking.id}</span>
              </h3>
              <div className={`px-2 py-1 text-xs rounded-full ${
                booking.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-700'
                  : booking.status === 'processed'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {booking.status === 'pending'
                  ? (language === 'en' ? 'Pending' : 'অপেক্ষমান')
                  : booking.status === 'processed'
                  ? (language === 'en' ? 'Processed' : 'প্রক্রিয়াজাত')
                  : (language === 'en' ? 'Cancelled' : 'বাতিল')
                }
              </div>
            </div>
            
            <div className="text-sm space-y-2 text-gray-600 mb-4">
              <p className="flex justify-between border-b border-gray-100 pb-1">
                <span className="font-medium">{language === 'en' ? "Date: " : "তারিখ: "}</span>
                <span>{booking.date}</span>
              </p>
              <p className="flex justify-between border-b border-gray-100 pb-1">
                <span className="font-medium">{language === 'en' ? "Time: " : "সময়: "}</span>
                <span>{booking.time}</span>
              </p>
              <p className="flex justify-between border-b border-gray-100 pb-1">
                <span className="font-medium">{language === 'en' ? "Care Provider: " : "সেবা প্রদানকারী: "}</span>
                <span>
                  {language === 'en' 
                    ? (booking.careProvider === 'male' ? 'Male' : 'Female') 
                    : (booking.careProvider === 'male' ? 'পুরুষ' : 'মহিলা')
                  }
                </span>
              </p>
              <div className="pt-1">
                <div className="font-medium mb-1">{language === 'en' ? "Services: " : "সেবাসমূহ: "}</div>
                <ul className="list-disc pl-5">
                  {booking.services.map((service, index) => (
                    <li key={index} className="mb-1">{service}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="flex justify-between items-center border-t border-gray-100 pt-2">
              <div className="font-semibold text-lg">
                {language === 'en' ? "Total: " : "মোট: "}৳{booking.price}
              </div>
              
              {showActions && booking.status === 'pending' && (
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    className="bg-primary hover:bg-primary/90 text-white"
                    onClick={() => handleProceed(booking.id)}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    {language === 'en' ? "Proceed" : "এগিয়ে যান"}
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-red-500 border-red-200 hover:bg-red-50"
                    onClick={() => handleCancel(booking.id)}
                  >
                    <X className="h-4 w-4 mr-1" />
                    {language === 'en' ? "Cancel" : "বাতিল"}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BookingsList;
