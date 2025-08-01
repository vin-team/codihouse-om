'use client'

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Props {
  onSearch?: (value: string) => void
  onGroupChange?: (value: string) => void
  onRankChange?: (value: string) => void
}

export function CustomerFilter({ onSearch, onGroupChange, onRankChange }: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Input
        placeholder="Tìm theo tên, SDT, mã khách hàng, email..."
        onChange={(e) => onSearch?.(e.target.value)}
      />
      <Select onValueChange={(value) => onGroupChange?.(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Tất cả nhóm" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả nhóm</SelectItem>
          <SelectItem value="retail">Bán lẻ</SelectItem>
          <SelectItem value="wholesale">Bán sỉ</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => onRankChange?.(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Tất cả hạng thẻ" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả hạng thẻ</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
