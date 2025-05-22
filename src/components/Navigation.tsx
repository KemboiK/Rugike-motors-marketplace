
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, User, Car, Settings, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-white shadow-sm'}`}>
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-rugike-primary">
                <span className="text-rugike-accent">RUGIKE</span> Motors
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-rugike-primary font-medium hover:text-rugike-accent transition-colors relative ${
                isActive('/') ? 'text-rugike-accent after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[3px] after:bg-rugike-accent after:rounded-t-md' : ''
              }`}
            >
              Home
            </Link>
            <div className="relative group">
              <button className="flex items-center text-rugike-primary font-medium hover:text-rugike-accent transition-colors">
                Cars <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute z-10 left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
                <Link to="#" className="block px-4 py-2 text-sm text-rugike-primary hover:bg-rugike-light hover:text-rugike-accent">Browse All</Link>
                <Link to="#" className="block px-4 py-2 text-sm text-rugike-primary hover:bg-rugike-light hover:text-rugike-accent">Premium Vehicles</Link>
                <Link to="#" className="block px-4 py-2 text-sm text-rugike-primary hover:bg-rugike-light hover:text-rugike-accent">Budget Friendly</Link>
                <div className="border-t border-gray-100 my-1"></div>
                <Link to="#" className="block px-4 py-2 text-sm text-rugike-primary hover:bg-rugike-light hover:text-rugike-accent flex items-center">
                  <Car className="mr-2 h-4 w-4" /> New Arrivals
                </Link>
              </div>
            </div>
            <Link 
              to="/cars/1" 
              className={`text-rugike-primary font-medium hover:text-rugike-accent transition-colors relative ${
                isActive('/cars/1') ? 'text-rugike-accent after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[3px] after:bg-rugike-accent after:rounded-t-md' : ''
              }`}
            >
              Car Details
            </Link>
            <Link 
              to="/contact" 
              className={`text-rugike-primary font-medium hover:text-rugike-accent transition-colors relative ${
                isActive('/contact') ? 'text-rugike-accent after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[3px] after:bg-rugike-accent after:rounded-t-md' : ''
              }`}
            >
              Contact
            </Link>
          </div>
          
          {/* Search and CTA Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {showSearch ? (
              <div className="relative animate-fade-in">
                <Input placeholder="Search for cars..." className="pl-9 pr-4 h-9 w-56 bg-gray-50" />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                  onClick={() => setShowSearch(false)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-rugike-primary hover:bg-gray-100"
                onClick={() => setShowSearch(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
            
            <Link to="/auth/login">
              <Button className="bg-rugike-accent text-rugike-primary hover:bg-rugike-accent/90 shadow-sm">
                <User className="mr-2 h-4 w-4" /> Login / Register
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-rugike-primary hover:bg-gray-100"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search className="h-5 w-5" />
            </Button>
            
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-rugike-primary p-2"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Search */}
        {showSearch && (
          <div className="md:hidden py-2 border-t border-gray-100 mt-2 animate-fade-in">
            <div className="relative">
              <Input placeholder="Search for cars..." className="pl-9 pr-4 h-9 w-full bg-gray-50" />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        )}
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-slide-up">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-rugike-primary font-medium px-2 py-1.5 rounded hover:bg-gray-50">Home</Link>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between px-2 py-1.5 text-rugike-primary font-medium">
                  <span>Cars</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
                <div className="pl-4 space-y-2 border-l-2 border-gray-100 ml-2">
                  <Link to="#" className="block px-2 py-1.5 text-rugike-primary hover:bg-gray-50 rounded">Browse All</Link>
                  <Link to="#" className="block px-2 py-1.5 text-rugike-primary hover:bg-gray-50 rounded">Premium Vehicles</Link>
                  <Link to="#" className="block px-2 py-1.5 text-rugike-primary hover:bg-gray-50 rounded">Budget Friendly</Link>
                </div>
              </div>
              
              <Link to="/cars/1" className="text-rugike-primary font-medium px-2 py-1.5 rounded hover:bg-gray-50">Car Details</Link>
              <Link to="/contact" className="text-rugike-primary font-medium px-2 py-1.5 rounded hover:bg-gray-50">Contact</Link>
              
              <div className="pt-2 border-t border-gray-100">
                <Link to="/auth/login" className="block">
                  <Button className="bg-rugike-accent text-rugike-primary hover:bg-rugike-accent/90 w-full">
                    <User className="mr-2 h-4 w-4" /> Login / Register
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
