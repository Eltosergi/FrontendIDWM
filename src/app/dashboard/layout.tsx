'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { SidebarProvider, AppSidebar, SidebarTrigger } from "@/components";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get('denied') === 'true') {
      toast.error('Los administradores no pueden ingresar al dashboard.');
      const newPath = window.location.pathname;
      router.replace(newPath);
    }
  }, [searchParams, router]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <SidebarTrigger/>
        <AppSidebar />
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
