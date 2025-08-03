export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileIcon = (type: string) => {
    const extension = type.toLowerCase();

    const iconConfig = {
        pdf: { bg: 'bg-red-500', text: 'PDF' },
        docx: { bg: 'bg-blue-500', text: 'W' },
        doc: { bg: 'bg-blue-500', text: 'W' },
        xlsx: { bg: 'bg-green-500', text: 'X' },
        xls: { bg: 'bg-green-500', text: 'X' },
        pptx: { bg: 'bg-orange-500', text: 'P' },
        ppt: { bg: 'bg-orange-500', text: 'P' },
        txt: { bg: 'bg-gray-500', text: 'TXT' },
        default: { bg: 'bg-gray-500', text: 'FILE' },
    };

    const config = iconConfig[extension as keyof typeof iconConfig] || iconConfig.default;

    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension)) {
        return (
            <div
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded bg-green-500 text-xs font-bold text-white`}
            >
                IMG
            </div>
        );
    }

    return (
        <div
            className={`h-8 w-8 ${config.bg} flex flex-shrink-0 items-center justify-center rounded text-xs font-bold text-white`}
        >
            {config.text}
        </div>
    );
};
