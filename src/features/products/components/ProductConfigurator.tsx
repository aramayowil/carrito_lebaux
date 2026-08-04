import { Minus, Plus, ShoppingCart } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCartStore } from "@/features/cart/store/use-cart-store"
import { useCartUIStore } from "@/features/cart/store/use-cart-ui-store"
import { useProductConfigurator } from "@/features/products/hooks/use-product-configurator"
import { formatProductPrice } from "@/features/products/lib/product-card-formatters"
import { buildConfiguredProductMessage } from "@/features/products/lib/product-inquiry"
import { buildWhatsAppUrl, useWhatsappPhone } from "@/lib/whatsapp"
import { cn } from "@/lib/utils"
import type { Producto, SlugColorPerfil, SlugOpcionVidrio } from "@/types"

interface ProductConfiguratorProps {
  product: Producto
}

function esColorDisponible(
  product: Producto,
  value: unknown,
): value is SlugColorPerfil {
  return (
    typeof value === "string" &&
    product.colores.some((color) => color.slug === value)
  )
}

function esVidrioDisponible(
  product: Producto,
  value: unknown,
): value is SlugOpcionVidrio {
  return (
    typeof value === "string" &&
    product.opcionesVidrio.some((vidrio) => vidrio.slug === value)
  )
}

/** Configura una abertura, calcula ambos precios y la agrega al carrito persistente. */
export function ProductConfigurator({ product }: ProductConfiguratorProps) {
  const {
    seleccion,
    cantidad,
    desglose,
    setCantidad,
    setMedida,
    setColor,
    setVidrio,
    toggleAccesorio,
  } = useProductConfigurator(product)
  const agregarItem = useCartStore((state) => state.agregarItem)
  const abrirCarrito = useCartUIStore((state) => state.abrirCarrito)
  const medidaSeleccionada = product.medidas.find(
    (medida) => medida.id === seleccion.medidaId,
  )
  const handleColorChange = (value: unknown) => {
    if (esColorDisponible(product, value)) setColor(value)
  }
  const handleMedidaChange = (value: unknown) => {
    if (
      typeof value === "string" &&
      product.medidas.some((medida) => medida.id === value)
    ) {
      setMedida(value)
    }
  }
  const handleVidrioChange = (value: unknown) => {
    if (value === null || esVidrioDisponible(product, value)) setVidrio(value)
  }
  const whatsappPhone = useWhatsappPhone()
  const whatsappHref = buildWhatsAppUrl(
    buildConfiguredProductMessage(product, seleccion, cantidad, desglose),
    whatsappPhone,
  )

  return (
    <div className="space-y-5">
      <div>
        <Label className="mb-2 block">Color del perfil</Label>
        <RadioGroup
          value={seleccion.colorSlug}
          onValueChange={handleColorChange}
          className="grid grid-cols-1 gap-2 sm:grid-cols-3"
        >
          {product.colores.map((color) => (
            <Label
              key={color.slug}
              htmlFor={`color-${product.id}-${color.slug}`}
              className={cn(
                "relative flex min-h-12 cursor-pointer items-center justify-center gap-3 rounded-2xl border p-3 text-center transition-colors has-focus-visible:border-ring has-focus-visible:ring-3 has-focus-visible:ring-ring/30",
                seleccion.colorSlug === color.slug
                  ? "border-primary bg-accent"
                  : "hover:border-primary/50",
              )}
            >
              <RadioGroupItem
                id={`color-${product.id}-${color.slug}`}
                value={color.slug}
                className="absolute inset-0 size-full cursor-pointer opacity-0"
              />
              <span
                className="size-5 rounded-full border border-border shadow-sm"
                style={{ backgroundColor: color.hexadecimal }}
                aria-hidden="true"
              />
              <span className="text-sm font-medium">{color.etiqueta}</span>
            </Label>
          ))}
        </RadioGroup>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`medida-${product.id}`}>Medida (base × altura)</Label>
          <Select
            value={seleccion.medidaId}
            onValueChange={handleMedidaChange}
          >
            <SelectTrigger
              id={`medida-${product.id}`}
              className="h-11 w-full rounded-xl"
            >
              <SelectValue>
                {medidaSeleccionada?.etiqueta ?? "Elegí una medida"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {product.medidas.map((medida) => (
                <SelectItem key={medida.id} value={medida.id}>
                  <span>{medida.etiqueta}</span>
                  {(medida.precioFijo ?? medida.precioAdicional) > 0 && (
                    <span className="ml-auto text-xs text-muted-foreground">
                      {medida.precioFijo
                        ? formatProductPrice(medida.precioFijo)
                        : `+ ${formatProductPrice(medida.precioAdicional)}`}
                    </span>
                  )}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`vidrio-${product.id}`}>Tipo de vidrio</Label>
          {product.opcionesVidrio.length > 0 ? (
            <Select
              value={seleccion.vidrioSlug ?? undefined}
              onValueChange={handleVidrioChange}
            >
              <SelectTrigger
                id={`vidrio-${product.id}`}
                className="h-11 w-full rounded-xl"
              >
                <SelectValue placeholder="Elegí el vidrio" />
              </SelectTrigger>
              <SelectContent>
                {product.opcionesVidrio.map((vidrio) => (
                  <SelectItem key={vidrio.slug} value={vidrio.slug}>
                    <span>{vidrio.etiqueta}</span>
                    {vidrio.precioAdicional > 0 && (
                      <span className="ml-auto text-xs text-muted-foreground">
                        + {formatProductPrice(vidrio.precioAdicional)}
                      </span>
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="flex h-11 items-center rounded-xl bg-muted px-3 text-sm text-muted-foreground">
              Este modelo no lleva vidrio
            </div>
          )}
        </div>
      </div>

      {product.accesorios.length > 0 && (
        <Accordion>
          <AccordionItem value="accesorios">
            <AccordionTrigger>
              Accesorios
              {seleccion.accesoriosSlug.length > 0 && (
                <span className="ml-auto text-xs font-normal text-muted-foreground">
                  {seleccion.accesoriosSlug.length} seleccionados
                </span>
              )}
            </AccordionTrigger>
            <AccordionContent className="grid gap-2">
              {product.accesorios.map((accesorio) => {
                const checked = seleccion.accesoriosSlug.includes(
                  accesorio.slug,
                )
                return (
                  <Label
                    key={accesorio.slug}
                    htmlFor={`accesorio-${product.id}-${accesorio.slug}`}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-xl border p-3",
                      checked && "border-primary bg-accent",
                    )}
                  >
                    <Checkbox
                      id={`accesorio-${product.id}-${accesorio.slug}`}
                      checked={checked}
                      onCheckedChange={() => toggleAccesorio(accesorio.slug)}
                    />
                    <span className="flex-1 text-sm font-medium">
                      {accesorio.etiqueta}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      + {formatProductPrice(accesorio.precioAdicional)}
                    </span>
                  </Label>
                )
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      <div className="flex items-center justify-between rounded-2xl border p-4">
        <Label>Cantidad</Label>
        <div className="flex items-center gap-1 rounded-full border bg-background p-1">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setCantidad(cantidad - 1)}
            aria-label="Restar una unidad"
            disabled={cantidad <= 1}
          >
            <Minus />
          </Button>
          <span className="w-9 text-center font-bold" aria-live="polite">
            {cantidad}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setCantidad(cantidad + 1)}
            aria-label="Sumar una unidad"
          >
            <Plus />
          </Button>
        </div>
      </div>

      <Card className="gap-4 border border-primary/30 bg-accent/50 py-5">
        <CardHeader>
          <CardTitle className="text-sm uppercase tracking-wide">
            Precio estimado
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-xs text-muted-foreground">
              Contado / transferencia
            </p>
            <p className="text-2xl font-bold text-success">
              {formatProductPrice(desglose.totalContado)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Tarjeta</p>
            <p className="text-2xl font-bold">
              {formatProductPrice(desglose.totalTarjeta)}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-2 sm:grid-cols-2">
        <Button
          size="lg"
          onClick={() => {
            agregarItem(product, seleccion, cantidad)
            abrirCarrito()
          }}
        >
          <ShoppingCart data-icon="inline-start" />
          Agregar al carrito
        </Button>
        <Button
          variant="whatsapp"
          size="lg"
          render={
            <a href={whatsappHref} target="_blank" rel="noreferrer">
              <WhatsAppIcon data-icon="inline-start" />
              Consultar por WhatsApp
            </a>
          }
        />
      </div>
    </div>
  )
}
