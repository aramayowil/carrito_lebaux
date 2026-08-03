import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

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
  return (
    <NavigationMenu className="max-w-none text-white" align="center">
      <NavigationMenuList>
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
    <Accordion className="rounded-2xl border-white/10 bg-brand-graphite px-2 text-white">
      {LINEAS_PRODUCTO.map((line) => (
        <AccordionItem
          key={line.slug}
          value={line.slug}
          className="border-white/10 data-open:bg-white/5"
        >
          <AccordionTrigger className="px-3 py-3 text-base text-white hover:no-underline **:data-[slot=accordion-trigger-icon]:text-primary">
            {line.nombre}
          </AccordionTrigger>
          <AccordionContent className="space-y-1 px-1 [&_a]:no-underline">
            {categoriesForLine(line.slug).map((category) => {
              const metadata = CATEGORIAS_PRODUCTO[category]
              const Icon = metadata.icono
              return (
                <Link
                  key={category}
                  to={`/${line.slug}?categoria=${category}`}
                  onClick={onNavigate}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/75 hover:bg-white/10 hover:text-white"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  {metadata.etiqueta}
                </Link>
              )
            })}
            <Link
              to={`/${line.slug}`}
              onClick={onNavigate}
              className="group mt-1 flex items-center justify-between rounded-xl border border-white/10 px-3 py-3 text-white hover:text-primary"
            >
              <span>
                <span className="block text-[0.625rem] font-medium uppercase tracking-widest text-white/45">
                  Catálogo completo
                </span>
                <span className="mt-0.5 block text-sm font-semibold">
                  Ver todos los productos
                </span>
              </span>
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="size-4" aria-hidden="true" />
              </span>
            </Link>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
