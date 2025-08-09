"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/redux";
import { authService } from "@/services/auth.service";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname() || '';

  const isLogined = useAppSelector(state => state.app.isLogined);
  const isAdmin = authService.isAdmin();

  const pathAuth = ['/login', '/reset-password', '/dashboard'];
  const pathUser = ['/orders', '/customers', '/branches', '/users'];

  useEffect(() => {
    if (pathAuth.includes(pathname)) {
      return;
    }

    if (!isLogined) {
      router.replace("/login");
    } else {
      const isExactListPage = pathUser.some(path => pathname === path);

      if (!isAdmin && isExactListPage) {
        router.replace("/dashboard");
        return;
      }
    }

  }, [isLogined, router, pathname]);

  return <>{children}</>;
}