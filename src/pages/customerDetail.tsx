import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CustomerDetailPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Bùi Thị Hạnh</h1>
          <p className="text-sm text-gray-500">Mã khách hàng: CUSN12185</p>
        </div>
        <Button variant="outline">Cập nhật</Button>
      </div>

      {/* Thông tin */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Thông tin cá nhân */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Thông tin cá nhân</span>
              <Button variant="link" className="text-blue-600">Cập nhật</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm text-gray-600">
            <div className="grid grid-cols-2 gap-2">
              <div>Ngày sinh: <span className="font-medium">1990-05-15</span></div>
              <div>Giới tính: <span className="font-medium">Nữ</span></div>
              <div>Số điện thoại: <span className="font-medium">0904500014</span></div>
              <div>Email: <span className="font-medium">trantientoan@email.com</span></div>
              <div>Nhóm khách hàng: <span className="text-blue-600 font-medium">Bán lẻ</span></div>
              <div>Mã khách hàng: <span className="font-medium">CUSN12185</span></div>
            </div>
            <div className="mt-2">
              Mô tả: <span className="font-medium">Khách hàng VIP, thường xuyên mua hàng</span>
            </div>
            <div>
              Tags: 
              <Badge variant="secondary" className="ml-2">VIP</Badge>
              <Badge variant="secondary" className="ml-2">Khách quen</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Thông tin gợi ý */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Thông tin gợi ý khi bán hàng</span>
              <Button variant="link" className="text-blue-600">Cập nhật</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600 space-y-1">
            <div>Chính sách giá mặc định: <strong>Giá bán lẻ</strong></div>
            <div>Chiết khấu khách hàng: <strong>5%</strong></div>
            <div>Hình thức thanh toán mặc định: <strong>Chuyển khoản</strong></div>
          </CardContent>
        </Card>
      </div>

      {/* Mua hàng & điểm */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Thông tin mua hàng */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Thông tin mua hàng</span>
              <Button variant="link" className="text-blue-600">Cập nhật</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600 grid grid-cols-2 gap-2">
            <div>Tổng chi tiêu: <strong>979.000₫</strong></div>
            <div>Tổng SL đơn hàng: <strong>2</strong></div>
            <div>Tổng SL sản phẩm đã mua: <strong>3</strong></div>
            <div>Tổng SL hoàn trả: <strong>0</strong></div>
            <div>Ngày cuối cùng mua hàng: <strong>2024-01-15</strong></div>
            <div>Công nợ hiện tại: <strong>0₫</strong></div>
          </CardContent>
        </Card>

        {/* Tích điểm */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Thông tin tích điểm</span>
              <Button variant="link" className="text-blue-600">Chi tiết</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600 space-y-1">
            <div>Điểm hiện tại: <strong>97</strong></div>
            <div>Hạng thẻ hiện tại: <strong>Bạc</strong></div>
            <div>Ngày hết hạn thẻ: <strong>2024-12-31</strong></div>
            <div>Giá trị còn lại để lên hạng: <strong>103</strong></div>
          </CardContent>
        </Card>
      </div>

      {/* Lịch sử mua hàng */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Lịch sử mua hàng</span>
            <Button variant="link" className="text-blue-600">Cập nhật</Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-600">
          <div className="flex justify-between items-center border rounded p-3">
            <div>
              <div className="font-medium">#ORD-001</div>
              <div className="text-muted-foreground">2024-01-15</div>
            </div>
            <div className="text-right">
              <div className="font-medium">30.319.000₫</div>
              <Badge className="bg-green-100 text-green-700">Hoàn thành</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
