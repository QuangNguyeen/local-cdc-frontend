'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockBotResponses } from '@/lib/constants';
import { Bot } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { MobileSidebarSheet } from '../sidebar/mobile-sidebar-sheet';
import { TypingIndicator } from '../ui/typing-indicator';
import { MessageList } from './message-list';

export interface Message {
    id: string;
    content: string;
    sender: 'user' | 'bot';
    timestamp: string;
    sources?: string[];
}

export function ChatArea() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim()) return;

        const newMessage: Message = {
            id: crypto.randomUUID(),
            content: input,
            sender: 'user',
            timestamp: new Date().toLocaleString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            }),
        };

        setMessages((prev) => [...prev, newMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate bot response with random response from mock data
        setTimeout(() => {
            const randomResponse = mockBotResponses[Math.floor(Math.random() * mockBotResponses.length)];
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                content: randomResponse.content,
                sender: 'bot',
                timestamp: new Date().toLocaleString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                }),
                sources: randomResponse.sources,
            };
            setMessages((prev) => [...prev, botResponse]);
            setIsTyping(false);
        }, 2000);
    };

    return (
        <div className="flex flex-1 flex-col">
            {/* Header */}
            <div className="border-border bg-background border-b p-4">
                <div className="flex items-center">
                    <div className="mr-3 lg:hidden">
                        <MobileSidebarSheet />
                    </div>
                    <h1 className="text-foreground flex-1 text-center text-[24px] font-semibold lg:text-left">
                        Tra Cứu Tài Liệu Trung Tâm CDC Quảng Ninh
                    </h1>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="bg-background flex-1 overflow-hidden">
                {messages.length === 0 ? (
                    <div className="bg-background flex h-full flex-col items-center justify-center p-8 text-center">
                        <div className="mb-4 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#EDEBFF]">
                            <Image
                                src="/svg/dowload.svg"
                                width={40}
                                height={40}
                                alt="Send"
                                className="h-[40px] w-[40px]"
                            />
                        </div>
                        <h2 className="mb-2 text-xl font-medium text-[#666666]">Thêm nguồn để bắt đầu</h2>
                        {/* <p className="text-muted-foreground mb-6">Tải lên tài liệu để bắt đầu trò chuyện với AI</p> */}
                    </div>
                ) : (
                    <ScrollArea className="h-full p-6">
                        <MessageList messages={messages} />
                        {isTyping && (
                            <div className="mb-6 flex justify-start">
                                <div className="flex max-w-[80%] gap-3">
                                    <Avatar className="h-8 w-8 flex-shrink-0">
                                        <AvatarFallback className="bg-indigo-500 text-white">
                                            <Bot className="h-4 w-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <TypingIndicator />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </ScrollArea>
                )}
            </div>

            {/* Message Input */}
            <div className="bg-background p-6">
                <div className="relative">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Bắt đầu nhập ..."
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        className="bg-background border-border rounded-[16px] px-5 py-6 pr-40 text-base"
                    />
                    <div className="absolute top-1/2 right-3 flex -translate-y-1/2 transform items-center space-x-3">
                        <span className="bg-muted text-muted-foreground rounded-full px-2 py-1 text-xs font-medium">
                            5 nguồn đã chọn
                        </span>
                        <button onClick={handleSend} className="text-primary hover:text-primary/80 p-1">
                            <Image
                                src="/svg/arrow.svg"
                                width={25}
                                height={25}
                                alt="Send"
                                className="relative top-[2px] h-[25px] w-[25px] hover:cursor-pointer"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
