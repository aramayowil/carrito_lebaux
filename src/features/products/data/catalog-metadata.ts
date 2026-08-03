import {
  ArrowLeftRight,
  DoorOpen,
  Layers,
  PanelTop,
  RectangleHorizontal,
  RectangleVertical,
  SquareStack,
  type LucideIcon,
} from "lucide-react"

import type { CategoriaProducto, LineaProducto } from "@/types"

export interface CategoriaProductoMeta {
  slug: CategoriaProducto
  etiqueta: string
  descripcionCorta: string
  descripcionDetallada: string
  caracteristicas: string[]
  icono: LucideIcon
}

export const LINEAS_PRODUCTO: LineaProducto[] = [
  {
    id: "linea-herrero",
    slug: "herrero",
    nombre: "Línea Herrero",
    subtitulo: "Robusta, clásica y lista para entrega rápida",
    descripcion:
      "Perfilería reforzada ideal para obra y reposición, con una excelente relación entre durabilidad, disponibilidad y precio.",
    imagenPortada: "/img/v_entero_H.jpg",
  },
  {
    id: "linea-modena",
    slug: "modena",
    nombre: "Línea Módena",
    subtitulo: "Medidas, vidrios y colores para cada proyecto",
    descripcion:
      "Sistema premium de aluminio con cierre hermético, accesorios originales y terminaciones fabricadas a medida.",
    imagenPortada: "/img/V_M.jpg",
  },
]

export const CATEGORIAS_PRODUCTO: Record<
  CategoriaProducto,
  CategoriaProductoMeta
> = {
  ventana: {
    slug: "ventana",
    etiqueta: "Ventanas",
    descripcionCorta: "Corredizas, de abrir y con vidrio repartido",
    descripcionDetallada:
      "Ventanas de aluminio fabricadas a medida, con perfiles reforzados, burletes perimetrales y herrajes pensados para conservar un movimiento suave y un cierre confiable.",
    caracteristicas: [
      "Perfil de aluminio reforzado",
      "Burletes de sellado perimetral",
      "Herrajes de primera línea",
      "Compatibles con mosquitero, premarco y tapajunta",
    ],
    icono: ArrowLeftRight,
  },
  puerta: {
    slug: "puerta",
    etiqueta: "Puertas",
    descripcionCorta: "De abrir, balcón, ciegas y vidriadas",
    descripcionDetallada:
      "Puertas de aluminio para exterior o interior, disponibles en versiones ciegas o vidriadas y fabricadas con cerraduras, bisagras y perfiles aptos para uso frecuente.",
    caracteristicas: [
      "Estructura reforzada para uso diario",
      "Cerradura y bisagras de uso intensivo",
      "Modelos de una o dos hojas",
      "Opciones de vidrio de seguridad",
    ],
    icono: DoorOpen,
  },
  banderola: {
    slug: "banderola",
    etiqueta: "Banderolas",
    descripcionCorta: "Aberturas superiores basculantes",
    descripcionDetallada:
      "Aberturas compactas para ventilar sin resignar privacidad. Su apertura basculante permite regular el ingreso de aire con seguridad.",
    caracteristicas: [
      "Apertura basculante regulable",
      "Ideal para baños y cocinas",
      "Combinable con paños fijos",
      "Cierre con burletes perimetrales",
    ],
    icono: PanelTop,
  },
  ventiluz: {
    slug: "ventiluz",
    etiqueta: "Ventiluz",
    descripcionCorta: "Ventilación compacta fija o corrediza",
    descripcionDetallada:
      "Módulos compactos que aportan luz y ventilación en baños, cocinas y espacios donde una ventana completa no resulta necesaria.",
    caracteristicas: [
      "Formato compacto",
      "Versiones fijas o corredizas",
      "Terminación coordinada con cada línea",
      "Fácil integración con revestimientos",
    ],
    icono: RectangleHorizontal,
  },
  "pano-fijo": {
    slug: "pano-fijo",
    etiqueta: "Paños fijos",
    descripcionCorta: "Superficie vidriada sin apertura",
    descripcionDetallada:
      "Paños de vidrio sin apertura que maximizan la entrada de luz y pueden utilizarse solos o combinados con otras aberturas.",
    caracteristicas: [
      "Mayor superficie de vidrio visible",
      "Sellado perimetral",
      "Combinable con aberturas contiguas",
      "Precio definido por medida",
    ],
    icono: SquareStack,
  },
  sobremesada: {
    slug: "sobremesada",
    etiqueta: "Sobremesadas",
    descripcionCorta: "Aberturas bajas para cocina",
    descripcionDetallada:
      "Aberturas bajas y alargadas pensadas para ventilar cocinas sin interferir con alacenas, artefactos ni la superficie de trabajo.",
    caracteristicas: [
      "Formato bajo y alargado",
      "Apertura que no invade la mesada",
      "Resistente a humedad y limpieza frecuente",
      "Colores coordinados con cada línea",
    ],
    icono: RectangleVertical,
  },
  raja: {
    slug: "raja",
    etiqueta: "Rajas de abrir",
    descripcionCorta: "Hojas batientes de apertura tradicional",
    descripcionDetallada:
      "Aberturas angostas con bisagras laterales que liberan completamente el vano y ofrecen una ventilación amplia en espacios reducidos.",
    caracteristicas: [
      "Apertura total del vano",
      "Bisagras reforzadas",
      "Cierre con manija y falleba",
      "Opciones de una o dos hojas",
    ],
    icono: Layers,
  },
}

export const ORDEN_CATEGORIAS: CategoriaProducto[] = [
  "ventana",
  "puerta",
  "banderola",
  "raja",
  "ventiluz",
  "pano-fijo",
  "sobremesada",
]
