import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { userService } from "@/services/user.service";
import { Button } from "./button";
import { LogOut, User } from "lucide-react";
import { clearActionState, logout } from "@/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { setLogined } from "@/slices/app";
import { authService } from "@/services/auth.service";

export function MenuUser() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const actionState = useAppSelector(state => state.auth.actionState);

  const isAdmin = authService.isAdmin();
  const user = userService.getUserLocal();

  useEffect(() => {
    if (actionState?.type === 'logout') {
      switch (actionState?.status) {
        case 'loading':
          break;
        case 'failed':
          break;
        case 'completed':
          dispatch(clearActionState());
          dispatch(setLogined(false))
          router.push('/login');
          break;
      }
    }
  }, [actionState])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className='flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100'>
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
          <span className="text-sm font-medium text-black">{isAdmin ? 'Quản trị viên' : 'Nhân viên'} </span>
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64">
        <div className="grid gap-4">
          <div className="flex flex-row items-center gap-2">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              {user.avatar ? <img src={process.env.NEXT_PUBLIC_baseApiURL + '/assets/' + user.avatar + '.jpg'} alt="avatar" className="w-full h-full rounded-full" /> : <User />}
            </div>
            <div className="space-y-2">
              <h4 className="leading-none font-medium">{[user.first_name, user.last_name].join(' ')}</h4>
              <p className="text-muted-foreground text-sm">{user.email}</p>
            </div>
          </div>
          <div className="grid gap-2">
            <Button variant="outline"
              onClick={() => {
                dispatch(logout());
              }}>
              <LogOut />
              Đăng xuất
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
