import { MessageCircle, PanelsTopLeft } from "lucide-react"

import { ProductImage } from "@/components/media/ProductImage"
import { Card, CardContent } from "@/components/ui/card"

const FORTALEZAS = [
  {
    title: "La línea adecuada para cada proyecto",
    description:
      "Trabajamos con Herrero y Módena para ofrecer alternativas según el uso, la terminación y el presupuesto.",
    icon: PanelsTopLeft,
  },
  {
    title: "Acompañamiento directo",
    description:
      "Te ayudamos a revisar medidas, configuraciones y detalles antes de confirmar tu pedido.",
    icon: MessageCircle,
  },
]

/**
 * Presentación institucional de la fábrica, sus líneas y su acompañamiento.
 */
export function AboutSection() {
  return (
    <section
      id="nosotros"
      className="bg-background py-20 sm:py-24"
      aria-labelledby="about-title"
    >
      <div className="container grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <ProductImage
            src="/img/quienes_somos.png"
            alt="Fabricación de aberturas de aluminio en Lebaux"
            className="corner-marks-static relative aspect-[4/3] w-full rounded-3xl bg-white shadow-xl"
            imgClassName="object-cover"
          />
        </div>

        <div>
          <p className="eyebrow mb-2">Conocé Lebaux</p>
          <h2
            id="about-title"
            className="section-title section-title-left mb-6"
          >
            Fabricamos soluciones para la forma en que vivís
          </h2>
          <div className="space-y-4 leading-7 text-muted-foreground">
            <p>
              Somos una fábrica tucumana de aberturas de aluminio. Creamos
              ventanas, puertas y cerramientos pensados para acompañar cada
              espacio, desde una renovación puntual hasta una obra completa.
            </p>
            <p>
              Combinamos fabricación propia, opciones configurables y atención
              cercana para que puedas elegir con claridad y avanzar con
              confianza.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {FORTALEZAS.map((fortaleza) => {
              const Icon = fortaleza.icon
              return (
                <Card
                  key={fortaleza.title}
                  size="sm"
                  className="gap-0 border border-border/70 py-0 shadow-none"
                >
                  <CardContent className="flex items-start gap-4 px-4 py-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-bold">{fortaleza.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {fortaleza.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
