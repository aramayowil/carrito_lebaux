import { configuracionSitio } from "@/data/mock"

/**
 * Helpers de WhatsApp. Portado de carrito_responsive_actualizado, recortado
 * a lo que usa el Header por ahora (ver docs/2026-08-02-migracion-home.md).
 * Las funciones que arman el mensaje de un pedido/presupuesto de un
 * producto puntual (buildQuoteMessage, buildOrderMessage) se migran junto
 * con features/cart y features/checkout, cuando exista ItemCarrito real
 * en el store.
 */

/** Mensaje por defecto del botón "Pedir presupuesto" del Header. */
export const DEFAULT_WHATSAPP_MESSAGE =
  "Hola! Vi la página web y quiero consultar por un presupuesto."

/**
 * Arma la URL de wa.me con el mensaje pre-cargado. Si no se pasa `phone`,
 * usa el número de contacto de `configuracionSitio`.
 */
export function buildWhatsAppUrl(message: string, phone?: string): string {
  const target = phone ?? configuracionSitio.contacto.telefonoWhatsapp
  return `https://wa.me/${target}?text=${encodeURIComponent(message)}`
}
