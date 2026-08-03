/**
 * Tipos del catálogo — CARRITO LEBAUX
 *
 * Jerarquía real del catálogo (más simple que la primera versión):
 *
 * Línea            → sistema de aluminio (Herrero, Módena)
 * └── Producto      → el artículo concreto (ventana, puerta, etc.)
 *     ├── categoria     → QUÉ es el producto (union fija, no una entidad con CRUD)
 *     └── tipoApertura  → CÓMO funciona (corrediza, batiente, fija, ...)
 *
 * A diferencia de la primera versión de estos tipos, acá ya NO existe
 * `TipologiaProducto` como entidad intermedia con id/slug propios. La
 * "tipología" (corredizas, puertas, paños fijos, ...) se resuelve con dos
 * campos planos en `Producto`: `categoria` y `tipoApertura`. Es más simple
 * de filtrar y no obliga a mantener una tabla de tipologías por línea.
 *
 * `linea`, `categoria`, `tipoApertura` y los slugs de accesorios/color/vidrio
 * son *union types* cerrados (no `string` libre) porque hoy el catálogo es
 * fijo y curado a mano: cerrarlos le da autocompletado y detecta errores de
 * tipeo en tiempo de compilación. Si en el futuro un admin puede crear
 * líneas o categorías nuevas dinámicamente, estas uniones vuelven a abrirse
 * a `string` (ver docs/2026-08-02-tipos-globales.md).
 */

/** Única moneda soportada hoy. Unión de un solo miembro a propósito: deja
 *  documentado que el sistema asume ARS en todos lados (precios, carrito),
 *  y si mañana se suma otra moneda, el compilador señala cada lugar que
 *  hay que revisar en cuanto se agregue un segundo miembro. */
export type CodigoMoneda = "ARS";

/** Slug de cada línea (sistema de aluminio) disponible. */
export type SlugLineaProducto = "herrero" | "modena";

/** Qué ES el producto. Reemplaza a la vieja `CategoriaProducto` (entidad) */
export type CategoriaProducto =
  | "ventana"
  | "puerta"
  | "banderola"
  | "ventiluz"
  | "pano-fijo"
  | "sobremesada"
  | "raja";

/** Cómo FUNCIONA el producto (mecanismo de apertura). Independiente de la
 *  categoría: una "puerta" puede ser `corrediza`, `de-abrir` o `puerta-balcon`. */
export type TipoApertura =
  | "corrediza"
  | "de-abrir"
  | "batiente"
  | "fija"
  | "puerta-balcon";

export type SlugAccesorio = "mosquitero" | "premarco" | "tapajunta";

export type SlugColorPerfil = "blanco" | "negro" | "simil-madera";

export type SlugOpcionVidrio =
  | "comun-4mm"
  | "dvh"
  | "blindex"
  | "sycamore-4mm";

/* --------------------------------------------------------------------------
 * Líneas
 * ------------------------------------------------------------------------ */

/**
 * Sistema o familia de perfiles de aluminio.
 *
 * @example
 * const lineaHerrero: LineaProducto = {
 *   id: "linea-herrero",
 *   slug: "herrero",
 *   nombre: "Línea Herrero",
 *   subtitulo: "Robustez para grandes vanos",
 *   descripcion: "Perfil reforzado pensado para aberturas de gran tamaño.",
 *   imagenPortada: "/img/lineas/herrero-portada.jpg",
 * };
 */
export interface LineaProducto {
  id: string;
  slug: SlugLineaProducto;
  nombre: string;
  subtitulo: string;

  /** Descripción ingresada por el usuario administrador. */
  descripcion: string;

  imagenPortada: string;
}

/* --------------------------------------------------------------------------
 * Imágenes
 * ------------------------------------------------------------------------ */

/**
 * @example
 * const imagen: ImagenProducto = {
 *   url: "/img/productos/ventana-corrediza-herrero-01.jpg",
 *   textoAlternativo: "Ventana corrediza línea Herrero, dos hojas, color negro",
 *   esPrincipal: true,
 * };
 */
