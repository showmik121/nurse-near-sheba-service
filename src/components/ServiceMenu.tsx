
import React, { useState } from "react";
import { ServiceDetail } from "../data/servicesData";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface ServiceMenuProps {
  services: ServiceDetail[];
  onAddToCart: (selectedServices: ServiceDetail[]) => void;
}

const ServiceMenu: React.FC<ServiceMenuProps> = ({ services, onAddToCart }) => {
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

  const handleAddToCart = () => {
    if (selectedServices.length === 0) {
      toast({
        title: language === 'en' ? "No services selected" : "কোন সেবা নির্বাচিত হয়নি",
        description: language === 'en' ? "Please select at least one service" : "অনুগ্রহ করে কমপক্ষে একটি সেবা নির্বাচন করুন",
        variant: "destructive",
      });
      return;
    }

    onAddToCart(selectedServices);
    toast({
      title: language === 'en' ? "Added to cart" : "কার্টে যোগ করা হয়েছে",
      description: language === 'en' 
        ? `${selectedServices.length} services added to cart` 
        : `${selectedServices.length} টি সেবা কার্টে যোগ করা হয়েছে`,
    });
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
                  ? "border-primary bg-primary bg-opacity-5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div>
                <p className="font-medium">
                  {language === 'en' ? service.name_en : service.name_bn}
                </p>
                <p className="text-sm text-gray-500">৳{service.price}</p>
              </div>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                selectedServices.some(s => s.id === service.id)
                  ? "bg-primary text-white"
                  : "border border-gray-300"
              }`}>
                {selectedServices.some(s => s.id === service.id) && <Check className="w-4 h-4" />}
              </div>
            </div>
          ))}
        </div>
        
        {selectedServices.length > 0 && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between font-semibold">
              <span>{language === 'en' ? "Total" : "মোট"}</span>
              <span>৳{calculateTotal()}</span>
            </div>
          </div>
        )}
        
        <Button 
          onClick={handleAddToCart}
          className="w-full mt-4"
        >
          {language === 'en' ? "Add to Cart" : "কার্টে যোগ করুন"}
        </Button>
      </div>
    </div>
  );
};

export default ServiceMenu;
