
import React, { useState, useEffect } from "react";
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
  
  // Force light mode
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

  // Enhanced service colors with more attractive gradients
  const serviceColors: Record<string, string> = {
    "cannula": "bg-gradient-to-r from-pink-50 via-pink-100 to-pink-50",
    "saline": "bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50",
    "bp-check": "bg-gradient-to-r from-red-50 via-red-100 to-red-50",
    "injection": "bg-gradient-to-r from-purple-50 via-purple-100 to-purple-50",
    "bathing": "bg-gradient-to-r from-cyan-50 via-cyan-100 to-cyan-50",
    "blood-sugar": "bg-gradient-to-r from-amber-50 via-amber-200 to-amber-50"
  };

  // Service icons with emoji representations
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
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-secondary via-secondary/80 to-secondary/50 p-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {language === 'en' ? "Select Services" : "সেবা নির্বাচন করুন"}
          </h2>
        </div>
        
        <div className="p-4 space-y-3 bg-white">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => toggleServiceSelection(service)}
              className={`p-4 rounded-lg border-2 flex justify-between items-center cursor-pointer transition-all duration-200 
                ${selectedServices.some(s => s.id === service.id)
                  ? "border-primary shadow-md transform scale-[1.01]"
                  : "border-gray-200 hover:border-gray-300"
                } ${serviceColors[service.id] || "bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50"}`}
            >
              <div className="flex items-center">
                <div className="text-3xl mr-4 bg-white h-12 w-12 rounded-full flex items-center justify-center shadow-sm">
                  {serviceIcons[service.id] || "✨"}
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {language === 'en' ? service.name_en : service.name_bn}
                  </p>
                  <p className="text-primary font-semibold">৳{service.price}</p>
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
          <div className="px-4 pb-4 bg-white">
            <div className="p-3 bg-gradient-to-r from-accent/30 to-accent/10 rounded-lg">
              <div className="flex justify-between font-semibold text-gray-900">
                <span>{language === 'en' ? "Total Selected" : "মোট নির্বাচিত"}</span>
                <span>৳{calculateTotal()}</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="p-4 border-t border-gray-100 bg-white">
          <Button 
            onClick={handleProceedToBooking}
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white"
          >
            {language === 'en' ? "Proceed to Booking" : "বুকিং এ এগিয়ে যান"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceMenu;
