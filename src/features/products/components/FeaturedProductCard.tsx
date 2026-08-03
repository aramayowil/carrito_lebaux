import { Star } from "lucide-react"

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
  buildProductInquiryMessage,
  formatAvailableSizes,
  formatProductPrice,
  getPrimaryProductImage,
} from "@/features/products/lib/product-card-formatters"
import { buildWhatsAppUrl } from "@/lib/whatsapp"
import type { Producto } from "@/types"

interface FeaturedProductCardProps {
  product: Producto
}

/** Presenta un producto destacado de la Home con imagen, precios y consulta directa. */
export function FeaturedProductCard({ product }: FeaturedProductCardProps) {
  const primaryImage = getPrimaryProductImage(product)
  const { precios } = product
  const inquiryHref = buildWhatsAppUrl(buildProductInquiryMessage(product))

  return (
    <Card className="group grid h-full gap-0 overflow-hidden border border-primary/30 py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:grid-cols-2">
      <div className="corner-marks relative min-h-64 bg-white p-6">
        <Badge className="absolute left-4 top-4 z-10 gap-1 uppercase tracking-wide">
          <Star data-icon="inline-start" className="fill-current" />
          Destacado
        </Badge>
        <ProductImage
          src={primaryImage?.url ?? ""}
          alt={primaryImage?.textoAlternativo ?? product.nombre}
          className="h-64 w-full sm:h-full sm:min-h-80"
        />
      </div>

      <div className="flex flex-col py-6">
        <CardHeader>
          <CardTitle className="text-xl font-bold tracking-tight">
            {product.nombre}
          </CardTitle>
          <CardDescription className="leading-relaxed">
            {product.descripcion}
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-5 flex-1">
          {precios.consultarPrecio || precios.precioTarjeta === null ? (
            <p className="text-sm italic text-muted-foreground">
              Precio a consultar
            </p>
          ) : (
            <div className="space-y-3">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-sm text-muted-foreground">Precio</span>
                <span className="text-3xl font-bold text-foreground">
                  {formatProductPrice(precios.precioTarjeta)}
                </span>
                <Badge variant="secondary">Hasta 6 cuotas sin interés</Badge>
              </div>

              {precios.precioContado !== null &&
                precios.precioContado < precios.precioTarjeta && (
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-sm font-medium text-success">
                      Mejor precio
                    </span>
                    <span className="text-xl font-bold text-success">
                      {formatProductPrice(precios.precioContado)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      contado o transferencia
                    </span>
                  </div>
                )}
            </div>
          )}

          <p className="mt-4 text-xs text-muted-foreground">
            {formatAvailableSizes(product.medidas.length)}
          </p>
        </CardContent>

        <CardFooter className="mt-5">
          <Button
            size="lg"
            className="w-full sm:w-fit"
            render={
              <a href={inquiryHref} target="_blank" rel="noreferrer">
                Consultar este producto
              </a>
            }
          />
        </CardFooter>
      </div>
    </Card>
  )
}
