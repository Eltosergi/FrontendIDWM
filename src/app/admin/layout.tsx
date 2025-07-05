'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { AppSidebar } from "@/components/layout/dashboard/app-sidebar"
import { SiteHeader } from "@/components/layout/dashboard/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get('denied') === 'true') {
      toast.error('No tienes permiso para acceder a esta sección.');

      const newPath = window.location.pathname;
      router.replace(newPath);
    }
  }, [searchParams, router]);

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
      )
}
