"use client"

import * as React from "react"
import {
  Building2,
  House,
  Package,
  User,
  Users,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import router from "next/dist/client/router"
import Link from "next/link"
import { authService } from "@/services/auth.service"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const isAdmin = authService.isAdmin();
  const data = {
    navMain: isAdmin ? [
      {
        title: "Tổng quan",
        url: "/dashboard",
        icon: <House />,
      },
      {
        title: "Đơn hàng",
        url: "/orders",
        icon: <Package />,
      },
      {
        title: "Khách hàng",
        url: "/customers",
        icon: <Users />,
      },
      {
        title: "Chi nhánh",
        url: "/branches",
        icon: <Building2 />,
      },
      {
        title: "Người dùng",
        url: "/users",
        icon: <User />,
      },
    ] : [
      {
        title: "Tổng quan",
        url: "/dashboard",
        icon: <House />,
      },
    ],
  }

  const isActive = (path: string) => {
    return router.pathname.startsWith(path);
  };

  return (
    <Sidebar {...props} className="pt-16">
      <SidebarContent className="p-4">
        {data.navMain.map((item) => (
          <SidebarMenu key={item.title}>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.url)}
                className={`w-full p-4 py-6 rounded-lg text-gray-500 ${isActive(item.url) ? '!bg-blue-100 !text-blue-600' : ''}`} >
                <Link href={item.url}>
                  <div className="flex items-center gap-4">
                    {item.icon}
                    <span className="text-base">{item.title}</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
