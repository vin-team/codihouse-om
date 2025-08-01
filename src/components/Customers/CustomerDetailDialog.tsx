'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { Customer } from "./CustomerCard"

interface Props {
  customer: Customer
}

export function CustomerDetailDialog({ customer }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Eye className="w-4 h-4" /> Xem
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chi tiết khách hàng</DialogTitle>
          <DialogDescription>{customer.name} - {customer.code}</DialogDescription>
        </DialogHeader>
        <div className="space-y-2 text-sm">
          <div>📞 {customer.phone}</div>
          <div>✉️ {customer.email}</div>
          <div>Nhóm: {customer.group}</div>
          <div>Tổng chi tiêu: {customer.totalSpend.toLocaleString()}₫</div>
          <div>Đơn hàng: {customer.orders}</div>
          <div>Điểm tích lũy: {customer.points}</div>
          <div>Mua cuối: {customer.lastPurchase}</div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
