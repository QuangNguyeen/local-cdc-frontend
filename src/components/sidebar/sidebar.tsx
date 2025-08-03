'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
    ChevronLeft,
    ChevronRight,
    FileText,
    Globe,
    HelpCircle,
    LogOut,
    Monitor,
    Moon,
    Palette,
    Plus,
    Settings,
    Sun,
    User,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { AddSourceModal } from '../modals/add-source-modal';

interface FileItem {
    id: string;
    name: string;
    type: string;
    size: string;
    selected: boolean;
}

const mockFiles: FileItem[] = [
    { id: '1', name: 'Source-gi-do.pdf', type: 'pdf', size: '15 KB', selected: true },
    { id: '2', name: 'Source-gi-do.pdf', type: 'pdf', size: '15 KB', selected: true },
    { id: '3', name: 'Source-gi-do.pdf', type: 'pdf', size: '15 KB', selected: true },
    { id: '4', name: 'Source-gi-do.docx', type: 'docx', size: '12 KB', selected: true },
    { id: '5', name: 'Source-gi-do.xlsx', type: 'xlsx', size: '8 KB', selected: true },
    {
        id: '6',
        name: '524554214_753291614017335_5427185742616510464_n.jpg',
        type: 'jpg',
        size: '2.1 MB',
        selected: true,
    },
    {
        id: '7',
        name: 'ベトナム社員受入準備_スンさん_20250701_final_document.xlsx',
        type: 'xlsx',
        size: '856 KB',
        selected: true,
    },
    {
        id: '8',
        name: '514363653_1113602634131452_1167108765432109876_n.png',
        type: 'png',
        size: '1.8 MB',
        selected: true,
    },
    { id: '9', name: '1360881.jpeg', type: 'jpeg', size: '445 KB', selected: true },
    {
        id: '10',
        name: 'ベトナム社員受入準備_スンさん_202507_updated_version_final.docx',
        type: 'docx',
        size: '1.2 MB',
        selected: true,
    },
];

