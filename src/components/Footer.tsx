
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-rugike-primary text-white">
      <div className="container-custom py-12">
        {/* Newsletter */}
        <div className="bg-rugike-dark rounded-lg p-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-semibold mb-2">Stay updated</h3>
              <p className="text-rugike-secondary">
                Get notified about new vehicles and exclusive offers
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-2 rounded-md bg-rugike-primary border border-rugike-secondary text-white placeholder:text-rugike-secondary focus:outline-none focus:ring-2 focus:ring-rugike-accent"
              />
              <Button className="bg-rugike-accent text-rugike-primary hover:bg-rugike-accent/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        {/* Footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & info */}
          <div>
            <div className="mb-4">
              <a href="/" className="text-2xl font-bold">
                <span className="text-rugike-accent">RUGIKE</span> Motors
              </a>
            </div>
            <p className="text-rugike-secondary mb-6">
              A next-generation car marketplace designed to connect buyers and sellers with speed, trust, and transparency.
            </p>
            <p className="text-rugike-secondary text-sm">
              Proudly sponsored by <span className="text-white">El-ventures</span>
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Browse Cars", "Sell Your Car", "Financing", "About Us", "Contact"].map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-rugike-secondary hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {["Car Inspection", "Vehicle History", "Financing Options", "Insurance", "Trade-in"].map((service, index) => (
                <li key={index}>
                  <a href="#" className="text-rugike-secondary hover:text-white transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <address className="not-italic text-rugike-secondary">
              <p className="mb-2">1234 Motors Avenue</p>
              <p className="mb-2">New York, NY 10001</p>
              <p className="mb-4">United States</p>
              <p className="mb-2">info@rugikemotors.com</p>
              <p>+1 (555) 123-4567</p>
            </address>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-rugike-dark mt-12 pt-6 flex flex-col md:flex-row md:justify-between md:items-center">
          <p className="text-rugike-secondary text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} RUGIKE Motors. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-rugike-secondary hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-rugike-secondary hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-rugike-secondary hover:text-white transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
