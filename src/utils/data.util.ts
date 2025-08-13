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

export const isValidVietnamPhone = (rawPhone: string): boolean => {
  if (!rawPhone) return false;
  const phone = rawPhone.toString().trim().replace(/[\s.-]/g, "");
  const regex = /^(?:\+?84|0)(?:3|5|7|8|9)\d{8}$/;
  return regex.test(phone);
}

export const isValidEmail = (rawEmail: string): boolean => {
  if (!rawEmail) return false;
  const email = rawEmail.toString().trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return regex.test(email);
}