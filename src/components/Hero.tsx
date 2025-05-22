
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-rugike-primary text-white overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-rugike-primary to-rugike-dark opacity-90"></div>
      
      {/* Hero content */}
      <div className="container-custom relative z-10 py-20 md:py-32">
        <div className="max-w-3xl">
          <div className="inline-block mb-6">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="bg-rugike-accent text-rugike-primary text-xs font-semibold px-3 py-1 rounded-full">NEW</span>
              <p className="ml-3 text-sm text-white">
                Backed by El-ventures for trusted quality
              </p>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight md:leading-tight mb-6 animate-slide-up [animation-delay:0.3s] opacity-0">
            Next-Generation <br />
            <span className="text-rugike-accent">Car Marketplace</span>
          </h1>
          
          <p className="text-lg md:text-xl text-rugike-secondary mb-8 max-w-2xl animate-slide-up [animation-delay:0.5s] opacity-0">
            Connecting buyers and sellers with speed, trust, and transparency. 
            Find your perfect vehicle backed by thorough inspections and verified listings.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up [animation-delay:0.7s] opacity-0">
            <Button size="lg" className="bg-rugike-accent text-rugike-primary hover:bg-rugike-accent/90 text-lg" asChild>
              <Link to="/cars/1">
                Browse Cars
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white bg-[#1EAEDB] text-white hover:bg-[#33C3F0] hover:border-white text-lg">
              Learn More
            </Button>
          </div>
          
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-up [animation-delay:0.9s] opacity-0">
            <Link to="/admin/dashboard" className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all">
              <h3 className="text-lg font-bold mb-1 text-rugike-accent">Admin Portal</h3>
              <p className="text-sm text-rugike-secondary">Manage cars and sellers</p>
            </Link>
            
            <Link to="/seller/dashboard" className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all">
              <h3 className="text-lg font-bold mb-1 text-rugike-accent">Seller Portal</h3>
              <p className="text-sm text-rugike-secondary">List your car for sale</p>
            </Link>
            
            <Link to="/contact" className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all">
              <h3 className="text-lg font-bold mb-1 text-rugike-accent">Customer Support</h3>
              <p className="text-sm text-rugike-secondary">Contact us about cars</p>
            </Link>
          </div>
          
          <div className="mt-10 flex items-center text-sm animate-slide-up [animation-delay:1.1s] opacity-0">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-rugike-light flex items-center justify-center text-rugike-primary font-medium">J</div>
              <div className="w-8 h-8 rounded-full bg-rugike-light flex items-center justify-center text-rugike-primary font-medium">K</div>
              <div className="w-8 h-8 rounded-full bg-rugike-light flex items-center justify-center text-rugike-primary font-medium">M</div>
            </div>
            <span className="ml-4 text-rugike-secondary">
              Trusted by <span className="text-white font-medium">10,000+</span> happy customers
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
