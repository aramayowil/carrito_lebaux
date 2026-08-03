import { create } from "zustand"
import { persist } from "zustand/middleware"

import {
  actualizarCantidadDesglose,
  calcularPrecioProducto,
} from "@/features/products/lib/pricing"
import type { ItemCarrito, Producto, SeleccionProducto } from "@/types"

export interface TotalesCarrito {
  cantidadItems: number
  totalContado: number
  totalTarjeta: number
}

interface CartState {
  items: ItemCarrito[]
  agregarItem: (
    producto: Producto,
    seleccion: SeleccionProducto,
    cantidad: number,
  ) => void
  actualizarCantidad: (itemId: string, cantidad: number) => void
  eliminarItem: (itemId: string) => void
  vaciar: () => void
}

function mismaSeleccion(a: SeleccionProducto, b: SeleccionProducto): boolean {
  return (
    a.medidaId === b.medidaId &&
    a.colorSlug === b.colorSlug &&
    a.vidrioSlug === b.vidrioSlug &&
    [...a.accesoriosSlug].sort().join("|") ===
      [...b.accesoriosSlug].sort().join("|")
  )
}

function crearItem(
  producto: Producto,
  seleccion: SeleccionProducto,
  cantidad: number,
): ItemCarrito {
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
  const imagen =
    producto.imagenes.find((item) => item.esPrincipal)?.url ??
    producto.imagenes[0]?.url ??
    ""

  return {
    id: crypto.randomUUID(),
    producto: {
      id: producto.id,
      slug: producto.slug,
      nombre: producto.nombre,
      linea: producto.linea,
      categoria: producto.categoria,
      imagen,
    },
    seleccion,
    resumenSeleccion: {
      medidaEtiqueta: medida?.etiqueta ?? "A definir",
      colorEtiqueta: color?.etiqueta ?? "A definir",
      vidrioEtiqueta: vidrio?.etiqueta ?? null,
      accesoriosEtiqueta: accesorios.map((item) => item.etiqueta),
    },
    cantidad: Math.max(1, cantidad),
    precios: calcularPrecioProducto(producto, seleccion, cantidad),
  }
}

export function calcularTotalesCarrito(items: ItemCarrito[]): TotalesCarrito {
  return items.reduce<TotalesCarrito>(
    (totales, item) => ({
      cantidadItems: totales.cantidadItems + item.cantidad,
      totalContado: totales.totalContado + item.precios.totalContado,
      totalTarjeta: totales.totalTarjeta + item.precios.totalTarjeta,
    }),
    { cantidadItems: 0, totalContado: 0, totalTarjeta: 0 },
  )
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      agregarItem: (producto, seleccion, cantidad) =>
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) =>
              item.producto.id === producto.id &&
              mismaSeleccion(item.seleccion, seleccion),
          )

          if (existingIndex === -1) {
            return {
              items: [...state.items, crearItem(producto, seleccion, cantidad)],
            }
          }

          const items = [...state.items]
          const existing = items[existingIndex]
          const nextQuantity = existing.cantidad + Math.max(1, cantidad)
          items[existingIndex] = {
            ...existing,
            cantidad: nextQuantity,
            precios: actualizarCantidadDesglose(existing.precios, nextQuantity),
          }
          return { items }
        }),
      actualizarCantidad: (itemId, cantidad) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId
              ? {
                  ...item,
                  cantidad: Math.max(1, cantidad),
                  precios: actualizarCantidadDesglose(item.precios, cantidad),
                }
              : item,
          ),
        })),
      eliminarItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        })),
      vaciar: () => set({ items: [] }),
    }),
    { name: "lebaux-cart" },
  ),
)
