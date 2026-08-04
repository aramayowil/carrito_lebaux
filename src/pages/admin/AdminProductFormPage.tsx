import { useMemo } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"

import { ProductForm } from "@/features/admin/components/ProductForm"
import { crearProductoVacio } from "@/features/admin/lib/producto-factory"
import { useContentStore } from "@/store/use-content-store"
import type { Producto } from "@/types"

/** Alta y edición de producto. La misma página sirve para ambos casos. */
export function AdminProductFormPage() {
  const { id } = useParams<{ id?: string }>()
  const navigate = useNavigate()

  const productos = useContentStore((state) => state.productos)
  const lineas = useContentStore((state) => state.lineas)
  const crearProducto = useContentStore((state) => state.crearProducto)
  const actualizarProducto = useContentStore((state) => state.actualizarProducto)

  const esEdicion = Boolean(id)
  const productoExistente = esEdicion
    ? productos.find((producto) => producto.id === id)
    : undefined

  const productoInicial = useMemo<Producto>(
    () => productoExistente ?? crearProductoVacio(lineas[0]?.slug ?? "herrero"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id],
  )

  if (esEdicion && !productoExistente) {
    return <Navigate to="/admin/productos" replace />
  }

  function handleGuardar(producto: Producto) {
    if (esEdicion && productoExistente) {
      actualizarProducto(productoExistente.id, producto)
    } else {
      crearProducto(producto)
    }
    navigate("/admin/productos")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold">
          {esEdicion ? "Editar producto" : "Nuevo producto"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {esEdicion
            ? `Estás editando "${productoExistente?.nombre}".`
            : "Completá los datos y guardá para publicarlo en el catálogo."}
        </p>
      </div>

      <ProductForm
        productoInicial={productoInicial}
        lineas={lineas}
        slugsExistentes={productos.map((producto) => producto.slug)}
        onGuardar={handleGuardar}
        onCancelar={() => navigate("/admin/productos")}
      />
    </div>
  )
}
