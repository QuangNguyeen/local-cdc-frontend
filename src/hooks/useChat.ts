import { mockBotResponses } from '@/lib/constants';
import type { Message } from '@/types';
import { useEffect, useRef, useState } from 'react';

export function useChat() {
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
            id: Date.now().toString(),
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

        // Simulate bot response
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

    return {
        messages,
        input,
        setInput,
        isTyping,
        messagesEndRef,
        handleSend,
    };
}
