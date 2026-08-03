import type { ImagenProducto, Producto } from "@/types"

const currencyFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
})

export function formatProductPrice(price: number): string {
  return currencyFormatter.format(price)
}

export function formatAvailableSizes(count: number): string {
  return count === 1 ? "1 medida disponible" : `${count} medidas disponibles`
}

export function getPrimaryProductImage(
  product: Producto,
): ImagenProducto | undefined {
  return (
    product.imagenes.find((image) => image.esPrincipal) ?? product.imagenes[0]
  )
}

export function buildProductInquiryMessage(product: Producto): string {
  return `Hola! Vi ${product.nombre} en la página web y quiero consultar por este producto.`
}
