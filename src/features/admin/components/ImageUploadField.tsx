import { useRef, useState } from "react"
import { ImagePlus, Star, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { archivoAImagenComprimida } from "@/features/admin/lib/image-file"
import { cn } from "@/lib/utils"
import type { ImagenProducto } from "@/types"

interface ImageUploadFieldProps {
  imagenes: ImagenProducto[]
  onChange: (imagenes: ImagenProducto[]) => void
  nombreProducto: string
}

/**
 * Subida de fotos del producto. No hay backend/storage todavía: cada foto
 * se guarda como dataURL comprimido (ver `lib/image-file.ts`), igual que el
 * resto del contenido del admin en esta etapa (localStorage).
 */
export function ImageUploadField({
  imagenes,
  onChange,
  nombreProducto,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [subiendo, setSubiendo] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setError(null)
    setSubiendo(true)

    try {
      const nuevas: ImagenProducto[] = []
      for (const archivo of Array.from(files)) {
        const url = await archivoAImagenComprimida(archivo)
        nuevas.push({
          url,
          textoAlternativo: nombreProducto || "Foto del producto",
          esPrincipal: imagenes.length === 0 && nuevas.length === 0,
        })
      }
      onChange([...imagenes, ...nuevas])
    } catch {
      setError("No pudimos procesar alguna de las imágenes. Probá de nuevo.")
    } finally {
      setSubiendo(false)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  const marcarPrincipal = (index: number) => {
    onChange(
      imagenes.map((imagen, i) => ({ ...imagen, esPrincipal: i === index })),
    )
  }

  const eliminar = (index: number) => {
    const siguientes = imagenes.filter((_, i) => i !== index)
    if (siguientes.length > 0 && !siguientes.some((img) => img.esPrincipal)) {
      siguientes[0] = { ...siguientes[0], esPrincipal: true }
    }
    onChange(siguientes)
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {imagenes.map((imagen, index) => (
          <div
            key={`${imagen.url.slice(0, 32)}-${index}`}
            className={cn(
              "group relative aspect-square overflow-hidden rounded-xl border",
              imagen.esPrincipal ? "border-primary ring-2 ring-primary/30" : "border-border",
            )}
          >
            <img
              src={imagen.url}
              alt={imagen.textoAlternativo}
              className="h-full w-full object-cover"
            />
            {imagen.esPrincipal && (
              <span className="absolute left-1.5 top-1.5 flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[0.625rem] font-semibold text-primary-foreground">
                <Star className="size-3" fill="currentColor" />
                Principal
              </span>
            )}
            <div className="absolute inset-x-0 bottom-0 flex justify-end gap-1 bg-gradient-to-t from-black/60 to-transparent p-1.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
              {!imagen.esPrincipal && (
                <Button
                  type="button"
                  variant="secondary"
                  size="icon-xs"
                  className="rounded-full"
                  aria-label="Marcar como foto principal"
                  onClick={() => marcarPrincipal(index)}
                >
                  <Star />
                </Button>
              )}
              <Button
                type="button"
                variant="destructive"
                size="icon-xs"
                className="rounded-full"
                aria-label="Eliminar foto"
                onClick={() => eliminar(index)}
              >
                <Trash2 />
              </Button>
            </div>
          </div>
        ))}

        <label
          className={cn(
            "flex aspect-square cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary",
            subiendo && "pointer-events-none opacity-60",
          )}
        >
          <ImagePlus className="size-5" />
          <span className="text-center text-xs">
            {subiendo ? "Subiendo..." : "Agregar fotos"}
          </span>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(event) => handleFiles(event.target.files)}
          />
        </label>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
      <p className="text-xs text-muted-foreground">
        Tocá la estrella para elegir la foto principal (la que se ve en el
        catálogo). Las imágenes se comprimen automáticamente al subirlas.
      </p>
    </div>
  )
}
