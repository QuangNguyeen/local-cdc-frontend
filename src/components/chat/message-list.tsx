'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';
import { Bot } from 'lucide-react';
import { CopyButton } from '../ui/copy-button';

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
    return (
        <div className="space-y-6">
            {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                        className={`flex max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-3`}
                    >
                        {message.sender === 'bot' && (
                            <Avatar className="h-8 w-8 flex-shrink-0">
                                <AvatarFallback className={'bg-primary text-primary-foreground'}>
                                    <Bot className="h-4 w-4" />
                                </AvatarFallback>
                            </Avatar>
                        )}

                        <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                            <div
                                className={`rounded-2xl px-4 py-3 ${
                                    message.sender === 'user'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-card border-border text-card-foreground border'
                                }`}
                            >
                                <div className="text-[16px] leading-relaxed whitespace-pre-wrap">
                                    <MarkdownRenderer>{message.content}</MarkdownRenderer>
                                </div>
                            </div>

                            {message.sender === 'bot' && (
                                <div className="mt-2 flex w-full items-center justify-between gap-2">
                                    <span className="text-muted-foreground text-xs">{message.timestamp}</span>
                                    <CopyButton content={message.content} copyMessage="Đã sao chép tin nhắn" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
