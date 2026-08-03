import { useState } from "react"
import { Menu } from "lucide-react"
import { NavLink } from "react-router-dom"

import {
  DesktopCatalogNavigation,
  MobileCatalogNavigation,
} from "@/components/layout/CatalogNavigation"
import { Logo } from "@/components/layout/Logo"
import { Button } from "@/components/ui/button"
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/whatsapp"
import { cn } from "@/lib/utils"

/** Cabecera principal con catálogo accesible en desktop y mobile. */
export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const whatsappHref = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)
  const homeClassName = ({ isActive }: { isActive: boolean }) =>
    cn(
      "relative px-4 py-2 text-sm font-medium text-white/85 hover:text-primary",
      isActive && "text-primary",
    )

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-navbar border-b border-white/5 bg-brand-black shadow-lg">
      <div className="mx-auto flex h-full max-w-screen-2xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <nav
          aria-label="Principal"
          className="hidden items-center gap-1 lg:flex"
        >
          <NavLink to="/" end className={homeClassName}>
            Inicio
          </NavLink>
          <DesktopCatalogNavigation />
          <Button
            variant="whatsapp"
            size="sm"
            className="ml-3 rounded-full"
            render={
              <a href={whatsappHref} target="_blank" rel="noreferrer">
                <WhatsAppIcon data-icon="inline-start" />
                Pedir presupuesto
              </a>
            }
          />
        </nav>

        <div className="lg:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Abrir menú de navegación"
                  className="text-white hover:bg-white/10 hover:text-white"
                />
              }
            >
              <Menu className="size-6" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-sm gap-0 overflow-y-auto p-0"
            >
              <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
              <div className="border-b p-4">
                <Logo />
              </div>
              <nav aria-label="Principal mobile" className="flex-1 p-3">
                <NavLink
                  to="/"
                  end
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "mb-1 block rounded-xl px-3 py-3 text-base font-medium hover:bg-muted",
                      isActive && "bg-accent text-accent-foreground",
                    )
                  }
                >
                  Inicio
                </NavLink>
                <MobileCatalogNavigation
                  onNavigate={() => setMobileMenuOpen(false)}
                />
              </nav>
              <div className="border-t p-4">
                <Button
                  variant="whatsapp"
                  size="lg"
                  className="w-full rounded-full"
                  render={
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <WhatsAppIcon data-icon="inline-start" />
                      Pedir presupuesto
                    </a>
                  }
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
