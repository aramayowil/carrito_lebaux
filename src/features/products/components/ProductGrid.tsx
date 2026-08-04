import { Skeleton } from "@/components/ui/skeleton"
import { CatalogProductCard } from "@/features/products/components/CatalogProductCard"
import type { Producto } from "@/types"

interface ProductGridProps {
  products: Producto[]
  loading?: boolean
}

/** Grilla responsive única para los catálogos por línea. */
export function ProductGrid({ products, loading = false }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 xs:gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-112 rounded-2xl xs:h-80 sm:h-96" />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <p className="rounded-3xl border border-dashed py-16 text-center text-muted-foreground">
        No encontramos productos con ese filtro.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 xs:gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <CatalogProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
