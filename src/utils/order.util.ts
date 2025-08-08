export const getOrderStatusColor = (status: string) => {
  switch (status) {
    case "Hoàn thành": return "bg-green-500 hover:bg-green-600 text-white";
    default: return "bg-gray-200 hover:bg-gray-200";
  }
}