const getFileIcon = (type: string) => {
    const extension = type.toLowerCase();

    if (extension === 'pdf') {
        return (
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded bg-red-500 text-xs font-bold text-white">
                PDF
            </div>
        );
    } else if (extension === 'docx' || extension === 'doc') {
        return (
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded bg-blue-500 text-xs font-bold text-white">
                W
            </div>
        );
    } else if (extension === 'xlsx' || extension === 'xls') {
        return (
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded bg-green-500 text-xs font-bold text-white">
                X
            </div>
        );
    } else if (extension === 'pptx' || extension === 'ppt') {
        return (
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded bg-orange-500 text-xs font-bold text-white">
                P
            </div>
        );
    } else if (extension === 'txt') {
        return (
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded bg-gray-500 text-xs font-bold text-white">
                TXT
            </div>
        );
    } else if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension)) {
        return (
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded bg-green-500 text-xs font-bold text-white">
                <FileText className="h-4 w-4" />
            </div>
        );
    } else {
        return (
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded bg-gray-500 text-xs font-bold text-white">
                <FileText className="h-4 w-4" />
            </div>
        );
    }
};

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
    const [files, setFiles] = useState<FileItem[]>(mockFiles);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectAll, setSelectAll] = useState(true);
    const { setTheme } = useTheme();

    const handleFileToggle = (fileId: string) => {
        setFiles(files.map((file) => (file.id === fileId ? { ...file, selected: !file.selected } : file)));
    };

    const handleSelectAll = (checked: boolean) => {
        setSelectAll(checked);
        setFiles(files.map((file) => ({ ...file, selected: checked })));
    };

    const addFiles = (newFiles: FileItem[]) => {
        setFiles([...files, ...newFiles]);
    };

    if (!isOpen) {
        // Collapsed sidebar - just icons with animation
        return (
            <div className="bg-sidebar border-sidebar-border flex h-screen w-16 flex-col items-center space-y-3 border-r py-4 transition-all duration-300 ease-in-out">
                <Button
                    onClick={onToggle}
                    variant="ghost"
                    size="icon"
                    className="border-sidebar-border h-10 w-10 border"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>

                <Button
                    onClick={() => setIsModalOpen(true)}
                    size="icon"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground h-10 w-10"
                >
                    <Plus className="h-4 w-4" />
                </Button>

                <div className="flex-1 space-y-2 overflow-y-auto pt-2">
                    {files.slice(0, 10).map((file) => (
                        <div key={file.id} className="flex justify-center">
                            {getFileIcon(file.type)}
                        </div>
                    ))}
                </div>

                <AddSourceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onFilesAdded={addFiles} />
            </div>
        );
    }

    // Expanded sidebar with animation
    return (
        <div className="bg-sidebar border-sidebar-border flex h-screen w-80 flex-col border-r transition-all duration-300 ease-in-out">
            {/* Header */}
            <div className="border-sidebar-border border-b p-4">
                <div className="mb-4 flex items-center justify-between">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-sidebar-foreground h-8 w-8">
                                <Settings className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-48">
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                Hồ sơ
                            </DropdownMenuItem>
                            <Separator />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <DropdownMenuItem>
                                        <Palette className="mr-2 h-4 w-4" />
                                        Giao diện
                                        <ChevronRight className="ml-auto h-4 w-4" />
                                    </DropdownMenuItem>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="right" align="start" className="w-32">
                                    <DropdownMenuItem onClick={() => setTheme('light')}>
                                        <Sun className="mr-2 h-4 w-4" />
                                        Sáng
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme('dark')}>
                                        <Moon className="mr-2 h-4 w-4" />
                                        Tối
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme('system')}>
                                        <Monitor className="mr-2 h-4 w-4" />
                                        Hệ thống
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <DropdownMenuItem>
                                        <Globe className="mr-2 h-4 w-4" />
                                        Ngôn ngữ
                                        <ChevronRight className="ml-auto h-4 w-4" />
                                    </DropdownMenuItem>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="right" align="start" className="w-32">
                                    <DropdownMenuItem>English</DropdownMenuItem>
                                    <DropdownMenuItem>Tiếng Việt</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenuItem>
                                <HelpCircle className="mr-2 h-4 w-4" />
                                Trợ giúp
                            </DropdownMenuItem>
                            <Separator />
                            <DropdownMenuItem>
                                <LogOut className="mr-2 h-4 w-4" />
                                Đăng xuất
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button onClick={onToggle} variant="ghost" size="icon" className="text-sidebar-foreground h-8 w-8">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </div>

                <Button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    THÊM
                </Button>
            </div>

            {/* File list */}
            <div className="flex-1 overflow-hidden p-4">
                <div className="space-y-4">
                    {/* Only show "Chọn mọi nguồn" after animation completes */}
                    <div className="opacity-100 transition-opacity delay-300 duration-300">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="select-all" checked={selectAll} onCheckedChange={handleSelectAll} />
                            <label htmlFor="select-all" className="text-sidebar-foreground text-sm font-medium">
                                Chọn mọi nguồn
                            </label>
                        </div>
                    </div>

                    <ScrollArea className="h-[calc(100vh-200px)]">
                        <div className="space-y-2 pr-2">
                            {files.map((file) => (
                                <div
                                    key={file.id}
                                    className="hover:bg-sidebar-accent flex cursor-pointer items-center space-x-3 rounded-lg p-3 transition-colors"
                                    onClick={() => handleFileToggle(file.id)}
                                >
                                    {getFileIcon(file.type)}
                                    <div className="max-w-[38%] min-w-0 flex-1">
                                        <p
                                            className="text-sidebar-foreground truncate text-sm font-medium"
                                            title={file.name}
                                        >
                                            {file.name}
                                        </p>
                                    </div>
                                    <Checkbox
                                        checked={file.selected}
                                        onCheckedChange={() => handleFileToggle(file.id)}
                                        className="data-[state=unchecked]:border-muted-foreground/40 ml-auto flex-shrink-0 data-[state=unchecked]:border-2"
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </div>

            <AddSourceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onFilesAdded={addFiles} />
        </div>
    );
}
