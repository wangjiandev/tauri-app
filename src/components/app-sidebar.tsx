"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  TerminalSquareIcon,
  BotIcon,
  Settings2Icon,
  LifeBuoyIcon,
  SendIcon,
  TerminalIcon,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { NavFooter } from "@/components/nav-footer";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "数据面板",
      url: "#",
      icon: <TerminalSquareIcon />,
      isActive: true,
      items: [
        {
          title: "基本信息",
          url: "/",
        },
        {
          title: "关于软件",
          url: "/about",
        },
      ],
    },
    {
      title: "字典管理",
      url: "#",
      icon: <BotIcon />,
      items: [
        {
          title: "业务字典",
          url: "#",
        },
        {
          title: "同步记录",
          url: "#",
        },
        {
          title: "订阅日志",
          url: "#",
        },
        {
          title: "系统日志",
          url: "#",
        },
      ],
    },
    {
      title: "系统管理",
      url: "#",
      icon: <Settings2Icon />,
      items: [
        {
          title: "同步周期",
          url: "#",
        },
        {
          title: "服务器设置",
          url: "/settings/server-info",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "技术支付",
      url: "#",
      icon: <LifeBuoyIcon />,
    },
    {
      title: "问题反馈",
      url: "#",
      icon: <SendIcon />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <TerminalIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
