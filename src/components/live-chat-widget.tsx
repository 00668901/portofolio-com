'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { handleLiveChat } from '@/app/actions';
import { author } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

type Message = {
  role: 'user' | 'model';
  content: string;
};

const recommendedPrompts = [
  'What are your main skills?',
  'Tell me about your latest project.',
  'How can I contact you?',
];

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: `Hello! I'm an AI assistant for ${author.name}. How can I help you today?` },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    const newUserMessage: Message = { role: 'user', content: messageText };
    const currentMessages: Message[] = [...messages, newUserMessage];
    setMessages(currentMessages);
    if (input) setInput('');
    setIsLoading(true);

    try {
      // Exclude the last message (the one we just added) from history
      const history = currentMessages.slice(0, -1).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const result = await handleLiveChat({
        message: messageText,
        history: history,
      });
      const botMessage: Message = { role: 'model', content: result.response };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'model',
        content: "Sorry, I'm having trouble connecting. Please try again later.",
      };
      setMessages(prev => [...prev, errorMessage]);
      console.error('Live chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div');
      if (viewport) {
        viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
      }
    }
  }, [messages, isLoading]);

  return (
    <>
      <div className={cn('fixed bottom-4 right-4 z-50 transition-transform duration-300', isOpen ? 'scale-0' : 'scale-100')}>
        <Button onClick={toggleOpen} size="lg" className="rounded-full shadow-lg">
          <MessageSquare className="mr-2" />
          Chat with AI
        </Button>
      </div>

      {isOpen && (
        <Card className="fixed bottom-4 right-4 z-50 w-full max-w-sm flex flex-col shadow-xl animate-in fade-in-50 slide-in-from-bottom-5 duration-300">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 font-headline">
              <Bot />
              AI Assistant
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={toggleOpen}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-72 w-full" ref={scrollAreaRef}>
              <div className="space-y-4 p-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn('flex items-start gap-3', message.role === 'user' ? 'justify-end' : 'justify-start')}
                  >
                    {message.role === 'model' && <Bot className="h-6 w-6 text-primary flex-shrink-0" />}
                    <div
                      className={cn(
                        'rounded-lg px-3 py-2 text-sm max-w-[80%]',
                        message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      )}
                    >
                      {message.content}
                    </div>
                    {message.role === 'user' && <User className="h-6 w-6 text-muted-foreground flex-shrink-0" />}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start gap-3 justify-start">
                    <Bot className="h-6 w-6 text-primary flex-shrink-0" />
                    <div className="rounded-lg px-3 py-2 text-sm bg-muted">
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                  </div>
                )}
                {!isLoading && messages.length <= 1 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <p className="text-sm font-medium">Or try a recommended prompt</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recommendedPrompts.map(prompt => (
                        <Badge key={prompt} variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => sendMessage(prompt)}>
                          {prompt}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type a message..."
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
