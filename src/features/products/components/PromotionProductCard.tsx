import { ArrowRight, Sparkles } from "lucide-react"

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
  formatProductPrice,
  getPrimaryProductImage,
} from "@/features/products/lib/product-card-formatters"
import { buildWhatsAppUrl } from "@/lib/whatsapp"
import type { Producto } from "@/types"

interface PromotionProductCardProps {
  product: Producto
}

/** Resume una promoción de la Home dentro del carrusel de ofertas. */
export function PromotionProductCard({ product }: PromotionProductCardProps) {
  const primaryImage = getPrimaryProductImage(product)
  const { precios } = product
  const lineLabel = product.linea === "modena" ? "Módena" : "Herrero"
  const inquiryHref = buildWhatsAppUrl(buildProductInquiryMessage(product))

  return (
    <Card className="group h-full gap-0 overflow-hidden border border-primary/20 bg-linear-to-br from-card via-card to-accent/35 py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative border-b border-border/60 bg-white p-4">
        <Badge className="absolute left-4 top-4 z-10 gap-1 uppercase tracking-widest">
          <Sparkles data-icon="inline-start" />
          {precios.porcentajeDescuento}% OFF
        </Badge>
        <ProductImage
          src={primaryImage?.url ?? ""}
          alt={primaryImage?.textoAlternativo ?? product.nombre}
          className="h-56 w-full rounded-xl sm:h-60"
          imgClassName="transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <CardHeader className="pt-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <Badge variant="secondary" className="uppercase tracking-widest">
            {lineLabel}
          </Badge>
          <span className="text-xs capitalize text-muted-foreground">
            {product.categoria}
          </span>
        </div>
        <CardTitle className="text-base font-semibold uppercase leading-snug tracking-tight">
          {product.nombre}
        </CardTitle>
        <CardDescription className="line-clamp-3 leading-6">
          {product.descripcion}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-4 flex-1">
        {precios.consultarPrecio || precios.precioTarjeta === null ? (
          <p className="text-sm italic text-muted-foreground">
            Precio a consultar
          </p>
        ) : (
          <div className="space-y-2">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-sm text-muted-foreground">Ahora</span>
              <span className="text-2xl font-bold text-foreground">
                {formatProductPrice(
                  precios.precioContado ?? precios.precioTarjeta,
                )}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-muted-foreground line-through">
                {formatProductPrice(precios.precioTarjeta)}
              </span>
              <Badge className="bg-success/10 text-success">
                Ahorro asegurado
              </Badge>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="pb-5 pt-4">
        <Button
          size="lg"
          className="w-full rounded-full"
          render={
            <a href={inquiryHref} target="_blank" rel="noreferrer">
              Consultar oferta
              <ArrowRight data-icon="inline-end" />
            </a>
          }
        />
      </CardFooter>
    </Card>
  )
}
