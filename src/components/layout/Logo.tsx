import { Link } from "react-router-dom"

import { configuracionSitio } from "@/data/mock"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  variant?: "full" | "cropped"
}

/** Logo de Lebaux enlazado al inicio, con variantes para cabecera y pie. */
export function Logo({ className, variant = "full" }: LogoProps) {
  const isCropped = variant === "cropped"

  return (
    <Link
      to="/"
      className={cn("flex items-center", className)}
      aria-label={configuracionSitio.nombre}
    >
      <img
        src={isCropped ? "/logo_recortado.png" : "/logo.png"}
        alt={configuracionSitio.nombre}
        className={cn(
          "w-auto object-contain",
          isCropped ? "h-20" : "h-8 md:h-9",
        )}
        loading="eager"
        decoding="async"
      />
    </Link>
  )
}
