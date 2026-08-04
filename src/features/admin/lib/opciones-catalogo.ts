import type {
  Accesorio,
  ColorPerfil,
  OpcionVidrio,
  SlugAccesorio,
  SlugColorPerfil,
  SlugOpcionVidrio,
} from "@/types"

/**
 * `SlugColorPerfil`, `SlugOpcionVidrio` y `SlugAccesorio` son uniones
 * cerradas (ver comentario en `src/types/catalogo.ts`): el catálogo de
 * opciones transversales es curado a mano y no se crea dinámicamente desde
 * el admin todavía. Lo que el admin sí controla por producto es CUÁLES de
 * estas opciones aplican y con qué precio/etiqueta — por eso el formulario
 * de producto ofrece esta lista fija como checklist en vez de un campo
 * libre.
 */

export const COLORES_CATALOGO: ColorPerfil[] = [
  { slug: "blanco", etiqueta: "Blanco", hexadecimal: "#ffffff", precioAdicional: 0 },
  { slug: "negro", etiqueta: "Negro", hexadecimal: "#111111", precioAdicional: 18000 },
  {
    slug: "simil-madera",
    etiqueta: "Símil madera",
    hexadecimal: "#8b5a2b",
    precioAdicional: 32000,
  },
]

export const VIDRIOS_CATALOGO: OpcionVidrio[] = [
  {
    id: "vidrio-comun-4mm",
    slug: "comun-4mm",
    etiqueta: "Vidrio común 4 mm",
    precioAdicional: 0,
  },
  { id: "vidrio-dvh", slug: "dvh", etiqueta: "DVH (doble vidriado hermético)", precioAdicional: 45000 },
  { id: "vidrio-blindex", slug: "blindex", etiqueta: "Blindex de seguridad", precioAdicional: 55000 },
  { id: "vidrio-sycamore", slug: "sycamore-4mm", etiqueta: "Sycamore 4 mm", precioAdicional: 20000 },
]

export const ACCESORIOS_CATALOGO: Accesorio[] = [
  {
    id: "accesorio-mosquitero",
    slug: "mosquitero",
    etiqueta: "Mosquitero",
    precioAdicional: 15000,
    incluidoPorDefecto: false,
  },
  {
    id: "accesorio-premarco",
    slug: "premarco",
    etiqueta: "Premarco",
    precioAdicional: 12000,
    incluidoPorDefecto: false,
  },
  {
    id: "accesorio-tapajunta",
    slug: "tapajunta",
    etiqueta: "Tapajunta",
    precioAdicional: 8000,
    incluidoPorDefecto: false,
  },
]

export function etiquetaColor(slug: SlugColorPerfil): string {
  return COLORES_CATALOGO.find((color) => color.slug === slug)?.etiqueta ?? slug
}

export function etiquetaVidrio(slug: SlugOpcionVidrio): string {
  return VIDRIOS_CATALOGO.find((vidrio) => vidrio.slug === slug)?.etiqueta ?? slug
}

export function etiquetaAccesorio(slug: SlugAccesorio): string {
  return (
    ACCESORIOS_CATALOGO.find((accesorio) => accesorio.slug === slug)?.etiqueta ??
    slug
  )
}
