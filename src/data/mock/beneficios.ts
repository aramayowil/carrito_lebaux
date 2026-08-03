import type { Beneficio } from "@/types"

/**
 * Grilla "Por qué Lebaux" de la home. Portado de
 * carrito_responsive_actualizado (docs/2026-08-02-migracion-home.md).
 */
export const beneficios: Beneficio[] = [
  {
    id: "beneficio-1",
    icono: "Factory",
    titulo: "Fabricación propia",
    descripcion:
      "Controlamos todo el proceso para garantizar calidad, terminaciones impecables y productos hechos para durar.",
  },
  {
    id: "beneficio-2",
    icono: "Truck",
    titulo: "Envíos a todo el país",
    descripcion:
      "Llegamos a todo el país y coordinamos la entrega para que recibas tu pedido sin complicaciones.",
  },
  {
    id: "beneficio-3",
    icono: "Zap",
    titulo: "Entregas rápidas",
    descripcion:
      "Producimos en tiempos cortos para que puedas avanzar con tu obra o proyecto sin largas esperas.",
  },
]
