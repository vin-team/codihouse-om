class OrderService {

  translateColumn = (column: string) => {
    switch (column) {
      case "customer": return "Khách hàng"
      case "customerPhone": return "Số điện thoại"
      case "customerEmail": return "Email"
      case "branch": return "Chi nhánh"
      case "salesChannel": return "Nguồn bán"
      case "amount": return "Số tiền"
      case "status": return "Trạng thái"
      case "date": return "Ngày"
      case "time": return "Giờ"
      case "note": return "Ghi chú"
    }
  }
}

export const orderService = new OrderService();