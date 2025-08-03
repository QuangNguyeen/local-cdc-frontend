'use client';

import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Download, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { MobileSidebarSheet } from '../sidebar/mobile-sidebar-sheet';
import { MessageList } from './message-list';
import { TypingIndicator } from './typing-indicator';

interface Message {
    id: string;
    content: string;
    sender: 'user' | 'bot';
    timestamp: string;
    sources?: string[];
}

const mockBotResponses = [
    {
        content:
            'Dựa trên tài liệu Source-gi-do.pdf, quy trình xử lý hồ sơ bao gồm các bước sau:\n\n1. **Tiếp nhận hồ sơ**: Kiểm tra tính đầy đủ và hợp lệ của hồ sơ\n2. **Thẩm định**: Đánh giá nội dung và tính xác thực của tài liệu\n3. **Phê duyệt**: Quyết định chấp thuận hoặc từ chối\n4. **Thông báo kết quả**: Gửi thông báo đến người nộp hồ sơ\n\nThời gian xử lý trung bình là 15-20 ngày làm việc. Bạn có muốn tôi giải thích chi tiết về bước nào không?',
        sources: ['Source-gi-do.pdf'],
    },
    {
        content:
            'Cảm ơn bạn đã hỏi! Tôi đang xử lý thông tin từ các tài liệu đã tải lên để cung cấp câu trả lời chính xác nhất. Dựa trên các tài liệu có sẵn, tôi có thể giúp bạn tìm hiểu về:\n\n• Quy trình hành chính\n• Thủ tục pháp lý\n• Hướng dẫn thực hiện\n• Các biểu mẫu cần thiết',
        sources: ['Source-gi-do.pdf', 'Source-gi-do.docx'],
    },
    {
        content:
            'Tôi hiểu câu hỏi của bạn. Theo tài liệu hướng dẫn, có một số điểm quan trọng cần lưu ý:\n\n✓ Đảm bảo tính đầy đủ của hồ sơ\n✓ Tuân thủ đúng quy trình\n✓ Nộp đúng thời hạn quy định\n✓ Chuẩn bị các giấy tờ liên quan\n\nBạn có cần tôi giải thích thêm về bất kỳ điểm nào không?',
        sources: ['Source-gi-do.pdf'],
    },
];

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
                    <h1 className="text-foreground flex-1 text-center text-lg font-semibold lg:text-left">
                        Tra Cứu Tài Liệu Trung Tâm CDC Quảng Ninh
                    </h1>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="bg-background flex-1 overflow-hidden">
                {messages.length === 0 ? (
                    <div className="bg-background flex h-full flex-col items-center justify-center p-8 text-center">
                        <div className="bg-primary/10 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                            <Download className="text-primary h-8 w-8" />
                        </div>
                        <h2 className="text-foreground mb-2 text-xl font-medium">Thêm nguồn để bắt đầu</h2>
                        <p className="text-muted-foreground mb-6">Tải lên tài liệu để bắt đầu trò chuyện với AI</p>
                    </div>
                ) : (
                    <ScrollArea className="h-full p-4">
                        <MessageList messages={messages} />
                        {isTyping && <TypingIndicator />}
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
                        className="bg-background border-border px-4 py-4 pr-40 text-base"
                    />
                    <div className="absolute top-1/2 right-3 flex -translate-y-1/2 transform items-center space-x-2">
                        <span className="bg-muted text-muted-foreground rounded-full px-2 py-1 text-xs font-medium">
                            5 nguồn đã chọn
                        </span>
                        <button onClick={handleSend} className="text-primary hover:text-primary/80 p-1">
                            <Send className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
