
import { useState, useEffect } from "react";
import LaunchAnimation from "@/components/LaunchAnimation";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeaturedCars from "@/components/FeaturedCars";
import ValueProposition from "@/components/ValueProposition";
import InvestorBacked from "@/components/InvestorBacked";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const Index = () => {
  const [showAnimation, setShowAnimation] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);
  
  useEffect(() => {
    // Check if user has seen animation before (using localStorage)
    const hasSeenAnimation = localStorage.getItem('rugike_animation_seen');
    
    if (hasSeenAnimation) {
      setShowAnimation(false);
      setContentLoaded(true);
    } else {
      // If not seen before, show animation and set flag
      setShowAnimation(true);
    }
  }, []);
  
  const handleAnimationComplete = () => {
    // Save to localStorage that user has seen the animation
    localStorage.setItem('rugike_animation_seen', 'true');
    setShowAnimation(false);
    setContentLoaded(true);
  };
  
  const skipAnimation = () => {
    localStorage.setItem('rugike_animation_seen', 'true');
    setShowAnimation(false);
    setContentLoaded(true);
  };
  
  return (
    <>
      {/* Animation */}
      {showAnimation && (
        <div className="relative">
          <LaunchAnimation onAnimationComplete={handleAnimationComplete} />
          <Button 
            variant="outline" 
            className="absolute bottom-8 right-8 bg-white/80 backdrop-blur-sm hover:bg-white text-rugike-primary border-rugike-primary"
            onClick={skipAnimation}
          >
            Skip Animation <X className="ml-1 h-4 w-4" />
          </Button>
        </div>
      )}
      
      {/* Main content */}
      <div className={`transition-opacity duration-500 ${contentLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Navigation />
        <main>
          <Hero />
          <FeaturedCars />
          <ValueProposition />
          <InvestorBacked />
        </main>
        <Footer />
        <Chatbot variant="buyer" />
      </div>
    </>
  );
};

export default Index;
