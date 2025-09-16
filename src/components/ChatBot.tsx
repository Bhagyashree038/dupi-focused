import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Send, Bot, User } from "lucide-react";

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const sampleResponses = {
  "temple": "The Sri Krishna Temple is open from 5:30 AM to 1:00 PM and 3:00 PM to 9:00 PM. The best time to visit is early morning or evening. Don't miss the unique architecture and the famous 'Kanakana Kindi' window!",
  "beach": "Malpe Beach is about 6 km from Udupi city center. You can take a bus (₹15) or auto-rickshaw (₹80-100). Best time for sunset is around 6-7 PM. Water sports are available at ₹200-500 per activity.",
  "food": "Must-try dishes in Udupi: 1) Masala Dosa at Diana Restaurant, 2) Goli Baje at local eateries, 3) Traditional meals at Mitra Samaj. Average cost per meal: ₹150-400.",
  "hotel": "Based on your budget, I recommend Hotel Janardana (₹1,500-2,500/night) near Krishna Temple. It's clean, has good reviews, and walking distance to major attractions.",
  "transport": "Local transport options: 1) City buses (₹10-30), 2) Auto-rickshaws (₹20-50 for short trips), 3) Rental scooters (₹300-500/day). Book through local operators or hotel reception.",
  "weather": "Udupi has a tropical climate. Best months: October-March. Carry light cotton clothes, sunscreen, and an umbrella. Current season recommendations will vary.",
  "shopping": "Visit Car Street for traditional items, handicrafts, and souvenirs. Bargaining is common. Must-buy: Udupi sarees, wooden toys, and local spices. Budget: ₹500-2000 for souvenirs."
};

const getBotResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase();
  
  if (message.includes('temple') || message.includes('krishna')) {
    return sampleResponses.temple;
  } else if (message.includes('beach') || message.includes('malpe')) {
    return sampleResponses.beach;
  } else if (message.includes('food') || message.includes('eat') || message.includes('restaurant')) {
    return sampleResponses.food;
  } else if (message.includes('hotel') || message.includes('stay') || message.includes('accommodation')) {
    return sampleResponses.hotel;
  } else if (message.includes('transport') || message.includes('travel') || message.includes('bus') || message.includes('auto')) {
    return sampleResponses.transport;
  } else if (message.includes('weather') || message.includes('climate')) {
    return sampleResponses.weather;
  } else if (message.includes('shop') || message.includes('market') || message.includes('buy')) {
    return sampleResponses.shopping;
  } else {
    return "I'm here to help with your Udupi trip! You can ask me about temples, beaches, food, hotels, transportation, weather, or shopping. What would you like to know?";
  }
};

const ChatBot = ({ isOpen, onClose }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your Udupi travel assistant. I can help you with information about temples, beaches, food, hotels, transportation, and more. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);

    // Generate and add bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
          <div className="flex items-center">
            <Bot className="w-6 h-6 mr-2" />
            <h3 className="font-semibold">Udupi Travel Assistant</h3>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="text-primary-foreground hover:bg-primary-light"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' ? 'bg-primary text-primary-foreground ml-2' : 'bg-muted mr-2'
                }`}>
                  {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`chat-bubble p-3 ${message.sender === 'user' ? 'user' : ''}`}>
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about Udupi..."
              className="flex-1"
            />
            <Button 
              onClick={sendMessage}
              size="sm"
              className="btn-travel-primary"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatBot;