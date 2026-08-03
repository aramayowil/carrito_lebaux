import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import heroImage from "@/assets/hero.png"

/**
 * Sección principal (above the fold) de la home. Ocupa exactamente el
 * viewport disponible debajo del navbar fijo (`min-h-dvh`, compensado por
 * el `pt-20` de RootLayout). Portada de carrito_responsive_actualizado
 * (docs/2026-08-02-migracion-home.md).
 *
 * La imagen usa `src/assets/hero.png` (ya presente en el proyecto) en vez
 * del path viejo `/public/img/bannerweb.png`.
 */
export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-dvh flex-col overflow-hidden bg-brand-black text-white lg:flex-row"
    >
      {/* Columna de texto */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-6 py-12 sm:px-10 sm:py-16 lg:w-1/2 lg:flex-none lg:px-16 lg:py-0 xl:w-5/12">
        <span className="eyebrow mb-6 w-fit rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wider">
          FÁBRICA DE ABERTURAS &middot; TUCUMÁN
        </span>

        <h1 className="max-w-2xl text-balance text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl xl:text-6xl">
          Cada abertura, <span className="mt-2 block text-primary">fabricada a tu medida</span>
        </h1>

        <p className="mt-6 max-w-lg text-base leading-relaxed text-white/75 md:text-lg">
          Líneas Herrero y Módena, fabricación propia. Elegí medidas, vidrios, colores y accesorios,
          mirá el precio actualizarse al instante y encargalo directo por WhatsApp.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button size="lg" className="w-full px-8 sm:w-auto" render={<Link to="/modena" />}>
            Ver línea Módena <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full border-white/20 px-8 text-white hover:bg-white/10 hover:text-white sm:w-auto"
            render={<Link to="/herrero" />}
          >
            Ver línea Herrero
          </Button>
        </div>
      </div>

      {/* Columna de foto */}
      <div className="relative order-first h-80 w-full shrink-0 sm:h-96 lg:order-2 lg:h-auto lg:w-1/2 xl:w-7/12">
        <img
          src={heroImage}
          alt="Fachada de una vivienda con ventanas y puertas de aluminio Lebaux instaladas"
          className="h-full w-full object-cover object-center"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />

        {/* Degradado para una transición suave entre la foto y el fondo negro */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent lg:bg-gradient-to-r lg:from-brand-black lg:via-brand-black/50 lg:to-transparent" />

        <div className="corner-marks-static pointer-events-none absolute inset-8 hidden lg:block" />
      </div>
    </section>
  )
}
