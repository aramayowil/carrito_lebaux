import type {
  CategoriaProducto,
  OpcionMedida,
  Producto,
  SlugLineaProducto,
  TipoApertura,
} from "@/types"

const FECHA_MOCK = "2026-08-03T00:00:00.000Z"

const MEDIDAS_ESTANDAR: OpcionMedida[] = [
  {
    id: "80x100",
    etiqueta: "80 x 100 cm",
    anchoCm: 80,
    altoCm: 100,
    precioAdicional: 0,
  },
  {
    id: "100x120",
    etiqueta: "100 x 120 cm",
    anchoCm: 100,
    altoCm: 120,
    precioAdicional: 25000,
  },
  {
    id: "120x150",
    etiqueta: "120 x 150 cm",
    anchoCm: 120,
    altoCm: 150,
    precioAdicional: 50000,
  },
]

interface ProductSeed {
  slug: string
  nombre: string
  linea: SlugLineaProducto
  categoria: CategoriaProducto
  tipoApertura?: TipoApertura
  imagen: string
  precioTarjeta: number
  descuento?: number
  destacado?: boolean
}

const PRODUCT_SEEDS: ProductSeed[] = [
  {
    slug: "ventana-corrediza-herrero",
    nombre: "Ventana Corrediza Línea Herrero",
    linea: "herrero",
    categoria: "ventana",
    tipoApertura: "corrediza",
    imagen: "/img/v_entero_H.jpg",
    precioTarjeta: 285000,
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
    precioTarjeta: 420000,
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
    precioTarjeta: 145000,
    descuento: 8,
  },
  {
    slug: "puerta-balcon-herrero",
    nombre: "Puerta Balcón Línea Herrero",
    linea: "herrero",
    categoria: "puerta",
    tipoApertura: "puerta-balcon",
    imagen: "/img/puertabalcon_H.jpg",
    precioTarjeta: 395000,
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
    precioTarjeta: 210000,
    descuento: 8,
  },
  {
    slug: "ventana-vidrio-repartido-herrero",
    nombre: "Ventana Vidrio Repartido Línea Herrero",
    linea: "herrero",
    categoria: "ventana",
    tipoApertura: "corrediza",
    imagen: "/img/v_repartido_H.jpg",
    precioTarjeta: 310000,
    descuento: 10,
  },
  {
    slug: "puerta-liviana-herrero",
    nombre: "Puerta Liviana Línea Herrero",
    linea: "herrero",
    categoria: "puerta",
    tipoApertura: "de-abrir",
    imagen: "/img/P_liviana_H.jpg",
    precioTarjeta: 235000,
    descuento: 12,
  },
  {
    slug: "puerta-mdf-herrero",
    nombre: "Puerta MDF Línea Herrero",
    linea: "herrero",
    categoria: "puerta",
    tipoApertura: "de-abrir",
    imagen: "/img/puertaMDF.jpg",
    precioTarjeta: 198000,
    descuento: 12,
  },
  {
    slug: "ventiluz-herrero",
    nombre: "Ventiluz Línea Herrero",
    linea: "herrero",
    categoria: "ventiluz",
    tipoApertura: "batiente",
    imagen: "/img/ventiluz_h.jpg",
    precioTarjeta: 118000,
    descuento: 8,
  },
  {
    slug: "puerta-medio-vidrio-herrero",
    nombre: "Puerta 1/2 Vidrio Línea Herrero",
    linea: "herrero",
    categoria: "puerta",
    tipoApertura: "de-abrir",
    imagen: "/img/p_mediov_h.jpg",
    precioTarjeta: 365000,
    descuento: 10,
  },
  {
    slug: "ventana-corrediza-modena",
    nombre: "Ventana Corrediza Línea Módena",
    linea: "modena",
    categoria: "ventana",
    tipoApertura: "corrediza",
    imagen: "/img/V_M.jpg",
    precioTarjeta: 120000,
    destacado: true,
  },
  {
    slug: "puerta-balcon-modena",
    nombre: "Puerta Balcón Línea Módena",
    linea: "modena",
    categoria: "puerta",
    tipoApertura: "puerta-balcon",
    imagen: "/img/p_balcon_M.jpg",
    precioTarjeta: 240000,
    destacado: true,
  },
]

function createProduct(seed: ProductSeed, index: number): Producto {
  const discount = seed.descuento ?? 0
  const cashPrice = Math.round(seed.precioTarjeta * (1 - discount / 100))

  return {
    id: `home-${String(index + 1).padStart(2, "0")}`,
    slug: seed.slug,
    nombre: seed.nombre,
    linea: seed.linea,
    categoria: seed.categoria,
    tipoApertura: seed.tipoApertura,
    descripcion:
      "Abertura de aluminio de alta resistencia, fabricación propia y terminaciones a medida.",
    imagenes: [
      {
        url: seed.imagen,
        textoAlternativo: seed.nombre,
        esPrincipal: true,
      },
    ],
    precios: {
      precioBase: cashPrice,
      precioTarjeta: seed.precioTarjeta,
      precioContado: cashPrice,
      porcentajeDescuento: discount,
      moneda: "ARS",
      consultarPrecio: false,
    },
    medidas: MEDIDAS_ESTANDAR,
    opcionesVidrio: [],
    colores: [],
    accesorios: [],
    etiquetas: discount > 0 ? ["oferta"] : [],
    destacado: seed.destacado ?? false,
    disponible: true,
    creadoEn: FECHA_MOCK,
    actualizadoEn: FECHA_MOCK,
  }
}

export const productosHome: Producto[] = PRODUCT_SEEDS.map(createProduct)
