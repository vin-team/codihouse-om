export function CustomerPointsInfo({ points }: { points: any }) {
  return (
    <div className="bg-white border rounded-lg p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="text-base font-medium">Thông tin tích điểm</div>
        <button className="text-sm text-blue-600 hover:underline">Chi tiết</button>
      </div>

      <div className="text-sm text-muted-foreground grid gap-3">
        <div>
          <div className="text-[13px]">Điểm hiện tại</div>
          <div className="text-black">{points?.current || 0}</div>
        </div>
        <div>
          <div className="text-[13px]">Hạng thẻ hiện tại</div>
          <div className="text-black">{points?.rank || "—"}</div>
        </div>
        <div>
          <div className="text-[13px]">Ngày hết hạn thẻ</div>
          <div className="text-black">{points?.expire || "—"}</div>
        </div>
        <div>
          <div className="text-[13px]">Giá trị còn lại để lên hạng</div>
          <div className="text-black">{points?.toNextRank || "—"}</div>
        </div>
      </div>
    </div>
  )
}

export default CustomerPointsInfo;
