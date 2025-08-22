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

export const getImportLogStatusColor = (status: string) => {
  switch (status) {
    case "success": return "bg-green-500 hover:bg-green-600 text-white";
    case "failed": return "bg-red-500 hover:bg-red-600 text-white";
    case "UPDATE": return "bg-green-500 hover:bg-green-500 text-white";
    case "IMPORT": return "bg-yellow-300 hover:bg-yellow-300";
    default: return "bg-gray-200 hover:bg-gray-200";
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

type Result = {
  code: string;
  status: "UPDATE" | "IMPORT";
};

/**
 * Compare meta of recordA with recordB
 * @param metaA - list of meta to compare (example: record after)
 * @param metaB - list of meta original (example: record before)
 * @returns list of results with code (ma_dh) and status (update | import)
 */
export const compareMeta = (metaA: any[] | null | undefined, metaB: any[] | null | undefined, type: string): Result[] => {
  if (!Array.isArray(metaA)) {
    throw new Error("Dữ liệu không hợp lệ. Vui lòng kiểm tra lại!");
  }
  if (!Array.isArray(metaB)) {
    throw new Error("Dữ liệu không hợp lệ. Vui lòng kiểm tra lại!");
  }

  const results: Result[] = [];
  const mapB = new Map(metaB.map((item) => [type === 'order' ? item.ma_dh : item.ma_khach_hang, item]));

  for (const itemA of metaA) {
    const itemB = mapB.get(type === 'order' ? itemA.ma_dh : itemA.ma_khach_hang);

    if (!itemB) {
      results.push({
        code: type === 'order' ? itemA.ma_dh : itemA.ma_khach_hang,
        status: "IMPORT",
      });
    } else {
      const isDifferent = Object.keys(itemA).some(
        (key) => JSON.stringify(itemA[key]) !== JSON.stringify(itemB[key])
      );

      if (isDifferent) {
        results.push({
          code: type === 'order' ? itemA.ma_dh : itemA.ma_khach_hang,
          status: "UPDATE",
        });
      }
    }
  }

  return results;
};
