import UsersEditForm from "@/components/users/edit/Form";
import UsersEditChangePassword from "@/components/users/edit/ChangePassword";
import UsersEditHeader from "@/components/users/edit/Header";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserById } from "@/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import Loading from "@/components/Loading";

export default function UsersEdit() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const params = useParams();
  const id = params?.id;
  const user = useAppSelector(state => state.user.user);
  const requestState = useAppSelector(state => state.user.actionState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
    }
  }, [id])

  useEffect(() => {
    if (requestState.type === 'getUserById') {
      switch (requestState.status) {
        case 'loading':
          setLoading(true);
          break;
        case 'completed':
          setLoading(false);
          break;
        case 'failed':
          router.push('/users');
          break;
      }
    }
  }, [requestState])

  if (loading || !user) {
    return <Loading />;
  }

  return (
    <div className="min-h-full flex flex-col gap-4">
      <UsersEditHeader />
      <UsersEditForm user={user} />
      <UsersEditChangePassword user={user} />
    </div>
  )
}