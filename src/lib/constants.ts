export const mockBotResponses = [
    {
        content:
            'Dựa trên tài liệu Source-gi-do.pdf, quy trình xử lý hồ sơ bao gồm các bước sau:\n\n1. **Tiếp nhận hồ sơ**: Kiểm tra tính đầy đủ và hợp lệ của hồ sơ\n2. **Thẩm định**: Đánh giá nội dung và tính xác thực của tài liệu\n3. **Phê duyệt**: Quyết định chấp thuận hoặc từ chối\n4. **Thông báo kết quả**: Gửi thông báo đến người nộp hồ sơ\n\nThời gian xử lý trung bình là 15-20 ngày làm việc. Bạn có muốn tôi giải thích chi tiết về bước nào không?',
        sources: ['Source-gi-do.pdf'],
    },
    {
        content:
            'Cảm ơn bạn đã hỏi! Tôi đang xử lý thông tin từ các tài liệu đã tải lên để cung cấp câu trả lời chính xác nhất. Dựa trên các tài liệu có sẵn, tôi có thể giúp bạn tìm hiểu về:\n\n• Quy trình hành chính\n• Thủ tục pháp lý\n• Hướng dẫn thực hiện\n• Các biểu mẫu cần thiết',
        sources: ['Source-gi-do.pdf', 'Source-gi-do.docx'],
    },
    {
        content:
            'Tôi hiểu câu hỏi của bạn. Theo tài liệu hướng dẫn, có một số điểm quan trọng cần lưu ý:\n\n✓ Đảm bảo tính đầy đủ của hồ sơ\n✓ Tuân thủ đúng quy trình\n✓ Nộp đúng thời hạn quy định\n✓ Chuẩn bị các giấy tờ liên quan\n\nBạn có cần tôi giải thích thêm về bất kỳ điểm nào không?',
        sources: ['Source-gi-do.pdf'],
    },
];

export interface FileItem {
    id: string;
    name: string;
    type: string;
    size: string;
    selected: boolean;
}

export const mockFiles: FileItem[] = [
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
