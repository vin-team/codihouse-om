import { useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/hooks/redux";
import { orderService } from "@/services/order.service";

export default function ColumnOptions({ className, visibleColumns, onToggle }: { className: string, visibleColumns: Map<string, boolean>, onToggle: (column: string) => void }) {

  const toggleColumn = (column: string) => {
    onToggle(column);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn(className, "h-10 w-full sm:w-24")}>
          Hiển thị cột
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Hiển thị cột</h4>
          <div className="space-y-1">
            {Array.from(visibleColumns.keys()).map((column) => (
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={visibleColumns.get(column)}
                  onCheckedChange={() => toggleColumn(column)}
                />
                <span className="text-sm">{orderService.translateColumn(column)}</span>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
} 