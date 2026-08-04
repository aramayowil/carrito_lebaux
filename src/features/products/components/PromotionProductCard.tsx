import { ArrowRight, Sparkles } from "lucide-react"
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
  formatProductPrice,
  getPrimaryProductImage,
} from "@/features/products/lib/product-card-formatters"
import type { Producto } from "@/types"

interface PromotionProductCardProps {
  product: Producto
}

/** Resume una promoción de la Home dentro del carrusel de ofertas. */
export function PromotionProductCard({ product }: PromotionProductCardProps) {
  const primaryImage = getPrimaryProductImage(product)
  const { precios } = product
  const lineLabel = product.linea === "modena" ? "Módena" : "Herrero"

  return (
    <Card className="group h-full gap-0 overflow-hidden border border-primary/25 bg-linear-to-br from-card via-card to-accent/35 py-0 shadow-md transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl">
      <Link
        to={`/producto/${product.slug}`}
        className="corner-marks relative border-b border-border/60 bg-white p-3 sm:p-4"
        aria-label={`Ver ${product.nombre}`}
      >
        <Badge className="absolute left-3 top-3 z-10 gap-1 text-[0.625rem] uppercase tracking-widest sm:left-4 sm:top-4 sm:text-xs">
          <Sparkles data-icon="inline-start" />
          {precios.porcentajeDescuento}% OFF
        </Badge>
        <ProductImage
          src={primaryImage?.url ?? ""}
          alt={primaryImage?.textoAlternativo ?? product.nombre}
          className="h-48 w-full rounded-xl min-[360px]:h-36 sm:h-48 sm:rounded-2xl xl:h-56"
          imgClassName="transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <CardHeader className="px-4 pt-4 sm:px-5 sm:pt-5">
        <div className="mb-1.5 flex items-center justify-between gap-3 sm:mb-2">
          <Badge
            variant="secondary"
            className="text-[0.625rem] uppercase tracking-widest sm:text-xs"
          >
            {lineLabel}
          </Badge>
          <span className="hidden text-xs capitalize text-muted-foreground sm:inline">
            {product.categoria}
          </span>
        </div>
        <CardTitle className="line-clamp-2 text-sm font-semibold uppercase leading-snug tracking-tight sm:text-base">
          <Link to={`/producto/${product.slug}`} className="hover:text-primary">
            {product.nombre}
          </Link>
        </CardTitle>
        <CardDescription className="mt-1 hidden leading-6 md:line-clamp-2">
          {product.descripcion}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-3 flex-1 px-4 sm:mt-4 sm:px-5">
        {precios.consultarPrecio || precios.precioTarjeta === null ? (
          <p className="text-sm italic text-muted-foreground">
            Precio a consultar
          </p>
        ) : (
          <div className="space-y-2">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-xs text-muted-foreground sm:text-sm">
                Ahora
              </span>
              <span className="text-xl font-bold text-foreground sm:text-2xl">
                {formatProductPrice(
                  precios.precioContado ?? precios.precioTarjeta,
                )}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-muted-foreground line-through">
                {formatProductPrice(precios.precioTarjeta)}
              </span>
              <Badge className="hidden bg-success/10 text-success sm:inline-flex">
                Ahorro asegurado
              </Badge>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="px-4 pb-4 pt-3 sm:px-5 sm:pb-5 sm:pt-4">
        <Button
          size="lg"
          className="w-full rounded-xl"
          render={
            <Link to={`/producto/${product.slug}`}>
              Ver oferta
              <ArrowRight data-icon="inline-end" />
            </Link>
          }
        />
      </CardFooter>
    </Card>
  )
}
