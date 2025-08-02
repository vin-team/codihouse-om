export type Customer = {
  code: string
  name: string
  phone: string
  email: string
  group: string
  totalSpend: number
  orders: number
  points: number
  lastPurchase: string
}

export const mockCustomers: Customer[] = [
  {
    code: "CUSN10001",
    name: "Trần Thị Mai",
    phone: "0901000001",
    email: "tranmaimai@email.com",
    group: "Bán lẻ",
    totalSpend: 1520000,
    orders: 3,
    points: 120,
    lastPurchase: "2025-07-15",
  },
  {
    code: "CUSN10002",
    name: "Nguyễn Văn Phong",
    phone: "0912345678",
    email: "nguyenphong@email.com",
    group: "Bán sỉ",
    totalSpend: 8900000,
    orders: 6,
    points: 310,
    lastPurchase: "2025-07-25",
  },
  {
    code: "CUSN10003",
    name: "Lê Thị Hạnh",
    phone: "0933333344",
    email: "lehanh@email.com",
    group: "Bán lẻ",
    totalSpend: 420000,
    orders: 1,
    points: 45,
    lastPurchase: "2025-06-30",
  },
]
