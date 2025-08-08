'use client';

import BranchEditForm from "@/components/branches/edit/Form";
import BranchEditHeader from "@/components/branches/edit/Header";
import BranchEditStatistics from "@/components/branches/edit/Statistics";
import Loading from "@/components/Loading";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getBranch } from "@/slices/branchSlice";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BranchEdit() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const params = useParams();
  const id = params?.id;

  const requestState = useAppSelector(state => state.branch.requestState);
  const branch = useAppSelector(state => state.branch.branch);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      dispatch(getBranch(id as string));
    }
  }, [id])

  useEffect(() => {
    if (requestState.type === 'getBranch') {
      switch (requestState.status) {
        case 'loading':
          setLoading(true);
          break;
        case 'completed':
          setLoading(false);
          break;
        case 'failed':
          router.push('/branches');
          break;
      }
    }
  }, [requestState])

  if (loading || !branch) {
    return <Loading />;
  }

  return (
    <div className="min-h-full flex flex-col gap-4">
      <BranchEditHeader />
      <BranchEditForm branch={branch} />
      <BranchEditStatistics branch={branch} />
    </div>
  )
}