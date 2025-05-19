
import React, { useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ServiceDetail } from "../data/servicesData";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { CalendarClock, MapPin, PhoneCall, X, Check } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";

interface BookingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookingItems: ServiceDetail[];
  onRemoveItem: (id: string) => void;
}

type BookingFormValues = {
  name: string;
  phone: string;
  address: string;
  date: string;
  time: string;
  agreeToTerms: boolean;
};

const BookingDrawer: React.FC<BookingDrawerProps> = ({
  isOpen,
  onClose,
  bookingItems,
  onRemoveItem,
}) => {
  const { language } = useLanguage();
  const fontClass = language === 'bn' ? 'font-bangla' : '';
  const [step, setStep] = useState<'summary' | 'details' | 'confirmation'>('summary');
  
  const form = useForm<BookingFormValues>({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      date: new Date().toISOString().split('T')[0],
      time: "09:00",
      agreeToTerms: false,
    }
  });

  const calculateTotal = () => {
    return bookingItems.reduce((total, item) => total + item.price, 0);
  };
  
  const handleProceedToDetails = () => {
    if (bookingItems.length === 0) {
      toast({
        title: language === 'en' ? "No services selected" : "কোন সেবা নির্বাচিত হয়নি",
        description: language === 'en' ? "Please select at least one service" : "অনুগ্রহ করে কমপক্ষে একটি সেবা নির্বাচন করুন",
        variant: "destructive",
      });
      return;
    }
    setStep('details');
  };

  const handleConfirmBooking = () => {
    if (!form.getValues().agreeToTerms) {
      toast({
        title: language === 'en' ? "Terms and Conditions" : "শর্তাবলী",
        description: language === 'en' ? "Please agree to terms and conditions" : "অনুগ্রহ করে শর্তাবলীতে সম্মত হন",
        variant: "destructive",
      });
      return;
    }
    
    setStep('confirmation');
    toast({
      title: language === 'en' ? "Booking Confirmed" : "বুকিং নিশ্চিত হয়েছে",
      description: language === 'en' ? "We'll contact you shortly" : "আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব",
    });

    // In a real app, you would send the booking data to your backend here
    // Reset after successful booking
    setTimeout(() => {
      onClose();
      setStep('summary');
    }, 3000);
  };

  const handleUseLocation = () => {
    // In a real app, this would use the Geolocation API
    toast({
      title: language === 'en' ? "Using Current Location" : "বর্তমান অবস্থান ব্যবহার করা হচ্ছে",
      description: language === 'en' ? "Address field will be updated" : "ঠিকানা হালনাগাদ করা হবে",
    });
    form.setValue('address', language === 'en' ? 'Current location (detected)' : 'বর্তমান অবস্থান (সনাক্ত করা হয়েছে)');
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh]">
        <div className={fontClass}>
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-2">
              <CalendarClock className="h-5 w-5" />
              {step === 'confirmation' 
                ? language === 'en' ? "Booking Confirmed!" : "বুকিং নিশ্চিত হয়েছে!"
                : language === 'en' ? "Your Booking" : "আপনার বুকিং"}
            </DrawerTitle>
          </DrawerHeader>
          
          <div className="p-4 overflow-y-auto max-h-[65vh]">
            {bookingItems.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {language === 'en' ? "No services selected" : "কোন সেবা নির্বাচিত হয়নি"}
              </div>
            ) : step === 'summary' ? (
              <div className="space-y-3">
                <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-2">
                  {language === 'en' ? "Selected Services" : "নির্বাচিত সেবাসমূহ"}
                </h3>
                
                {bookingItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">
                        {language === 'en' ? item.name_en : item.name_bn}
                      </p>
                      <p className="text-sm text-gray-500">৳{item.price}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveItem(item.id)}
                      className="h-8 w-8 p-0 rounded-full"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <div className="mt-6 p-3 border border-dashed border-primary rounded-lg bg-primary/5">
                  <h3 className="font-medium text-center mb-2">
                    {language === 'en' ? "Terms & Conditions" : "শর্তাবলী"}
                  </h3>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>{language === 'en' ? "• Service will be provided within 24 hours of booking" : "• বুকিং এর ২৪ ঘন্টার মধ্যে সেবা প্রদান করা হবে"}</li>
                    <li>{language === 'en' ? "• Payment to be made after service completion" : "• সেবা সম্পন্ন হওয়ার পর অর্থপ্রদান করতে হবে"}</li>
                    <li>{language === 'en' ? "• Cancellation must be at least 2 hours before appointment" : "• অ্যাপয়েন্টমেন্টের কমপক্ষে ২ ঘন্টা আগে বাতিল করতে হবে"}</li>
                  </ul>
                </div>
              </div>
            ) : step === 'details' ? (
              <Form {...form}>
                <form className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{language === 'en' ? "Full Name" : "পূর্ণ নাম"}</FormLabel>
                        <FormControl>
                          <Input placeholder={language === 'en' ? "Enter your name" : "আপনার নাম লিখুন"} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{language === 'en' ? "Phone Number" : "ফোন নম্বর"}</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <Input placeholder={language === 'en' ? "Your phone number" : "আপনার ফোন নম্বর"} {...field} />
                            <Button type="button" variant="outline" size="icon" className="ml-2">
                              <PhoneCall className="h-4 w-4" />
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{language === 'en' ? "Address" : "ঠিকানা"}</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <Input placeholder={language === 'en' ? "Service delivery address" : "সেবা প্রদানের ঠিকানা"} {...field} />
                            <Button type="button" variant="outline" size="icon" className="ml-2" onClick={handleUseLocation}>
                              <MapPin className="h-4 w-4" />
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{language === 'en' ? "Date" : "তারিখ"}</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{language === 'en' ? "Time" : "সময়"}</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                        <FormControl>
                          <Checkbox 
                            checked={field.value} 
                            onCheckedChange={field.onChange} 
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            {language === 'en' 
                              ? "I agree to the terms and conditions" 
                              : "আমি শর্তাবলীতে সম্মত"
                            }
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  {language === 'en' ? "Booking Confirmed!" : "বুকিং নিশ্চিত হয়েছে!"}
                </h3>
                <p className="text-gray-500 mb-4">
                  {language === 'en' 
                    ? "We'll send you a confirmation message shortly." 
                    : "আমরা শীঘ্রই আপনাকে একটি নিশ্চিতকরণ বার্তা পাঠাব।"}
                </p>
                <div className="p-4 bg-gray-50 rounded-lg text-left">
                  <p className="text-sm mb-1"><span className="font-medium">{language === 'en' ? "Booking ID: " : "বুকিং আইডি: "}</span>BK{Math.floor(100000 + Math.random() * 900000)}</p>
                  <p className="text-sm mb-1"><span className="font-medium">{language === 'en' ? "Date: " : "তারিখ: "}</span>{form.getValues().date}</p>
                  <p className="text-sm"><span className="font-medium">{language === 'en' ? "Time: " : "সময়: "}</span>{form.getValues().time}</p>
                </div>
              </div>
            )}
          </div>
          
          <DrawerFooter>
            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-semibold mb-4">
                <span>{language === 'en' ? "Total" : "মোট"}</span>
                <span>৳{calculateTotal()}</span>
              </div>
              
              {step === 'summary' ? (
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-accent" 
                  disabled={bookingItems.length === 0}
                  onClick={handleProceedToDetails}
                >
                  {language === 'en' ? "Continue to Details" : "বিস্তারিত তথ্যে যান"}
                </Button>
              ) : step === 'details' ? (
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-accent" 
                  onClick={handleConfirmBooking}
                >
                  {language === 'en' ? "Confirm Booking" : "বুকিং নিশ্চিত করুন"}
                </Button>
              ) : (
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={onClose}
                >
                  {language === 'en' ? "Close" : "বন্ধ করুন"}
                </Button>
              )}
              
              {step !== 'confirmation' && (
                <Button 
                  variant="outline" 
                  className="w-full mt-2" 
                  onClick={step === 'details' ? () => setStep('summary') : onClose}
                >
                  {step === 'details' 
                    ? (language === 'en' ? "Back" : "পিছনে")
                    : (language === 'en' ? "Continue Shopping" : "শপিং চালিয়ে যান")
                  }
                </Button>
              )}
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default BookingDrawer;
