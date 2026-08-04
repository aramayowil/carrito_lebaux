import { ArrowRight, Star } from "lucide-react"
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
import type { Producto } from "@/types"

interface FeaturedProductCardProps {
  product: Producto
}

/** Presenta un producto destacado de la Home con imagen, precios y consulta directa. */
export function FeaturedProductCard({ product }: FeaturedProductCardProps) {
  const primaryImage = getPrimaryProductImage(product)
  const { precios } = product

  return (
    <Card className="group grid h-full gap-0 overflow-hidden border border-primary/25 py-0 shadow-md transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl">
      <Link
        to={`/producto/${product.slug}`}
        className="corner-marks relative bg-white p-4 sm:p-5"
        aria-label={`Ver ${product.nombre}`}
      >
        <Badge className="absolute left-3 top-3 z-10 gap-1 text-[0.625rem] uppercase tracking-wide sm:left-4 sm:top-4 sm:text-xs">
          <Star data-icon="inline-start" className="fill-current" />
          Destacado
        </Badge>
        <ProductImage
          src={primaryImage?.url ?? ""}
          alt={primaryImage?.textoAlternativo ?? product.nombre}
          className="aspect-[4/3] w-full rounded-xl sm:rounded-2xl"
          imgClassName="transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </Link>

      <div className="flex flex-col py-4 sm:py-6">
        <CardHeader className="px-3 sm:px-5">
          <CardTitle className="line-clamp-2 text-sm font-bold tracking-tight sm:text-xl">
            <Link
              to={`/producto/${product.slug}`}
              className="hover:text-primary"
            >
              {product.nombre}
            </Link>
          </CardTitle>
          <CardDescription className="mt-1 hidden leading-6 lg:line-clamp-3">
            {product.descripcion}
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-3 flex-1 px-3 sm:mt-5 sm:px-5">
          {precios.consultarPrecio || precios.precioTarjeta === null ? (
            <p className="text-sm italic text-muted-foreground">
              Precio a consultar
            </p>
          ) : (
            <div className="space-y-3">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-xs text-muted-foreground sm:text-sm">
                  Precio
                </span>
                <span className="text-2xl font-bold text-foreground sm:text-3xl">
                  {formatProductPrice(precios.precioTarjeta)}
                </span>
                <Badge variant="secondary" className="hidden xl:inline-flex">
                  Hasta 6 cuotas sin interés
                </Badge>
              </div>

              {precios.precioContado !== null &&
                precios.precioContado < precios.precioTarjeta && (
                  <div className="rounded-xl bg-success/10 px-3 py-2">
                    <span className="block text-[0.625rem] font-semibold uppercase tracking-wide text-success sm:text-xs">
                      Contado o transferencia
                    </span>
                    <span className="mt-0.5 block text-lg font-bold text-success sm:text-xl">
                      {formatProductPrice(precios.precioContado)}
                    </span>
                  </div>
                )}
            </div>
          )}

          <Badge variant="outline" className="mt-4 hidden sm:inline-flex">
            {formatAvailableSizes(product.medidas.length)}
          </Badge>
        </CardContent>

        <CardFooter className="mt-4 px-3 sm:mt-5 sm:px-5">
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
      </div>
    </Card>
  )
}
