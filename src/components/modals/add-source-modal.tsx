'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { getFileIcon } from '@/utils/getFileIcon';
import Image from 'next/image';
import { useRef, useState } from 'react';

export interface FileItem {
    id: string;
    name: string;
    type: string;
    size: string;
    selected: boolean;
}

export interface AddSourceModalProps {
    isOpen: boolean;
    onClose: () => void;
    // eslint-disable-next-line no-unused-vars
    onFilesAdded: (files: FileItem[]) => void;
}

const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export function AddSourceModal({ isOpen, onClose, onFilesAdded }: AddSourceModalProps) {
    const [selectedFiles, setSelectedFiles] = useState<FileItem[]>([]);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (files: FileList | null) => {
        if (!files) return;

        const newFiles: FileItem[] = Array.from(files).map((file) => {
            const extension = file.name.split('.').pop() || 'unknown';
            return {
                id: crypto.randomUUID(),
                name: file.name,
                type: extension,
                size: formatFileSize(file.size),
                selected: true,
            };
        });

        setSelectedFiles([...selectedFiles, ...newFiles]);
    };

    const handleRemoveFile = (fileId: string) => {
        setSelectedFiles(selectedFiles.filter((file) => file.id !== fileId));
    };

    const handleAddFiles = () => {
        onFilesAdded(selectedFiles);
        setSelectedFiles([]);
        onClose();
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const files = e.dataTransfer.files;
        handleFileSelect(files);
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFileSelect(e.target.files);
    };

    const handleBrowseFiles = () => {
        fileInputRef.current?.click();
    };

    const handleClose = () => {
        setSelectedFiles([]);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="flex max-h-[90vh] !max-w-[90vw] flex-col overflow-hidden sm:!max-w-[600px] md:!max-w-[700px] lg:!max-w-[800px] xl:!max-w-[900px]">
                <DialogHeader>
                    <DialogTitle>Thêm nguồn</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-hidden">
                    <div className="space-y-6">
                        {/* File upload area */}
                        <div
                            className={`cursor-pointer rounded-lg border-2 border-dashed p-16 text-center transition-colors ${
                                dragOver ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
                            }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={handleBrowseFiles}
                        >
                            <div className="mx-auto mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#EDEBFF]">
                                <Image
                                    src="/svg/dowload.svg"
                                    width={40}
                                    height={40}
                                    alt="Send"
                                    className="h-[40px] w-[40px]"
                                />
                            </div>
                            <h3 className="mb-2 text-lg font-medium text-gray-900">Kéo thả tài liệu vào đây</h3>
                            <p className="mb-4 text-base text-gray-500">
                                hoặc{' '}
                                <span className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-700">
                                    chọn tệp từ máy tính
                                </span>
                            </p>
                            <p className="text-gray-400">Các loại tệp hỗ trợ: PDF, Hình ảnh, .txt, Word, ...</p>
                        </div>

                        {/* Hidden file input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            className="hidden"
                            onChange={handleFileInputChange}
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.gif,.bmp,.webp"
                        />

                        {/* Separator */}
                        {selectedFiles.length > 0 && <Separator />}

                        {/* Selected files list */}
                        {selectedFiles.length > 0 && (
                            <div className="overflow-hidden">
                                <h3 className="mb-3 text-sm font-medium text-gray-900">
                                    Tài liệu đã chọn ({selectedFiles.length}):
                                </h3>
                                <div className="max-h-[240px] space-y-[16px] overflow-y-auto pr-2">
                                    {selectedFiles.map((file) => (
                                        <div
                                            key={file.id}
                                            className="flex items-center justify-between rounded-[16px] border px-[16px] py-[12px] hover:bg-gray-50"
                                        >
                                            <div className="flex min-w-0 flex-1 items-center space-x-3">
                                                {getFileIcon(file.type)}
                                                <div className="max-w-[calc(100%-120px)] min-w-0 flex-1">
                                                    <p
                                                        className="truncate text-sm font-medium text-gray-900"
                                                        title={file.name}
                                                    >
                                                        {file.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">{file.size}</p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleRemoveFile(file.id)}
                                                className="h-8 w-8 flex-shrink-0 text-red-500 hover:bg-red-50 hover:text-red-700"
                                            >
                                                <Image
                                                    src="/svg/trash.svg"
                                                    alt="Remove file"
                                                    width={24}
                                                    height={24}
                                                    className="h-6 w-6"
                                                />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Action buttons - Fixed at bottom */}
                <div className="flex justify-end gap-3 border-t pt-6">
                    <Button variant="outline" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button
                        onClick={handleAddFiles}
                        className="bg-indigo-600 hover:bg-indigo-700"
                        disabled={selectedFiles.length === 0}
                    >
                        Thêm vào nguồn ({selectedFiles.length})
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
