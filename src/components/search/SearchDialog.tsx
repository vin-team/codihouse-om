import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Search, X, Package, User, Phone, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/data.util";
import { roleService } from "@/services/role.service";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { clearSearchResult, search as searchSlice } from "@/slices/searchSlice";
import { getOrderStatusColor } from "@/utils/order.util";
import { getDateFromISOString } from "@/utils/date.util";
import Link from "next/link";
import { useToastContext } from "@/contexts/ToastContext";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { warning } = useToastContext();

  const searchState = useAppSelector((state) => state.search.requestState);
  const searchResult = useAppSelector((state) => state.search.searchResult);

  const [search, setSearch] = useState("");
  const isAdmin = roleService.isAdmin();
  const isLogined = useAppSelector(state => state.app.isLogined);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (search.trim()) {
        if (isLogined) {
          router.push(`/search?keyword=${encodeURIComponent(search.trim())}`);
        } else {
          warning("Vui lòng đăng nhập để tìm kiếm");
          router.push("/login");
        }
        onClose();
      }
    }
  }

  useEffect(() => {
    if (isOpen) {
      dispatch(searchSlice(search));
    }
  }, [search]);

  useEffect(() => {
    if (!isOpen) {
      setSearch('');
      dispatch(clearSearchResult());
    }
  }, [isOpen]);

  const renderSearchNotFound = () => {
    return (
      <div className="py-4 flex flex-col items-center space-y-2">
        <p className="text-sm text-gray-500">Không tìm thấy dữ liệu</p>
      </div>
    )
  }

  const renderSearchOrder = () => {
    const totalOrders = searchResult.orders.length;
    const slicedOrders = searchResult.orders.length > 3 ? searchResult.orders.slice(0, 3) : searchResult.orders;

    return (
      <div className="py-4 flex flex-col space-y-3">
        <h3 className="text-xs text-gray-500">ĐƠN HÀNG ({totalOrders})</h3>
        <div className="flex flex-col space-y-3">
          {totalOrders === 0 ? <>{renderSearchNotFound()}</> : slicedOrders.map((order, index) => (
            <Link href={`/orders/${order.id}`} key={index} onClick={() => onClose()}>
              <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-500" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-gray-900">{order.id}</span>
                    <Badge variant="secondary" className="text-xs">
                      {order.source}
                    </Badge>
                    {order.status === "Hoàn thành" ? (
                      <Badge className={getOrderStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    ) : (
                      <span className="text-sm text-gray-600">{order.status}</span>
                    )}
                  </div>

                  <div className="flex flex-row space-x-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{order.customer_name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>{order.customer_phone || '-'}</span>
                    </div>
                  </div>
                  {order?.products && <div className="flex items-center space-x-2">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 1L1.5 3V10C1.5 10.2652 1.60536 10.5196 1.79289 10.7071C1.98043 10.8946 2.23478 11 2.5 11H9.5C9.76522 11 10.0196 10.8946 10.2071 10.7071C10.3946 10.5196 10.5 10.2652 10.5 10V3L9 1H3Z" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M1.5 3H10.5" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8 5C8 5.53043 7.78929 6.03914 7.41421 6.41421C7.03914 6.78929 6.53043 7 6 7C5.46957 7 4.96086 6.78929 4.58579 6.41421C4.21071 6.03914 4 5.53043 4 5" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="truncate text-sm text-gray-500">{order.products}</span>
                  </div>}
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-semibold text-gray-900">{formatCurrency(order.total_price.toString())} đ</span>
                  <span className="text-sm text-gray-500">{order.date_created ? getDateFromISOString(order.date_created) : '-'}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  const renderSearchCustomer = () => {
    const totalCustomers = searchResult.customers.length;
    const slicedCustomers = searchResult.customers.length > 3 ? searchResult.customers.slice(0, 3) : searchResult.customers;

    return (
      <div className="py-4 flex flex-col space-y-3">
        <h3 className="text-xs text-gray-500">KHÁCH HÀNG ({totalCustomers})</h3>
        <div className="flex flex-col space-y-3">
          {totalCustomers === 0 ? <>{renderSearchNotFound()}</> : slicedCustomers.map((customer, index) => (
            <Link href={`/customers/${customer.id}`} key={index} onClick={() => onClose()}>
              <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-green-500" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-gray-900">{customer.first_name}</span>
                    <Badge variant="secondary" className="text-xs">{customer.code}</Badge>
                  </div>

                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex flex-row space-x-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{customer.last_name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>{customer.phone}</span>
                      </div>
                    </div>
                    <div className="flex flex-row space-x-4">
                      <div className="flex items-center space-x-2">
                        <span>Nhóm: {customer.group_title || '-'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>Chi tiêu: {formatCurrency(customer.total_expenditure.toString())} đ</span>
                      </div>
                    </div>
                  </div>
                </div>
                {isAdmin ?
                  <span className="text-sm text-gray-500">Mua cuối: {customer.last_purchase_date ? getDateFromISOString(customer.last_purchase_date) : '-'}</span> :
                  <div className='flex flex-col items-end'>
                    <p className="text-base font-semibold">Điểm: {customer.total_expenditure}</p>
                    <p className="text-xs text-gray-500">Tổng chi tiêu: {formatCurrency(customer.total_expenditure.toString())} đ</p>
                  </div>
                }
              </div>
            </Link>
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
              <X className="w-6 h-6 cursor-pointer hover:text-gray-600" onClick={() => {
                onClose();
              }} />
            </DialogTitle>
            <DialogDescription hidden></DialogDescription>
          </DialogHeader>
          {search ? (
            <div className="border-t border-gray-300">
              {renderSearchOrder()}
              {renderSearchCustomer()}
              {/* Footer */}
              <div className="border-t border-gray-200 pt-3 px-4 flex justify-between items-center text-sm text-gray-600">
                <span>Tìm thấy {searchResult.orders.length} đơn hàng, {searchResult.customers.length} khách hàng</span>
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
