import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JSX } from "react/jsx-runtime";
import { UserRound } from "lucide-react";

export default function CustomerDetailPage() {
  const userInfo = {
    name: "Bùi Thị Hạnh",
    customerId: "CUSN12185",
  };

  const personalInfo = {
    dob: "1990-05-15",
    gender: "Nam",
    phone: "0904500014",
    email: "trantientuan@email.com",
    customerGroup: "Bán lẻ",
    customerCode: "CUSN12185",
    description: "Khách hàng VIP, thường xuyên mua hàng",
    tags: ["VIP", "Khách quen"],
  };

  const purchaseInfo = {
    totalSpent: "979.000₫",
    totalOrders: "2",
    lastPurchaseDate: "2024-01-15",
    totalProducts: "3",
    returnedProducts: "0",
    currentDebt: "0₫",
  };

  const purchaseHistory = [
    {
      orderCode: "#ORD-001",
      date: "2024-01-15",
      amount: "30.319.000₫",
      status: "Hoàn thành",
    },
  ];

  const sellingInfo = {
    defaultPricePolicy: "Giá bán lẻ",
    customerDiscount: "5%",
    defaultPaymentMethod: "Chuyển khoản",
  };

  const loyaltyPointsInfo = {
    currentPoints: "97",
    currentRank: "Bạc",
    expiryDate: "2024-12-31",
    pointsToNextRank: "103",
  };

  // Helper function to render info items
  const renderInfoItem = (label: string, value: string | JSX.Element) => (
    <div className="flex flex-col gap-1 py-2 text-[15px]">
      <span className="text-sm text-gray-500 font-normal">{label}</span>
      {typeof value === "string" ? (
        <span className="text-sm font-medium text-gray-800">{value}</span>
      ) : (
        value
      )}
    </div>
  );

  return (
    <div className="px-10 py-6 space-y-6 text-[15px] text-gray-800">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <Button variant="ghost" className="p-0 text-sm text-gray-600 hover:bg-transparent hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Quay lại</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{userInfo.name}</h1>
            <p className="text-sm text-gray-500">Mã khách hàng: {userInfo.customerId}</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2 border-gray-300 text-gray-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M16.732 3.732a2.5 2.5 0 013.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Cập nhật
          </Button>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6 px-0 py-1 relative z-12">
          {/* Thông tin cá nhân */}
          <Card>
            <CardHeader className="flex flex-row justify-between items-center pb-2 px-6 pt-6">
              <div className="flex items-center space-x-2">
                <UserRound className="w-7 h-7 text-gray-700" />
                <CardTitle className="text-base font-semibold text-gray-900 text-[17pt]">Thông tin cá nhân</CardTitle>
              </div>
              <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-700">Cập nhật</Button>
            </CardHeader>
            <CardContent className="p-6 pt-4 grid grid-cols-1 md:grid-cols-2 gap-x-12">
              <div>
                {renderInfoItem("Ngày sinh", personalInfo.dob)}
                {renderInfoItem("Giới tính", personalInfo.gender)}
                {renderInfoItem("Số điện thoại", personalInfo.phone)}
                {renderInfoItem("Email", personalInfo.email)}
              </div>
              <div>
                {renderInfoItem("Nhóm khách hàng", <Badge className="bg-blue-100 text-blue-600">{personalInfo.customerGroup}</Badge>)}
                {renderInfoItem("Mã khách hàng", personalInfo.customerCode)}
                {renderInfoItem("Mô tả", personalInfo.description)}
                {renderInfoItem("Tags", (
                  <div className="flex space-x-2">
                    {personalInfo.tags.map((tag, index) => (
                      <Badge key={index} className="bg-gray-100 text-gray-800 hover:bg-gray-200">{tag}</Badge>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Thông tin mua hàng */}
          <Card className="bg-white rounded-lg shadow-sm border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between p-6 pb-2">
              <CardTitle className="text-base font-semibold text-gray-900 text-[17pt]">Thông tin mua hàng</CardTitle>
              <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-700">Cập nhật</Button>
            </CardHeader>
            <CardContent className="p-6 pt-4 grid grid-cols-1 md:grid-cols-2 gap-x-12 text-1,5xl">
              <div>
                {renderInfoItem("Tổng chi tiêu", <span className="font-semibold">{purchaseInfo.totalSpent}</span>)}
                {renderInfoItem("Tổng S.L đơn hàng", purchaseInfo.totalOrders)}
                {renderInfoItem("Ngày cuối cùng mua hàng", purchaseInfo.lastPurchaseDate)}
              </div>
              <div>
                {renderInfoItem("Tổng S.L sản phẩm đã mua", purchaseInfo.totalProducts)}
                {renderInfoItem("Tổng S.L sản phẩm hoàn trả", purchaseInfo.returnedProducts)}
                {renderInfoItem("Công nợ hiện tại", purchaseInfo.currentDebt)}
              </div>
            </CardContent>
          </Card>

          {/* Lịch sử mua hàng */}
          <Card className="lg:col-span-3 p-6 bg-white border border-[#E4E4E7] rounded-[8px] shadow-sm flex flex-col gap-5 w-full ">
            <div className="flex flex-row items-center justify-between items-center">
              <h2 className="text-xl font-semibold text-[#09090B]">Lịch sử mua hàng</h2>
              <Button variant="link" className="text-blue-600 px-0">Cập nhật</Button>
            </div>
            <div className="relative border border-[#E4E4E7] rounded-lg px-4 py-3 h-[82px] w-full">
              <p className="absolute left-4 top-[16px] font-medium text-sm">#ORD-001</p>
              <p className="absolute left-4 top-[42px] text-sm text-gray-500">2024-01-15</p>
              <p className="absolute right-4 top-[16px] font-medium text-sm text-right">30.319.000₫</p>
              <div className="absolute right-4 top-[42px] bg-[#18181B] text-white text-xs font-semibold px-3 py-[2px] rounded-full">
                Hoàn thành
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="w-full max-w-md px-0 py-1 relative z-12 space-y-8">
          {/* Thông tin gợi ý khi bán hàng */}
          <Card className="bg-white rounded-lg shadow-sm border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between p-6 pb-2">
              <CardTitle className="text-base font-semibold text-gray-900 text-[17pt]">Thông tin gợi ý khi bán hàng</CardTitle>
              <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-700">Cập nhật</Button>
            </CardHeader>
            <CardContent className="p-6 pt-4">
              {renderInfoItem("Chính sách giá mặc định", sellingInfo.defaultPricePolicy)}
              {renderInfoItem("Chiết khấu khách hàng", sellingInfo.customerDiscount)}
              {renderInfoItem("Hình thức thanh toán mặc định", sellingInfo.defaultPaymentMethod)}
            </CardContent>
          </Card>

          {/* Thông tin tích điểm */}
          <Card className="bg-white rounded-lg shadow-sm border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between p-6 pb-2">
              <CardTitle className="text-base font-semibold text-gray-900 text-[17pt]">Thông tin tích điểm</CardTitle>
              <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-700">Chi tiết</Button>
            </CardHeader>
            <CardContent className="p-6 pt-4">
              {renderInfoItem("Điểm hiện tại", loyaltyPointsInfo.currentPoints)}
              {renderInfoItem("Hạng hiện tại", loyaltyPointsInfo.currentRank)}
              {renderInfoItem("Ngày hết hạn thẻ", loyaltyPointsInfo.expiryDate)}
              {renderInfoItem("Giá trị còn lại để lên hạng", loyaltyPointsInfo.pointsToNextRank)}
            </CardContent>
          </Card>
        </div>
      </div>
    </div >
  );
}