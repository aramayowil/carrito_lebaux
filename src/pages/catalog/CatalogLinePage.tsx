import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  CATEGORIAS_PRODUCTO,
  LINEAS_PRODUCTO,
  ORDEN_CATEGORIAS,
} from "@/features/products/data/catalog-metadata"
import { ProductGrid } from "@/features/products/components/ProductGrid"
import { useDocumentMeta } from "@/hooks/use-document-meta"
import { CatalogLineMoreContent } from "@/pages/catalog/sections/CatalogLineMoreContent"
import { productos } from "@/data/mock"
import type { CategoriaProducto, SlugLineaProducto } from "@/types"

interface CatalogLinePageProps {
  line: SlugLineaProducto
}

const CATEGORY_QUERY_PARAM = "categoria"

/** Página de catálogo reutilizada por las líneas Herrero y Módena. */
export function CatalogLinePage({ line }: CatalogLinePageProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const lineInfo = LINEAS_PRODUCTO.find((item) => item.slug === line)!
  const lineProducts = useMemo(
    () =>
      productos.filter(
        (product) => product.linea === line && product.disponible,
      ),
    [line],
  )
  const presentCategories = useMemo(
    () => new Set(lineProducts.map((product) => product.categoria)),
    [lineProducts],
  )
  const availableCategories = ORDEN_CATEGORIAS.filter((category) =>
    presentCategories.has(category),
  )
  const categoryParam = searchParams.get(CATEGORY_QUERY_PARAM)
  const activeCategory: CategoriaProducto | "todas" =
    categoryParam && categoryParam in CATEGORIAS_PRODUCTO
      ? (categoryParam as CategoriaProducto)
      : "todas"
  const visibleProducts =
    activeCategory === "todas"
      ? lineProducts
      : lineProducts.filter((product) => product.categoria === activeCategory)

  useDocumentMeta({ title: lineInfo.nombre, description: lineInfo.descripcion })

  const selectCategory = (category: CategoriaProducto | "todas") => {
    const next = new URLSearchParams(searchParams)
    if (category === "todas") next.delete(CATEGORY_QUERY_PARAM)
    else next.set(CATEGORY_QUERY_PARAM, category)
    setSearchParams(next, { replace: true })
  }

  return (
    <div className="bg-background py-8 sm:py-12">
      <div className="container">
        <Card className="mx-auto mb-10 max-w-3xl rounded-3xl border-border/70 bg-background/80 py-0 text-center shadow-sm backdrop-blur">
          <CardContent className="px-6 py-8 sm:px-8 lg:px-10">
            <p className="eyebrow mb-3 justify-center text-center text-xs">
              Línea de fabricación
            </p>
            <h1 className="section-title mb-4 text-3xl sm:text-4xl lg:text-5xl">
              {lineInfo.nombre}
            </h1>
            <p className="mx-auto max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              {lineInfo.descripcion}
            </p>
          </CardContent>
        </Card>

        <div
          className="mb-8 overflow-x-auto pb-2"
          aria-label="Filtros del catálogo"
        >
          <div className="flex min-w-max gap-2 rounded-2xl border bg-card p-2 sm:min-w-0 sm:flex-wrap">
            <Button
              variant={activeCategory === "todas" ? "default" : "outline"}
              className="rounded-full"
              aria-pressed={activeCategory === "todas"}
              onClick={() => selectCategory("todas")}
            >
              Todas
            </Button>
            {availableCategories.map((category) => {
              const metadata = CATEGORIAS_PRODUCTO[category]
              const Icon = metadata.icono
              return (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  className="rounded-full"
                  aria-pressed={activeCategory === category}
                  onClick={() => selectCategory(category)}
                >
                  <Icon data-icon="inline-start" />
                  {metadata.etiqueta}
                </Button>
              )
            })}
          </div>
        </div>

        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">
              {visibleProducts.length} productos
            </p>
            <h2 className="text-xl font-bold sm:text-2xl">
              {activeCategory === "todas"
                ? `Catálogo ${lineInfo.nombre}`
                : CATEGORIAS_PRODUCTO[activeCategory].etiqueta}
            </h2>
          </div>
        </div>

        <ProductGrid products={visibleProducts} />

        <CatalogLineMoreContent line={line} />
      </div>
    </div>
  )
}
