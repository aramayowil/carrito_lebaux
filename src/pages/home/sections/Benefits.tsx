import { Factory, Truck, Zap } from "lucide-react"

import { beneficios } from "@/data/mock"
import type { IconoBeneficio } from "@/types"

const ICONOS: Record<IconoBeneficio, typeof Factory> = { Factory, Truck, Zap }

/**
 * Grilla "Por qué Lebaux". Portada de carrito_responsive_actualizado
 * (docs/2026-08-02-migracion-home.md). Fondo `brand-graphite` fijo
 * (independiente del tema claro/oscuro de la app), igual que en el
 * proyecto anterior.
 */
export function Benefits() {
  return (
    <section id="como-comprar" className="bg-brand-graphite py-24 text-white">
      <div className="container mx-auto max-w-6xl px-5">
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="eyebrow mb-3 rounded-full bg-primary/10 px-4 py-1">Por qué Lebaux</span>
          <h2 className="text-3xl font-bold uppercase tracking-tight md:text-4xl">
            Razones para fabricar con nosotros
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {beneficios.map((beneficio) => {
            const Icon = ICONOS[beneficio.icono]
            return (
              <div
                key={beneficio.id}
                className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-2xl hover:shadow-primary/5"
              >
                <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold uppercase tracking-wide text-white">
                  {beneficio.titulo}
                </h3>
                <p className="text-sm leading-relaxed text-white/65">{beneficio.descripcion}</p>
                <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-primary/5 blur-2xl transition-all duration-300 group-hover:bg-primary/10" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
