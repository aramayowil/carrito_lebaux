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
            <NavigationMenuTrigger className="bg-transparent px-4 text-white/85 hover:bg-white/10 hover:text-primary data-popup-open:bg-white/10 data-popup-open:text-primary">
              {line.nombre.replace("Línea ", "")}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="w-[min(34rem,calc(100vw-2rem))] p-3">
              <div className="mb-2 rounded-xl bg-accent/60 p-3">
                <p className="font-semibold">{line.nombre}</p>
                <p className="text-xs text-muted-foreground">
                  {line.subtitulo}
                </p>
              </div>
              <ul className="grid gap-1 sm:grid-cols-2">
                {categoriesForLine(line.slug).map((category) => {
                  const metadata = CATEGORIAS_PRODUCTO[category]
                  const Icon = metadata.icono
                  return (
                    <li key={category}>
                      <NavigationMenuLink
                        render={
                          <Link to={`/${line.slug}?categoria=${category}`} />
                        }
                      >
                        <Icon className="mt-0.5 shrink-0 text-primary" />
                        <span>
                          <span className="block font-medium">
                            {metadata.etiqueta}
                          </span>
                          <span className="block text-xs text-muted-foreground">
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
                className="mt-2 justify-center border-t pt-3 font-semibold text-primary"
              >
                Ver todo {line.nombre}
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
    <Accordion className="border-0">
      {LINEAS_PRODUCTO.map((line) => (
        <AccordionItem key={line.slug} value={line.slug}>
          <AccordionTrigger className="px-3 py-3 text-base">
            {line.nombre}
          </AccordionTrigger>
          <AccordionContent className="space-y-1 px-1">
            <Link
              to={`/${line.slug}`}
              onClick={onNavigate}
              className="block rounded-xl bg-accent px-3 py-2.5 text-sm font-semibold text-accent-foreground"
            >
              Ver toda la línea
            </Link>
            {categoriesForLine(line.slug).map((category) => {
              const metadata = CATEGORIAS_PRODUCTO[category]
              const Icon = metadata.icono
              return (
                <Link
                  key={category}
                  to={`/${line.slug}?categoria=${category}`}
                  onClick={onNavigate}
                  className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <Icon className="size-4 text-primary" />
                  {metadata.etiqueta}
                </Link>
              )
            })}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
