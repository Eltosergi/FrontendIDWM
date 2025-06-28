'use client';

import {
  Button,
  SidebarMenu,
  SidebarMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
  SidebarMenuButton,
  DropdownMenuContent,
  DropdownMenuItem,
  Avatar,
  AvatarFallback,
  Skeleton,
} from "@/components";

import { ChevronUp, LogOut } from "lucide-react";
import { useSession } from 'next-auth/react';
import Link from "next/link";

import { useLogout } from "@/hooks";

function getInitials(name?: string) {
  if (!name) return "US";
  const words = name.trim().split(" ");
  const initials = words.slice(0, 2).map(w => w[0]?.toUpperCase() || "");
  return initials.join("");
}

export default function CustomFooter() {
  const { data: session, status } = useSession();
  const logout = useLogout(); // ✅ llamado una sola vez

  if (status === 'loading') {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex items-center gap-2 w-full">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-md" />
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      {status === 'authenticated' ? (
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <Avatar className="bg-primary text-white">
                  <AvatarFallback className="bg-primary text-white">
                    {getInitials(session?.user?.name ?? "Usuario Desconocido")}
                  </AvatarFallback>
                </Avatar>
                {session?.user?.name ?? "Usuario"}
                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side="top"
              className="w-[--radix-popper-anchor-width] px-8"
            >
              <DropdownMenuItem
                className="text-red-500 hover:bg-red-100"
                onClick={() => logout.mutate()} // ✅ correctamente usado
              >
                <LogOut className="w-4 h-4 mr-2 text-red-500" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      ) : (
        <Button asChild>
          <Link href="/login">
            Iniciar sesión
          </Link>
        </Button>
      )}
    </SidebarMenu>
  );
}
