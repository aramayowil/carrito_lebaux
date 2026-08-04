import { useEffect, useRef, useState } from "react"
import { House, Menu, X } from "lucide-react"
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
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/whatsapp"
import { cn } from "@/lib/utils"

/** Cabecera principal con catálogo accesible en desktop y mobile. */
export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [navbarVisible, setNavbarVisible] = useState(true)
  const lastScrollY = useRef(0)
  const animationFrame = useRef<number | null>(null)
  const whatsappHref = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)

  useEffect(() => {
    lastScrollY.current = window.scrollY

    const handleScroll = () => {
      if (animationFrame.current !== null) return

      animationFrame.current = window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        const scrollDelta = currentScrollY - lastScrollY.current

        if (currentScrollY <= 80) {
          setNavbarVisible(true)
          lastScrollY.current = currentScrollY
        } else if (Math.abs(scrollDelta) >= 8) {
          setNavbarVisible(scrollDelta < 0)
          lastScrollY.current = currentScrollY
        }

        animationFrame.current = null
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)

      if (animationFrame.current !== null) {
        window.cancelAnimationFrame(animationFrame.current)
      }
    }
  }, [])

  const handleMobileMenuChange = (open: boolean) => {
    setMobileMenuOpen(open)

    if (open) {
      setNavbarVisible(true)
    }
  }
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-navbar transform-gpu border-b border-white/5 bg-brand-black shadow-lg transition-transform duration-300 ease-out will-change-transform",
        navbarVisible ? "translate-y-0" : "-translate-y-full",
      )}
      onFocusCapture={() => setNavbarVisible(true)}
    >
      <div className="mx-auto flex h-full max-w-screen-2xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <nav
          aria-label="Principal"
          className="hidden items-center gap-1 lg:flex"
        >
          <DesktopCatalogNavigation />
          <Button
            variant="whatsapp"
            size="lg"
            className="ml-3 rounded-full"
            render={
              <a href={whatsappHref} target="_blank" rel="noreferrer">
                <WhatsAppIcon data-icon="inline-start" />
                Pedí tu presupuesto
              </a>
            }
          />
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <Button
            variant="whatsapp"
            size="lg"
            className="size-11 rounded-xl px-0 sm:w-auto sm:px-4"
            render={
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                aria-label="Pedir presupuesto por WhatsApp"
              />
            }
          >
            <WhatsAppIcon aria-hidden="true" />
            <span className="hidden sm:inline">Presupuesto</span>
          </Button>

          <Sheet open={mobileMenuOpen} onOpenChange={handleMobileMenuChange}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-lg"
                  aria-label="Abrir menú de navegación"
                  className="size-11 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-primary/10 hover:text-primary"
                />
              }
            >
              <Menu className="size-6" />
            </SheetTrigger>
            <SheetContent
              side="right"
              showCloseButton={false}
              data-mobile-navigation=""
              className="w-[min(92vw,24rem)] max-w-none gap-0 border-l border-white/10 bg-brand-black p-0 text-white"
            >
              <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
              <div className="flex h-navbar shrink-0 items-center justify-between border-b border-white/10 px-4">
                <Logo />
                <SheetClose
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-xl border border-white/10 bg-white/5 text-white hover:bg-primary/10 hover:text-primary"
                      aria-label="Cerrar menú de navegación"
                    />
                  }
                >
                  <X className="size-5" />
                </SheetClose>
              </div>
              <nav
                aria-label="Principal mobile"
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 [color-scheme:dark]"
              >
                <div className="mb-6">
                  <p className="mb-2 px-1 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-white/40">
                    Navegación
                  </p>
                  <NavLink
                    to="/"
                    end
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-xl border border-transparent px-3 py-3 text-sm font-medium text-white/75 hover:border-white/10 hover:bg-white/5 hover:text-white",
                        isActive &&
                          "border-primary/25 bg-primary/10 text-primary",
                      )
                    }
                  >
                    <House className="size-4" aria-hidden="true" />
                    Inicio
                  </NavLink>
                </div>

                <div>
                  <p className="mb-2 px-1 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-white/40">
                    Elegí una línea
                  </p>
                  <MobileCatalogNavigation
                    onNavigate={() => setMobileMenuOpen(false)}
                  />
                </div>
              </nav>
              <div className="shrink-0 border-t border-white/10 bg-brand-graphite/60 p-4">
                <Button
                  variant="whatsapp"
                  size="lg"
                  className="w-full rounded-xl"
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
