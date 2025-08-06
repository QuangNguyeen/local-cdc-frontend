import { getFileIcon } from '@/utils/getFileIcon';

interface FileIconProps {
    type: string;
}

export function FileIcon({ type }: FileIconProps) {
    return getFileIcon(type);
}
