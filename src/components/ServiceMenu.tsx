
import React, { useState } from "react";
import { ServiceDetail } from "../data/servicesData";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface ServiceMenuProps {
  services: ServiceDetail[];
  onAddToBooking: (selectedServices: ServiceDetail[]) => void;
}

const ServiceMenu: React.FC<ServiceMenuProps> = ({ services, onAddToBooking }) => {
  const { language } = useLanguage();
  const [selectedServices, setSelectedServices] = useState<ServiceDetail[]>([]);
  const fontClass = language === 'bn' ? 'font-bangla' : '';

  const toggleServiceSelection = (service: ServiceDetail) => {
    if (selectedServices.some(s => s.id === service.id)) {
      setSelectedServices(selectedServices.filter(s => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const calculateTotal = () => {
    return selectedServices.reduce((total, service) => total + service.price, 0);
  };

  const handleProceedToBooking = () => {
    if (selectedServices.length === 0) {
      toast({
        title: language === 'en' ? "No services selected" : "কোন সেবা নির্বাচিত হয়নি",
        description: language === 'en' ? "Please select at least one service" : "অনুগ্রহ করে কমপক্ষে একটি সেবা নির্বাচন করুন",
        variant: "destructive",
      });
      return;
    }

    onAddToBooking(selectedServices);
    toast({
      title: language === 'en' ? "Proceeding to booking" : "বুকিং এ এগিয়ে যাচ্ছে",
      description: language === 'en' 
        ? `${selectedServices.length} services selected` 
        : `${selectedServices.length} টি সেবা নির্বাচিত`,
    });
  };

  // Define service colors for visual appeal
  const serviceColors: Record<string, string> = {
    "cannula": "bg-gradient-to-br from-pink-50 to-pink-100",
    "saline": "bg-gradient-to-br from-blue-50 to-blue-100",
    "bp-check": "bg-gradient-to-br from-red-50 to-red-100",
    "injection": "bg-gradient-to-br from-purple-50 to-purple-100",
    "bathing": "bg-gradient-to-br from-cyan-50 to-cyan-100",
    "blood-sugar": "bg-gradient-to-br from-amber-50 to-amber-100"
  };

  // Define service icons for visual appeal
  const serviceIcons: Record<string, string> = {
    "cannula": "💉",
    "saline": "💧",
    "bp-check": "🩸",
    "injection": "💊",
    "bathing": "🚿",
    "blood-sugar": "🔬"
  };

  return (
    <div className={`service-menu ${fontClass}`}>
      <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
        <h2 className="text-lg font-semibold mb-4">
          {language === 'en' ? "Select Services" : "সেবা নির্বাচন করুন"}
        </h2>
        
        <div className="space-y-3">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => toggleServiceSelection(service)}
              className={`p-3 rounded-lg border-2 flex justify-between items-center cursor-pointer transition-all duration-200 ${
                selectedServices.some(s => s.id === service.id)
                  ? "border-primary bg-primary bg-opacity-5 shadow-md"
                  : "border-gray-200 hover:border-gray-300"
              } ${serviceColors[service.id] || "bg-gradient-to-br from-gray-50 to-gray-100"}`}
            >
              <div className="flex items-center">
                <div className="text-2xl mr-3">{serviceIcons[service.id] || "✨"}</div>
                <div>
                  <p className="font-medium">
                    {language === 'en' ? service.name_en : service.name_bn}
                  </p>
                  <p className="text-sm text-gray-500">৳{service.price}</p>
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                selectedServices.some(s => s.id === service.id)
                  ? "bg-primary text-white"
                  : "border border-gray-300 bg-white"
              }`}>
                {selectedServices.some(s => s.id === service.id) && <Check className="w-4 h-4" />}
              </div>
            </div>
          ))}
        </div>
        
        {selectedServices.length > 0 && (
          <div className="mt-4 p-3 bg-gradient-to-r from-secondary to-secondary/30 rounded-lg">
            <div className="flex justify-between font-semibold">
              <span>{language === 'en' ? "Total" : "মোট"}</span>
              <span>৳{calculateTotal()}</span>
            </div>
          </div>
        )}
        
        <Button 
          onClick={handleProceedToBooking}
          className="w-full mt-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
        >
          {language === 'en' ? "Proceed to Booking" : "বুকিং এ এগিয়ে যান"}
        </Button>
      </div>
    </div>
  );
};

export default ServiceMenu;
