'use client';

import { ChatArea } from '@/components/chat/chat-area';
import { Sidebar } from '@/components/sidebar/sidebar';
import { useState } from 'react';

export default function ChatbotPage() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="bg-background flex h-screen">
            <div className="hidden lg:block">
                <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
            </div>
            <ChatArea />
        </div>
    );
}
