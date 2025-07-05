"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { IconShoppingCart } from "@tabler/icons-react"
import { useSession } from "next-auth/react"

export function SiteHeader() {
  const { data: session, status } = useSession()

  const role = session?.user?.role ?? null
  const isAuthenticated = status === "authenticated"
  const canSeeCart = !isAuthenticated || role !== "Admin"

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Tienda Virtual</h1>

        <div className="ml-auto flex items-center gap-2">
          {canSeeCart && (
            <Button
              variant="ghost"
              asChild
              size="sm"
              className="hidden sm:flex items-center gap-2"
            >
              <a
                href="/basket"
                className="dark:text-foreground flex items-center gap-1"
              >
                <IconShoppingCart className="w-5 h-5" />
                Carrito
              </a>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
