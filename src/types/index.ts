export interface FileItem {
    id: string;
    name: string;
    type: string;
    size: string;
    selected: boolean;
}

export interface Message {
    id: string;
    content: string;
    sender: 'user' | 'bot';
    timestamp: string;
    sources?: string[];
}

export interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
}

export interface AddSourceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onFilesAdded: (files: FileItem[]) => void;
}

export interface MessageListProps {
    messages: Message[];
}
