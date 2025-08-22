"use client"

import * as React from "react"
import {
  Building2,
  ChevronRight,
  House,
  Import,
  Logs,
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import router from "next/dist/client/router"
import Link from "next/link"
import { authService } from "@/services/auth.service"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"

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
      {
        title: "Import",
        url: "/import",
        icon: <Import />,
        items: [
          {
            title: "Logs",
            url: "/logs",
            icon: <Logs />,
          }
        ]
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
        {data.navMain.map((item) => {
          if (item.items) {
            return (<Collapsible
              defaultOpen
              key={item.title}
              title={item.title}
              className="group/collapsible">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    className={`w-full p-4 py-6 rounded-lg text-gray-500 ${isActive(item.url) ? '!bg-blue-100 !text-blue-600' : ''}`}>
                    <CollapsibleTrigger className="flex items-center gap-4 w-full">
                      <Link href={item.url}>
                        <div className="flex items-center gap-4">
                          {item.icon}
                          <span className="text-base">{item.title}</span>
                        </div>
                      </Link>
                      <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </CollapsibleTrigger>
                  </SidebarMenuButton>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((sub) => (
                        <SidebarMenuSubItem key={sub.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={isActive(sub.url)}
                            className={`w-full p-4 py-6 rounded-lg text-gray-500 ${isActive(sub.url) ? '!bg-blue-100 !text-blue-600' : ''}`}>
                            <Link href={sub.url}>
                              <div className="flex items-center gap-4">
                                {sub.icon}
                                <span className="text-base">{sub.title}</span>
                              </div>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </SidebarMenu>
            </Collapsible>)
          }

          return (
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
          )
        })}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
