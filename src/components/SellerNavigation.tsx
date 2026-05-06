
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, User, Car, Package, Settings, BarChart } from 'lucide-react';

const SellerNavigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="bg-white sticky top-0 z-40 shadow-sm">
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/seller/dashboard" className="flex items-center">
              <span className="text-2xl font-bold text-Ndai-primary">
                <span className="text-Ndai-accent">Ndai</span> Seller
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/seller/dashboard" 
              className={`text-Ndai-primary font-medium hover:text-Ndai-accent transition-colors ${isActive('/seller/dashboard') ? 'text-Ndai-accent' : ''}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/seller/add-car" 
              className={`text-Ndai-primary font-medium hover:text-Ndai-accent transition-colors ${isActive('/seller/add-car') ? 'text-Ndai-accent' : ''}`}
            >
              Add Car
            </Link>
            <Link 
              to="/seller/my-cars" 
              className={`text-Ndai-primary font-medium hover:text-Ndai-accent transition-colors ${isActive('/seller/my-cars') ? 'text-Ndai-accent' : ''}`}
            >
              My Cars
            </Link>
            <Link 
              to="/seller/profile" 
              className={`text-Ndai-primary font-medium hover:text-Ndai-accent transition-colors ${isActive('/seller/profile') ? 'text-Ndai-accent' : ''}`}
            >
              Profile
            </Link>
          </div>
          
          {/* Seller Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" className="border-Ndai-primary text-Ndai-primary hover:bg-Ndai-light">
              <Link to="/auth/login" className="flex items-center gap-2">
                <User className="h-4 w-4" /> Switch Role
              </Link>
            </Button>
            <Button className="bg-Ndai-primary text-white hover:bg-Ndai-dark">
              <User className="mr-2 h-4 w-4" /> Seller Account
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-Ndai-primary p-2"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link to="/seller/dashboard" className="text-Ndai-primary font-medium">Dashboard</Link>
              <Link to="/seller/add-car" className="text-Ndai-primary font-medium">Add Car</Link>
              <Link to="/seller/my-cars" className="text-Ndai-primary font-medium">My Cars</Link>
              <Link to="/seller/profile" className="text-Ndai-primary font-medium">Profile</Link>
              <Link to="/auth/login">
                <Button variant="outline" className="border-Ndai-primary text-Ndai-primary hover:bg-Ndai-light w-full">
                  Switch Role
                </Button>
              </Link>
              <Button className="bg-Ndai-primary text-white hover:bg-Ndai-dark w-full">
                <User className="mr-2 h-4 w-4" /> Seller Account
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default SellerNavigation;
