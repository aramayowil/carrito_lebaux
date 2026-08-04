import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

import { ProductImage } from "@/components/media/ProductImage"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  formatAvailableSizes,
  formatProductPrice,
  getPrimaryProductImage,
} from "@/features/products/lib/product-card-formatters"
import { obtenerPrecioInicial } from "@/features/products/lib/pricing"
import type { Producto } from "@/types"

interface CatalogProductCardProps {
  product: Producto
}

/** Resume una tipología dentro de las grillas de catálogo y enlaza su ficha completa. */
export function CatalogProductCard({ product }: CatalogProductCardProps) {
  const primaryImage = getPrimaryProductImage(product)
  const startingPrice = obtenerPrecioInicial(product)

  return (
    <Card className="group h-full gap-0 overflow-hidden rounded-2xl border border-border/70 py-0 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-xl sm:rounded-3xl">
      <Link
        to={`/producto/${product.slug}`}
        aria-label={`Ver ${product.nombre}`}
        className="corner-marks block border-b border-border/60 bg-white p-2 sm:p-4"
      >
        <ProductImage
          src={primaryImage?.url ?? ""}
          alt={primaryImage?.textoAlternativo ?? product.nombre}
          className="aspect-square w-full rounded-xl sm:rounded-2xl"
          imgClassName="transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <CardHeader className="px-3 pt-3 sm:px-5 sm:pt-5">
        <CardTitle className="line-clamp-2 min-h-9 text-xs font-semibold uppercase leading-snug sm:min-h-11 sm:text-base">
          <Link to={`/producto/${product.slug}`} className="hover:text-primary">
            {product.nombre}
          </Link>
        </CardTitle>
        <CardDescription className="mt-1 hidden text-xs leading-5 md:line-clamp-2">
          {product.descripcion}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-2 flex-1 space-y-2 px-3 sm:mt-3 sm:space-y-3 sm:px-5">
        {startingPrice === null ? (
          <p className="text-xs italic text-muted-foreground sm:text-sm">
            Precio a consultar
          </p>
        ) : (
          <div className="space-y-1">
            <div className="flex flex-col gap-0.5 sm:block">
              <span className="text-[0.625rem] uppercase tracking-wide text-muted-foreground sm:mr-2 sm:text-xs sm:normal-case sm:tracking-normal">
                Desde
              </span>
              <span className="text-lg font-bold leading-none sm:text-2xl">
                {formatProductPrice(startingPrice.tarjeta)}
              </span>
            </div>
            {startingPrice.contado < startingPrice.tarjeta && (
              <p className="text-[0.625rem] font-medium leading-4 text-success sm:text-sm">
                {formatProductPrice(startingPrice.contado)} contado
              </p>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-[0.625rem] sm:text-xs">
            <span className="sm:hidden">
              {product.medidas.length}{" "}
              {product.medidas.length === 1 ? "medida" : "medidas"}
            </span>
            <span className="hidden sm:inline">
              {formatAvailableSizes(product.medidas.length)}
            </span>
          </Badge>
          <Badge variant="outline" className="hidden capitalize sm:inline-flex">
            {product.tipoApertura?.replaceAll("-", " ") ?? product.categoria}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="px-3 pb-3 pt-3 sm:px-5 sm:pb-5">
        <Button
          size="sm"
          className="h-9 w-full rounded-xl px-3 text-xs sm:h-10 sm:text-sm"
          render={<Link to={`/producto/${product.slug}`} />}
        >
          <span className="sm:hidden">Ver</span>
          <span className="hidden sm:inline">Ver opciones</span>
          <ArrowRight data-icon="inline-end" />
        </Button>
      </CardFooter>
    </Card>
  )
}
