
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, User, Settings, Car, Users, ShoppingCart, BarChart } from 'lucide-react';

const AdminNavigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="bg-rugike-primary text-white sticky top-0 z-40 shadow-sm">
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/admin/dashboard" className="flex items-center">
              <span className="text-2xl font-bold text-white">
                <span className="text-rugike-accent">RUGIKE</span> Admin
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/admin/dashboard" 
              className={`text-white font-medium hover:text-rugike-accent transition-colors ${isActive('/admin/dashboard') ? 'text-rugike-accent' : ''}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/admin/cars" 
              className={`text-white font-medium hover:text-rugike-accent transition-colors ${isActive('/admin/cars') ? 'text-rugike-accent' : ''}`}
            >
              Cars
            </Link>
            <Link 
              to="/admin/sellers" 
              className={`text-white font-medium hover:text-rugike-accent transition-colors ${isActive('/admin/sellers') ? 'text-rugike-accent' : ''}`}
            >
              Sellers
            </Link>
            <Link 
              to="/admin/customers" 
              className={`text-white font-medium hover:text-rugike-accent transition-colors ${isActive('/admin/customers') ? 'text-rugike-accent' : ''}`}
            >
              Customers
            </Link>
            <Link 
              to="/admin/sentiment" 
              className={`text-white font-medium hover:text-rugike-accent transition-colors ${isActive('/admin/sentiment') ? 'text-rugike-accent' : ''}`}
            >
              Sentiment
            </Link>
            <Link 
              to="/admin/settings" 
              className={`text-white font-medium hover:text-rugike-accent transition-colors ${isActive('/admin/settings') ? 'text-rugike-accent' : ''}`}
            >
              Settings
            </Link>
          </div>
          
          {/* Admin Button */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" className="text-white border-white hover:bg-rugike-dark">
              <Link to="/auth/login" className="flex items-center gap-2">
                <User className="h-4 w-4" /> Switch Role
              </Link>
            </Button>
            <Button className="bg-rugike-accent text-rugike-primary hover:bg-rugike-accent/90">
              <User className="mr-2 h-4 w-4" /> Admin
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2"
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
          <div className="md:hidden py-4 border-t border-rugike-dark">
            <div className="flex flex-col space-y-4">
              <Link to="/admin/dashboard" className="text-white font-medium">Dashboard</Link>
              <Link to="/admin/cars" className="text-white font-medium">Cars</Link>
              <Link to="/admin/sellers" className="text-white font-medium">Sellers</Link>
              <Link to="/admin/customers" className="text-white font-medium">Customers</Link>
              <Link to="/admin/sentiment" className="text-white font-medium">Sentiment</Link>
              <Link to="/admin/settings" className="text-white font-medium">Settings</Link>
              <Link to="/auth/login">
                <Button variant="outline" className="text-white border-white hover:bg-rugike-dark w-full">
                  Switch Role
                </Button>
              </Link>
              <Button className="bg-rugike-accent text-rugike-primary hover:bg-rugike-accent/90 w-full">
                <User className="mr-2 h-4 w-4" /> Admin
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default AdminNavigation;
