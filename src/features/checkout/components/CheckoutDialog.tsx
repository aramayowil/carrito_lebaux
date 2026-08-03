import { useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon"
import {
  calcularTotalesCarrito,
  useCartStore,
} from "@/features/cart/store/use-cart-store"
import { useCartUIStore } from "@/features/cart/store/use-cart-ui-store"
import { buildOrderMessage } from "@/features/checkout/lib/order-message"
import type { FormaPago } from "@/features/checkout/types/checkout"
import { formatProductPrice } from "@/features/products/lib/product-card-formatters"
import { buildWhatsAppUrl } from "@/lib/whatsapp"

/** Recoge los datos mínimos y genera el pedido final para WhatsApp. */
export function CheckoutDialog() {
  const open = useCartUIStore((state) => state.checkoutAbierto)
  const setOpen = useCartUIStore((state) => state.setCheckoutAbierto)
  const setExitoAbierto = useCartUIStore((state) => state.setExitoAbierto)
  const abrirCarrito = useCartUIStore((state) => state.abrirCarrito)
  const items = useCartStore((state) => state.items)
  const totals = calcularTotalesCarrito(items)

  const [nombre, setNombre] = useState("")
  const [localidad, setLocalidad] = useState("")
  const [formaPago, setFormaPago] = useState<FormaPago>("contado")
  const [notas, setNotas] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const nombreInvalid = submitted && nombre.trim().length < 2
  const localidadInvalid = submitted && localidad.trim().length < 2
  const total =
    formaPago === "contado" ? totals.totalContado : totals.totalTarjeta

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    if (
      nombre.trim().length < 2 ||
      localidad.trim().length < 2 ||
      items.length === 0
    )
      return

    const message = buildOrderMessage(items, {
      nombre: nombre.trim(),
      localidad: localidad.trim(),
      formaPago,
      notas,
    })
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer")
    setOpen(false)
    setExitoAbierto(true)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[calc(100dvh-1rem)] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl uppercase tracking-wide">
            Confirmá tu pedido
          </DialogTitle>
          <DialogDescription>
            Completá tus datos y enviaremos el detalle configurado por WhatsApp.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="checkout-name">Nombre y apellido</Label>
            <Input
              id="checkout-name"
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
              placeholder="Ej: Juan Pérez"
              autoComplete="name"
              aria-invalid={nombreInvalid}
              required
            />
            {nombreInvalid && (
              <p className="text-xs text-destructive">Ingresá tu nombre.</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="checkout-location">Localidad o barrio</Label>
            <Input
              id="checkout-location"
              value={localidad}
              onChange={(event) => setLocalidad(event.target.value)}
              placeholder="Nos ayuda a estimar el envío"
              autoComplete="address-level2"
              aria-invalid={localidadInvalid}
              required
            />
            {localidadInvalid && (
              <p className="text-xs text-destructive">
                Ingresá tu localidad o barrio.
              </p>
            )}
          </div>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium">
              Forma de pago preferida
            </legend>
            <RadioGroup
              value={formaPago}
              onValueChange={(value) => setFormaPago(value as FormaPago)}
              className="grid gap-2 sm:grid-cols-2"
            >
              <Label
                htmlFor="payment-cash"
                className="flex cursor-pointer items-center gap-3 rounded-2xl border p-4 has-data-[checked]:border-primary has-data-[checked]:bg-accent"
              >
                <RadioGroupItem id="payment-cash" value="contado" />
                <span>
                  <span className="block font-medium">Contado</span>
                  <span className="text-xs text-muted-foreground">
                    Efectivo o transferencia
                  </span>
                </span>
              </Label>
              <Label
                htmlFor="payment-card"
                className="flex cursor-pointer items-center gap-3 rounded-2xl border p-4 has-data-[checked]:border-primary has-data-[checked]:bg-accent"
              >
                <RadioGroupItem id="payment-card" value="tarjeta" />
                <span>
                  <span className="block font-medium">Tarjeta</span>
                  <span className="text-xs text-muted-foreground">
                    Precio de lista
                  </span>
                </span>
              </Label>
            </RadioGroup>
          </fieldset>

          <div className="space-y-2">
            <Label htmlFor="checkout-notes">Observaciones (opcional)</Label>
            <Textarea
              id="checkout-notes"
              value={notas}
              onChange={(event) => setNotas(event.target.value)}
              placeholder="Ej: necesito coordinar entrega en obra"
              rows={3}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between gap-4 rounded-2xl bg-muted p-4">
            <div>
              <p className="text-sm font-medium">
                {totals.cantidadItems} unidades
              </p>
              <p className="text-xs text-muted-foreground">
                Total estimado {formaPago === "contado" ? "contado" : "tarjeta"}
              </p>
            </div>
            <p className="text-xl font-bold">{formatProductPrice(total)}</p>
          </div>

          <DialogFooter className="sm:justify-between">
            <Button type="button" variant="outline" onClick={abrirCarrito}>
              Volver al carrito
            </Button>
            <Button
              type="submit"
              variant="whatsapp"
              disabled={items.length === 0}
            >
              <WhatsAppIcon data-icon="inline-start" />
              Enviar pedido
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
