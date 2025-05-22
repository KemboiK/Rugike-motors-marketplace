
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

const InvestorBacked = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-rugike-accent/20 text-rugike-primary hover:bg-rugike-accent/30 py-1.5 px-3">
              El-ventures Backed
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold text-rugike-primary mb-6">
              Private Equity Excellence <br/>
              <span className="text-rugike-accent">Powers Our Platform</span>
            </h2>
            
            <p className="text-rugike-secondary text-lg mb-8">
              Powered by strategic investment from our private equity firm, El-ventures, 
              our platform is a next-generation car marketplace designed to connect buyers 
              and sellers with speed, trust, and transparency.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Thoroughly inspected vehicles",
                "Verified seller listings",
                "Streamlined financing options",
                "Investor-backed growth",
                "Innovation-driven platform",
                "Premium customer support"
              ].map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-rugike-accent mt-1 mr-2" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            {/* Main image */}
            <div className="rounded-lg overflow-hidden shadow-xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1642543492276-e8e7a482130b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="El-ventures Investment Meeting"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-rugike-accent/20 rounded-lg z-0"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-rugike-primary/10 rounded-lg z-0"></div>
            
            {/* Trust badge */}
            <div className="absolute -bottom-10 right-8 bg-white shadow-lg rounded-lg p-4 z-20">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-rugike-accent flex items-center justify-center">
                  <span className="text-rugike-primary font-bold text-sm">EV</span>
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-rugike-primary">El-ventures</p>
                  <p className="text-xs text-rugike-secondary">Strategic Investment Partner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestorBacked;
