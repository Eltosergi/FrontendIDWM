// app/profile/layout.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Asume que usas Shadcn/ui
import { SidebarInset, SidebarProvider } from '@/components';
import { AppSidebar } from '@/components/layout/dashboard/app-sidebar';
import { SiteHeader } from '@/components/layout/dashboard/site-header';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
          <AppSidebar variant="inset" />
          <SidebarInset>
            <SiteHeader />
            {children}
            
            
          </SidebarInset>
        </SidebarProvider>
    
  );
}