# Toast Notification System

Hệ thống toast notification để hiển thị các thông báo ở góc trên phải màn hình.

## Cách sử dụng

### 1. Trong component bất kỳ

```tsx
import { useToastContext } from '@/contexts/ToastContext';

const MyComponent = () => {
  const { success, error, warning, info } = useToastContext();

  const handleSuccess = () => {
    success('Thành công!', 'Thao tác đã được thực hiện thành công.');
  };

  const handleError = () => {
    error('Lỗi!', 'Đã xảy ra lỗi trong quá trình xử lý.');
  };

  const handleWarning = () => {
    warning('Cảnh báo!', 'Vui lòng kiểm tra lại thông tin.');
  };

  const handleInfo = () => {
    info('Thông tin!', 'Đây là thông tin quan trọng.');
  };

  return (
    <div>
      <button onClick={handleSuccess}>Success Toast</button>
      <button onClick={handleError}>Error Toast</button>
      <button onClick={handleWarning}>Warning Toast</button>
      <button onClick={handleInfo}>Info Toast</button>
    </div>
  );
};
```

### 2. Các loại toast

- **success**: Thông báo thành công (màu xanh)
- **error**: Thông báo lỗi (màu đỏ)
- **warning**: Thông báo cảnh báo (màu vàng)
- **info**: Thông báo thông tin (màu xanh dương)

### 3. Tham số

Mỗi hàm toast nhận 3 tham số:
- `title`: Tiêu đề toast (bắt buộc)
- `message`: Nội dung chi tiết (tùy chọn)
- `duration`: Thời gian hiển thị (tùy chọn, mặc định 5000ms)

```tsx
// Toast với thời gian tùy chỉnh (10 giây)
success('Thành công!', 'Thao tác hoàn tất.', 10000);

// Toast không tự động đóng
success('Thành công!', 'Thao tác hoàn tất.', 0);
```

### 4. Tùy chỉnh

Bạn có thể tùy chỉnh:
- Vị trí hiển thị trong `ToastContainer`
- Màu sắc và style trong `ToastComponent`
- Thời gian hiển thị mặc định trong `useToast` hook

## Cấu trúc file

- `src/hooks/useToast.ts`: Hook quản lý state toast
- `src/contexts/ToastContext.tsx`: Context provider
- `src/components/ui/toast.tsx`: Component hiển thị từng toast
- `src/components/ui/toast-container.tsx`: Container chứa tất cả toast
- `src/pages/_app.tsx`: Đã được cấu hình sẵn

## Lưu ý

- Toast sẽ tự động đóng sau thời gian `duration`
- Có thể đóng thủ công bằng cách click vào nút X
- Toast được hiển thị ở góc trên phải màn hình với z-index cao
- Hỗ trợ nhiều toast cùng lúc 