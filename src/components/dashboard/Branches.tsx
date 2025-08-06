import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

export default function Branches() {
  const branches = [
    {
      name: "Chi nhánh Quận 1",
      status: "Offline",
      orderCount: 45
    },
    {
      name: "Chi nhánh Online",
      status: "Online",
      orderCount: 78
    },
    {
      name: "Chi nhánh Quận 7",
      status: "Offline",
      orderCount: 32
    },
  ]

  return (
    <Card className="py-4">
      <CardContent className="p-0 px-4">
        <div className="space-y-4">
          {branches.map((branch) => (
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{branch.name}</p>
                <p className="text-sm text-gray-500">{branch.status} • {branch.orderCount} đơn hôm nay</p>
              </div>
              <Badge className={`${branch.status === "Offline" ? "bg-gray-100" : "bg-black text-white hover:bg-black"}`} variant="secondary">{branch.status}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}