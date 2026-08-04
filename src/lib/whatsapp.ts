import { useContentStore } from "@/store/use-content-store"

/**
 * Construcción genérica de enlaces de contacto. Los mensajes propios de cada
 * flujo viven en features/products y features/checkout.
 */

/** Mensaje por defecto de las llamadas a la acción de contacto. */
export const DEFAULT_WHATSAPP_MESSAGE =
  "Hola! Vi la página web y quiero consultar por un presupuesto."

/**
 * Arma la URL de wa.me con el mensaje pre-cargado.
 *
 * `phone` es obligatorio a propósito: este archivo es un `lib/` puro (no un
 * hook) y no puede leer el store de contenido por su cuenta. Cada llamador
 * saca el teléfono actual con `useWhatsappPhone()` y lo pasa acá, para que
 * el número siga siendo el que carga el admin en `/admin/sitio`.
 */
export function buildWhatsAppUrl(message: string, phone: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

/** Teléfono de contacto vigente, reactivo a los cambios del panel admin. */
export function useWhatsappPhone(): string {
  return useContentStore((state) => state.sitio.contacto.telefonoWhatsapp)
}
