import { ArrowUp, CalendarDays, Clock, MapPin } from "lucide-react"
import { Link } from "react-router-dom"

import { Logo } from "@/components/layout/Logo"
import { Button } from "@/components/ui/button"
import { FacebookIcon } from "@/components/icons/FacebookIcon"
import { InstagramIcon } from "@/components/icons/InstagramIcon"
import { configuracionSitio } from "@/data/mock"
import {
  CATEGORIAS_PRODUCTO,
  ORDEN_CATEGORIAS,
} from "@/features/products/data/catalog-metadata"

const ICONOS_REDES = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
} as const

/** Pie global con accesos de catálogo, contacto, redes y ubicación. */
export function Footer() {
  const { contacto } = configuracionSitio

  return (
    <footer className="bg-brand-black text-white">
      <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo variant="cropped" className="mb-6" />
          <p className="mb-6 max-w-xs text-sm leading-7 text-white/60">
            {configuracionSitio.descripcion}
          </p>
          <div className="flex gap-3">
            {contacto.redesSociales.map((social) => {
              const Icon = ICONOS_REDES[social.plataforma]
              return (
                <Button
                  key={social.plataforma}
                  variant="outline"
                  size="icon-lg"
                  className="rounded-full border-white/15 bg-transparent text-white hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  render={
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Visitar nuestro ${social.etiqueta}`}
                    />
                  }
                >
                  <Icon aria-hidden="true" />
                </Button>
              )
            })}
          </div>
        </div>

        <nav aria-label="Líneas del catálogo">
          <h2 className="eyebrow mb-4">Líneas</h2>
          <ul className="space-y-2.5 text-sm text-white/70">
            <li>
              <Link to="/herrero" className="hover:text-primary">
                Línea Herrero
              </Link>
            </li>
            <li>
              <Link to="/modena" className="hover:text-primary">
                Línea Módena
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Categorías del catálogo">
          <h2 className="eyebrow mb-4">Categorías</h2>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-white/70 lg:grid-cols-1">
            {ORDEN_CATEGORIAS.map((category) => (
              <li key={category}>
                <Link
                  to={`/modena?categoria=${category}`}
                  className="hover:text-primary"
                >
                  {CATEGORIAS_PRODUCTO[category].etiqueta}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow mb-4">Contacto</h2>
          <p className="mb-3 flex items-start gap-3 text-sm text-white/80">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
            {contacto.direccion}, {contacto.ciudad}
          </p>
          {contacto.horarios.map((horario, index) => (
            <p
              key={horario.etiqueta}
              className="mb-3 flex items-start gap-3 text-sm text-white/80"
            >
              {index === 0 ? (
                <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
              ) : (
                <CalendarDays className="mt-0.5 size-4 shrink-0 text-primary" />
              )}
              {horario.etiqueta}: {horario.valor}
            </p>
          ))}
          <div className="corner-marks mt-4 overflow-hidden rounded-2xl border border-white/10">
            <iframe
              src={contacto.urlMapaEmbebido}
              title="Ubicación de Lebaux Aberturas"
              className="h-48 w-full border-0"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="container flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-center text-xs uppercase tracking-wide text-white/40 sm:text-left">
            &copy; {new Date().getFullYear()} {configuracionSitio.nombreLegal}.
            Todos los derechos reservados.
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="text-white/60 hover:bg-white/10 hover:text-white"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Volver arriba <ArrowUp data-icon="inline-end" />
          </Button>
        </div>
      </div>
    </footer>
  )
}
