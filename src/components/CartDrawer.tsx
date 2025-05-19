
import React from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ServiceDetail } from "../data/servicesData";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { ShoppingCart, X } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: ServiceDetail[];
  onRemoveItem: (id: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
}) => {
  const { language } = useLanguage();
  const fontClass = language === 'bn' ? 'font-bangla' : '';
  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };
  
  const handleCheckout = () => {
    toast({
      title: language === 'en' ? "Processing Payment" : "পেমেন্ট প্রক্রিয়াকরণ",
      description: language === 'en' ? "Redirecting to payment gateway..." : "পেমেন্ট গেটওয়েতে রিডাইরেক্ট করা হচ্ছে...",
    });
    // In a real app, you would redirect to payment gateway or show payment form
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[85vh]">
        <div className={fontClass}>
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              {language === 'en' ? "Your Cart" : "আপনার কার্ট"}
            </DrawerTitle>
          </DrawerHeader>
          
          <div className="p-4 overflow-y-auto max-h-[60vh]">
            {cartItems.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {language === 'en' ? "Your cart is empty" : "আপনার কার্ট খালি"}
              </div>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item) => (
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
              </div>
            )}
          </div>
          
          <DrawerFooter>
            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-semibold mb-4">
                <span>{language === 'en' ? "Total" : "মোট"}</span>
                <span>৳{calculateTotal()}</span>
              </div>
              
              <Button 
                className="w-full" 
                disabled={cartItems.length === 0}
                onClick={handleCheckout}
              >
                {language === 'en' ? "Proceed to Payment" : "পেমেন্ট করুন"}
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full mt-2" 
                onClick={onClose}
              >
                {language === 'en' ? "Continue Shopping" : "শপিং চালিয়ে যান"}
              </Button>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
