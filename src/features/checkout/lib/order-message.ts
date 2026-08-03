import type { DatosCheckout } from "@/features/checkout/types/checkout"
import { formatProductPrice } from "@/features/products/lib/product-card-formatters"
import type { ItemCarrito } from "@/types"

export function buildOrderMessage(
  items: ItemCarrito[],
  customer: DatosCheckout,
): string {
  const paymentLabel =
    customer.formaPago === "contado" ? "Contado / transferencia" : "Tarjeta"
  const lines = [
    "Hola Lebaux! Quiero enviar este pedido:",
    "",
    `Cliente: ${customer.nombre}`,
    `Localidad / barrio: ${customer.localidad}`,
    `Forma de pago: ${paymentLabel}`,
    "",
    `--- Pedido (${items.length} ${items.length === 1 ? "producto" : "productos"}) ---`,
  ]

  items.forEach((item, index) => {
    const accesorios = item.resumenSeleccion.accesoriosEtiqueta.length
      ? ` | Accesorios: ${item.resumenSeleccion.accesoriosEtiqueta.join(", ")}`
      : ""
    const total =
      customer.formaPago === "contado"
        ? item.precios.totalContado
        : item.precios.totalTarjeta
    lines.push(
      `${index + 1}. ${item.producto.nombre} × ${item.cantidad}`,
      `   ${item.resumenSeleccion.medidaEtiqueta} | ${item.resumenSeleccion.colorEtiqueta} | ${item.resumenSeleccion.vidrioEtiqueta ?? "Sin vidrio"}${accesorios}`,
      `   Subtotal: ${formatProductPrice(total)}`,
    )
  })

  const total = items.reduce(
    (sum, item) =>
      sum +
      (customer.formaPago === "contado"
        ? item.precios.totalContado
        : item.precios.totalTarjeta),
    0,
  )
  lines.push(
    "",
    `Total estimado (${paymentLabel}): ${formatProductPrice(total)}`,
  )
  if (customer.notas.trim())
    lines.push("", `Observaciones: ${customer.notas.trim()}`)

  return lines.join("\n")
}
