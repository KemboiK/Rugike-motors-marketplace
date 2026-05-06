import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-Ndai-primary text-white">
      <div className="container-custom py-12">

        {/* Newsletter */}
        <div className="bg-Ndai-dark rounded-lg p-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-semibold mb-2">Stay updated</h3>
              <p className="text-Ndai-secondary">
                Get notified about new vehicles and exclusive offers
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md bg-Ndai-primary border border-Ndai-secondary text-white placeholder:text-Ndai-secondary focus:outline-none focus:ring-2 focus:ring-Ndai-accent"
              />
              <Button className="bg-Ndai-accent text-Ndai-primary hover:bg-Ndai-accent/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Footer columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo & info */}
          <div>
            <div className="mb-4">
              <Link to="/" className="text-2xl font-bold">
                <span className="text-Ndai-accent">Ndai</span> Motors
              </Link>
            </div>
            <p className="text-Ndai-secondary mb-6">
              A next-generation car marketplace designed to connect buyers and sellers with speed, trust, and transparency.
            </p>
            <p className="text-Ndai-secondary text-sm">
              Proudly sponsored by <span className="text-white">K-El-ventures</span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/cars" className="text-Ndai-secondary hover:text-white transition-colors">
                  Browse Cars
                </Link>
              </li>
              <li>
                <Link to="/auth/login" className="text-Ndai-secondary hover:text-white transition-colors">
                  Sell Your Car
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-Ndai-secondary hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-Ndai-secondary hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {["Car Inspection", "Vehicle History", "Financing Options", "Insurance", "Trade-in"].map((service, index) => (
                <li key={index}>
                  <Link to="/services" className="text-Ndai-secondary hover:text-white transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="text-Ndai-secondary">
              <p className="mb-2">Ndai Motors Avenue</p>
              <p className="mb-2">Nairobi, Kenya</p>
              <p className="mb-4">Kenya</p>
              <a
                href="mailto:info@Ndaimotors.com"
                className="mb-2 block hover:text-white transition-colors"
              >
                info@Ndaimotors.com
              </a>
              <a
                href="tel:+254100508309"
                className="hover:text-white transition-colors"
              >
                +(254) 100 508 309
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-Ndai-dark mt-12 pt-6 flex flex-col md:flex-row md:justify-between md:items-center">
          <p className="text-Ndai-secondary text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Ndai Motors. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/contact" className="text-Ndai-secondary hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="text-Ndai-secondary hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-Ndai-secondary hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
