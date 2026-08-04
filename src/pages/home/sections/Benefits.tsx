import {
  BadgeDollarSign,
  MessageCircle,
  Ruler,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useContentStore } from "@/store/use-content-store"
import type { IconoBeneficio } from "@/types"

const ICONOS: Record<IconoBeneficio, LucideIcon> = {
  Ruler,
  SlidersHorizontal,
  BadgeDollarSign,
  MessageCircle,
}

/**
 * Resume las ventajas concretas del proceso de compra y fabricación Lebaux.
 */
export function Benefits() {
  const beneficios = useContentStore((state) => state.beneficios)

  return (
    <section
      id="como-comprar"
      className="relative overflow-hidden bg-brand-graphite py-20 text-white sm:py-24"
      aria-labelledby="benefits-title"
    >
      <div
        className="absolute -left-24 top-1/3 size-72 rounded-full bg-primary/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="container relative grid items-start gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
        <div className="max-w-xl lg:pt-5">
          <p className="eyebrow mb-3">Una compra simple</p>
          <h2
            id="benefits-title"
            className="text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl"
          >
            <span className="block">Elegí, configurá y pedí</span>
            <span className="text-primary">sin vueltas</span>
          </h2>
          <p className="mt-5 text-base leading-7 text-white/65">
            Desde la primera medida hasta el pedido final, te damos información
            clara para que encuentres la abertura adecuada para tu proyecto.
          </p>

          <div className="mt-8 flex items-center gap-3 text-sm text-white/70">
            <span className="h-px w-10 bg-primary" aria-hidden="true" />
            Líneas Herrero y Módena
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {beneficios.map((beneficio, index) => {
            const Icon = ICONOS[beneficio.icono]
            return (
              <Card
                key={beneficio.id}
                className="corner-marks border border-white/10 bg-white/5 text-white shadow-none ring-0 transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-xl hover:shadow-black/15"
              >
                <CardHeader>
                  <div className="mb-3 flex items-start justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover/card:scale-105">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs tracking-widest text-white/30">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <CardTitle className="text-lg font-bold text-white">
                    {beneficio.titulo}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-6 text-white/60">
                    {beneficio.descripcion}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
