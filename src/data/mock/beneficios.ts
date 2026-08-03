import type { Beneficio } from "@/types"

/**
 * Ventajas concretas del proceso de compra y fabricación mostradas en la Home.
 */
export const beneficios: Beneficio[] = [
  {
    id: "beneficio-medida",
    icono: "Ruler",
    titulo: "Fabricación a medida",
    descripcion:
      "Fabricamos cada abertura según tu proyecto, con opciones para resolver distintos espacios y necesidades.",
  },
  {
    id: "beneficio-configuracion",
    icono: "SlidersHorizontal",
    titulo: "Configuración completa",
    descripcion:
      "Elegí línea, medida, color, vidrio y accesorios desde el catálogo, sin perder de vista cada detalle.",
  },
  {
    id: "beneficio-precios",
    icono: "BadgeDollarSign",
    titulo: "Precios claros",
    descripcion:
      "Consultá los valores de contado y tarjeta mientras configurás el producto, antes de enviar tu pedido.",
  },
  {
    id: "beneficio-atencion",
    icono: "MessageCircle",
    titulo: "Atención directa",
    descripcion:
      "Enviá tu selección por WhatsApp y continuá la conversación con nuestro equipo para cerrar cada detalle.",
  },
]
