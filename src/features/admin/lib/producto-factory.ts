import type { Producto, SlugLineaProducto } from "@/types"

/** Producto en blanco para arrancar el formulario de "Nuevo producto". */
export function crearProductoVacio(linea: SlugLineaProducto): Producto {
  const ahora = new Date().toISOString()

  return {
    id: crypto.randomUUID(),
    slug: "",
    nombre: "",
    linea,
    categoria: "ventana",
    tipoApertura: undefined,
    descripcion: "",
    imagenes: [],
    precios: {
      precioBase: null,
      precioTarjeta: null,
      precioContado: null,
      porcentajeDescuento: 0,
      moneda: "ARS",
      consultarPrecio: false,
    },
    medidas: [],
    opcionesVidrio: [],
    colores: [],
    accesorios: [],
    etiquetas: [],
    destacado: false,
    disponible: true,
    creadoEn: ahora,
    actualizadoEn: ahora,
  }
}

/** Genera un id legible y único para una nueva medida dentro del formulario. */
export function crearIdMedida(): string {
  return `size-${crypto.randomUUID().slice(0, 8)}`
}
