import { Link } from "react-router-dom"

import logo from "@/assets/logo.png"
import { configuracionSitio } from "@/data/mock"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
}

/**
 * Logo de Lebaux, clickeable (funciona como "Inicio"). El proyecto anterior
 * tenía dos variantes de imagen (`full` con wordmark / `icon` solo isotipo,
 * para mobile). Por ahora usamos un único asset (`src/assets/logo.png`,
 * ya presente en el proyecto) hasta contar con el recorte "solo ícono" —
 * ver docs/2026-08-02-migracion-home.md.
 */
export function Logo({ className }: LogoProps) {
  return (
    <Link
      to="/"
      className={cn("flex items-center", className)}
      aria-label={configuracionSitio.nombre}
    >
      <img
        src={logo}
        alt={configuracionSitio.nombre}
        className="h-8 w-auto md:h-9"
        loading="eager"
        decoding="async"
      />
    </Link>
  )
}
