import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { FeaturedProductCard } from "@/features/products/components/FeaturedProductCard"
import { PromotionProductCard } from "@/features/products/components/PromotionProductCard"
import type { Producto } from "@/types"

interface HomeProductsSectionProps {
  products: Producto[]
}

/** Compone las ofertas y los destacados del catálogo que solo aparecen en la Home. */
export function HomeProductsSection({ products }: HomeProductsSectionProps) {
  const promotions = products.filter(
    (product) => product.disponible && product.precios.porcentajeDescuento > 0,
  )
  const featured = products.filter(
    (product) => product.disponible && product.destacado,
  )

  return (
    <>
      {promotions.length > 0 && (
        <section
          aria-labelledby="promotions-title"
          className="px-4 py-16 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-screen-2xl rounded-3xl border border-primary/20 bg-linear-to-br from-background via-background to-accent/35 p-6 shadow-lg sm:p-8 lg:p-10">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow mb-2">Ofertas especiales</p>
                <h2
                  id="promotions-title"
                  className="section-title section-title-left"
                >
                  Productos con descuento
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-muted-foreground">
                Descubrí productos de nuestras líneas con promociones exclusivas
                para aprovechar.
              </p>
            </div>

            <div className="relative px-1 sm:px-8">
              <Carousel
                opts={{ align: "start", loop: true }}
                className="w-full"
              >
                <CarouselContent>
                  {promotions.map((product) => (
                    <CarouselItem
                      key={product.id}
                      className="basis-full md:basis-1/2 xl:basis-1/3"
                    >
                      <PromotionProductCard product={product} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:inline-flex" />
                <CarouselNext className="hidden sm:inline-flex" />
              </Carousel>
            </div>
          </div>
        </section>
      )}

      {featured.length > 0 && (
        <section
          id="productos"
          aria-labelledby="featured-title"
          className="py-20"
        >
          <div className="container">
            <p className="eyebrow mb-2 flex justify-center text-center">
              Catálogo
            </p>
            <h2 id="featured-title" className="section-title mb-4">
              Destacados
            </h2>
            <p className="mx-auto mb-12 max-w-xl text-center text-muted-foreground">
              Una selección de nuestros productos más pedidos, disponibles en
              distintas medidas.
            </p>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {featured.map((product) => (
                <FeaturedProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
