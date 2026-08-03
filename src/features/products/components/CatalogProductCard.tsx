import { Link } from "react-router-dom"

import { ProductImage } from "@/components/media/ProductImage"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
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
    <Card className="group h-full gap-0 overflow-hidden border border-border/70 py-0 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-xl">
      <Link
        to={`/producto/${product.slug}`}
        className="corner-marks block border-b border-border/60 bg-white p-3 sm:p-4"
      >
        <ProductImage
          src={primaryImage?.url ?? ""}
          alt={primaryImage?.textoAlternativo ?? product.nombre}
          className="h-40 w-full sm:h-56"
          imgClassName="transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <CardHeader className="pt-4">
        <CardTitle className="text-sm font-semibold uppercase leading-snug sm:text-base">
          <Link to={`/producto/${product.slug}`} className="hover:text-primary">
            {product.nombre}
          </Link>
        </CardTitle>
      </CardHeader>

      <CardContent className="mt-3 flex-1 space-y-3">
        {startingPrice === null ? (
          <p className="text-sm italic text-muted-foreground">
            Precio a consultar
          </p>
        ) : (
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-xs text-muted-foreground">Desde</span>
              <span className="text-xl font-bold sm:text-2xl">
                {formatProductPrice(startingPrice.tarjeta)}
              </span>
            </div>
            {startingPrice.contado < startingPrice.tarjeta && (
              <p className="text-xs font-medium text-success sm:text-sm">
                {formatProductPrice(startingPrice.contado)} contado
              </p>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">
            {formatAvailableSizes(product.medidas.length)}
          </Badge>
          <Badge variant="outline" className="capitalize">
            {product.tipoApertura?.replaceAll("-", " ") ?? product.categoria}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="pb-4 pt-4">
        <Button
          className="w-full rounded-full"
          render={<Link to={`/producto/${product.slug}`}>Ver opciones</Link>}
        />
      </CardFooter>
    </Card>
  )
}
