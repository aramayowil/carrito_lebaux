import type { DesglosePrecio, Producto, SeleccionProducto } from "@/types"

export interface PrecioInicialProducto {
  tarjeta: number
  contado: number
}

export function calcularPrecioProducto(
  producto: Producto,
  seleccion: SeleccionProducto,
  cantidad = 1,
): DesglosePrecio {
  const medida = producto.medidas.find((item) => item.id === seleccion.medidaId)
  const color = producto.colores.find(
    (item) => item.slug === seleccion.colorSlug,
  )
  const vidrio = producto.opcionesVidrio.find(
    (item) => item.slug === seleccion.vidrioSlug,
  )
  const accesorios = producto.accesorios.filter((item) =>
    seleccion.accesoriosSlug.includes(item.slug),
  )

  const usaPrecioFijo = medida?.precioFijo !== undefined
  const precioBase = usaPrecioFijo
    ? medida.precioFijo!
    : (producto.precios.precioBase ??
      producto.precios.precioContado ??
      producto.precios.precioTarjeta ??
      0)
  const adicionalMedida = usaPrecioFijo ? 0 : (medida?.precioAdicional ?? 0)
  const adicionalColor = color?.precioAdicional ?? 0
  const adicionalVidrio = vidrio?.precioAdicional ?? 0
  const adicionalAccesorios = accesorios.reduce(
    (total, accesorio) => total + accesorio.precioAdicional,
    0,
  )
  const adicionales =
    adicionalMedida + adicionalColor + adicionalVidrio + adicionalAccesorios
  const cantidadNormalizada = Math.max(1, cantidad)

  const baseContado = usaPrecioFijo
    ? precioBase
    : (producto.precios.precioContado ?? precioBase)
  const baseTarjeta = usaPrecioFijo
    ? precioBase
    : (producto.precios.precioTarjeta ?? precioBase)
  const precioUnitarioContado = baseContado + adicionales
  const precioUnitarioTarjeta = baseTarjeta + adicionales

  return {
    moneda: producto.precios.moneda,
    precioBase,
    adicionalMedida,
    adicionalColor,
    adicionalVidrio,
    adicionalAccesorios,
    porcentajeDescuento: producto.precios.porcentajeDescuento,
    precioUnitarioContado,
    precioUnitarioTarjeta,
    totalContado: precioUnitarioContado * cantidadNormalizada,
    totalTarjeta: precioUnitarioTarjeta * cantidadNormalizada,
  }
}

export function obtenerPrecioInicial(
  producto: Producto,
): PrecioInicialProducto | null {
  if (producto.precios.consultarPrecio || producto.medidas.length === 0)
    return null

  const color = [...producto.colores].sort(
    (a, b) => a.precioAdicional - b.precioAdicional,
  )[0]
  const vidrio = [...producto.opcionesVidrio].sort(
    (a, b) => a.precioAdicional - b.precioAdicional,
  )[0]

  const precios = producto.medidas.map((medida) =>
    calcularPrecioProducto(
      producto,
      {
        medidaId: medida.id,
        colorSlug: color?.slug ?? "blanco",
        vidrioSlug: vidrio?.slug ?? null,
        accesoriosSlug: [],
      },
      1,
    ),
  )
  const menor = precios.reduce((actual, precio) =>
    precio.precioUnitarioTarjeta < actual.precioUnitarioTarjeta
      ? precio
      : actual,
  )

  return {
    tarjeta: menor.precioUnitarioTarjeta,
    contado: menor.precioUnitarioContado,
  }
}

export function actualizarCantidadDesglose(
  desglose: DesglosePrecio,
  cantidad: number,
): DesglosePrecio {
  const cantidadNormalizada = Math.max(1, cantidad)
  return {
    ...desglose,
    totalContado: desglose.precioUnitarioContado * cantidadNormalizada,
    totalTarjeta: desglose.precioUnitarioTarjeta * cantidadNormalizada,
  }
}