export interface ImagenProducto {
  url: string;
  textoAlternativo: string;
  esPrincipal?: boolean;
}

/* --------------------------------------------------------------------------
 * Precios
 * ------------------------------------------------------------------------ */

/**
 * Precios de la configuración BASE de un producto (sin opciones elegidas
 * todavía). Los adicionales de medida/color/vidrio/accesorios se suman
 * después, ver `DesglosePrecio` en carrito.ts.
 *
 * @example
 * const precios: PreciosProducto = {
 *   precioBase: 110000,
 *   precioTarjeta: 142900,
 *   precioContado: 110000,
 *   porcentajeDescuento: 0,
 *   moneda: "ARS",
 *   consultarPrecio: false,
 * };
 *
 * @example // producto sin precio publicado (se pide presupuesto)
 * const preciosAConsultar: PreciosProducto = {
 *   precioBase: null,
 *   precioTarjeta: null,
 *   precioContado: null,
 *   porcentajeDescuento: 0,
 *   moneda: "ARS",
 *   consultarPrecio: true,
 * };
 */
export interface PreciosProducto {
  /** Precio inicial antes de aplicar opciones adicionales. */
  precioBase: number | null;

  /** Precio de lista o tarjeta para la configuración base. */
  precioTarjeta: number | null;

  /** Precio de contado para la configuración base. */
  precioContado: number | null;

  porcentajeDescuento: number;
  moneda: CodigoMoneda;

  /** Si es true, la UI debe mostrar "Consultar precio" en vez de un número,
   *  aunque `precioBase` tenga un valor cargado (ej: precio en revisión). */
  consultarPrecio: boolean;
}

/* --------------------------------------------------------------------------
 * Opciones configurables (medida, vidrio, color, accesorios)
 * ------------------------------------------------------------------------ */

/**
 * Una medida disponible para un producto puntual (no es un tamaño genérico
 * global: cada producto define su propia lista de `OpcionMedida`).
 *
 * @example // medida que suma un adicional al precio base
 * const medida120x100: OpcionMedida = {
 *   id: "size-120x100",
 *   etiqueta: "120 x 100 cm",
 *   anchoCm: 120,
 *   altoCm: 100,
 *   precioAdicional: 0,
 * };
 *
 * @example // paño fijo: el precio de la medida REEMPLAZA al precio base
 * const medidaPanoFijo: OpcionMedida = {
 *   id: "size-100x100-fijo",
 *   etiqueta: "100 x 100 cm",
 *   anchoCm: 100,
 *   altoCm: 100,
 *   precioAdicional: 0,
 *   precioFijo: 95000,
 * };
 */
export interface OpcionMedida {
  id: string;
  etiqueta: string;
  anchoCm: number;
  altoCm: number;

  /** Importe que se suma al precio base. */
  precioAdicional: number;

  /**
   * Precio fijo opcional para productos cuyo valor depende completamente
   * de la medida, como los paños fijos. Cuando está presente, reemplaza a
   * `precioBase + precioAdicional` en el cálculo del ítem de carrito.
   */
  precioFijo?: number;
}

/**
 * @example
 * const vidrioDVH: OpcionVidrio = {
 *   id: "vidrio-dvh",
 *   slug: "dvh",
 *   etiqueta: "DVH (doble vidriado hermético)",
 *   precioAdicional: 18000,
 * };
 */
export interface OpcionVidrio {
  id: string;
  slug: SlugOpcionVidrio;
  etiqueta: string;
  precioAdicional: number;
}

/**
 * Nota: a diferencia de `OpcionVidrio`/`Accesorio`, `ColorPerfil` no tiene
 * `id` propio — se identifica solo por `slug`, porque el color es una
 * propiedad transversal del perfil (no varía por producto).
 *
 * @example
 * const colorNegro: ColorPerfil = {
 *   slug: "negro",
 *   etiqueta: "Negro",
 *   hexadecimal: "#1C1C1C",
 *   precioAdicional: 0,
 * };
 */
