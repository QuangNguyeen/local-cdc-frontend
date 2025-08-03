'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Bot, Copy, User } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
    id: string;
    content: string;
    sender: 'user' | 'bot';
    timestamp: string;
    sources?: string[];
}

interface MessageListProps {
    messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success('Đã sao chép', {
                description: 'Tin nhắn đã được sao chép vào clipboard',
            });
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log('Failed to copy: ', err);
            toast.error('Lỗi', {
                description: 'Không thể sao chép tin nhắn',
            });
        }
    };

    return (
        <div className="space-y-6">
            {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                        className={`flex max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-3`}
                    >
                        <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarFallback
                                className={
                                    message.sender === 'user'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-primary text-primary-foreground'
                                }
                            >
                                {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                            </AvatarFallback>
                        </Avatar>

                        <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                            <div
                                className={`rounded-2xl px-4 py-3 ${
                                    message.sender === 'user'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-card border-border text-card-foreground border'
                                }`}
                            >
                                <div className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</div>
                            </div>

                            {message.sender === 'bot' && (
                                <div className="mt-2 flex items-center gap-2">
                                    <span className="text-muted-foreground text-xs">{message.timestamp}</span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => copyToClipboard(message.content)}
                                        className="hover:bg-accent h-6 w-6 cursor-pointer p-0"
                                    >
                                        <Copy className="h-3 w-3" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
