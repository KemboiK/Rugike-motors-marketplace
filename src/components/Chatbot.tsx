
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle, Send, X, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from '@/lib/utils';

interface ChatbotProps {
  variant?: 'admin' | 'seller' | 'buyer';
}

const Chatbot = ({ variant = 'buyer' }: ChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{text: string, sender: 'user' | 'bot', timestamp: Date}[]>([
    {
      text: variant === 'admin' 
        ? 'Hello admin! I can help you monitor site activity and provide sentiment analysis.'
        : variant === 'seller'
        ? 'Hello seller! I can help you manage your listings and answer questions about the platform.'
        : 'Welcome to RUGIKE Motors! How can I help you find your dream car today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // When opened, focus on input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isOpen) {
        const inputElement = document.getElementById('chatInput');
        if (inputElement) {
          inputElement.focus();
        }
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [isOpen]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Show toast when opening chat
      toast("Chat opened! How can we help you today?", {
        position: "bottom-center"
      });
    }
  };

  const handleSend = () => {
    if (!message.trim()) return;
    
    // Add user message
    const newMessages = [...messages, {text: message, sender: 'user' as const, timestamp: new Date()}];
    setMessages(newMessages);
    setMessage('');
    
    // Simulate bot response based on role
    setTimeout(() => {
      let botResponse = '';
      
      if (variant === 'admin') {
        if (message.toLowerCase().includes('sales')) {
          botResponse = 'Sales are up 15% this month. The most popular models are luxury sedans.';
        } else if (message.toLowerCase().includes('sentiment') || message.toLowerCase().includes('analysis')) {
          botResponse = 'Customer sentiment is positive at 85%. Most feedback relates to the user interface and car quality.';
        } else {
          botResponse = 'As an admin assistant, I can help with sales data, user analytics, and sentiment analysis. What would you like to know?';
        }
      } else if (variant === 'seller') {
        if (message.toLowerCase().includes('listing')) {
          botResponse = 'To add a new car listing, go to the "Add Car" section and fill out the vehicle details. Photos with good lighting tend to get more views.';
        } else {
          botResponse = 'I can help you manage your car listings and connect with potential buyers. What do you need assistance with?';
        }
      } else {
        if (message.toLowerCase().includes('price') || message.toLowerCase().includes('cost')) {
          botResponse = 'Our cars range from budget-friendly options starting at $15,000 to luxury vehicles. You can use filters on our browse page to set your price range.';
        } else if (message.toLowerCase().includes('test drive')) {
          botResponse = 'You can schedule a test drive by clicking the "Schedule Test Drive" button on any car details page. We\'ll confirm your appointment within 24 hours.';
        } else {
          botResponse = 'Thank you for your message. Our team is dedicated to finding the perfect vehicle for you. Can I help you browse our inventory or answer specific questions about a model?';
        }
      }
      
      setMessages([...newMessages, {text: botResponse, sender: 'bot' as const, timestamp: new Date()}]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const getVariantColors = () => {
    switch(variant) {
      case 'admin':
        return 'bg-rugike-accent text-rugike-primary';
      case 'seller':
        return 'bg-rugike-primary text-white';
      default:
        return 'bg-rugike-accent text-rugike-primary';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {/* Chatbot Button */}
      <div className="flex flex-col items-end space-y-2">
        {!isOpen && (
          <div className="mr-2 bg-white px-3 py-1 rounded-full shadow-lg animate-bounce opacity-90">
            <span className="text-sm font-medium">Need help?</span>
          </div>
        )}
        <Button 
          onClick={toggleChatbot}
          className={`rounded-full w-14 h-14 shadow-lg hover:scale-105 transition-all ${getVariantColors()}`}
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </Button>
      </div>

      {/* Chatbot Panel */}
      {isOpen && (
        <Card className={cn(
          "absolute bottom-16 right-0 w-80 md:w-96 shadow-xl transition-all duration-300",
          "animate-slide-up opacity-0 [animation-delay:0.1s] animate-fade-in"
        )}>
          <CardHeader className={`flex flex-row items-center justify-between ${getVariantColors()}`}>
            <CardTitle className="text-lg flex items-center">
              <MessageCircle className="mr-2 h-5 w-5" />
              {variant === 'admin' ? 'Admin Assistant' : variant === 'seller' ? 'Seller Support' : 'RUGIKE Assistant'}
            </CardTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full hover:bg-white/20"
              onClick={toggleChatbot}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div 
              ref={messageContainerRef} 
              className="h-64 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300"
            >
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.sender === 'user' 
                        ? 'bg-rugike-primary text-white' 
                        : 'bg-gray-100 text-rugike-primary'
                    } ${msg.sender === 'user' ? 'animate-slide-left' : 'animate-slide-right'}`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter className="p-3 border-t">
            <div className="flex w-full gap-2">
              <Input
                id="chatInput"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 focus:ring-rugike-accent"
              />
              <Button 
                size="icon" 
                onClick={handleSend} 
                className={`${getVariantColors()} hover:brightness-90 transition-colors`}
                disabled={!message.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default Chatbot;
