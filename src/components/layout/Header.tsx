import { Menu } from "lucide-react"
import { NavLink } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { WhatsAppIcon } from "@/components/ui/icons/WhatsAppIcon"
import { Logo } from "@/components/layout/Logo"
import { buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/whatsapp"
import { cn } from "@/lib/utils"

/**
 * Navbar de Lebaux — versión SIMPLIFICADA de esta primera migración.
 *
 * El proyecto anterior (carrito_responsive_actualizado) tenía acá un
 * mega-menú por línea (Modena/Herrero) con todas las tipologías/categorías
 * como panel desplegable, más un Sheet (drawer) para el menú mobile. Esa
 * parte se pospuso a propósito hasta migrar `features/products` (que es
 * quien define las categorías) — ver docs/2026-08-02-migracion-home.md.
 *
 * Lo que SÍ está acá:
 *   - Logo, clickeable como "Inicio".
 *   - Nav de escritorio con links de texto plano (sin mega-menú todavía).
 *   - CTA de WhatsApp ("Pedir presupuesto"), con la variante `whatsapp`
 *     del Button (ver components/ui/button.tsx).
 *
 * Lo que falta (a propósito, ver checklist en AGENTS.md):
 *   - Menú mobile con drawer: necesita el componente `sheet` de shadcn,
 *     que no se pudo instalar por falta de acceso de red a ui.shadcn.com
 *     en este entorno. Correr `npx shadcn@latest add sheet` y reemplazar
 *     el botón de "Menu" de abajo (hoy deshabilitado) por un <Sheet>.
 *   - Mega-menú de tipologías por línea, cuando exista `features/products`.
 */
export function Header() {
  const whatsappHref = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)

  const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
    cn(
      "relative flex items-center px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:text-primary",
      "after:absolute after:inset-x-4 after:-bottom-px after:h-0.5 after:origin-left after:scale-x-0 after:bg-primary after:transition-transform",
      "hover:after:scale-x-100",
      isActive && "text-primary after:scale-x-100",
    )

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-brand-black shadow-lg">
      <div className="mx-auto flex h-20 max-w-screen-2xl items-center justify-between px-4 sm:px-6">
        <Logo />

        {/* Navegación de escritorio.
            TODO(features/products): reemplazar los NavLink de Modena y
            Herrero por <LineNavMenu> (mega-menú con tipologías) cuando
            se migre esa feature. */}
        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          <NavLink to="/" end className={navLinkClassName}>
            Inicio
          </NavLink>
          <NavLink to="/modena" className={navLinkClassName}>
            Módena
          </NavLink>
          <NavLink to="/herrero" className={navLinkClassName}>
            Herrero
          </NavLink>

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

        {/* Botón de menú mobile.
            TODO(sheet): hoy no abre nada — falta instalar el componente
            `sheet` de shadcn (ver comentario arriba) para reemplazar esto
            por un drawer real con los mismos links + CTA de WhatsApp. */}
        <div className="flex items-center gap-1 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Abrir menú de navegación"
            className="text-white"
            disabled
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  )
}
