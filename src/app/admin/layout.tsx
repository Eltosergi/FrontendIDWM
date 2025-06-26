'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

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

  return <>{children}</>;
}
