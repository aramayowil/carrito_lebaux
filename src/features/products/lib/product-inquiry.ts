import { formatProductPrice } from "@/features/products/lib/product-card-formatters"
import type { DesglosePrecio, Producto, SeleccionProducto } from "@/types"

export function buildConfiguredProductMessage(
  producto: Producto,
  seleccion: SeleccionProducto,
  cantidad: number,
  desglose: DesglosePrecio,
): string {
  const medida = producto.medidas.find((item) => item.id === seleccion.medidaId)
  const color = producto.colores.find(
    (item) => item.slug === seleccion.colorSlug,
  )
  const vidrio = producto.opcionesVidrio.find(
    (item) => item.slug === seleccion.vidrioSlug,
  )
  const accesorios = producto.accesorios.filter((item) =>
    seleccion.accesoriosSlug.includes(item.slug),
  )

  return [
    "Hola Lebaux! Quiero consultar por esta abertura:",
    "",
    `Producto: ${producto.nombre}`,
    `Línea: ${producto.linea.toUpperCase()}`,
    `Medida: ${medida?.etiqueta ?? "A definir"}`,
    `Color: ${color?.etiqueta ?? "A definir"}`,
    `Vidrio: ${vidrio?.etiqueta ?? "No aplica"}`,
    `Accesorios: ${accesorios.length ? accesorios.map((item) => item.etiqueta).join(", ") : "Ninguno"}`,
    `Cantidad: ${cantidad}`,
    `Estimado contado: ${formatProductPrice(desglose.totalContado)}`,
    `Estimado tarjeta: ${formatProductPrice(desglose.totalTarjeta)}`,
  ].join("\n")
}
