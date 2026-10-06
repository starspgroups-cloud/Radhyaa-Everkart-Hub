import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Trash2,
  Minimize2,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome',
    role: 'model',
    text: 'Namaste! 🙏 Welcome to Radhyaa Everkart Hub. I am your AI Shopping Concierge.\n\nHow may I help you today? Ask me about our handcrafted Shagun envelopes, 100% pure cotton bedsheets, festive brass diyas, active discount coupons, or delivery across India!',
    timestamp: 'Just now',
  },
];

const QUICK_PROMPTS = [
  'Best Shagun envelopes for weddings',
  'King bedsheets fabric & size details',
  'What discount coupons can I use?',
  'How fast is shipping & is COD available?',
];

export const AiChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('radhyaa_ai_chat');
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem('radhyaa_ai_chat', JSON.stringify(messages));
    } catch (e) {
      console.error(e);
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Send conversation history to server-side Gemini endpoint
      const payloadMessages = updatedMessages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          role: m.role,
          text: m.text,
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: payloadMessages.length > 0 ? payloadMessages : [{ role: 'user', text }],
        }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }

      const data = await res.json();
      const replyText = data.reply || "I'm here to assist you with Radhyaa Everkart Hub's collections.";

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'model',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      // Fallback graceful response
      const fallbackReply: ChatMessage = {
        id: `ai-fallback-${Date.now()}`,
        role: 'model',
        text: "I am having a brief moment connecting to the hub. You can explore our collection tabs above, or chat with our live human team on WhatsApp at +91 98765 43210. How else may I help?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages(INITIAL_MESSAGES);
    localStorage.removeItem('radhyaa_ai_chat');
  };

  return (
    <>
      {/* Floating Trigger Button on Bottom-Right */}
      <aside aria-label="AI Shopping Concierge" className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open Radhyaa AI Shopping Concierge"
            className="group flex items-center gap-2.5 px-4 py-3 bg-[#112E1F] hover:bg-[#1C4832] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-[#DFB76C]/60"
          >
            <div className="relative">
              <Sparkles className="w-5 h-5 text-[#DFB76C] animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#112E1F]" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider pr-1">
              AI Concierge
            </span>
          </button>
        )}
      </aside>

      {/* Floating Chat Modal Window */}
      {isOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-w-sm h-[560px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-[#ECE3D4] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#0F2D1E] via-[#112E1F] to-[#173B28] text-white flex items-center justify-between border-b border-[#DFB76C]/30 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#DFB76C]/60 shadow-sm shrink-0">
                <BrandLogo size="sm" emblemOnly={true} className="w-full h-full" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-sm font-semibold tracking-wide flex items-center gap-1.5">
                  Radhyaa AI Concierge
                  <Sparkles className="w-3.5 h-3.5 text-[#DFB76C]" />
                </span>
                <span className="text-[10px] text-emerald-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online · Powered by Gemini
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                title="Clear conversation"
                className="p-1.5 text-stone-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 text-stone-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Conversation Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FAF8F5]/80 text-xs">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 shadow-xs leading-relaxed whitespace-pre-wrap ${
                      isUser
                        ? 'bg-[#112E1F] text-white rounded-br-xs'
                        : 'bg-white text-stone-800 border border-[#ECE3D4] rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-stone-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-stone-500 bg-white p-3 rounded-2xl border border-[#ECE3D4] w-fit shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-spin" />
                <span className="text-[11px] font-medium">Radhyaa AI is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar (when only initial message exists) */}
          {messages.length <= 2 && !isLoading && (
            <div className="p-2.5 bg-white border-t border-[#ECE3D4] flex flex-wrap gap-1.5 shrink-0">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSendMessage(prompt)}
                  className="px-2.5 py-1 bg-[#FAF8F5] hover:bg-[#F5EFE6] border border-[#ECE3D4] text-[10px] text-stone-700 rounded-full transition-colors text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Message Input Form */}
          <div className="p-3 bg-white border-t border-[#ECE3D4] shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about envelopes, bedsheets, offers..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1 px-3 py-2 text-xs border border-[#ECE3D4] rounded-xl bg-[#FAF8F5] focus:outline-hidden focus:border-[#112E1F] focus:bg-white text-stone-800 placeholder-stone-400"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="p-2 bg-[#112E1F] hover:bg-[#1C4832] disabled:opacity-40 text-white rounded-xl transition-colors shadow-xs"
              >
                <Send className="w-4 h-4 text-[#DFB76C]" />
              </button>
            </form>

            <div className="mt-2 flex items-center justify-between text-[10px] text-stone-400 px-1">
              <span>Radhyaa AI Retail Guide</span>
              <a
                href="https://wa.me/919876543210?text=Hi%20Radhyaa%20Everkart%20Hub,%20I%20need%20human%20assistance"
                target="_blank"
                rel="noreferrer"
                className="text-[#245A3E] font-medium hover:underline flex items-center gap-0.5"
              >
                <MessageCircle className="w-2.5 h-2.5" />
                Human Concierge
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
