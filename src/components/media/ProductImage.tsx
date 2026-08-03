import { useState } from "react"
import { ImageOff } from "lucide-react"

import { cn } from "@/lib/utils"

interface ProductImageProps {
  src: string
  alt: string
  className?: string
  imgClassName?: string
}

/**
 * Imagen con fallback: si el archivo no existe en /public/img (todavía no
 * se subió el asset real, por ejemplo), muestra un placeholder en vez de
 * romper el layout con un ícono roto del navegador.
 *
 * Vive en `components/media` (no en `components/ui`, que es solo shadcn
 * CLI, ni en un `features/`, porque no es lógica de negocio) porque se
 * comparte entre las secciones institucionales y los features de producto
 * y carrito.
 */
export function ProductImage({
  src,
  alt,
  className,
  imgClassName,
}: ProductImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-2 bg-muted text-muted-foreground",
          className,
        )}
      >
        <ImageOff className="h-8 w-8" />
        <span className="px-3 text-center text-xs">{alt}</span>
      </div>
    )
  }

  return (
    <div className={cn("overflow-hidden", className)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className={cn("h-full w-full object-contain", imgClassName)}
      />
    </div>
  )
}