export interface ColorPerfil {
  slug: SlugColorPerfil;
  etiqueta: string;
  hexadecimal: string;
  precioAdicional: number;
}

/**
 * @example
 * const mosquitero: Accesorio = {
 *   id: "accesorio-mosquitero",
 *   slug: "mosquitero",
 *   etiqueta: "Mosquitero",
 *   precioAdicional: 15000,
 *   incluidoPorDefecto: false,
 * };
 */
export interface Accesorio {
  id: string;
  slug: SlugAccesorio;
  etiqueta: string;
  precioAdicional: number;
  incluidoPorDefecto: boolean;
}

/* --------------------------------------------------------------------------
 * Producto
 * ------------------------------------------------------------------------ */

/**
 * Producto concreto disponible en el catálogo.
 *
 * `linea` y `categoria` son obligatorios (todo producto pertenece a una
 * línea y es de un tipo concreto). `tipoApertura` es opcional porque hay
 * categorías donde no aplica un mecanismo de apertura (p. ej. accesorios
 * sueltos o productos sin variante de apertura definida todavía).
 *
 * @example
 * const ventanaCorredizaHerrero: Producto = {
 *   id: "herrero-01",
 *   slug: "ventana-corrediza-herrero",
 *   nombre: "Ventana Corrediza Línea Herrero",
 *
 *   linea: "herrero",
 *   categoria: "ventana",
 *   tipoApertura: "corrediza",
 *
 *   descripcion: "Ventana corrediza de dos hojas, ideal para grandes vanos.",
 *   imagenes: [
 *     { url: "/img/v-corrediza-herrero-01.jpg", textoAlternativo: "Ventana corrediza Herrero", esPrincipal: true },
 *   ],
 *   precios: {
 *     precioBase: 110000,
 *     precioTarjeta: 142900,
 *     precioContado: 110000,
 *     porcentajeDescuento: 0,
 *     moneda: "ARS",
 *     consultarPrecio: false,
 *   },
 *
 *   medidas: [
 *     { id: "size-120x100", etiqueta: "120 x 100 cm", anchoCm: 120, altoCm: 100, precioAdicional: 0 },
 *   ],
 *   opcionesVidrio: [
 *     { id: "vidrio-comun", slug: "comun-4mm", etiqueta: "Vidrio común 4mm", precioAdicional: 0 },
 *   ],
 *   colores: [
 *     { slug: "negro", etiqueta: "Negro", hexadecimal: "#1C1C1C", precioAdicional: 0 },
 *   ],
 *   accesorios: [
 *     { id: "accesorio-mosquitero", slug: "mosquitero", etiqueta: "Mosquitero", precioAdicional: 15000, incluidoPorDefecto: false },
 *   ],
 *
 *   etiquetas: ["nuevo"],
 *   destacado: true,
 *   disponible: true,
 *
 *   creadoEn: "2026-08-02T00:00:00.000Z",
 *   actualizadoEn: "2026-08-02T00:00:00.000Z",
 * };
 */
export interface Producto {
  id: string;
  slug: string;
  nombre: string;

  linea: SlugLineaProducto;
  categoria: CategoriaProducto;

  /**
   * La categoría indica qué producto es.
   * El tipo de apertura indica cómo funciona.
   */
  tipoApertura?: TipoApertura;

  descripcion: string;
  imagenes: ImagenProducto[];
  precios: PreciosProducto;

  medidas: OpcionMedida[];
  opcionesVidrio: OpcionVidrio[];
  colores: ColorPerfil[];
  accesorios: Accesorio[];

  etiquetas: string[];
  destacado: boolean;
  disponible: boolean;

  creadoEn: string;
  actualizadoEn: string;
}
