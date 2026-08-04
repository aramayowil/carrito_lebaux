import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
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
          <div className="mx-auto max-w-screen-2xl rounded-3xl border border-primary/20 bg-linear-to-br from-background via-background to-accent/35 p-4 shadow-lg sm:p-8 lg:p-10">
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
                      className="basis-full xs:basis-1/2 md:basis-1/3 xl:basis-1/4"
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
          className="scroll-mt-navbar py-20"
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

            <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 xs:gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
              {featured.map((product) => (
                <FeaturedProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-12 rounded-3xl border border-primary/20 bg-brand-graphite p-6 text-white shadow-xl sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
                <div>
                  <p className="eyebrow mb-2">Catálogos completos</p>
                  <h3 className="text-2xl font-bold uppercase tracking-tight">
                    Todavía hay más para elegir
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-white/65">
                    Recorré todos los modelos y encontrá la línea que mejor se
                    adapte a tu proyecto.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Button
                    size="lg"
                    className="h-auto min-h-18 w-full justify-between whitespace-normal px-5 py-4 text-left"
                    render={<Link to="/modena" />}
                  >
                    <span className="min-w-0">
                      <span className="block text-base font-semibold">
                        Explorar Línea Módena
                      </span>
                      <span className="mt-1 block text-xs font-normal text-primary-foreground/70">
                        Más opciones y terminaciones
                      </span>
                    </span>
                    <ArrowRight className="size-5" aria-hidden="true" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-auto min-h-18 w-full justify-between whitespace-normal border-white/20 bg-white/5 px-5 py-4 text-left text-white hover:bg-white/10 hover:text-white"
                    render={<Link to="/herrero" />}
                  >
                    <span className="min-w-0">
                      <span className="block text-base font-semibold">
                        Explorar Línea Herrero
                      </span>
                      <span className="mt-1 block text-xs font-normal text-white/60">
                        Una solución práctica y resistente
                      </span>
                    </span>
                    <ArrowRight className="size-5" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
