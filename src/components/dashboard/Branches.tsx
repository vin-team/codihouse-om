import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getBranches } from "@/slices/branchSlice";
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";

export default function Branches() {
  const dispatch = useAppDispatch();
  const branches = useAppSelector(state => state.branch.branches);
  const requestState = useAppSelector(state => state.branch.requestState);

  useEffect(() => {
    dispatch(getBranches());
  }, []);

  return (
    <Card className="py-4">
      <CardContent className="p-0 px-4 h-full">
        {requestState.status === 'loading' && (
          <div className="flex items-center justify-center h-full mx-auto my-auto">
            <LoaderCircle className='w-16 h-16 text-blue-400 animate-spin' />
          </div>
        )}
        <div className="space-y-4">
          {branches.length > 0 && requestState.status !== 'loading' && branches.map((branch) => (
            <div key={branch.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{branch.title}</p>
                <p className="text-sm text-gray-500">{branch.status} • {branch.today_order_count} đơn hôm nay</p>
              </div>
              <Badge className={`${branch.status === "Offline" ? "bg-gray-100" : "bg-black text-white hover:bg-black"}`} variant="secondary">{branch.status}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}