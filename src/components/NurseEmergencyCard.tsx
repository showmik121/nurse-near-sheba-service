
import React from "react";
import { Nurse } from "../data/nursesData";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock } from "lucide-react";

interface NurseEmergencyCardProps {
  nurse: Nurse;
}

const NurseEmergencyCard: React.FC<NurseEmergencyCardProps> = ({ nurse }) => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Helper function to render stars
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push(
          <span key={i} className="text-accent">
            ★
          </span>
        );
      } else if (i === Math.floor(rating) && rating % 1 > 0) {
        stars.push(
          <span key={i} className="text-accent">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-300 dark:text-gray-600">
            ★
          </span>
        );
      }
    }
    return stars;
  };

  const handleHireNow = () => {
    toast({
      title: language === 'en' ? 'Emergency nurse hired!' : 'জরুরি নার্স নিয়োগ করা হয়েছে!',
      description: language === 'en' 
        ? `${nurse.name} will arrive in approximately ${nurse.distance * 5} minutes` 
        : `${nurse.name} আনুমানিক ${nurse.distance * 5} মিনিটের মধ্যে পৌঁছাবেন`
    });
    
    // Navigate to a confirmation page or back home
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const estimatedArrival = Math.round(nurse.distance * 5); // Rough calculation: 5 min per km

  return (
    <div className={`rounded-xl shadow-sm overflow-hidden ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
      <div className="p-4">
        <div className="flex items-center">
          <img
            src={nurse.imageUrl}
            alt={nurse.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-primary"
          />
          <div className="ml-3 flex-grow">
            <h3 className="font-bold">{nurse.name}</h3>
            <div className="flex items-center my-1">
              {renderStars(nurse.rating)}
              <span className={`text-xs ml-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                ({nurse.rating})
              </span>
            </div>
            <div className="flex items-center text-sm">
              <span className={`${theme === 'dark' ? 'text-green-400' : 'text-green-600'} font-medium`}>
                {language === 'en' ? 'Available for emergency' : 'জরুরী সেবার জন্য উপলব্ধ'}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            <span>
              {language === 'en' 
                ? `${nurse.distance} km away` 
                : `${nurse.distance} কিলোমিটার দূরে`}
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-primary" />
            <span>
              {language === 'en' 
                ? `Estimated arrival: ${estimatedArrival} minutes` 
                : `আনুমানিক আগমন: ${estimatedArrival} মিনিট`}
            </span>
          </div>
          <div className="flex items-center font-semibold">
            <span className="mr-2">💲</span>
            <span>
              {language === 'en' 
                ? `Emergency rate: ৳${nurse.hourlyRate + 250}/hour` 
                : `জরুরি হার: ৳${nurse.hourlyRate + 250}/ঘন্টা`}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="text-sm">
            <span className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
              {nurse.languages.join(', ')}
            </span>
          </div>
          <Button 
            variant="default" 
            className="bg-primary hover:bg-primary/90 px-6"
            onClick={handleHireNow}
          >
            {language === 'en' ? 'Hire Now' : 'এখনই নিয়োগ করুন'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NurseEmergencyCard;
