"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"
import { Button } from "./button"
import { DateRange } from "react-day-picker"
import { useState } from "react"
import { endOfMonth, format, startOfMonth, subDays, subMonths } from "date-fns"
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover"
import { vi } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { Combobox } from "./combobox"
import { cn } from "@/lib/utils"

export function RangeCalendar({ className, dateRange, onChangeDateRange }: {
  className?: string,
  dateRange: DateRange | undefined,
  onChangeDateRange: (dateRange: DateRange | { from?: string; to?: string; }) => void
}) {
  const getQuickDateRange = (option: string): DateRange | undefined => {
    const today = new Date()
    switch (option) {
      case 'today':
        return { from: today, to: today }
      case 'yesterday':
        const yesterday = subDays(today, 1)
        return { from: yesterday, to: yesterday }
      case 'last7days':
        return { from: subDays(today, 6), to: today }
      case 'last30days':
        return { from: subDays(today, 29), to: today }
      case 'last90days':
        return { from: subDays(today, 89), to: today }
      case 'last365days':
        return { from: subDays(today, 364), to: today }
      case 'lastmonth':
        const lastMonth = subMonths(today, 1)
        return { from: startOfMonth(lastMonth), to: endOfMonth(lastMonth) }
      default:
        return undefined
    }
  }

  const handleQuickDateSelect = (option: string) => {
    const range = getQuickDateRange(option)
    onChangeDateRange(range || { from: "", to: "" })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("w-80 h-10 justify-start text-left font-normal", className)}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(new Date(dateRange.from), "dd/MM", { locale: vi })} -{" "}
                {format(new Date(dateRange.to), "dd/MM", { locale: vi })}
              </>
            ) : (
              format(new Date(dateRange.from), "dd/MM/yyyy", { locale: vi })
            )
          ) : (
            <span>Khoảng thời gian</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-white border border-gray-200 rounded-lg z-10" align="start">
        <div className="p-3 border-b">
          <div className="text-sm font-medium mb-2">Chọn nhanh</div>
          <div className="flex flex-1">
            <Combobox
              options={[
                { value: 'today', label: 'Hôm nay' },
                { value: 'yesterday', label: 'Hôm qua' },
                { value: 'last7days', label: '7 ngày qua' },
                { value: 'last30days', label: '30 ngày qua' },
                { value: 'last90days', label: '90 ngày qua' },
                { value: 'last365days', label: '365 ngày qua' },
                { value: 'lastmonth', label: 'Tháng trước' },
              ]}
              value=""
              onChange={handleQuickDateSelect}
              placeholder='Chọn nhanh'
            />
          </div>
        </div>
        <Calendar
          className="w-full mb-1"
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={(dateRange) => {
            onChangeDateRange(dateRange || { from: "", to: "" })
          }}
          numberOfMonths={1}
          disabled={(date) => date > new Date()}
        />
      </PopoverContent>
    </Popover>
  )
}
