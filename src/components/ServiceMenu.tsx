
import React, { useState, useEffect } from "react";
import { ServiceDetail } from "../data/servicesData";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

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

  // Modern service icons with professional visual context
  const serviceIcons: Record<string, { icon: string, bgColor: string }> = {
    "cannula": { 
      icon: "💉", 
      bgColor: "bg-blue-50"
    },
    "saline": { 
      icon: "💧", 
      bgColor: "bg-cyan-50"
    },
    "bp-check": { 
      icon: "🩸", 
      bgColor: "bg-red-50"
    },
    "injection": { 
      icon: "💊", 
      bgColor: "bg-purple-50"
    },
    "bathing": { 
      icon: "🚿", 
      bgColor: "bg-teal-50"
    },
    "blood-sugar": { 
      icon: "🔬", 
      bgColor: "bg-amber-50"
    }
  };

  return (
    <div className={`service-menu ${fontClass}`}>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-secondary via-secondary/80 to-secondary/50 p-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {language === 'en' ? "Select Services" : "সেবা নির্বাচন করুন"}
          </h2>
        </div>
        
        <div className="p-4 bg-white">
          <div className="grid grid-cols-3 gap-2">
            {services.map((service) => {
              const iconData = serviceIcons[service.id] || { icon: "✨", bgColor: "bg-gray-50" };
              const isSelected = selectedServices.some(s => s.id === service.id);
              
              return (
                <Card
                  key={service.id}
                  onClick={() => toggleServiceSelection(service)}
                  className={`p-0 cursor-pointer transition-all duration-200 overflow-hidden
                    ${isSelected
                      ? "ring-2 ring-primary shadow-md"
                      : "ring-1 ring-gray-100 hover:ring-gray-300"
                    } bg-white`}
                >
                  <div className={`${iconData.bgColor} flex flex-col items-center justify-center p-3 relative`}>
                    <div className="text-2xl">{iconData.icon}</div>
                    {isSelected && (
                      <div className="absolute top-1 right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="p-2 text-center">
                    <p className="text-xs font-medium text-gray-800 line-clamp-2">
                      {language === 'en' ? service.name_en : service.name_bn}
                    </p>
                    <p className="text-primary font-semibold text-xs mt-1">৳{service.price}</p>
                  </div>
                </Card>
              );
            })}
          </div>
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
