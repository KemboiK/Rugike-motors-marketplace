import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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

        {/* Footer columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo & info */}
          <div>
            <div className="mb-4">
              <Link to="/" className="text-2xl font-bold">
                <span className="text-rugike-accent">RUGIKE</span> Motors
              </Link>
            </div>
            <p className="text-rugike-secondary mb-6">
              A next-generation car marketplace designed to connect buyers and sellers with speed, trust, and transparency.
            </p>
            <p className="text-rugike-secondary text-sm">
              Proudly sponsored by <span className="text-white">K-El-ventures</span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/cars" className="text-rugike-secondary hover:text-white transition-colors">
                  Browse Cars
                </Link>
              </li>
              <li>
                <Link to="/auth/login" className="text-rugike-secondary hover:text-white transition-colors">
                  Sell Your Car
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-rugike-secondary hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-rugike-secondary hover:text-white transition-colors">
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
                  <Link to="/contact" className="text-rugike-secondary hover:text-white transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="text-rugike-secondary">
              <p className="mb-2">RUGIKE Motors Avenue</p>
              <p className="mb-2">Nairobi, Kenya</p>
              <p className="mb-4">Kenya</p>
              <a
                href="mailto:info@rugikemotors.com"
                className="mb-2 block hover:text-white transition-colors"
              >
                info@rugikemotors.com
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
        <div className="border-t border-rugike-dark mt-12 pt-6 flex flex-col md:flex-row md:justify-between md:items-center">
          <p className="text-rugike-secondary text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} RUGIKE Motors. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/contact" className="text-rugike-secondary hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="text-rugike-secondary hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-rugike-secondary hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
