import { getFileIcon } from '@/utils/formatFIleSize';

interface FileIconProps {
    type: string;
}

export function FileIcon({ type }: FileIconProps) {
    return getFileIcon(type);
}
