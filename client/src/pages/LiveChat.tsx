import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, MessageCircle, User, Bot, Clock, CheckCircle2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support' | 'bot';
  timestamp: Date;
  status?: 'sending' | 'sent' | 'read';
}

interface SupportAgent {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'away' | 'offline';
  responseTime: string;
}

export default function LiveChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<SupportAgent | null>(null);
  const [chatSession, setChatSession] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);

  // Mock support agents
  const supportAgents: SupportAgent[] = [
    {
      id: 'agent-1',
      name: 'Sarah Wilson',
      avatar: '/api/placeholder/40/40',
      status: 'online',
      responseTime: '< 2 min'
    },
    {
      id: 'agent-2',
      name: 'Michael Chen',
      avatar: '/api/placeholder/40/40',
      status: 'online',
      responseTime: '< 3 min'
    },
    {
      id: 'agent-3',
      name: 'Emma Rodriguez',
      avatar: '/api/placeholder/40/40',
      status: 'away',
      responseTime: '< 5 min'
    }
  ];

  useEffect(() => {
    // Initialize chat session
    const sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
    setChatSession(sessionId);
    
    // Assign a random online agent
    const onlineAgents = supportAgents.filter(agent => agent.status === 'online');
    if (onlineAgents.length > 0) {
      setCurrentAgent(onlineAgents[Math.floor(Math.random() * onlineAgents.length)]);
    }

    // Initialize WebSocket connection
    initializeWebSocket();

    // Add welcome message
    setTimeout(() => {
      addMessage({
        id: 'welcome',
        text: "👋 Welcome to Ruvab IT Support! I'm here to help you with any questions about our AI solutions, software development, or technical services. How can I assist you today?",
        sender: 'support',
        timestamp: new Date(),
        status: 'sent'
      });
    }, 1000);

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const initializeWebSocket = () => {
    try {
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const wsUrl = `${protocol}//${window.location.host}/ws`;
      
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
      };

      wsRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'message') {
          addMessage({
            id: data.id || Math.random().toString(36).substr(2, 9),
            text: data.text,
            sender: data.sender || 'support',
            timestamp: new Date(data.timestamp),
            status: 'sent'
          });
        } else if (data.type === 'typing') {
          setIsTyping(data.isTyping);
        }
      };

      wsRef.current.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);
        // Attempt to reconnect after 3 seconds
        setTimeout(initializeWebSocket, 3000);
      };

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsConnected(false);
      };
    } catch (error) {
      console.error('Failed to initialize WebSocket:', error);
      // Fallback to simulated responses
      setIsConnected(false);
    }
  };

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
      status: 'sending'
    };

    addMessage(userMessage);
    
    // Send via WebSocket if connected
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'message',
        sessionId: chatSession,
        text: newMessage,
        sender: 'user'
      }));
    } else {
      // Fallback to simulated response
      simulateResponse(newMessage);
    }

    setNewMessage('');
    
    // Update message status
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === userMessage.id ? { ...msg, status: 'sent' } : msg
      ));
    }, 500);
  };

  const simulateResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      // Smart response based on user input
      let response = "Thank you for your question. Let me help you with that.";
      
      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence')) {
        response = "Great question about AI! We specialize in AI implementation, machine learning solutions, and intelligent automation. Our AI services include predictive analytics, natural language processing, and custom AI model development. Would you like to know more about any specific AI solution?";
      } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing') || lowerMessage.includes('quote') || lowerMessage.includes('budget')) {
        response = "Thank you for your interest in our pricing! Our costs vary based on project scope, requirements, and customization needs. For accurate pricing and detailed quotes, I'd be happy to connect you with our sales and support team.\n\nPlease reach out to: support@ruvabit.com\n\nOur sales team will:\n• Understand your specific requirements\n• Provide detailed cost breakdown\n• Offer customized solutions within your budget\n• Schedule a free consultation\n\nWould you like me to help you with anything else about our services?";
      } else if (lowerMessage.includes('software') || lowerMessage.includes('development')) {
        response = "We provide comprehensive software development services including web applications, mobile apps, enterprise solutions, and custom software. Our tech stack includes React, Node.js, Python, AI/ML frameworks, and cloud technologies. What type of software solution are you looking for?";
      } else if (lowerMessage.includes('qr') || lowerMessage.includes('qr code')) {
        response = "Our QR Code Generator tool is available at https://qr-gen.ruvab.it.com! It's a powerful, user-friendly tool that lets you create custom QR codes for various purposes. You can generate codes for URLs, text, contact info, WiFi, and more. Would you like to know about our other digital tools?";
      } else if (lowerMessage.includes('contact') || lowerMessage.includes('meeting') || lowerMessage.includes('consultation')) {
        response = "I'd be happy to arrange a consultation! You can:\n\n• Schedule a free 30-minute consultation via our contact form\n• Call us directly for immediate assistance\n• Book a technical demo of our solutions\n\nWould you prefer a video call or in-person meeting? What's the best time for you?";
      }
      
      addMessage({
        id: Math.random().toString(36).substr(2, 9),
        text: response,
        sender: 'support',
        timestamp: new Date(),
        status: 'sent'
      });
    }, 2000 + Math.random() * 1000); // Simulate realistic response time
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Live Chat Support | Get Instant Help | Ruvab IT</title>
        <meta name="description" content="Get instant help from our expert support team. Live chat support for AI solutions, software development, and technical services. Available 24/7." />
        <meta name="keywords" content="live chat, customer support, technical help, AI support, software development help" />
        <link rel="canonical" href="https://ruvab.it.com/live-chat" />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Live Chat Support</h1>
            <p className="text-muted-foreground">
              Get instant help from our expert team. We're here to answer your questions about our services.
            </p>
          </div>

          {/* Chat Interface */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Chat Window */}
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                {/* Chat Header */}
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <MessageCircle className="h-6 w-6 text-blue-600" />
                      <div>
                        <CardTitle className="text-lg">Live Support</CardTitle>
                        <CardDescription className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <span>{isConnected ? 'Connected' : 'Connecting...'}</span>
                        </CardDescription>
                      </div>
                    </div>
                    {currentAgent && (
                      <Badge variant="secondary" className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(currentAgent.status)}`}></div>
                        <span>{currentAgent.name}</span>
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto space-y-4 pb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.sender !== 'user' && (
                            <div className="flex-shrink-0 mt-1">
                              {message.sender === 'bot' ? (
                                <Bot className="h-4 w-4" />
                              ) : (
                                <User className="h-4 w-4" />
                              )}
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs opacity-70">
                                {message.timestamp.toLocaleTimeString()}
                              </span>
                              {message.sender === 'user' && (
                                <div className="flex items-center space-x-1">
                                  {message.status === 'sending' && <Clock className="h-3 w-3 opacity-70" />}
                                  {message.status === 'sent' && <CheckCircle2 className="h-3 w-3 opacity-70" />}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
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

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button 
                      onClick={sendMessage} 
                      disabled={!newMessage.trim()}
                      className="px-4"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Support Info Sidebar */}
            <div className="space-y-6">
              {/* Current Agent */}
              {currentAgent && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Your Support Agent</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5" />
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(currentAgent.status)}`}></div>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{currentAgent.name}</p>
                        <p className="text-xs text-muted-foreground">Response time: {currentAgent.responseTime}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-xs"
                    onClick={() => setNewMessage("I'd like to schedule a consultation")}
                  >
                    Schedule Consultation
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-xs"
                    onClick={() => setNewMessage("What AI services do you offer?")}
                  >
                    AI Services Info
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-xs"
                    onClick={() => setNewMessage("I need help with software development")}
                  >
                    Software Development
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-xs"
                    onClick={() => setNewMessage("What are your pricing options?")}
                  >
                    Pricing Information
                  </Button>
                </CardContent>
              </Card>

              {/* Support Hours */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Support Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM IST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>10:00 AM - 4:00 PM IST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}