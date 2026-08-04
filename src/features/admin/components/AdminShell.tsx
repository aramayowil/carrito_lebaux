import { useState } from "react"
import {
  Award,
  Building2,
  LayoutDashboard,
  LogOut,
  Menu,
  PackageSearch,
  Settings,
  SquareStack,
} from "lucide-react"
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useAdminAuthStore } from "@/features/admin/store/use-admin-auth-store"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { to: "/admin", label: "Panel", icon: LayoutDashboard, end: true },
  { to: "/admin/productos", label: "Productos", icon: PackageSearch },
  { to: "/admin/lineas", label: "Líneas", icon: SquareStack },
  { to: "/admin/obras", label: "Obras", icon: Building2 },
  { to: "/admin/beneficios", label: "Beneficios", icon: Award },
  { to: "/admin/sitio", label: "Datos del sitio", icon: Settings },
] as const

function AdminNavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={"end" in item ? item.end : false}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              isActive &&
                "bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary",
            )
          }
        >
          <item.icon className="size-4 shrink-0" aria-hidden="true" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

/** Shell compartido por todas las páginas autenticadas de `/admin`. */
export function AdminShell() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const cerrarSesion = useAdminAuthStore((state) => state.cerrarSesion)
  const navigate = useNavigate()

  const handleLogout = () => {
    cerrarSesion()
    navigate("/admin/login", { replace: true })
  }

  return (
    <div className="flex min-h-svh bg-muted/30">
      <aside className="hidden w-64 shrink-0 border-r bg-background md:flex md:flex-col">
        <div className="flex h-16 items-center gap-2 border-b px-5">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
            Lebaux
          </span>
          <span className="text-xs text-muted-foreground">/ admin</span>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <AdminNavLinks />
        </div>
        <div className="border-t p-3">
          <Button
            variant="ghost"
            className="w-full justify-start rounded-xl text-muted-foreground hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut data-icon="inline-start" />
            Cerrar sesión
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between gap-3 border-b bg-background px-4 md:px-6">
          <div className="flex items-center gap-2 md:hidden">
            <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
              <SheetTrigger
                render={
                  <Button variant="ghost" size="icon">
                    <Menu />
                  </Button>
                }
              />
              <SheetContent side="left" className="w-72">
                <SheetTitle className="sr-only">
                  Menú del panel admin
                </SheetTitle>
                <div className="flex h-16 items-center border-b px-5">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                    Lebaux / admin
                  </span>
                </div>
                <div className="flex-1 overflow-y-auto p-3">
                  <AdminNavLinks onNavigate={() => setMobileNavOpen(false)} />
                </div>
                <div className="border-t p-3">
                  <Button
                    variant="ghost"
                    className="w-full justify-start rounded-xl text-muted-foreground hover:text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut data-icon="inline-start" />
                    Cerrar sesión
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <span className="text-sm font-semibold">Panel admin</span>
          </div>

          <div className="hidden text-sm text-muted-foreground md:block">
            Panel de administración de contenido
          </div>

          <Button
            variant="outline"
            size="sm"
            className="rounded-xl"
            render={<Link to="/" target="_blank" rel="noreferrer" />}
          >
            Ver sitio
          </Button>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <div className="mx-auto w-full max-w-5xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
