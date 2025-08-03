import { mockFiles } from '@/lib/constants';
import type { FileItem } from '@/types';
import { useState } from 'react';

export function useFileManager() {
    const [files, setFiles] = useState<FileItem[]>(mockFiles);
    const [selectAll, setSelectAll] = useState(true);

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

    const removeFile = (fileId: string) => {
        setFiles(files.filter((file) => file.id !== fileId));
    };

    return {
        files,
        selectAll,
        handleFileToggle,
        handleSelectAll,
        addFiles,
        removeFile,
    };
}
