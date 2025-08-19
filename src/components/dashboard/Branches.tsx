"use client"
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getBranches } from "@/slices/branchSlice";
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { getOrderCountByBranches } from "@/slices/orderSlice";
import { useRouter } from "next/navigation";

export default function Branches() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const branches = useAppSelector(state => state.branch.branches);
  const requestState = useAppSelector(state => state.branch.requestState);
  const sliceBranches = branches.length > 5 ? branches.slice(0, 5) : branches;
  const orderCountByBranches = useAppSelector(state => state.order.orderCountByBranches);

  const handleBranchClick = (branchId: number) => {
    router.push(`/branches/edit/${branchId}`);
  };

  useEffect(() => {
    dispatch(getBranches());
  }, []);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    if (branches.length > 0) {
      dispatch(getOrderCountByBranches({ branch_ids: branches.map(branch => branch.id), year: year, month: month, day: day }));
    }
  }, [branches])

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
              <button role="button" onClick={() => handleBranchClick(branch.id)} className="flex flex-col items-start">
                <p className="font-medium">{branch.title}</p>
                <p className="text-sm text-gray-500">
                  {branch?.type ? `${branch.type.toUpperCase()} • ` : ""}
                  {orderCountByBranches.find(item => item.branch_id === branch.id)?.count || 0} đơn hôm nay
                </p>
              </button>
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