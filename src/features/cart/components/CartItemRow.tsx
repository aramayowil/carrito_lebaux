import { Minus, Plus, Trash2 } from "lucide-react"

import { ProductImage } from "@/components/media/ProductImage"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCartStore } from "@/features/cart/store/use-cart-store"
import { formatProductPrice } from "@/features/products/lib/product-card-formatters"
import type { ItemCarrito } from "@/types"

interface CartItemRowProps {
  item: ItemCarrito
}

/** Fila editable de un producto configurado dentro del carrito. */
export function CartItemRow({ item }: CartItemRowProps) {
  const actualizarCantidad = useCartStore((state) => state.actualizarCantidad)
  const eliminarItem = useCartStore((state) => state.eliminarItem)

  return (
    <Card className="gap-0 border border-border/70 py-0">
      <CardContent className="grid gap-3 p-3 sm:grid-cols-[5.5rem_1fr]">
        <ProductImage
          src={item.producto.imagen}
          alt={item.producto.nombre}
          className="h-36 w-full rounded-xl border bg-white sm:h-22 sm:w-22"
        />

        <div className="min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold uppercase leading-snug">
              {item.producto.nombre}
            </h3>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => eliminarItem(item.id)}
              aria-label={`Eliminar ${item.producto.nombre}`}
              className="shrink-0 text-muted-foreground hover:text-destructive"
            >
              <Trash2 />
            </Button>
          </div>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            {item.resumenSeleccion.medidaEtiqueta} ·{" "}
            {item.resumenSeleccion.colorEtiqueta} ·{" "}
            {item.resumenSeleccion.vidrioEtiqueta ?? "Sin vidrio"}
          </p>

          {item.resumenSeleccion.accesoriosEtiqueta.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {item.resumenSeleccion.accesoriosEtiqueta.map((label) => (
                <Badge key={label} variant="secondary">
                  + {label}
                </Badge>
              ))}
            </div>
          )}

          <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
            <div className="flex items-center gap-1 rounded-full border p-1">
              <Button
                variant="ghost"
                size="icon-sm"
                className="rounded-full"
                onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                disabled={item.cantidad <= 1}
                aria-label="Restar cantidad"
              >
                <Minus />
              </Button>
              <span className="w-7 text-center text-sm font-bold">
                {item.cantidad}
              </span>
              <Button
                variant="ghost"
                size="icon-sm"
                className="rounded-full"
                onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                aria-label="Sumar cantidad"
              >
                <Plus />
              </Button>
            </div>
            <div className="text-right text-xs">
              <p className="font-bold text-success">
                {formatProductPrice(item.precios.totalContado)} contado
              </p>
              <p className="text-muted-foreground">
                {formatProductPrice(item.precios.totalTarjeta)} tarjeta
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
