export const deepCloneObject = (obj: any) => {
  return JSON.parse(JSON.stringify(obj))
}

export const formatCurrency = (value: string): string => {
  const numeric = value.replace(/\D/g, "");
  if (!numeric) return "";
  return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "Hoàn thành": return "default"
    case "Đang xử lý": return "secondary"
    case "Chờ thanh toán": return "outline"
    case "Đã hủy": return "destructive"
    default: return "outline"
  }
}