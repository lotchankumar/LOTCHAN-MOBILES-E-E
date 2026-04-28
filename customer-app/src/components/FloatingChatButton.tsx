import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/integrations/api';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hi! I\'m LOVFIS AI. How can I help you with your mobile repair or accessories today?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Store message in database if user is logged in
      if (user) {
        await api.post('/customer/chat', { message: input, isUser: true });
      }

      // TODO: Call AI edge function here when ready
      // For now, provide helpful predefined responses
      const response = getResponse(input);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);

      if (user) {
        await api.post('/customer/chat', { message: response, isUser: false });
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.response?.data?.error || 'Chat error', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const getResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('price') || q.includes('cost')) {
      return 'Our repair prices start from ₹200 depending on the issue. Screen repairs typically cost ₹800-₹2000. Would you like to book a free diagnosis?';
    }
    if (q.includes('warranty')) {
      return 'All our repairs come with a 1-year warranty on parts and labor. We use only original spare parts!';
    }
    if (q.includes('time') || q.includes('how long')) {
      return 'Most repairs are completed within 24 hours. We also offer express service (same day) for urgent cases!';
    }
    if (q.includes('pickup') || q.includes('delivery')) {
      return 'Yes! We offer free pickup and delivery within 5km radius. You can book this service when scheduling your repair.';
    }
    if (q.includes('accessories') || q.includes('buy')) {
      return 'We have a wide range of OEM accessories including cases, chargers, earphones, and screen protectors. Check out our Shop section!';
    }
    if (q.includes('referral') || q.includes('earn')) {
      return 'Our referral program lets you earn 10% lifetime commission on every friend you refer! Share your referral code from the Profile section.';
    }

    return 'I can help you with repair bookings, pricing, warranty info, and accessories. You can also call us at +91-XXXXXXXXXX or visit our shop in Somanur, Coimbatore!';
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          size="icon"
          className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg z-50 bg-gradient-to-r from-accent to-primary hover:scale-110 transition-transform"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-80 h-96 shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-accent to-primary text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                🤖
              </div>
              <div>
                <h3 className="font-semibold text-sm">LOVFIS AI</h3>
                <p className="text-xs opacity-90">Online now</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl px-4 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                disabled={loading}
              />
              <Button size="icon" onClick={sendMessage} disabled={loading}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default FloatingChatButton;
