import type { Obra } from "@/types"

/**
 * Casos reales para la sección "Algunas de nuestras obras" de la home.
 * Portado de carrito_responsive_actualizado (docs/2026-08-02-migracion-home.md).
 */
export const obras: Obra[] = [
  {
    id: "obra-1",
    titulo: "Casa Johana",
    imagen: "/img/obra_johana.jpg",
    testimonio:
      "Hermoso trabajo, quedó bello todo! Estoy muy contenta, los chicos son excelentes y las aberturas de una calidad increíble. Gracias Lebaux por ayudarnos a cumplir nuestro sueño!",
    autor: "Johana",
  },
  {
    id: "obra-2",
    titulo: "Módena negro 6 hojas",
    imagen: "/img/modena_negro_obra.jpg",
    testimonio:
      "Cambiamos todas las aberturas de la casa por la línea Herrero negra. Quedó súper moderna y el trabajo fue rapidísimo.",
    autor: "Sofía Martínez",
  },
  {
    id: "obra-3",
    titulo: "Corredizas Marcos y Ruth",
    imagen: "/img/modena_obra_marcos.jpg",
    testimonio:
      "Muy buena atención en la oficina y los muchachos que instalaron fueron excelentes y muy prolijos. Lo recomiendo, además el material es muy bueno.",
    autor: "Marcos y Ruth",
  },
]
