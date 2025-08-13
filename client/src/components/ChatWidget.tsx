import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, X, Minimize2, User, Bot, ExternalLink } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message
      setTimeout(() => {
        addMessage({
          id: 'welcome',
          text: "Hi! 👋 I'm here to help you with any questions about Ruvab IT's services. Ask me about AI solutions, software development, or our tools!",
          sender: 'support',
          timestamp: new Date()
        });
      }, 500);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    scrollToBottom();
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
    
    if (!isOpen && message.sender === 'support') {
      setUnreadCount(prev => prev + 1);
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    addMessage(userMessage);
    setNewMessage('');
    
    // Simulate support response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      const response = generateResponse(userMessage.text);
      addMessage({
        id: Math.random().toString(36).substr(2, 9),
        text: response,
        sender: 'support',
        timestamp: new Date()
      });
    }, 1000 + Math.random() * 2000);
  };

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! 😊 Great to meet you! I'm here to help you learn about Ruvab IT's technology solutions. What would you like to know about our AI services, software development, or digital tools?";
    }
    
    if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence')) {
      return "Awesome! 🚀 Our AI solutions are really powerful. We offer:\n\n• Custom AI model development\n• Predictive analytics\n• Natural language processing\n• Computer vision solutions\n• Intelligent automation\n\nWe've helped businesses increase efficiency by up to 40%. What specific AI challenge are you looking to solve?";
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
      return "Great question! 💰 Our pricing is very competitive:\n\n• AI Implementation: Starting from ₹50,000\n• Custom Software: Starting from ₹75,000  \n• Data Analytics: Starting from ₹40,000\n• QR Code Generator: Completely FREE! 🎉\n\nWe offer free consultations to give you accurate quotes. Would you like to schedule one?";
    }
    
    if (lowerMessage.includes('software') || lowerMessage.includes('development') || lowerMessage.includes('app')) {
      return "Perfect! 💻 We're software development experts! We build:\n\n• Web applications (React, Node.js, Python)\n• Mobile apps (iOS & Android)\n• Enterprise solutions\n• E-commerce platforms\n• API integrations\n\nAll with modern tech stacks and best practices. What kind of software project do you have in mind?";
    }
    
    if (lowerMessage.includes('qr') || lowerMessage.includes('qr code')) {
      return "Our QR Generator is amazing and FREE! 📱 Check it out at https://qr-gen.ruvab.it.com\n\nFeatures:\n• Unlimited QR code generation\n• Multiple data types (URL, text, contact, WiFi)\n• Custom designs and colors\n• High-resolution downloads\n• Bulk generation\n\nTry it now - no signup required! Need help with anything else?";
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('meeting') || lowerMessage.includes('consultation')) {
      return "I'd love to connect you with our team! 📞 Here's how:\n\n• Free 30-minute consultation (no obligations)\n• Technical demo sessions\n• Video calls or in-person meetings\n• Same-day response guaranteed\n\nYou can reach us through our contact form or I can have someone call you. What's your preference?";
    }
    
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're so welcome! 😊 I'm really happy I could help! Feel free to ask me anything else about our services, or check out our live chat for more detailed assistance. We're always here to help with your technology needs!";
    }
    
    // Default response
    return "That's a great question! 🤔 I'd love to help you with that. For detailed assistance, you can:\n\n• Use our live chat for immediate help\n• Contact our technical team directly\n• Schedule a free consultation\n• Browse our documentation\n\nWhat specific area would you like to explore? I'm here to guide you! 🚀";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const openFullChat = () => {
    window.open('/live-chat', '_blank');
  };

  // Chat button when closed
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full h-14 w-14 bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </div>
    );
  }

  // Chat widget when open
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-80 transition-all duration-300 ${
        isMinimized ? 'h-14' : 'h-96'
      } shadow-xl border-0 bg-white`}>
        {/* Header */}
        <CardHeader className="pb-2 bg-blue-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <div>
                <CardTitle className="text-sm">Ruvab IT Support</CardTitle>
                <CardDescription className="text-xs text-blue-100">
                  We're here to help!
                </CardDescription>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <Button
                onClick={() => setIsMinimized(!isMinimized)}
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-white hover:bg-blue-700"
              >
                <Minimize2 className="h-3 w-3" />
              </Button>
              
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-white hover:bg-blue-700"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            {/* Messages */}
            <CardContent className="h-64 overflow-y-auto p-3 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-2 rounded-lg text-sm ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="flex items-start space-x-1">
                      {message.sender === 'support' && (
                        <Bot className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      )}
                      <div>
                        <p className="whitespace-pre-wrap">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 p-2 rounded-lg text-sm">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-3 w-3" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </CardContent>

            {/* Input */}
            <div className="p-3 border-t">
              <div className="flex items-center space-x-2 mb-2">
                <Button
                  onClick={openFullChat}
                  variant="outline"
                  size="sm"
                  className="text-xs flex-1"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Open Full Chat
                </Button>
              </div>
              
              <div className="flex space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="text-sm"
                  disabled={isTyping}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!newMessage.trim() || isTyping}
                  size="sm"
                  className="px-3"
                >
                  <Send className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default ChatWidget;