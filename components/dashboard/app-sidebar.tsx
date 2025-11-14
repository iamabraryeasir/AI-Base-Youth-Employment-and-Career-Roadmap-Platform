"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Bot,
  BotMessageSquare,
  Brain,
  BriefcaseBusiness,
  GraduationCap,
  Target,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItem {
  title: string;
  url: string;
  icon: React.ComponentType<any>;
}

const items: SidebarItem[] = [
  {
    title: "Profile",
    url: "/",
    icon: User,
  },

  {
    title: "Roadmap",
    url: "/roadmap",
    icon: Target,
  },
  {
    title: "CV Builder",
    url: "/cv-builder",
    icon: User,
  },
  {
    title: "Job Matches",
    url: "/job-matches",
    icon: Bot,
  },
  {
    title: "Resource Matches",
    url: "/resource-matches",
    icon: Brain,
  },
  {
    title: "Ask CareerBot",
    url: "/careerbot",
    icon: BotMessageSquare,
  },
  {
    title: "Jobs",
    url: "/jobs",
    icon: BriefcaseBusiness,
  },
  {
    title: "Resources",
    url: "/resources",
    icon: GraduationCap,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (itemUrl: string) => {
    const fullUrl = `/dashboard${itemUrl}`;
    // Root path "/" matches /dashboard or /dashboard/
    if (itemUrl === "/") {
      return pathname === "/dashboard" || pathname === "/dashboard/";
    }
    return pathname.startsWith(fullUrl);
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <h2 className="text-2xl p-3.5 font-bold">ElevateCareer</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="p-4 gap-5 font-medium">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className={`${
                  isActive(item.url)
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                }`}
              >
                <Link href={`/dashboard${item.url}`} className="block p-2">
                  <item.icon size={25} className="block" />
                  <span className="text-lg font-medium ml-2">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
