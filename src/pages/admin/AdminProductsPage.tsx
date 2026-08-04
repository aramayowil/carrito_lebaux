import { useMemo, useState } from "react"
import { Plus, Search } from "lucide-react"
import { Link } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ConfirmDeleteDialog } from "@/features/admin/components/ConfirmDeleteDialog"
import { CATEGORIAS_PRODUCTO } from "@/features/products/data/catalog-metadata"
import {
  formatProductPrice,
  getPrimaryProductImage,
} from "@/features/products/lib/product-card-formatters"
import { useContentStore } from "@/store/use-content-store"

/** Listado de productos con búsqueda, filtro por línea y accesos a CRUD. */
export function AdminProductsPage() {
  const productos = useContentStore((state) => state.productos)
  const lineas = useContentStore((state) => state.lineas)
  const eliminarProducto = useContentStore((state) => state.eliminarProducto)

  const [busqueda, setBusqueda] = useState("")
  const [lineaFiltro, setLineaFiltro] = useState("todas")

  const productosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase()
    return productos
      .filter(
        (producto) => lineaFiltro === "todas" || producto.linea === lineaFiltro,
      )
      .filter(
        (producto) =>
          !texto ||
          producto.nombre.toLowerCase().includes(texto) ||
          producto.slug.toLowerCase().includes(texto),
      )
      .sort((a, b) => a.nombre.localeCompare(b.nombre))
  }, [productos, busqueda, lineaFiltro])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold">Productos</h1>
          <p className="text-sm text-muted-foreground">
            {productos.length} producto(s) cargados en total.
          </p>
        </div>
        <Button
          className="rounded-xl"
          render={<Link to="/admin/productos/nuevo" />}
        >
          <Plus data-icon="inline-start" />
          Nuevo producto
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
            placeholder="Buscar por nombre..."
            className="pl-9"
          />
        </div>
        <Select
          value={lineaFiltro}
          onValueChange={(value) => setLineaFiltro(value ?? "todas")}
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas las líneas</SelectItem>
            {lineas.map((linea) => (
              <SelectItem key={linea.slug} value={linea.slug}>
                {linea.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {productosFiltrados.length === 0 ? (
        <p className="rounded-2xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          No hay productos que coincidan con la búsqueda.
        </p>
      ) : (
        <div className="space-y-2">
          {productosFiltrados.map((producto) => {
            const imagen = getPrimaryProductImage(producto)
            const linea = lineas.find((item) => item.slug === producto.linea)
            return (
              <div
                key={producto.id}
                className="flex flex-col gap-3 rounded-2xl border bg-background p-3 sm:flex-row sm:items-center"
              >
                <div className="size-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                  {imagen ? (
                    <img
                      src={imagen.url}
                      alt={imagen.textoAlternativo}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[0.625rem] text-muted-foreground">
                      Sin foto
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{producto.nombre}</p>
                  <p className="text-xs text-muted-foreground">
                    {linea?.nombre} ·{" "}
                    {CATEGORIAS_PRODUCTO[producto.categoria].etiqueta}
                  </p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {producto.destacado && (
                      <Badge variant="secondary" className="rounded-full">
                        Destacado
                      </Badge>
                    )}
                    {producto.precios.porcentajeDescuento > 0 && (
                      <Badge variant="secondary" className="rounded-full">
                        {producto.precios.porcentajeDescuento}% off
                      </Badge>
                    )}
                    {!producto.disponible && (
                      <Badge
                        variant="outline"
                        className="rounded-full text-muted-foreground"
                      >
                        No disponible
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="text-right text-sm font-medium sm:w-32">
                  {producto.precios.consultarPrecio
                    ? "Consultar"
                    : producto.precios.precioBase
                      ? formatProductPrice(producto.precios.precioBase)
                      : "Sin precio"}
                </div>

                <div className="flex shrink-0 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl"
                    render={
                      <Link to={`/admin/productos/${producto.id}/editar`} />
                    }
                  >
                    Editar
                  </Button>
                  <ConfirmDeleteDialog
                    title={`¿Eliminar "${producto.nombre}"?`}
                    description="Esta acción no se puede deshacer. El producto va a desaparecer del catálogo público al instante."
                    onConfirm={() => eliminarProducto(producto.id)}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
