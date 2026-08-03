import {
  BadgeDollarSign,
  Check,
  Clock3,
  Maximize2,
  ShieldCheck,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react"
import { Link } from "react-router-dom"

import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LINEAS_PRODUCTO } from "@/features/products/data/catalog-metadata"
import { buildWhatsAppUrl } from "@/lib/whatsapp"
import { cn } from "@/lib/utils"
import type { SlugLineaProducto } from "@/types"

interface LineBenefit {
  title: string
  description: string
  icon: LucideIcon
}

interface LineContent {
  benefits: LineBenefit[]
  idealFor: string[]
}

const LINE_CONTENT: Record<SlugLineaProducto, LineContent> = {
  herrero: {
    benefits: [
      {
        title: "Excelente costo-beneficio",
        description:
          "Una solución confiable para obra y reposición, con prestaciones durables a un precio accesible.",
        icon: BadgeDollarSign,
      },
      {
        title: "Perfiles reforzados",
        description:
          "Estructuras resistentes y simples de mantener, pensadas para acompañar el uso cotidiano.",
        icon: Wrench,
      },
      {
        title: "Disponibilidad ágil",
        description:
          "Modelos clásicos y medidas habituales que permiten avanzar con tu proyecto sin complicaciones.",
        icon: Clock3,
      },
    ],
    idealFor: [
      "Obras y reposiciones",
      "Presupuestos optimizados",
      "Soluciones clásicas y resistentes",
    ],
  },
  modena: {
    benefits: [
      {
        title: "Mayor hermeticidad",
        description:
          "Un sistema de cierre cuidado que mejora el sellado y el confort en los ambientes.",
        icon: ShieldCheck,
      },
      {
        title: "Fabricación a medida",
        description:
          "Medidas, vidrios, colores y accesorios configurados según las necesidades de cada proyecto.",
        icon: Maximize2,
      },
      {
        title: "Terminación premium",
        description:
          "Perfiles y accesorios originales para lograr una estética moderna y un funcionamiento preciso.",
        icon: Sparkles,
      },
    ],
    idealFor: [
      "Proyectos personalizados",
      "Mayor aislación y hermeticidad",
      "Terminaciones modernas y premium",
    ],
  },
}

interface CatalogLineMoreContentProps {
  line: SlugLineaProducto
}

/** Completa el catálogo con argumentos de compra, comparación y asesoramiento. */
export function CatalogLineMoreContent({ line }: CatalogLineMoreContentProps) {
  const lineInfo = LINEAS_PRODUCTO.find((item) => item.slug === line)!
  const whatsappHref = buildWhatsAppUrl(
    `Hola! Estoy viendo ${lineInfo.nombre} y necesito ayuda para elegir una abertura.`,
  )

  return (
    <div className="mt-16 space-y-16 border-t pt-12 sm:mt-20 sm:space-y-20 sm:pt-16">
      <section aria-labelledby="line-benefits-title">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <p className="eyebrow mb-3 justify-center text-center">
            Beneficios de la línea
          </p>
          <h2
            id="line-benefits-title"
            className="section-title text-2xl sm:text-3xl"
          >
            Lo que distingue a {lineInfo.nombre}
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {LINE_CONTENT[line].benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <Card
                key={benefit.title}
                className="border border-border/70 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-lg font-bold">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-6 text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <section aria-labelledby="line-comparison-title">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <p className="eyebrow mb-3 justify-center text-center">
            Compará las alternativas
          </p>
          <h2
            id="line-comparison-title"
            className="section-title text-2xl sm:text-3xl"
          >
            Elegí la línea adecuada para tu proyecto
          </h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Ambas líneas ofrecen calidad y fabricación Lebaux; la diferencia
            está en las necesidades y terminaciones de cada obra.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
          {LINEAS_PRODUCTO.map((item) => {
            const isCurrent = item.slug === line
            return (
              <Card
                key={item.slug}
                className={cn(
                  "h-full border py-0",
                  isCurrent
                    ? "border-primary/50 bg-accent/25 ring-1 ring-primary/15"
                    : "border-border/70",
                )}
              >
                <CardHeader className="border-b py-5">
                  <CardTitle className="text-xl font-bold">
                    {item.nombre}
                  </CardTitle>
                  {isCurrent && (
                    <CardAction>
                      <Badge>Estás viendo</Badge>
                    </CardAction>
                  )}
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-5 py-6">
                  <p className="leading-6 text-muted-foreground">
                    {item.descripcion}
                  </p>
                  <ul className="space-y-3">
                    {LINE_CONTENT[item.slug].idealFor.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <span className="mt-0.5 rounded-full bg-success/10 p-1 text-success">
                          <Check className="size-3.5" aria-hidden="true" />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {!isCurrent && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="mt-auto w-full"
                      render={<Link to={`/${item.slug}`} />}
                    >
                      Ver {item.nombre}
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <section aria-labelledby="catalog-advice-title">
        <div className="relative overflow-hidden rounded-3xl bg-brand-graphite px-6 py-12 text-center text-white shadow-xl sm:px-10 sm:py-14">
          <div
            className="absolute -right-16 -top-16 size-48 rounded-full bg-primary/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center">
            <p className="eyebrow mb-3 justify-center text-center">
              Asesoramiento personalizado
            </p>
            <h2
              id="catalog-advice-title"
              className="text-2xl font-bold uppercase tracking-tight sm:text-3xl"
            >
              ¿No sabés qué abertura elegir?
            </h2>
            <p className="mt-4 leading-7 text-white/70">
              Contanos las medidas y dónde querés instalarla. Te ayudamos a
              encontrar la opción adecuada para tu proyecto.
            </p>
            <Button
              variant="whatsapp"
              size="lg"
              className="mt-7"
              render={
                <a href={whatsappHref} target="_blank" rel="noreferrer" />
              }
            >
              <WhatsAppIcon data-icon="inline-start" />
              Consultar por WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
