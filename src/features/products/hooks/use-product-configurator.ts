import { useMemo, useState } from "react"

import { calcularPrecioProducto } from "@/features/products/lib/pricing"
import type {
  Producto,
  SeleccionProducto,
  SlugAccesorio,
  SlugColorPerfil,
  SlugOpcionVidrio,
} from "@/types"

function crearSeleccionInicial(producto: Producto): SeleccionProducto {
  const primerColorDisponible = producto.colores[0]

  if (!primerColorDisponible) {
    throw new Error(
      `El producto "${producto.nombre}" no tiene colores disponibles`,
    )
  }

  return {
    medidaId: producto.medidas[0]?.id ?? "",
    colorSlug: primerColorDisponible.slug,
    vidrioSlug: producto.opcionesVidrio[0]?.slug ?? null,
    accesoriosSlug: producto.accesorios
      .filter((accesorio) => accesorio.incluidoPorDefecto)
      .map((accesorio) => accesorio.slug),
  }
}

export function useProductConfigurator(producto: Producto) {
  const [seleccion, setSeleccion] = useState<SeleccionProducto>(() =>
    crearSeleccionInicial(producto),
  )
  const [cantidad, setCantidadState] = useState(1)

  const desglose = useMemo(
    () => calcularPrecioProducto(producto, seleccion, cantidad),
    [cantidad, producto, seleccion],
  )

  const setCantidad = (value: number) => setCantidadState(Math.max(1, value))
  const setMedida = (medidaId: string) =>
    setSeleccion((current) => ({ ...current, medidaId }))
  const setColor = (colorSlug: SlugColorPerfil) =>
    setSeleccion((current) => ({ ...current, colorSlug }))
  const setVidrio = (vidrioSlug: SlugOpcionVidrio | null) =>
    setSeleccion((current) => ({ ...current, vidrioSlug }))
  const toggleAccesorio = (accesorioSlug: SlugAccesorio) =>
    setSeleccion((current) => ({
      ...current,
      accesoriosSlug: current.accesoriosSlug.includes(accesorioSlug)
        ? current.accesoriosSlug.filter((slug) => slug !== accesorioSlug)
        : [...current.accesoriosSlug, accesorioSlug],
    }))

  return {
    seleccion,
    cantidad,
    desglose,
    setCantidad,
    setMedida,
    setColor,
    setVidrio,
    toggleAccesorio,
  }
}
