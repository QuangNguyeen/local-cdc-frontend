import React, { useState } from 'react';
import { useQuestionStore } from '@/store/questionStore';

const Chat = () => {
    const { messages, askQuestion, isLoading } = useQuestionStore();
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;
        askQuestion(input,
            '352b749a-93bb-4297-82af-c5c22a72bdbb',
            ['a90386c8-a585-4513-b734-6f58f4d281d5']);
        setInput('');
    };

    return (
        <div>
            <div style={{ height: 300, overflowY: 'auto' }}>
                {messages.map((m) => (
                    <div key={m.id}>
                        <b>{m.sender}:</b> {m.content}
                    </div>
                ))}
                {isLoading && <p>Rendering the answer...</p>}
            </div>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Gửi</button>
        </div>
    );
};

export default Chat;
