import { ArrowDown } from "lucide-react"
import heroImage from "@/assets/banners/bannerweb.png"
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  buildWhatsAppUrl,
  DEFAULT_WHATSAPP_MESSAGE,
  useWhatsappPhone,
} from "@/lib/whatsapp"
/** Presenta la propuesta de valor y conduce al catálogo o al asesoramiento. */
export function Hero() {
  const whatsappPhone = useWhatsappPhone()
  const whatsappHref = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE, whatsappPhone)

  return (
    <section className="relative flex min-h-[calc(100svh-var(--spacing-navbar))] items-center overflow-hidden bg-brand-black py-12 text-white sm:py-16 lg:py-20">
      <img
        src={heroImage}
        alt="Fachada de una vivienda con aberturas de aluminio Lebaux instaladas"
        className="absolute inset-0 h-full w-full object-cover object-[68%_center]"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />

      <div className="absolute inset-0 bg-brand-black/45" />
      <div className="absolute inset-0 bg-linear-to-r from-brand-black via-brand-black/85 to-brand-black/20" />
      <div className="absolute inset-0 bg-linear-to-t from-brand-black/70 via-transparent to-brand-black/15" />
      <div className="corner-marks-static pointer-events-none absolute inset-8 hidden lg:block" />

      <div className="container relative z-10">
        <div className="max-w-4xl">
          <Badge
            variant="outline"
            className="mb-5 h-auto border-primary/30 bg-primary/10 px-4 py-1.5 text-primary backdrop-blur-sm sm:mb-6"
          >
            Fábrica de aberturas · Tucumán
          </Badge>

          <h1 className="text-balance text-4xl font-bold uppercase leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            <span className="block">Elegí cada detalle.</span>
            <span className="text-primary">
              Nosotros fabricamos tu abertura.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75 sm:mt-6 sm:text-lg sm:leading-8">
            Explorá modelos Herrero y Módena, definí medidas, color, vidrio y
            accesorios, y compará el precio antes de decidir.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
            <Button
              size="lg"
              className="w-full px-6 sm:w-auto"
              render={<a href="#productos" />}
            >
              Explorar productos
              <ArrowDown data-icon="inline-end" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full border-white/25 bg-white/5 px-6 text-white backdrop-blur-sm hover:bg-white/15 hover:text-white sm:w-auto"
              render={
                <a href={whatsappHref} target="_blank" rel="noreferrer" />
              }
            >
              <WhatsAppIcon data-icon="inline-start" />
              Hablar con un asesor
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
