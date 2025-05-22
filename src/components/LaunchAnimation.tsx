
import { useState, useEffect } from 'react';

interface LaunchAnimationProps {
  onAnimationComplete: () => void;
}

const LaunchAnimation = ({ onAnimationComplete }: LaunchAnimationProps) => {
  const [animationStage, setAnimationStage] = useState<'intro' | 'logo' | 'logo-reveal' | 'sponsor' | 'complete'>('intro');

  useEffect(() => {
    // Setup timers for cinematic animation stages - total 10 seconds (extended as requested)
    const introTimer = setTimeout(() => {
      setAnimationStage('logo');
    }, 1500); // Dark intro for 1.5 seconds
    
    const logoRevealTimer = setTimeout(() => {
      setAnimationStage('logo-reveal');
    }, 3000); // Start logo reveal at 3 seconds
    
    const sponsorTimer = setTimeout(() => {
      setAnimationStage('sponsor');
    }, 6000); // Show sponsor at 6 seconds

    const completeTimer = setTimeout(() => {
      setAnimationStage('complete');
      onAnimationComplete();
    }, 10000); // Complete after 10 seconds

    return () => {
      clearTimeout(introTimer);
      clearTimeout(logoRevealTimer);
      clearTimeout(sponsorTimer);
      clearTimeout(completeTimer);
    };
  }, [onAnimationComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-rugike-primary overflow-hidden">
      {/* Cinematic elements */}
      <div className={`absolute inset-0 ${animationStage !== 'intro' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
        <div className="absolute inset-0 bg-gradient-to-br from-rugike-dark via-rugike-primary to-black"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYxMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')] opacity-20"></div>
      </div>

      {/* Cinematic light beams */}
      <div className={`absolute w-full h-full overflow-hidden ${animationStage === 'logo-reveal' || animationStage === 'sponsor' ? 'opacity-40' : 'opacity-0'} transition-opacity duration-1500`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-40 bg-rugike-accent/30 rotate-45 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-40 bg-white/20 -rotate-45 blur-3xl"></div>
      </div>

      <div className="text-center relative z-10">
        {/* RUGIKE Motors Logo Animation - Now with cinematic reveal */}
        <div className={`transform ${animationStage === 'logo-reveal' || animationStage === 'sponsor' ? 'scale-100 opacity-100' : 'scale-90 opacity-0'} transition-all duration-1000 ease-out`}>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-2">
            <span className="text-rugike-accent">RUGIKE</span> Motors
          </h1>
          <div className={`h-1 w-0 bg-rugike-accent mx-auto my-3 transition-all duration-3000 ${animationStage === 'logo-reveal' || animationStage === 'sponsor' ? 'w-48 md:w-80' : 'w-0'}`}></div>
          <p className={`text-rugike-light text-xl opacity-0 transition-opacity duration-1000 ${animationStage === 'logo-reveal' || animationStage === 'sponsor' ? 'opacity-80 delay-500' : ''}`}>
            Premium Car Marketplace
          </p>
        </div>
        
        {/* Sponsor Message with cinematic fade-in */}
        <div className={`mt-12 transform transition-all duration-1000 ${animationStage === 'sponsor' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-rugike-secondary text-sm mb-2">
            PROUDLY SPONSORED BY
          </p>
          <p className="text-white text-xl font-semibold tracking-wider">
            EL-VENTURES
          </p>
        </div>
      </div>
    </div>
  );
};

export default LaunchAnimation;
