'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  
} from "@/components/ui/sidebar";
import CustomFooter from "./Footer/CustomFooter";

export function AppSidebar() {
  return (
    <Sidebar className="min-w-[64px] transition-all duration-300 border-r border-gray-200">
      
      <SidebarHeader className="flex items-center justify-between p-2">
        <span className="text-sm font-semibold">Menú</span>
        
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>

      <SidebarFooter className="mb-2">
        <CustomFooter />
      </SidebarFooter>

    </Sidebar>
  );
}
