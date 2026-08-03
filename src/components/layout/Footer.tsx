import { ArrowUp, CalendarDays, Clock, MapPin } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { FacebookIcon } from "@/components/ui/icons/FacebookIcon"
import { InstagramIcon } from "@/components/ui/icons/InstagramIcon"
import { Logo } from "@/components/layout/Logo"
import { configuracionSitio } from "@/data/mock"

const ICONOS_REDES = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
} as const

/**
 * Footer de Lebaux.
 *
 * A diferencia del proyecto anterior, esta primera migración NO incluye
 * la columna de enlaces a categorías/tipologías (Ventanas, Puertas, etc.):
 * esos links dependen de `features/products` (CATEGORY_META/CATEGORY_ORDER
 * en el proyecto viejo), que todavía no se migró. Se agrega esa columna
 * cuando exista esa feature — ver docs/2026-08-02-migracion-home.md.
 */
export function Footer() {
  const { contacto } = configuracionSitio

  return (
    <footer className="bg-brand-black text-white">
      <div className="container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-3">
        {/* Columna 1: marca + redes */}
        <div>
          <Logo className="mb-6" />
          <p className="mb-6 max-w-xs text-sm leading-relaxed text-white/60">
            {configuracionSitio.descripcion}
          </p>

          <div className="flex gap-3">
            {contacto.redesSociales.map((social) => {
              const Icon = ICONOS_REDES[social.plataforma]
              return (
                <a
                  key={social.plataforma}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visitar nuestro ${social.etiqueta}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-all hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              )
            })}
          </div>
        </div>

        {/* Columna 2: enlaces rápidos.
            TODO(features/products): agregar acá los links a categorías
            (Ventanas, Puertas, Banderolas...) cuando exista esa feature,
            igual que hacía CATEGORY_ORDER en el proyecto anterior. */}
        <nav aria-label="Enlaces del pie de página">
          <h3 className="eyebrow mb-4">Catálogo</h3>
          <ul className="space-y-2.5 text-sm text-white/70">
            <li>
              <Link to="/herrero" className="transition-colors hover:text-primary">
                Línea Herrero
              </Link>
            </li>
            <li>
              <Link to="/modena" className="transition-colors hover:text-primary">
                Línea Módena
              </Link>
            </li>
          </ul>
        </nav>

        {/* Columna 3: contacto + mapa */}
        <div>
          <h3 className="eyebrow mb-4">Contacto</h3>

          <p className="mb-3 flex items-center gap-3 text-sm text-white/80">
            <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            {contacto.direccion}, {contacto.ciudad}
          </p>

          {contacto.horarios.map((horario, index) => (
            <p
              key={horario.etiqueta}
              className="mb-3 flex items-center gap-3 text-sm text-white/80"
            >
              {index === 0 ? (
                <Clock className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              ) : (
                <CalendarDays className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              )}
              {horario.etiqueta}: {horario.valor}
            </p>
          ))}

          <div className="corner-marks mt-4 overflow-hidden rounded-2xl border border-white/10">
            <iframe
              src={contacto.urlMapaEmbebido}
              title="Ubicación de Lebaux Aberturas en el mapa"
              className="h-56 w-full border-0"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="container flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-xs uppercase tracking-wide text-white/40">
            &copy; {new Date().getFullYear()} {configuracionSitio.nombreLegal}. Todos los derechos
            reservados.
          </p>

          <Button
            variant="ghost"
            size="sm"
            className="text-white/60 hover:bg-white/10 hover:text-white"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Volver arriba <ArrowUp className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </footer>
  )
}
