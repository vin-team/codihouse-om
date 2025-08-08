import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { userService } from "@/services/user.service";
import { roleService } from "@/services/role.service";
import { Button } from "./button";
import { LogOut } from "lucide-react";
import { clearActionState, logout } from "@/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { setLogined } from "@/slices/app";

export function MenuUser() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const actionState = useAppSelector(state => state.auth.actionState);

  const isAdmin = roleService.isAdmin();
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
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.1066 14V12.6667C11.1066 11.9594 10.8257 11.2811 10.3256 10.781C9.8255 10.281 9.14723 10 8.43998 10H4.43998C3.73274 10 3.05446 10.281 2.55436 10.781C2.05427 11.2811 1.77332 11.9594 1.77332 12.6667V14" stroke="black" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6.43998 7.33333C7.91274 7.33333 9.10665 6.13943 9.10665 4.66667C9.10665 3.19391 7.91274 2 6.43998 2C4.96722 2 3.77332 3.19391 3.77332 4.66667C3.77332 6.13943 4.96722 7.33333 6.43998 7.33333Z" stroke="black" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15.1066 13.9998V12.6664C15.1061 12.0756 14.9095 11.5016 14.5475 11.0346C14.1855 10.5677 13.6787 10.2341 13.1066 10.0864" stroke="black" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11.1066 2.08643C11.6802 2.23329 12.1886 2.56689 12.5517 3.03463C12.9147 3.50237 13.1118 4.07765 13.1118 4.66976C13.1118 5.26187 12.9147 5.83715 12.5517 6.30489C12.1886 6.77262 11.6802 7.10623 11.1066 7.25309" stroke="black" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-sm font-medium text-black">{isAdmin ? 'Quản trị viên' : 'Nhân viên'} </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="grid gap-4">
          <div className="flex flex-row items-center gap-2">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <img src={process.env.NEXT_PUBLIC_baseApiURL + '/assets/' + user.avatar + '.jpg'} alt="avatar" className="w-full h-full rounded-full" />
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
