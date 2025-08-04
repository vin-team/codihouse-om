import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Search, X, Package, User, Phone, Mail } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/redux";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const role = useAppSelector(state => state.app.role);
  const isAdmin = role === 'admin';

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (search.trim()) {
        router.push(`/search?keyword=${encodeURIComponent(search.trim())}`);
        onClose();
      }
    }
  }


  const renderSearchOrder = () => {
    const orders = [
      {
        id: "#SP-123",
        source: "SAPO",
        status: "Chờ xử lý",
        customerName: "Trần Thị Bình",
        phone: "0987654321",
        products: "Samsung Galaxy S24, Tai nghe Samsung Buds",
        totalAmount: "26.010.000₫",
        orderDate: "2024-01-16"
      },
      {
        id: "#ORD-003",
        source: "SHOPIFY",
        status: "Hoàn thành",
        customerName: "Hoàng Văn Em",
        phone: "0934567890",
        products: "AirPods Pro 2, Sạc không dây MagSafe",
        totalAmount: "14.300.000₫",
        orderDate: "2024-01-13"
      }
    ];

    return (
      <div className="py-4 flex flex-col space-y-3">
        <h3 className="text-xs text-gray-500">ĐƠN HÀNG (2)</h3>
        <div className="space-y-3">
          {orders.map((order, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-500" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-gray-900">{order.id}</span>
                  <Badge variant="secondary" className="text-xs rounded-full">
                    {order.source}
                  </Badge>
                  {order.status === "Hoàn thành" ? (
                    <Badge className="bg-green-100 text-green-700 text-xs hover:bg-green-100">
                      {order.status}
                    </Badge>
                  ) : (
                    <span className="text-sm text-gray-600">{order.status}</span>
                  )}
                </div>

                <div className="flex flex-row space-x-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{order.customerName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>{order.phone}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 1L1.5 3V10C1.5 10.2652 1.60536 10.5196 1.79289 10.7071C1.98043 10.8946 2.23478 11 2.5 11H9.5C9.76522 11 10.0196 10.8946 10.2071 10.7071C10.3946 10.5196 10.5 10.2652 10.5 10V3L9 1H3Z" stroke="#6B7280" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M1.5 3H10.5" stroke="#6B7280" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M8 5C8 5.53043 7.78929 6.03914 7.41421 6.41421C7.03914 6.78929 6.53043 7 6 7C5.46957 7 4.96086 6.78929 4.58579 6.41421C4.21071 6.03914 4 5.53043 4 5" stroke="#6B7280" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span className="truncate text-sm text-gray-500">{order.products}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-semibold text-gray-900">{order.totalAmount}</span>
                <span className="text-sm text-gray-500">{order.orderDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderSearchCustomer = () => {
    const customers = [
      {
        name: "Nguyễn Văn An",
        code: "CUSN12185",
        salesperson: "Trần Thị Bình",
        phone: "0987654321",
        group: "Bán lẻ",
        spending: "979.000₫",
        lastPurchase: "2025-01-15",
        points: 97,
        orders: 2,
      },
      {
        name: "Nguyễn Thị Lan",
        code: "CUSN12186",
        salesperson: "Hoàng Văn Em",
        phone: "0934567890",
        group: "Bán lẻ",
        spending: "1.250.000₫",
        lastPurchase: "2024-01-15",
        points: 245,
        orders: 5,
      }
    ];

    return (
      <div className="py-4 flex flex-col space-y-3">
        <h3 className="text-xs text-gray-500">KHÁCH HÀNG (2)</h3>
        <div className="space-y-3">
          {customers.map((customer, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-green-500" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-medium text-gray-900">{customer.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {customer.code}
                  </Badge>
                </div>

                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex flex-row space-x-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{customer.salesperson}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>{customer.phone}</span>
                    </div>
                  </div>
                  <div className="flex flex-row space-x-4">
                    <div className="flex items-center space-x-2">
                      <span>Nhóm: {customer.group}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>Chi tiêu: {customer.spending}</span>
                    </div>
                  </div>
                </div>
              </div>
              {isAdmin ?
                <span className="text-sm text-gray-500">Mua cuối: {customer.lastPurchase}</span> :
                <div className='flex flex-col items-end'>
                  <p className="text-base font-semibold">Điểm: {customer.points}</p>
                  <p className="text-xs text-gray-500">Tổng chi tiêu: {customer.orders}</p>
                </div>
              }
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <form>
        <DialogContent className="sm:max-w-[750px]">
          <DialogHeader>
            <DialogTitle className="flex flex-row items-center space-x-2">
              <Search className="w-6 h-6" />
              <div className="flex-1 px-2">
                <input
                  type="text"
                  value={search}
                  placeholder={"Tìm kiếm theo mã đơn hàng, tên khách hàng, số điện thoại..."}
                  onChange={handleSearch}
                  onKeyDown={handleKeyDown}
                  className="block w-full pl-4 pr-20 h-10 border border-gray-300 rounded-lg text-sm font-medium placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-100 focus:border-gray-100"
                />
              </div>
              <X className="w-6 h-6 cursor-pointer hover:text-gray-600" />
            </DialogTitle>
            <DialogDescription hidden></DialogDescription>
          </DialogHeader>
          {search ? (
            <div className="border-t border-gray-300">
              {renderSearchOrder()}
              {renderSearchCustomer()}

              {/* Footer */}
              <div className="border-t border-gray-200 pt-3 px-4 flex justify-between items-center text-sm text-gray-600">
                <span>Tìm thấy 2 đơn hàng, 2 khách hàng</span>
                <span>Nhấn Enter để xem chi tiết</span>
              </div>
            </div>) : (
            <div className="border-t border-gray-300">
              <div className="py-4 flex flex-col items-center space-y-2">
                <Search className="w-10 h-10" color="#cccccc" />
                <p className="text-2xl font-bold">Tìm kiếm đơn hàng & khách hàng</p>
                <p className="text-sm text-gray-500">Tìm kiếm đơn hàng & khách hàng</p>
              </div>
            </div>
          )}
          <DialogFooter hidden></DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
