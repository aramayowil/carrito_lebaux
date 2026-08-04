import { create } from "zustand"
import { persist } from "zustand/middleware"

import { LINEAS_PRODUCTO } from "@/features/products/data/catalog-metadata"
import { beneficios as beneficiosMock } from "@/data/mock/beneficios"
import { obras as obrasMock } from "@/data/mock/obras"
import { productos as productosMock } from "@/data/mock/productos"
import { configuracionSitio as sitioMock } from "@/data/mock/sitio"
import type {
  Beneficio,
  ConfiguracionSitio,
  LineaProducto,
  Obra,
  Producto,
  SlugLineaProducto,
} from "@/types"

/**
 * Store global de contenido — CARRITO LEBAUX
 *
 * Hoy no hay backend (ver AGENTS.md, ítem pendiente "Conexión a datos
 * reales"). Mientras tanto este store es la única fuente de verdad: se
 * siembra una vez con `data/mock` y persiste en localStorage con Zustand
 * (mismo patrón que `features/cart/store/use-cart-store.ts`).
 *
 * El sitio público (Home, catálogo, ficha de producto, footer, etc.) SOLO
 * lee de acá. El panel admin (`features/admin`) es el único que llama a
 * las acciones de mutación. Cuando se conecte Supabase, este archivo es el
 * único lugar a reemplazar: las acciones pasan a ser async y pegarle a la
 * base en vez de a `set()`, sin tocar los componentes que consumen el
 * store vía los hooks de abajo.
 */

interface ContentState {
  productos: Producto[]
  lineas: LineaProducto[]
  obras: Obra[]
  beneficios: Beneficio[]
  sitio: ConfiguracionSitio

  crearProducto: (producto: Producto) => void
  actualizarProducto: (id: string, cambios: Partial<Producto>) => void
  eliminarProducto: (id: string) => void

  actualizarLinea: (
    slug: SlugLineaProducto,
    cambios: Partial<LineaProducto>,
  ) => void

  crearObra: (obra: Obra) => void
  actualizarObra: (id: string, cambios: Partial<Obra>) => void
  eliminarObra: (id: string) => void

  crearBeneficio: (beneficio: Beneficio) => void
  actualizarBeneficio: (id: string, cambios: Partial<Beneficio>) => void
  eliminarBeneficio: (id: string) => void

  actualizarSitio: (cambios: Partial<ConfiguracionSitio>) => void

  /** Descarta todos los cambios cargados y vuelve a los datos de ejemplo. */
  restaurarDatosDePrueba: () => void
}

const ESTADO_INICIAL = {
  productos: productosMock,
  lineas: LINEAS_PRODUCTO,
  obras: obrasMock,
  beneficios: beneficiosMock,
  sitio: sitioMock,
}

export const useContentStore = create<ContentState>()(
  persist(
    (set) => ({
      ...ESTADO_INICIAL,

      crearProducto: (producto) =>
        set((state) => ({ productos: [...state.productos, producto] })),
      actualizarProducto: (id, cambios) =>
        set((state) => ({
          productos: state.productos.map((producto) =>
            producto.id === id
              ? {
                  ...producto,
                  ...cambios,
                  actualizadoEn: new Date().toISOString(),
                }
              : producto,
          ),
        })),
      eliminarProducto: (id) =>
        set((state) => ({
          productos: state.productos.filter((producto) => producto.id !== id),
        })),

      actualizarLinea: (slug, cambios) =>
        set((state) => ({
          lineas: state.lineas.map((linea) =>
            linea.slug === slug ? { ...linea, ...cambios } : linea,
          ),
        })),

      crearObra: (obra) => set((state) => ({ obras: [obra, ...state.obras] })),
      actualizarObra: (id, cambios) =>
        set((state) => ({
          obras: state.obras.map((obra) =>
            obra.id === id ? { ...obra, ...cambios } : obra,
          ),
        })),
      eliminarObra: (id) =>
        set((state) => ({
          obras: state.obras.filter((obra) => obra.id !== id),
        })),

      crearBeneficio: (beneficio) =>
        set((state) => ({ beneficios: [...state.beneficios, beneficio] })),
      actualizarBeneficio: (id, cambios) =>
        set((state) => ({
          beneficios: state.beneficios.map((beneficio) =>
            beneficio.id === id ? { ...beneficio, ...cambios } : beneficio,
          ),
        })),
      eliminarBeneficio: (id) =>
        set((state) => ({
          beneficios: state.beneficios.filter(
            (beneficio) => beneficio.id !== id,
          ),
        })),

      actualizarSitio: (cambios) =>
        set((state) => ({ sitio: { ...state.sitio, ...cambios } })),

      restaurarDatosDePrueba: () => set(ESTADO_INICIAL),
    }),
    { name: "lebaux-content" },
  ),
)
