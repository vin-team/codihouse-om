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
  const sliceBranches = branches.length > 5 ? branches.slice(0, 5) : branches;

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
          {sliceBranches.length > 0 && requestState.status !== 'loading' && sliceBranches.map((branch) => (
            <div key={branch.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{branch.title}</p>
                <p className="text-sm text-gray-500">
                  {branch?.type ? `${branch.type.toUpperCase()} • ` : ""}
                  {branch?.today_order_count || 0} đơn hôm nay
                </p>
              </div>
              {branch?.state && <Badge
                className={`${branch.state === "active" ? "bg-green-500 text-white hover:bg-green-500" : "bg-red-500 text-white hover:bg-red-500"}`}
                variant="secondary">{branch?.state?.toUpperCase()}</Badge>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}