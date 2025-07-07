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
import { useAuth } from '@/hooks/useAuth';
import { getSession } from 'next-auth/react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, status } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const checkToken = () => async () => {
      const session = await getSession();
      const token = session?.accessToken;
      if (searchParams.get('denied') === 'true') {
        toast.error('No tienes permiso para acceder a esta sección.');

        const newPath = window.location.pathname;
        router.replace(newPath);
      }
    }
    checkToken();
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
