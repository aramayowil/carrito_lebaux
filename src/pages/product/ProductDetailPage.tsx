import { Check } from "lucide-react"
import { Link, useParams } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { CatalogProductCard } from "@/features/products/components/CatalogProductCard"
import { ProductConfigurator } from "@/features/products/components/ProductConfigurator"
import { ProductGallery } from "@/features/products/components/ProductGallery"
import {
  CATEGORIAS_PRODUCTO,
  LINEAS_PRODUCTO,
} from "@/features/products/data/catalog-metadata"
import { useDocumentMeta } from "@/hooks/use-document-meta"
import { productos } from "@/data/mock"

/** Ficha completa del producto: galería, configuración, compra y relacionados. */
export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const product = productos.find((item) => item.slug === slug)

  useDocumentMeta({
    title: product?.nombre ?? "Producto no encontrado",
    description: product?.descripcion,
  })

  if (!product) {
    return (
      <div className="container flex min-h-[60dvh] flex-col items-center justify-center gap-4 py-20 text-center">
        <p className="eyebrow">Producto no encontrado</p>
        <h1 className="text-3xl font-bold">
          No pudimos encontrar esa abertura
        </h1>
        <p className="max-w-md text-muted-foreground">
          El enlace puede estar desactualizado. Volvé al catálogo para ver los
          modelos disponibles.
        </p>
        <Button render={<Link to="/">Volver al inicio</Link>} />
      </div>
    )
  }

  const category = CATEGORIAS_PRODUCTO[product.categoria]
  const line = LINEAS_PRODUCTO.find((item) => item.slug === product.linea)!
  const related = productos
    .filter((item) => item.linea === product.linea && item.id !== product.id)
    .sort(
      (a, b) =>
        Number(b.categoria === product.categoria) -
        Number(a.categoria === product.categoria),
    )
    .slice(0, 4)

  return (
    <div className="py-8 sm:py-12">
      <div className="container">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link to="/" />}>Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link to={`/${product.linea}`} />}>
                {line.nombre}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.nombre}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ProductGallery
            key={product.id}
            images={product.imagenes}
            productName={product.nombre}
          />

          <div>
            <p className="eyebrow mb-2">
              {category.etiqueta} · {line.nombre}
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {product.nombre}
            </h1>
            <p className="mt-3 leading-7 text-muted-foreground">
              {product.descripcion}
            </p>
            <div className="mt-7">
              <ProductConfigurator key={product.id} product={product} />
            </div>
          </div>
        </div>

        <section
          className="mt-16 border-t pt-12 sm:mt-20"
          aria-labelledby="details-title"
        >
          <p className="eyebrow mb-2">Características</p>
          <h2 id="details-title" className="text-2xl font-bold">
            Sobre {category.etiqueta.toLowerCase()}
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
            {category.descripcionDetallada}
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {category.caracteristicas.map((feature) => (
              <Card
                key={feature}
                className="gap-0 border border-border/70 py-0"
              >
                <CardContent className="flex items-start gap-3 p-4 text-sm">
                  <span className="mt-0.5 rounded-full bg-success/10 p-1 text-success">
                    <Check className="size-4" />
                  </span>
                  {feature}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section
            className="mt-16 border-t pt-12 sm:mt-20"
            aria-labelledby="related-title"
          >
            <p className="eyebrow mb-2">También puede interesarte</p>
            <h2 id="related-title" className="mb-6 text-2xl font-bold">
              Productos relacionados
            </h2>
            <div className="grid grid-cols-1 gap-4 min-[360px]:grid-cols-2 min-[360px]:gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
              {related.map((item) => (
                <CatalogProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
