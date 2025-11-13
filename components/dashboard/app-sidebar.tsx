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
  Brain,
  BriefcaseBusiness,
  GraduationCap,
  Grid2X2,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItem {
  title: string;
  url: string;
  icon: React.ComponentType<any>;
}

const items = [
  {
    title: "Overview",
    url: "/",
    icon: Grid2X2,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
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
];

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (itemUrl: string) => {
    const fullUrl = `/dashboard${itemUrl}`;
    // Exact match for root, partial match for other routes
    if (itemUrl === "/") {
      return pathname === fullUrl;
    }
    return pathname.startsWith(fullUrl);
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <h2 className="text-xl p-3 font-bold">ElevateCareer</h2>
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
