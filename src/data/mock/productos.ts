import type {
  Accesorio,
  CategoriaProducto,
  ColorPerfil,
  OpcionMedida,
  OpcionVidrio,
  Producto,
  SlugLineaProducto,
  TipoApertura,
} from "@/types"

const FECHA_MOCK = "2026-08-03T00:00:00.000Z"

const ACCESORIOS: Accesorio[] = [
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

const COLORES: ColorPerfil[] = [
  {
    slug: "blanco",
    etiqueta: "Blanco",
    hexadecimal: "#ffffff",
    precioAdicional: 0,
  },
  {
    slug: "negro",
    etiqueta: "Negro",
    hexadecimal: "#111111",
    precioAdicional: 18000,
  },
  {
    slug: "simil-madera",
    etiqueta: "Símil madera",
    hexadecimal: "#8b5a2b",
    precioAdicional: 32000,
  },
]

const VIDRIOS: OpcionVidrio[] = [
  {
    id: "vidrio-comun-4mm",
    slug: "comun-4mm",
    etiqueta: "Vidrio común 4 mm",
    precioAdicional: 0,
  },
  {
    id: "vidrio-dvh",
    slug: "dvh",
    etiqueta: "DVH (doble vidriado hermético)",
    precioAdicional: 45000,
  },
  {
    id: "vidrio-blindex",
    slug: "blindex",
    etiqueta: "Blindex de seguridad",
    precioAdicional: 55000,
  },
  {
    id: "vidrio-sycamore",
    slug: "sycamore-4mm",
    etiqueta: "Sycamore 4 mm",
    precioAdicional: 20000,
  },
]

const MEDIDAS_ESTANDAR: OpcionMedida[] = [
  {
    id: "size-100x200",
    etiqueta: "100 x 200 cm",
    anchoCm: 100,
    altoCm: 200,
    precioAdicional: 0,
  },
  {
    id: "size-120x100",
    etiqueta: "120 x 100 cm",
    anchoCm: 120,
    altoCm: 100,
    precioAdicional: 12000,
  },
  {
    id: "size-150x110",
    etiqueta: "150 x 110 cm",
    anchoCm: 150,
    altoCm: 110,
    precioAdicional: 25000,
  },
  {
    id: "size-180x120",
    etiqueta: "180 x 120 cm",
    anchoCm: 180,
    altoCm: 120,
    precioAdicional: 38000,
  },
  {
    id: "size-200x150",
    etiqueta: "200 x 150 cm",
    anchoCm: 200,
    altoCm: 150,
    precioAdicional: 52000,
  },
]

const MEDIDAS_PANO_FIJO: OpcionMedida[] = [
  {
    id: "pf-100x100",
    etiqueta: "100 x 100 cm",
    anchoCm: 100,
    altoCm: 100,
    precioAdicional: 0,
    precioFijo: 180000,
  },
  {
    id: "pf-120x100",
    etiqueta: "120 x 100 cm",
    anchoCm: 120,
    altoCm: 100,
    precioAdicional: 0,
    precioFijo: 185000,
  },
  {
    id: "pf-150x100",
    etiqueta: "150 x 100 cm",
    anchoCm: 150,
    altoCm: 100,
    precioAdicional: 0,
    precioFijo: 210000,
  },
  {
    id: "pf-120x150",
    etiqueta: "120 x 150 cm",
    anchoCm: 120,
    altoCm: 150,
    precioAdicional: 0,
    precioFijo: 230000,
  },
  {
    id: "pf-150x150",
    etiqueta: "150 x 150 cm",
    anchoCm: 150,
    altoCm: 150,
    precioAdicional: 0,
    precioFijo: 250000,
  },
  {
    id: "pf-200x100",
    etiqueta: "200 x 100 cm",
    anchoCm: 200,
    altoCm: 100,
    precioAdicional: 0,
    precioFijo: 270000,
  },
  {
    id: "pf-200x150",
    etiqueta: "200 x 150 cm",
    anchoCm: 200,
    altoCm: 150,
    precioAdicional: 0,
    precioFijo: 310000,
  },
]

interface ProductSeed {
  slug: string
  nombre: string
  linea: SlugLineaProducto
  categoria: CategoriaProducto
  tipoApertura?: TipoApertura
  imagen: string
  galeria?: string[]
  precio: number
  descuento?: number
  destacado?: boolean
  medidas?: OpcionMedida[]
  sinVidrio?: boolean
  sinAccesorios?: boolean
}

const PRODUCT_SEEDS: ProductSeed[] = [
  {
    slug: "ventana-corrediza-herrero",
    nombre: "Ventana Corrediza Línea Herrero",
    linea: "herrero",
    categoria: "ventana",
    tipoApertura: "corrediza",
    imagen: "/img/v_entero_H.jpg",
    precio: 285000,
    descuento: 10,
    destacado: true,
  },
  {
    slug: "puerta-exterior-herrero",
    nombre: "Puerta Exterior Línea Herrero",
    linea: "herrero",
    categoria: "puerta",
    tipoApertura: "de-abrir",
    imagen: "/img/p_exterior_H.jpg",
    precio: 420000,
    descuento: 10,
    destacado: true,
  },
  {
    slug: "banderola-herrero",
    nombre: "Banderola Línea Herrero",
    linea: "herrero",
    categoria: "banderola",
    tipoApertura: "batiente",
    imagen: "/img/banderola_H.jpg",
    precio: 145000,
    descuento: 8,
  },
  {
    slug: "puerta-balcon-herrero",
    nombre: "Puerta Balcón Línea Herrero",
    linea: "herrero",
    categoria: "puerta",
    tipoApertura: "puerta-balcon",
    imagen: "/img/puertabalcon_H.jpg",
    precio: 395000,
    descuento: 10,
    destacado: true,
  },
  {
    slug: "raja-de-abrir-herrero",
    nombre: "Raja de Abrir Línea Herrero",
    linea: "herrero",
    categoria: "raja",
    tipoApertura: "de-abrir",
    imagen: "/img/v_deabrir_H.jpg",
    precio: 210000,
    descuento: 8,
  },
  {
    slug: "ventana-vidrio-repartido-herrero",
    nombre: "Ventana Vidrio Repartido Línea Herrero",
    linea: "herrero",
    categoria: "ventana",
    tipoApertura: "corrediza",
    imagen: "/img/v_repartido_H.jpg",
    precio: 310000,
    descuento: 10,
  },
  {
    slug: "puerta-liviana-herrero",
    nombre: "Puerta Liviana Línea Herrero",
    linea: "herrero",
    categoria: "puerta",
    tipoApertura: "de-abrir",
    imagen: "/img/P_liviana_H.jpg",
    precio: 235000,
    descuento: 12,
  },
  {
    slug: "puerta-mdf-herrero",
    nombre: "Puerta MDF Línea Herrero",
    linea: "herrero",
    categoria: "puerta",
    tipoApertura: "de-abrir",
    imagen: "/img/puertaMDF.jpg",
    precio: 198000,
    descuento: 12,
    sinVidrio: true,
  },
  {
    slug: "ventiluz-herrero",
    nombre: "Ventiluz Línea Herrero",
    linea: "herrero",
    categoria: "ventiluz",
    tipoApertura: "batiente",
    imagen: "/img/ventiluz_h.jpg",
    precio: 118000,
    descuento: 8,
  },
  {
    slug: "puerta-medio-vidrio-herrero",
    nombre: "Puerta 1/2 Vidrio Línea Herrero",
    linea: "herrero",
    categoria: "puerta",
    tipoApertura: "de-abrir",
    imagen: "/img/p_mediov_h.jpg",
    precio: 365000,
    descuento: 10,
  },
  {
    slug: "ventana-corrediza-modena",
    nombre: "Ventana Corrediza Línea Módena",
    linea: "modena",
    categoria: "ventana",
    tipoApertura: "corrediza",
    imagen: "/img/V_M.jpg",
    galeria: [
      "/img/accesoriomodena.jpg",
      "/img/accesoriosmodena.jpg",
      "/img/caracteristicasmodena.jpg",
    ],
    precio: 120000,
    destacado: true,
  },
  {
    slug: "puerta-ciega-modena",
    nombre: "Puerta Ciega Línea Módena",
    linea: "modena",
    categoria: "puerta",
    tipoApertura: "de-abrir",
    imagen: "/img/puertaciegamodena.jpg",
    galeria: [
      "/img/puertaciegamodenanegra.jpg",
      "/img/caracteristicapuertasmodena.png",
      "/img/aperturas.jpg",
    ],
    precio: 95000,
    sinVidrio: true,
  },
  {
    slug: "raja-de-abrir-modena",
    nombre: "Raja de Abrir Línea Módena",
    linea: "modena",
    categoria: "raja",
    tipoApertura: "de-abrir",
    imagen: "/img/raja_modena.jpg",
    galeria: ["/img/caracteristicasmodena.jpg"],
    precio: 190000,
  },
  {
    slug: "pano-fijo-modena",
    nombre: "Paño Fijo Línea Módena",
    linea: "modena",
    categoria: "pano-fijo",
    tipoApertura: "fija",
    imagen: "/img/pano-fijo.jpg",
    precio: 180000,
    medidas: MEDIDAS_PANO_FIJO,
    sinAccesorios: true,
  },
  {
    slug: "puerta-balcon-modena",
    nombre: "Puerta Balcón Línea Módena",
    linea: "modena",
    categoria: "puerta",
    tipoApertura: "puerta-balcon",
    imagen: "/img/p_balcon_M.jpg",
    galeria: [
      "/img/accesoriomodena.jpg",
      "/img/accesoriosmodena.jpg",
      "/img/caracteristicasmodena.jpg",
    ],
    precio: 240000,
    destacado: true,
  },
  {
    slug: "ventiluz-corredizo-modena",
    nombre: "Ventiluz Corredizo Línea Módena",
    linea: "modena",
    categoria: "ventiluz",
    tipoApertura: "corrediza",
    imagen: "/img/ventiluz_modena.jpg",
    galeria: ["/img/accesoriomodena.jpg", "/img/caracteristicasmodena.jpg"],
    precio: 95000,
  },
  {
    slug: "puerta-abrir-vidrio-entero-modena",
    nombre: "Puerta de Abrir Vidrio Entero Línea Módena",
    linea: "modena",
    categoria: "puerta",
    tipoApertura: "de-abrir",
    imagen: "/img/puertavemodena.jpg",
    galeria: ["/img/caracteristicapuertasmodena.png", "/img/aperturas.jpg"],
    precio: 315000,
  },
  {
    slug: "ventana-vidrio-repartido-modena",
    nombre: "Ventana Vidrio Repartido Línea Módena",
    linea: "modena",
    categoria: "ventana",
    tipoApertura: "corrediza",
    imagen: "/img/v_repartido_M.jpg",
    galeria: ["/img/accesoriomodena.jpg", "/img/caracteristicasmodena.jpg"],
    precio: 285000,
  },
  {
    slug: "puerta-dos-hojas-vidrio-entero-modena",
    nombre: "Puerta Dos Hojas Vidrio Entero Línea Módena",
    linea: "modena",
    categoria: "puerta",
    tipoApertura: "de-abrir",
    imagen: "/img/p_ventero_M.jpg",
    galeria: ["/img/caracteristicapuertasmodena.png", "/img/aperturas.jpg"],
    precio: 480000,
  },
  {
    slug: "puerta-medio-vidrio-modena",
    nombre: "Puerta 1/2 Vidrio Línea Módena",
    linea: "modena",
    categoria: "puerta",
    tipoApertura: "de-abrir",
    imagen: "/img/puertamediovidriomodena.jpg",
    galeria: ["/img/caracteristicapuertasmodena.png", "/img/aperturas.jpg"],
    precio: 295000,
  },
  {
    slug: "banderola-batiente-modena",
    nombre: "Banderola Batiente Línea Módena",
    linea: "modena",
    categoria: "banderola",
    tipoApertura: "batiente",
    imagen: "/img/banderolablancamodena.jpg",
    galeria: ["/img/banderolamodena.jpg", "/img/caracteristicasmodena.jpg"],
    precio: 135000,
  },
  {
    slug: "sobremesada-corrediza-modena",
    nombre: "Sobremesada Corrediza Línea Módena",
    linea: "modena",
    categoria: "sobremesada",
    tipoApertura: "corrediza",
    imagen: "/img/sobremesamodena.jpg",
    galeria: ["/img/accesoriomodena.jpg", "/img/caracteristicasmodena.jpg"],
    precio: 165000,
    sinAccesorios: true,
  },
]

function createProduct(seed: ProductSeed, index: number): Producto {
  const discount = seed.descuento ?? 0
  const cashPrice = Math.round(seed.precio * (1 - discount / 100))

  return {
    id: `${seed.linea}-${String(index + 1).padStart(2, "0")}`,
    slug: seed.slug,
    nombre: seed.nombre,
    linea: seed.linea,
    categoria: seed.categoria,
    tipoApertura: seed.tipoApertura,
    descripcion:
      "Abertura de aluminio de alta resistencia con accesorios originales, fabricación propia y terminaciones a medida.",
    imagenes: [
      {
        url: seed.imagen,
        textoAlternativo: seed.nombre,
        esPrincipal: true,
      },
      ...(seed.galeria ?? []).map((url, galleryIndex) => ({
        url,
        textoAlternativo: `${seed.nombre}, detalle ${galleryIndex + 1}`,
      })),
    ],
    precios: {
      precioBase: seed.precio,
      precioTarjeta: seed.precio,
      precioContado: cashPrice,
      porcentajeDescuento: discount,
      moneda: "ARS",
      consultarPrecio: false,
    },
    medidas: seed.medidas ?? MEDIDAS_ESTANDAR,
    opcionesVidrio: seed.sinVidrio ? [] : VIDRIOS,
    colores: COLORES,
    accesorios: seed.sinAccesorios ? [] : ACCESORIOS,
    etiquetas:
      discount > 0
        ? ["oferta", seed.linea, seed.categoria]
        : [seed.linea, seed.categoria],
    destacado: seed.destacado ?? false,
    disponible: true,
    creadoEn: FECHA_MOCK,
    actualizadoEn: FECHA_MOCK,
  }
}

export const productos: Producto[] = PRODUCT_SEEDS.map(createProduct)
export const productosHome = productos
