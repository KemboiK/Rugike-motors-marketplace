
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Cars from "./pages/admin/Cars";
import Sellers from "./pages/admin/Sellers";
import Customers from "./pages/admin/Customers";
import Settings from "./pages/admin/Settings";
import SentimentAnalysis from "./pages/admin/SentimentAnalysis";
import SellerDashboard from "./pages/seller/SellerDashboard";
import AddCar from "./pages/seller/AddCar";
import MyCars from "./pages/seller/MyCars";
import Profile from "./pages/seller/Profile";
import CarDetails from "./pages/customer/CarDetails";
import ContactUs from "./pages/customer/ContactUs";
import Login from "./pages/auth/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/auth/login" element={<Login />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/cars" element={<Cars />} />
          <Route path="/admin/sellers" element={<Sellers />} />
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/sentiment" element={<SentimentAnalysis />} />
          
          {/* Seller Routes */}
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/add-car" element={<AddCar />} />
          <Route path="/seller/my-cars" element={<MyCars />} />
          <Route path="/seller/profile" element={<Profile />} />
          
          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
