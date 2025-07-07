"use client"

import * as React from "react"
import {
  IconUserEdit,
  IconMapPin,
  IconShoppingCart,
  IconHistory,
  IconInnerShadowTop,
  IconLogin,
  IconUsers,
  IconBox,
} from "@tabler/icons-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { NavUser } from "@/components/layout/dashboard/nav-user"
import { useSession } from "next-auth/react"
import Link from "next/link"
import PremiumIcon from "../../PremiunIcon"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, status } = useSession()
  const isAuthenticated = status === "authenticated"
  const role = session?.user?.role ?? "Usuario"

  const user = {
    name: session?.user?.name || "Usuario Desconocido",
    email: session?.user?.email || "Email Desconocido",
    avatar: "/avatars/shadcn.jpg",
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      {/* Encabezado con logo */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a>
                <PremiumIcon  />
                <span className="text-base font-semibold">BlackCat</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <div className="my-2 border-t border-gray-200 dark:border-gray-700" />

        {/* Mostrar loading skeleton */}
        {status === "loading" && (
          <SidebarMenu title="Cargando...">
            <SidebarMenuItem>
              <div className="animate-pulse h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-4 my-2" />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <div className="animate-pulse h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mx-4 my-2" />
            </SidebarMenuItem>
          </SidebarMenu>
        )}

        {/* No autenticado: solo mostrar “Ver Producto” */}
        {!isAuthenticated && status !== "loading" && (
          <SidebarMenu title="Producto">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/producto">
                  <IconShoppingCart className="size-5" />
                  Ver Producto
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}

        {/* Usuario autenticado */}
        {isAuthenticated && role === "User" && (
          <>
            <SidebarMenu title="Sección de Usuarios">
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/profile">
                    <IconUserEdit className="size-5" />
                    Ver Perfil
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
            </SidebarMenu>

            <div className="my-2 border-t border-gray-200 dark:border-gray-700" />

            <SidebarMenu title="Producto">
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard">
                    <IconShoppingCart className="size-5" />
                    Ver Producto
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/orders">
                    <IconHistory className="size-5" />
                    Ver Historial de Compra
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </>
        )}

        {/* Admin */}
        {isAuthenticated && role === "Admin" && (
          <SidebarMenu title="Administración">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/admin/usuarios">
                  <IconUsers className="size-5" />
                  Gestión de Usuarios
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/admin/productos">
                  <IconBox className="size-5" />
                  Gestión de Productos
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarContent>

      <SidebarFooter>
        {status === "loading" ? (
          <div className="px-4 py-2 text-sm text-muted-foreground">
            Cargando sesión...
          </div>
        ) : isAuthenticated ? (
          <NavUser user={user} />
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-accent"
          >
            <IconLogin className="size-5" />
            Iniciar Sesión
          </Link>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
