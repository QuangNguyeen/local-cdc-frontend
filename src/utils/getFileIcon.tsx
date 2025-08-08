import { Image } from 'lucide-react';

export const getFileIcon = (type: string) => {
    const extension = type.toLowerCase();

    if (extension === 'pdf') {
        return (
            <div className="flex h-6 w-6 items-center justify-center rounded bg-red-500 text-xs font-bold text-white">
                PDF
            </div>
        );
    } else if (extension === 'docx' || extension === 'doc') {
        return (
            <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-500 text-xs font-bold text-white">
                W
            </div>
        );
    } else if (extension === 'xlsx' || extension === 'xls') {
        return (
            <div className="flex h-6 w-6 items-center justify-center rounded bg-green-500 text-xs font-bold text-white">
                X
            </div>
        );
    } else if (extension === 'pptx' || extension === 'ppt') {
        return (
            <div className="flex h-6 w-6 items-center justify-center rounded bg-orange-500 text-xs font-bold text-white">
                P
            </div>
        );
    } else if (extension === 'txt') {
        return (
            <div className="flex h-6 w-6 items-center justify-center rounded bg-gray-500 text-xs font-bold text-white">
                TXT
            </div>
        );
    } else if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension)) {
        return (
            <div className="flex h-6 w-6 items-center justify-center rounded bg-green-500 text-xs font-bold text-white">
                <Image />
            </div>
        );
    } else {
        return (
            <div className="flex h-6 w-6 items-center justify-center rounded bg-gray-500 text-xs font-bold text-white">
                FILE
            </div>
        );
    }
};
