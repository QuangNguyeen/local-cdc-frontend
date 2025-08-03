'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot } from 'lucide-react';

export function TypingIndicator() {
    return (
        <div className="mb-6 flex justify-start">
            <div className="flex max-w-[80%] gap-3">
                <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="bg-indigo-500 text-white">
                        <Bot className="h-4 w-4" />
                    </AvatarFallback>
                </Avatar>

                <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3">
                    <div className="flex space-x-1">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                        <div
                            className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                            style={{ animationDelay: '0.1s' }}
                        />
                        <div
                            className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                            style={{ animationDelay: '0.2s' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
