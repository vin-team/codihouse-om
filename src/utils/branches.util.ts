export const getTypeColor = (type: string) => {
  return type === "Online" ? "default" : "secondary"
}

export const getStatusColor = (status: string) => {
  return status === "active" ? "outline" : "destructive"
}