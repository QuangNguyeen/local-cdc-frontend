import { create } from 'zustand';
import { toast } from 'sonner';
import axios from 'axios';
import { axiosInstance } from '@/lib/axiosInstance';

interface Message {
    id: string;
    content: string;
    sender: 'user' | 'bot';
    timestamp: string;
    sources?: string[];
}

interface QuestionResponse {
    answer: string;
    sources: string[];
}

interface QuestionPayload {
    content: string;
    notebookId: string;
    documentIds: string[];
}

interface QuestionStore {
    askQuestion: (content: string) => Promise<void>;
    isLoading: boolean;
    messages: Message[];
}

export const useQuestionStore = create<QuestionStore>((set) => ({
    messages: [],
    isLoading: false,

    askQuestion: async (content) => {
        // Create user message
        const userMessage: Message = {
            id: crypto.randomUUID(),
            content,
            sender: 'user',
            timestamp: new Date().toISOString(),
        };

        // Update state with user message and loading state
        set((state) => ({
            messages: [...state.messages, userMessage],
            isLoading: true,
        }));

        try {
            // Make API request
            const response = await axiosInstance<QuestionResponse>({
                url: 'question/ask',
                method: 'POST',
                data: {
                    content,
                    // @ts-ignore
                    // notebookId,
                    // // @ts-ignore
                    // documentIds,
                } satisfies QuestionPayload,
            });

            // Create bot response message
            const botMessage: Message = {
                id: crypto.randomUUID(),
                content: response.answer,
                sender: 'bot',
                timestamp: new Date().toISOString(),
                sources: response.sources,
            };

            // Update state with bot message
            set((state) => ({
                messages: [...state.messages, botMessage],
                isLoading: false,
            }));

        } catch (error) {
            // Handle different error scenarios
            let errorMessage = 'An unexpected error occurred';

            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    errorMessage = 'Question endpoint not found';
                } else if (error.code === 'ERR_NETWORK') {
                    errorMessage = 'Network error - please check your connection';
                } else {
                    errorMessage = error.response?.data?.message || errorMessage;
                }
            }

            // Show error toast
            toast.error(errorMessage);

            // Add error message to chat
            const botErrorMessage: Message = {
                id: crypto.randomUUID(),
                content: `Error: ${errorMessage}`,
                sender: 'bot',
                timestamp: new Date().toISOString(),
            };

            set((state) => ({
                messages: [...state.messages, botErrorMessage],
                isLoading: false,
            }));
        }
    },
}));