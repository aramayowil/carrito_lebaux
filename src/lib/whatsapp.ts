import { configuracionSitio } from "@/data/mock"

/**
 * Construcción genérica de enlaces de contacto. Los mensajes propios de cada
 * flujo viven en features/products y features/checkout.
 */

/** Mensaje por defecto de las llamadas a la acción de contacto. */
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
