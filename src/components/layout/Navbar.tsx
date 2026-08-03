import { useState } from "react"
import { Menu } from "lucide-react"
import { NavLink } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { WhatsAppIcon } from "@/components/ui/icons/WhatsAppIcon"
import { Logo } from "@/components/layout/Logo"
import { buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/whatsapp"
import { cn } from "@/lib/utils"

/**
 * Navbar de Lebaux — versión SIMPLIFICADA de esta primera migración
 * (rehecha a partir de la Header.tsx original: mismo contenido, renombrada
 * y con el menú mobile ya resuelto).
 *
 * El proyecto anterior (carrito_responsive_actualizado) tenía acá un
 * mega-menú por línea (Modena/Herrero) con todas las tipologías/categorías
 * como panel desplegable. Esa parte se pospuso a propósito hasta migrar
 * `features/products` (que es quien define las categorías) — ver
 * docs/2026-08-02-migracion-home.md.
 *
 * Lo que SÍ está acá:
 *   - Logo, clickeable como "Inicio".
 *   - Nav de escritorio con links de texto plano (sin mega-menú todavía).
 *   - CTA de WhatsApp ("Pedir presupuesto"), con la variante `whatsapp`
 *     del Button.
 *   - Menú mobile con drawer (`Sheet`, mismos links + mismo CTA). Antes
 *     era un botón deshabilitado: el componente `sheet` de shadcn no se
 *     podía instalar por falta de acceso de red a ui.shadcn.com en el
 *     entorno viejo. Ya está en `components/ui/sheet.tsx`, así que se
 *     conecta acá.
 *
 * Lo que falta (a propósito, ver checklist en AGENTS.md):
 *   - Mega-menú de tipologías por línea, cuando exista `features/products`
 *     (tanto en el nav de escritorio como dentro del Sheet mobile).
 */

const NAV_LINKS = [
  { to: "/", label: "Inicio", end: true },
  { to: "/modena", label: "Módena", end: false },
  { to: "/herrero", label: "Herrero", end: false },
] as const

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const whatsappHref = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)

  const desktopLinkClassName = ({ isActive }: { isActive: boolean }) =>
    cn(
      "relative flex items-center px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:text-primary",
      "after:absolute after:inset-x-4 after:-bottom-px after:h-0.5 after:origin-left after:scale-x-0 after:bg-primary after:transition-transform",
      "hover:after:scale-x-100",
      isActive && "text-primary after:scale-x-100",
    )

  const mobileLinkClassName = ({ isActive }: { isActive: boolean }) =>
    cn(
      "rounded-xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted",
      isActive && "bg-accent text-accent-foreground",
    )

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-navbar border-b border-white/5 bg-brand-black shadow-lg">
      <div className="mx-auto flex h-full max-w-screen-2xl items-center justify-between px-4 sm:px-6">
        <Logo />

        {/* Navegación de escritorio.
            TODO(features/products): reemplazar los NavLink de Modena y
            Herrero por <LineNavMenu> (mega-menú con tipologías) cuando
            se migre esa feature. */}
        <nav
          aria-label="Principal"
          className="hidden items-center gap-1 lg:flex"
        >
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={desktopLinkClassName}
            >
              {label}
            </NavLink>
          ))}

          <Button
            variant="whatsapp"
            size="sm"
            className="ml-3 rounded-full"
            render={
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2"
              >
                <WhatsAppIcon className="h-4 w-4" />
                <span className="font-semibold">Pedir presupuesto</span>
              </a>
            }
          />
        </nav>

        {/* Menú mobile: drawer que se abre desde la derecha, con los
            mismos links del nav de escritorio + el mismo CTA de WhatsApp. */}
        <div className="flex items-center gap-1 lg:hidden">
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
              <Menu className="h-6 w-6" />
            </SheetTrigger>

            <SheetContent side="right" className="flex flex-col gap-0 p-0">
              {/* Sin título visible: el drawer ya se identifica por su
                  contenido (logo + nav), pero el Dialog subyacente necesita
                  un nombre accesible. */}
              <SheetTitle className="sr-only">Menú de navegación</SheetTitle>

              <div className="border-b border-border px-4 py-4">
                <Logo />
              </div>

              <nav
                aria-label="Principal (mobile)"
                className="flex flex-1 flex-col gap-1 p-3"
              >
                {NAV_LINKS.map(({ to, label, end }) => (
                  <SheetClose
                    key={to}
                    render={
                      <NavLink
                        to={to}
                        end={end}
                        className={mobileLinkClassName}
                      />
                    }
                  >
                    {label}
                  </SheetClose>
                ))}
              </nav>

              <div className="border-t border-border p-4">
                <Button
                  variant="whatsapp"
                  size="lg"
                  className="w-full rounded-full"
                  render={
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      <span className="font-semibold">Pedir presupuesto</span>
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
