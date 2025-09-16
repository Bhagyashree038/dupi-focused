import { Button } from "@/components/ui/button";
import { MapPin, Sparkles, MessageCircle } from "lucide-react";
import heroImage from "@/assets/udupi-hero.jpg";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 floating-animation">
        <div className="w-16 h-16 bg-primary/20 rounded-full blur-xl" />
      </div>
      <div className="absolute bottom-32 right-16 floating-animation" style={{ animationDelay: '2s' }}>
        <div className="w-12 h-12 bg-secondary/30 rounded-full blur-lg" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="mb-6">
          <MapPin className="w-16 h-16 text-accent mx-auto mb-4 floating-animation" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Discover
          <span className="block bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
            Udupi
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Your AI-powered travel companion for exploring the cultural gems, 
          pristine beaches, and divine flavors of Udupi
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="btn-travel-primary text-white px-8 py-4 text-lg font-semibold rounded-full"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Plan My Trip
          </Button>
          
          <Button 
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full backdrop-blur-sm"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Ask AI Guide
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">50+</div>
            <div className="text-white/80 text-sm">Attractions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">100+</div>
            <div className="text-white/80 text-sm">Restaurants</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-glow">24/7</div>
            <div className="text-white/80 text-sm">AI Support</div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;