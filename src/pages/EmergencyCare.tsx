import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { nursesData, Nurse } from "@/data/nursesData";
import LocationService from "@/services/LocationService";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import NurseEmergencyCard from "@/components/NurseEmergencyCard";

const EmergencyCare = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [searchingForNurses, setSearchingForNurses] = useState(false);
  const [nearbyNurses, setNearbyNurses] = useState<Nurse[]>([]);
  const [userCoordinates, setUserCoordinates] = useState<{latitude: number, longitude: number} | null>(null);
  const fontClass = language === 'bn' ? 'font-bangla' : '';

  // Request location permission when the page loads
  useEffect(() => {
    const requestLocation = async () => {
      setLoading(true);
      const granted = await LocationService.requestLocationPermission();
      
      if (granted) {
        const position = LocationService.getCurrentPosition();
        if (position) {
          setUserCoordinates(position);
          toast({
            title: language === 'en' ? 'Location access granted' : 'অবস্থান অ্যাক্সেস মঞ্জুর',
            description: language === 'en' ? 'We can now find nurses near you' : 'আমরা এখন আপনার কাছাকাছি নার্স খুঁজে পাচ্ছি',
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: language === 'en' ? 'Location access denied' : 'অবস্থান অ্যাক্সেস অস্বীকৃত',
          description: language === 'en' ? 'Please enable location services to find nearby nurses' : 'কাছাকাছি নার্স খুঁজে পেতে অনুগ্রহ করে অবস্থান পরিষেবা সক্ষম করুন',
        });
      }
      setLoading(false);
    };

    requestLocation();

    // Add location listener to update coordinates when they change
    const locationListener = (coordinates: {latitude: number, longitude: number} | null) => {
      if (coordinates) {
        setUserCoordinates(coordinates);
      }
    };
    
    LocationService.addLocationListener(locationListener);
    
    // Start watching location for real-time updates
    LocationService.watchLocation();
    
    return () => {
      // Clean up listener when component unmounts
      LocationService.removeLocationListener(locationListener);
    };
  }, [toast, language]);

  // Find nearby nurses when we have user coordinates
  useEffect(() => {
    if (userCoordinates) {
      findNearbyNurses();
    }
  }, [userCoordinates]);

  const findNearbyNurses = () => {
    setSearchingForNurses(true);
    
    // Simulate a database search delay
    setTimeout(() => {
      if (!userCoordinates) {
        setSearchingForNurses(false);
        return;
      }
      
      // Filter nurses by availability and sort by distance
      const availableNurses = nursesData
        .filter(nurse => nurse.available)
        .map(nurse => {
          // In a real app, nurse coordinates would come from the database
          // For now, we'll use the existing distance property
          const nurseWithUpdatedDistance = {
            ...nurse,
            // We'll keep the existing distance for demo purposes
          };
          return nurseWithUpdatedDistance;
        })
        .sort((a, b) => a.distance - b.distance);
      
      setNearbyNurses(availableNurses);
      setSearchingForNurses(false);
    }, 2000);
  };

  return (
    <div className={`p-4 ${fontClass} min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : ''}`}>
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
          {language === 'en' ? 'Emergency Care' : 'জরুরি সেবা'}
        </h1>
      </header>

      <div className={`bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6 mb-6 ${theme === 'dark' ? 'from-red-900/50 to-orange-900/50' : ''}`}>
        <div className="flex justify-between items-center">
          <div>
            <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-red-300' : 'text-red-600'} mb-2`}>
              {language === 'en' ? 'Emergency Nurse Service' : 'জরুরি নার্স সেবা'}
            </h2>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {language === 'en' 
                ? 'Get immediate medical assistance' 
                : 'অবিলম্বে চিকিৎসা সহায়তা পান'}
            </p>
            <p className={`text-sm mt-2 font-medium ${theme === 'dark' ? 'text-orange-300' : 'text-orange-600'}`}>
              {language === 'en' ? 'Price: ৳800/hour' : 'মূল্য: ৳৮০০/ঘন্টা'}
            </p>
          </div>
          <div className="animate-pulse">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-red-700' : 'bg-red-100'}`}>
              <span className="text-3xl">🚑</span>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p>
            {language === 'en' 
              ? 'Requesting location access...' 
              : 'অবস্থান অ্যাক্সেস অনুরোধ করা হচ্ছে...'}
          </p>
        </div>
      ) : !userCoordinates ? (
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <p className="mb-4">
            {language === 'en' 
              ? 'Location access is required to find nearby nurses' 
              : 'কাছাকাছি নার্স খুঁজতে অবস্থানের অ্যাক্সেস প্রয়োজন'}
          </p>
          <Button onClick={() => LocationService.requestLocationPermission()}>
            {language === 'en' ? 'Enable Location' : 'অবস্থান সক্ষম করুন'}
          </Button>
        </div>
      ) : searchingForNurses ? (
        <div className={`rounded-xl shadow-sm p-6 text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex flex-col items-center justify-center py-10">
            <div className="mb-8">
              <div className="w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
                <img 
                  src="/lovable-uploads/5844b61f-3d2d-47e0-a2f2-431732765d8d.png" 
                  alt="Emergency Icon"
                  className="w-16 h-16 object-contain"
                />
              </div>
              
              <h3 className="text-xl font-bold mb-2">
                {language === 'en' ? 'Finding nearby nurses...' : 'নিকটবর্তী নার্স খোঁজা হচ্ছে...'}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {language === 'en' 
                  ? 'Looking for available emergency nurses in your area' 
                  : 'আপনার এলাকায় উপলব্ধ জরুরি নার্স খোঁজা হচ্ছে'}
              </p>
            </div>
            
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {nearbyNurses.length > 0 ? (
            <div>
              <div className={`rounded-xl shadow-sm p-5 mb-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-green-900' : 'bg-green-100'}`}>
                    <MapPin className={`h-4 w-4 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {language === 'en' ? 'Your location' : 'আপনার অবস্থান'}
                    </p>
                    <p className="font-medium">
                      {language === 'en' ? 'Current Location' : 'বর্তমান অবস্থান'}
                    </p>
                  </div>
                </div>
              </div>
              
              <h2 className="font-bold text-lg mb-3">
                {language === 'en' 
                  ? `${nearbyNurses.length} nurses found nearby` 
                  : `${nearbyNurses.length}টি নার্স কাছাকাছি পাওয়া গেছে`}
              </h2>
              
              <div className="space-y-4">
                {nearbyNurses.map(nurse => (
                  <NurseEmergencyCard key={nurse.id} nurse={nurse} />
                ))}
              </div>
            </div>
          ) : (
            <div className={`rounded-xl shadow-sm p-6 text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <p className="mb-4">
                {language === 'en' 
                  ? 'No available nurses found nearby' 
                  : 'কাছাকাছি কোন উপলব্ধ নার্স পাওয়া যায়নি'}
              </p>
              <Button onClick={findNearbyNurses}>
                {language === 'en' ? 'Try Again' : 'আবার চেষ্টা করুন'}
              </Button>
            </div>
          )}
        </div>
      )}

      <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-2 shadow-lg">
        <div className="max-w-[500px] mx-auto flex justify-around">
          <Button variant="ghost" className="flex flex-col items-center text-xs text-gray-500 dark:text-gray-400" onClick={() => navigate('/')}>
            <span className="mb-1">🏠</span>
            {language === 'en' ? 'Home' : 'হোম'}
          </Button>
          <Button variant="ghost" className="flex flex-col items-center text-xs text-gray-500 dark:text-gray-400" onClick={() => navigate('/booking-history')}>
            <span className="mb-1">📅</span>
            {language === 'en' ? 'Bookings' : 'বুকিংস'}
          </Button>
          <Button variant="ghost" className="flex flex-col items-center text-xs text-gray-500 dark:text-gray-400" onClick={() => navigate('/profile')}>
            <span className="mb-1">👤</span>
            {language === 'en' ? 'Profile' : 'প্রোফাইল'}
          </Button>
        </div>
      </footer>
      
      {/* Add padding to ensure footer doesn't cover content */}
      <div className="h-16"></div>
    </div>
  );
};

export default EmergencyCare;
