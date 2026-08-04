import { Link } from "react-router-dom"

import { useContentStore } from "@/store/use-content-store"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  variant?: "full" | "cropped"
}

/** Logo de Lebaux enlazado al inicio, con variantes para cabecera y pie. */
export function Logo({ className, variant = "full" }: LogoProps) {
  const isCropped = variant === "cropped"
  const nombreSitio = useContentStore((state) => state.sitio.nombre)

  return (
    <Link
      to="/"
      className={cn("flex items-center", className)}
      aria-label={nombreSitio}
    >
      <img
        src={isCropped ? "/logo_recortado.png" : "/logo.png"}
        alt={nombreSitio}
        className={cn(
          "w-auto object-contain",
          isCropped ? "h-12 sm:h-16 lg:h-20" : "h-8 md:h-9",
        )}
        loading="eager"
        decoding="async"
      />
    </Link>
  )
}
