
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { BookingProvider } from "@/contexts/BookingContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import ServiceDetails from "./pages/ServiceDetails";
import BookingHistory from "./pages/BookingHistory";
import Payment from "./pages/Payment";
import EmergencyCare from "./pages/EmergencyCare";
import ChatButton from "./components/ChatButton";
import { useLocation } from "react-router-dom";

const queryClient = new QueryClient();

// Component to conditionally render the ChatButton
const ChatButtonWrapper = () => {
  const location = useLocation();
  const hideChatOnPaths = ['/profile', '/booking-history', '/settings', '/emergency-care'];
  
  if (hideChatOnPaths.includes(location.pathname)) {
    return null;
  }
  
  return <ChatButton />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <ThemeProvider>
        <BookingProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/about" element={<About />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/service/:id" element={<ServiceDetails />} />
                <Route path="/booking-history" element={<BookingHistory />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/emergency-care" element={<EmergencyCare />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <ChatButtonWrapper />
            </BrowserRouter>
          </TooltipProvider>
        </BookingProvider>
      </ThemeProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
