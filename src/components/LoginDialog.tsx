
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

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

type UserRole = "user" | "nurse" | "admin";

const LoginDialog: React.FC<LoginDialogProps> = ({ isOpen, onClose }) => {
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
        title: "Login Successful",
        description: `Welcome to NurseNear! You are logged in as a ${selectedRole}.`,
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login to NurseNear</DialogTitle>
          <DialogDescription>
            Enter your credentials to access your account
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleLogin} className="space-y-4 pt-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
              className="w-full"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
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
            <Label htmlFor="role">Login as</Label>
            <div className="flex gap-2">
              <Button 
                type="button"
                variant={selectedRole === "user" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setSelectedRole("user")}
              >
                User
              </Button>
              <Button 
                type="button"
                variant={selectedRole === "nurse" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setSelectedRole("nurse")}
              >
                Nurse
              </Button>
              <Button 
                type="button"
                variant={selectedRole === "admin" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setSelectedRole("admin")}
              >
                Admin
              </Button>
            </div>
          </div>
          <div className="flex justify-end">
            <Button 
              variant="link" 
              className="px-0 text-primary"
              type="button"
            >
              Forgot password?
            </Button>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </DialogFooter>
          <div className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Button 
              variant="link" 
              className="px-0 text-primary"
              type="button"
            >
              Register
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
