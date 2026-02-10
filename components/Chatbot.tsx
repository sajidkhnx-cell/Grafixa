import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageSquare, Globe } from 'lucide-react';
import { ChatMessage } from '../types';

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm the Grafixa Assistant. How can we help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Optimistic UI Update
    const newMessages = [...messages, { role: 'user', text: userMessage } as ChatMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const systemInstruction = `You are the official AI assistant for Grafixa, a premium creative agency based in Nowshera, KPK, Pakistan.
            
      Key Services: Logo Design, Branding, Social Media Management, SEO (Search Engine Optimization), Digital Marketing.
      
      Personality: Professional, Efficient, Knowledgeable, Polite.
      
      Directives:
      - Answer questions about Grafixa's services instantly.
      - Emphasize "Fast results", "SEO Optimization", and "Premium Quality".
      - If asked for contact, provide: Email (sajidkhanx4040@gmail.com) and Phone (0349-0099951).
      - Keep responses concise and business-oriented.
      - Use keywords like "Branding", "Growth", "ROI", "Rankings" where appropriate.
      `;

      // Prepare messages
      const apiMessages = [
        { role: 'system', content: systemInstruction },
        ...newMessages.map(msg => ({
          role: msg.role === 'model' ? 'assistant' : 'user',
          content: msg.text
        }))
      ];

      // Call our secure internal API endpoint
      // This hides the API key from the browser
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: apiMessages
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server Error: ${response.status}`);
      }

      const data = await response.json();
      const responseText = data.choices[0]?.message?.content || "I couldn't generate a text response.";

      setMessages(prev => [...prev, { 
        role: 'model', 
        text: responseText
      }]);
    } catch (error) {
      console.error("Chat error", error);
      const errorMessage = error instanceof Error ? error.message : "Connection error";
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: `Error: ${errorMessage}. Please try again later.`, 
        isError: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[340px] sm:w-[380px] h-[500px] rounded-t-xl rounded-bl-xl bg-brand-dark border border-brand-primary/30 flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom-5 fade-in duration-200">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-brand-primary to-brand-secondary flex justify-between items-center shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 p-1">
                <img 
                  src="https://i.ibb.co/qVFGNGj/file-00000000cb7072069c49c9b62833d831.png" 
                  alt="Grafixa Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Grafixa Support</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <p className="text-xs text-blue-100 font-medium">Online</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-dark/95">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`
                    max-w-[85%] p-3 text-sm leading-relaxed shadow-sm flex flex-col gap-2
                    ${msg.role === 'user' 
                      ? 'bg-brand-primary text-white rounded-2xl rounded-tr-none' 
                      : msg.isError 
                        ? 'bg-red-500/10 border border-red-500/50 text-red-200 rounded-2xl rounded-tl-none'
                        : 'bg-brand-dark border border-brand-primary/20 text-gray-200 rounded-2xl rounded-tl-none'
                    }
                  `}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                  
                  {/* Sources Display */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-1 pt-2 border-t border-white/10">
                      <p className="text-[10px] text-gray-400 uppercase font-bold mb-1.5 flex items-center gap-1">
                         <Globe size={10} /> Sources
                      </p>
                      <div className="flex flex-col gap-1.5">
                        {msg.sources.map((source, i) => (
                          <a 
                            key={i} 
                            href={source.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs bg-white/5 hover:bg-white/10 text-blue-300 p-1.5 rounded transition-colors flex items-center gap-2 truncate border border-white/5"
                          >
                            <span className="w-1 h-1 rounded-full bg-blue-400 shrink-0"></span>
                            <span className="truncate">{source.title}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <div className="bg-brand-dark border border-brand-primary/20 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce delay-75"></span>
                    <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce delay-150"></span>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-brand-dark border-t border-white/5">
            <div className="relative flex items-center gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask anything..."
                className="w-full bg-white/5 text-white placeholder-gray-500 rounded-lg pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary border border-white/10 transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 p-2 text-brand-primary hover:text-brand-accent transition-colors disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary shadow-lg hover:shadow-brand-primary/50 transition-all duration-300 hover:scale-105"
        >
          <div className="absolute inset-0 rounded-full border border-white/20"></div>
          <MessageSquare className="text-white" size={24} />
          
          {/* Notification Dot */}
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-brand-dark rounded-full"></span>
        </button>
      )}
    </div>
  );
};