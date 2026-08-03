/**
 * Tipos de contenido editorial — CARRITO LEBAUX
 *
 * No pertenece al catálogo ni al carrito: son bloques de contenido para
 * secciones de marketing de la home (obras realizadas, beneficios de
 * comprarle a Lebaux, etc.). Viven separados para que un cambio en el
 * catálogo o el carrito no obligue a tocar este archivo, y viceversa.
 */

/**
 * Nombre del ícono de `lucide-react` a renderizar en la tarjeta de
 * beneficio. Unión cerrada a propósito: evita pasar un string cualquiera
 * que no exista como ícono y romper el render en runtime.
 */
export type IconoBeneficio = "Factory" | "Truck" | "Zap";

/**
 * Caso de éxito / testimonio para la sección "Obras realizadas".
 *
 * @example
 * const obra: Obra = {
 *   id: "obra-001",
 *   titulo: "Ampliación de casa en San Miguel de Tucumán",
 *   imagen: "/img/obras/obra-001.jpg",
 *   testimonio: "El asesoramiento fue excelente y la instalación impecable.",
 *   autor: "Marcela G.",
 * };
 */
export interface Obra {
  id: string;
  titulo: string;
  imagen: string;
  testimonio: string;
  autor: string;
}

/**
 * Ítem de la grilla de "por qué elegirnos" (fabricación propia, envíos,
 * entrega rápida, etc.).
 *
 * @example
 * const beneficio: Beneficio = {
 *   id: "beneficio-fabrica-propia",
 *   icono: "Factory",
 *   titulo: "Fabricación propia",
 *   descripcion: "Controlamos cada etapa del proceso, de la extrusión al armado final.",
 * };
 */
export interface Beneficio {
  id: string;
  icono: IconoBeneficio;
  titulo: string;
  descripcion: string;
}
