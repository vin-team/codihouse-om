import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function CustomerPointsInfo() {
  return (
    <Card className="p-6">
      <CardHeader className="p-0 mb-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Thông tin tích điểm</h3>
        <a href="#" className="text-sm text-blue-600 hover:underline">Chi tiết</a>
      </CardHeader>
      <CardContent className="grid gap-y-2 text-sm p-0">
        <div><p className="text-muted-foreground">Điểm hiện tại</p><p>97</p></div>
        <div><p className="text-muted-foreground">Hạng thẻ hiện tại</p><p>Bạc</p></div>
        <div><p className="text-muted-foreground">Ngày hết hạn thẻ</p><p>2024-12-31</p></div>
        <div><p className="text-muted-foreground">Giá trị còn lại để lên hạng</p><p>103</p></div>
      </CardContent>
    </Card>
  )
}
