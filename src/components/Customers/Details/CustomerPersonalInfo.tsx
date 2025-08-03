import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"

export function CustomerPersonalInfo() {
  return (
    <Card
      className="w-full border border-[#E4E4E7] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] rounded-[8px] p-6"
    >
      <CardHeader className="flex flex-row items-start justify-between p-0 mb-4">
        <CardTitle className="text-base flex items-center gap-2">
          <span className="text-lg">👤</span> Thông tin cá nhân
        </CardTitle>
        <Button variant="link" className="text-primary px-0 h-auto">Cập nhật</Button>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-y-4 gap-x-8 p-0 text-sm">
        <div>
          <p className="text-muted-foreground">Ngày sinh</p>
          <p className="text-foreground font-medium">1990-05-15</p>
        </div>
        <div>
          <p className="text-muted-foreground">Nhóm khách hàng</p>
          <p className="text-foreground font-medium text-primary">Bán lẻ</p>
        </div>
        <div>
          <p className="text-muted-foreground">Giới tính</p>
          <p className="text-foreground font-medium">Nam</p>
        </div>
        <div>
          <p className="text-muted-foreground">Mã khách hàng</p>
          <p className="text-foreground font-medium">CUSN12185</p>
        </div>
        <div>
          <p className="text-muted-foreground">Số điện thoại</p>
          <p className="text-foreground font-medium">0904500014</p>
        </div>
        <div>
          <p className="text-muted-foreground">Mô tả</p>
          <p className="text-foreground font-medium">
            Khách hàng VIP, thường xuyên mua hàng
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">Email</p>
          <p className="text-foreground font-medium">trantientoan@email.com</p>
        </div>
        <div>
          <p className="text-muted-foreground">Tags</p>
          <div className="flex gap-2 mt-1">
            <span className="bg-muted text-xs px-2 py-0.5 rounded-full">VIP</span>
            <span className="bg-muted text-xs px-2 py-0.5 rounded-full">Khách quen</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
