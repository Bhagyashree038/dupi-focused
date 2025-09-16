import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import PreferenceSelector from "@/components/PreferenceSelector";
import TravelPlan from "@/components/TravelPlan";
import ChatBot from "@/components/ChatBot";
import type { PreferenceData } from "@/components/PreferenceSelector";

const Index = () => {
  const [currentView, setCurrentView] = useState<'hero' | 'preferences' | 'plan'>('hero');
  const [preferences, setPreferences] = useState<PreferenceData | null>(null);
  const [showChat, setShowChat] = useState(false);

  const handleGetStarted = () => {
    setCurrentView('preferences');
  };

  const handlePreferencesSubmit = (preferenceData: PreferenceData) => {
    setPreferences(preferenceData);
    setCurrentView('plan');
  };

  const handleShowChat = () => {
    setShowChat(true);
  };

  const handleCloseChat = () => {
    setShowChat(false);
  };

  return (
    <main className="min-h-screen">
      {currentView === 'hero' && (
        <HeroSection onGetStarted={handleGetStarted} />
      )}
      
      {currentView === 'preferences' && (
        <PreferenceSelector onSubmit={handlePreferencesSubmit} />
      )}
      
      {currentView === 'plan' && preferences && (
        <TravelPlan 
          preferences={preferences} 
          onShowChat={handleShowChat}
        />
      )}
      
      <ChatBot 
        isOpen={showChat}
        onClose={handleCloseChat}
      />
    </main>
  );
};

export default Index;
