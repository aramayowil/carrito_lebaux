import { ArrowRight } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { productos } from "@/data/mock"
import {
  CATEGORIAS_PRODUCTO,
  LINEAS_PRODUCTO,
  ORDEN_CATEGORIAS,
} from "@/features/products/data/catalog-metadata"
import type { SlugLineaProducto } from "@/types"

function categoriesForLine(line: SlugLineaProducto) {
  const present = new Set(
    productos
      .filter((product) => product.linea === line)
      .map((product) => product.categoria),
  )
  return ORDEN_CATEGORIAS.filter((category) => present.has(category))
}

/** Navegación de catálogo para escritorio basada en NavigationMenu de shadcn. */
export function DesktopCatalogNavigation() {
  const { pathname } = useLocation()

  return (
    <NavigationMenu className="max-w-none text-white" align="center">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            active={pathname === "/"}
            render={<Link to="/" />}
            className="h-9 rounded-xl px-4 text-white/85 hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:hover:bg-primary/10 data-[active=true]:focus:bg-primary/10"
          >
            Inicio
          </NavigationMenuLink>
        </NavigationMenuItem>

        {LINEAS_PRODUCTO.map((line) => (
          <NavigationMenuItem key={line.slug}>
            <NavigationMenuTrigger className="rounded-xl bg-transparent px-4 text-white/85 hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary data-open:bg-primary/10 data-open:text-primary data-open:hover:bg-primary/10 data-open:hover:text-primary data-open:focus:bg-primary/10 data-popup-open:bg-primary/10 data-popup-open:text-primary data-popup-open:hover:bg-primary/10 data-popup-open:hover:text-primary">
              {line.nombre.replace("Línea ", "")}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="w-[min(36rem,calc(100vw-2rem))] rounded-2xl bg-brand-graphite p-4 text-white">
              <ul className="grid gap-2 sm:grid-cols-2">
                {categoriesForLine(line.slug).map((category) => {
                  const metadata = CATEGORIAS_PRODUCTO[category]
                  const Icon = metadata.icono
                  return (
                    <li key={category}>
                      <NavigationMenuLink
                        render={
                          <Link to={`/${line.slug}?categoria=${category}`} />
                        }
                        className="items-start gap-3 rounded-xl border border-transparent p-3 text-white hover:border-white/10 hover:bg-white/10 focus:border-white/10 focus:bg-white/10"
                      >
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                          <Icon className="size-4" aria-hidden="true" />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-medium">
                            {metadata.etiqueta}
                          </span>
                          <span className="mt-0.5 block text-xs leading-5 text-white/55">
                            {metadata.descripcionCorta}
                          </span>
                        </span>
                      </NavigationMenuLink>
                    </li>
                  )
                })}
              </ul>
              <NavigationMenuLink
                render={<Link to={`/${line.slug}`} />}
                className="group mt-3 justify-between rounded-xl border border-white/10 px-2 py-3 text-white hover:bg-transparent hover:text-primary focus:bg-transparent focus:text-primary"
              >
                <span>
                  <span className="block text-[0.625rem] font-medium uppercase tracking-widest text-white/45">
                    Catálogo completo
                  </span>
                  <span className="mt-0.5 block font-semibold">
                    Ver todos los productos
                  </span>
                </span>
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

interface MobileCatalogNavigationProps {
  onNavigate: () => void
}

/** Navegación táctil del catálogo para el Sheet mobile. */
export function MobileCatalogNavigation({
  onNavigate,
}: MobileCatalogNavigationProps) {
  return (
    <Accordion className="rounded-2xl border-white/10 bg-white/[0.04] text-white">
      {LINEAS_PRODUCTO.map((line) => (
        <AccordionItem
          key={line.slug}
          value={line.slug}
          className="border-white/10 data-open:bg-transparent"
        >
          <AccordionTrigger className="px-4 py-4 text-base font-semibold text-white hover:no-underline aria-expanded:text-primary **:data-[slot=accordion-trigger-icon]:text-primary">
            {line.nombre}
          </AccordionTrigger>
          <AccordionContent className="grid grid-cols-2 gap-2 px-0 [&_a]:no-underline [&_a]:hover:text-white">
            {categoriesForLine(line.slug).map((category) => {
              const metadata = CATEGORIAS_PRODUCTO[category]
              const Icon = metadata.icono
              return (
                <Link
                  key={category}
                  to={`/${line.slug}?categoria=${category}`}
                  onClick={onNavigate}
                  className="flex min-h-14 items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-2 text-xs font-medium text-white/75 transition-colors hover:border-primary/30 hover:bg-primary/10"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <Icon className="size-3.5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 leading-4">{metadata.etiqueta}</span>
                </Link>
              )
            })}
            <Link
              to={`/${line.slug}`}
              onClick={onNavigate}
              className="group col-span-2 mt-1 flex items-center justify-between rounded-xl border border-primary/25 bg-primary/5 px-3 py-3 text-white transition-colors hover:bg-primary/10"
            >
              <span>
                <span className="block text-[0.625rem] font-medium uppercase tracking-widest text-white/45">
                  Catálogo completo
                </span>
                <span className="mt-0.5 block text-sm font-semibold">
                  Ver todos los productos
                </span>
              </span>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="size-4" aria-hidden="true" />
              </span>
            </Link>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
