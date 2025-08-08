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
import { mockFiles } from '@/lib/constants';
import { getFileIcon } from '@/utils/getFileIcon';
import { ChevronRight, Plus } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useState } from 'react';
import { AddSourceModal, FileItem } from '../modals/add-source-modal';

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
                <Image
                    onClick={onToggle}
                    src="/svg/open.svg"
                    width={34}
                    height={34}
                    alt="Open"
                    className="h-[34px] w-[34px] hover:cursor-pointer"
                />
                <Button
                    size="icon"
                    onClick={() => setIsModalOpen(true)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground h-[34px] w-[34px] rounded-[8px]"
                >
                    <Plus className="h-4 w-4" />
                </Button>

                <div className="flex-1 space-y-4 overflow-y-auto pt-2">
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
                            <Image
                                onClick={() => setIsModalOpen(true)}
                                src="/svg/setting.svg"
                                className="h-[34px] w-[34px] hover:cursor-pointer"
                                width={34}
                                height={34}
                                alt="Open"
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-48 rounded-[8px]">
                            <DropdownMenuItem>Hồ sơ</DropdownMenuItem>
                            <Separator />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <DropdownMenuItem className="text-base">
                                        Giao diện
                                        <ChevronRight className="ml-auto h-4 w-4" />
                                    </DropdownMenuItem>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="right" align="start" className="w-32 rounded-[8px]">
                                    <DropdownMenuItem className="text-base" onClick={() => setTheme('light')}>
                                        Sáng
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-base" onClick={() => setTheme('dark')}>
                                        Tối
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-base" onClick={() => setTheme('system')}>
                                        Hệ thống
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <DropdownMenuItem className="text-base">
                                        Ngôn ngữ
                                        <ChevronRight className="ml-auto h-4 w-4" />
                                    </DropdownMenuItem>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="right" align="start" className="w-32 rounded-[8px]">
                                    <DropdownMenuItem className="text-base">English</DropdownMenuItem>
                                    <DropdownMenuItem className="text-base">Tiếng Việt</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Separator />
                            <DropdownMenuItem className="text-base">Trợ giúp</DropdownMenuItem>
                            <DropdownMenuItem className="text-base">Đăng xuất</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Image
                        onClick={onToggle}
                        src="/svg/close.svg"
                        width={34}
                        height={34}
                        alt="Open"
                        className="h-[34px] w-[34px] hover:cursor-pointer"
                    />
                </div>

                <Button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground w-full rounded-[8px] text-[16px]"
                >
                    <Plus width={30} height={30} className="mr-1 h-[30px] w-[30px]" />
                    THÊM
                </Button>
            </div>

            {/* File list */}
            <div className="flex-1 overflow-hidden">
                <div className="space-y-4 py-4">
                    {/* Only show "Chọn mọi nguồn" after animation completes */}
                    <div className="px-5 opacity-100 transition-opacity delay-300 duration-300">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                className="data-[state=unchecked]:border-muted-foreground/40 flex-shrink-0 data-[state=unchecked]:border-2"
                                id="select-all"
                                checked={selectAll}
                                onCheckedChange={handleSelectAll}
                            />
                            <label htmlFor="select-all" className="text-sidebar-foreground text-sm font-medium">
                                Chọn mọi nguồn
                            </label>
                        </div>
                    </div>

                    <ScrollArea className="h-[calc(100vh-200px)]">
                        <div className="space-y-1 px-2">
                            {files.map((file) => (
                                <div
                                    key={file.id}
                                    className="hover:bg-sidebar-accent flex cursor-pointer items-center space-x-3 rounded-[8px] p-3 transition-colors"
                                    onClick={() => handleFileToggle(file.id)}
                                >
                                    {getFileIcon(file.type)}
                                    <div className="min-w-0 flex-1">
                                        <p
                                            className="text-sidebar-foreground truncate text-[16px] font-medium"
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
