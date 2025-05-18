
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { UserIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

type UserRole = "user" | "nurse" | "admin";

const LoginDialog: React.FC<LoginDialogProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("user");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, this would connect to an authentication service
      console.log("Logging in with:", email, password, "as", selectedRole);
      
      // Simulate login delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success notification
      toast({
        title: language === 'en' ? "Login Successful" : "লগইন সফল",
        description: language === 'en' 
          ? `Welcome to NurseNear! You are logged in as a ${selectedRole}.`
          : `নার্সনিয়ারে স্বাগতম! আপনি ${selectedRole === 'user' ? 'ব্যবহারকারী' : selectedRole === 'nurse' ? 'নার্স' : 'অ্যাডমিন'} হিসেবে লগইন করেছেন।`,
      });
      
      onClose();
    } catch (error) {
      toast({
        title: language === 'en' ? "Login Failed" : "লগইন ব্যর্থ",
        description: language === 'en' 
          ? "Please check your credentials and try again."
          : "আপনার তথ্য যাচাই করে আবার চেষ্টা করুন।",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fontClass = language === 'bn' ? 'font-bangla' : '';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-[425px] ${fontClass}`}>
        <DialogHeader>
          <DialogTitle className="text-lg">{t('loginTitle')}</DialogTitle>
          <DialogDescription>
            {t('loginSubtitle')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleLogin} className="space-y-4 pt-4">
          <div className="grid gap-2">
            <Label htmlFor="email">{t('email')}</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={language === 'en' ? "your.email@example.com" : "আপনার.ইমেইল@উদাহরণ.com"}
              required
              className="w-full"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">{t('password')}</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">{t('loginAs')}</Label>
            <div className="flex gap-2">
              <Button 
                type="button"
                variant={selectedRole === "user" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setSelectedRole("user")}
              >
                {t('user')}
              </Button>
              <Button 
                type="button"
                variant={selectedRole === "nurse" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setSelectedRole("nurse")}
              >
                {t('nurse')}
              </Button>
              <Button 
                type="button"
                variant={selectedRole === "admin" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setSelectedRole("admin")}
              >
                {t('admin')}
              </Button>
            </div>
          </div>
          <div className="flex justify-end">
            <Button 
              variant="link" 
              className="px-0 text-primary"
              type="button"
            >
              {t('forgotPassword')}
            </Button>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              className="w-full bg-accent hover:bg-accent/90" 
              disabled={isLoading}
            >
              {isLoading ? t('loggingIn') : t('loginButton')}
            </Button>
          </DialogFooter>
          <div className="text-center text-sm text-gray-500">
            {t('noAccount')}{" "}
            <Button 
              variant="link" 
              className="px-0 text-primary"
              type="button"
            >
              {t('registerButton')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
