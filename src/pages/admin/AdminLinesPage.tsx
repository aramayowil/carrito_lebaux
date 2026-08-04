import { useState } from "react"
import { Check, ImagePlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { archivoAImagenComprimida } from "@/features/admin/lib/image-file"
import { useContentStore } from "@/store/use-content-store"
import type { LineaProducto } from "@/types"

function LineaCard({ linea }: { linea: LineaProducto }) {
  const actualizarLinea = useContentStore((state) => state.actualizarLinea)
  const [borrador, setBorrador] = useState(linea)
  const [guardado, setGuardado] = useState(false)

  async function handleImagen(archivo: File | undefined) {
    if (!archivo) return
    const url = await archivoAImagenComprimida(archivo)
    setBorrador((prev) => ({ ...prev, imagenPortada: url }))
  }

  function handleGuardar() {
    actualizarLinea(linea.slug, borrador)
    setGuardado(true)
    setTimeout(() => setGuardado(false), 2000)
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>{linea.nombre}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <label className="flex aspect-video w-full shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed bg-muted sm:w-48">
            {borrador.imagenPortada ? (
              <img
                src={borrador.imagenPortada}
                alt={borrador.nombre}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
                <ImagePlus className="size-5" />
                Imagen de portada
              </span>
            )}
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(event) => handleImagen(event.target.files?.[0])}
            />
          </label>

          <div className="flex-1 space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor={`nombre-${linea.slug}`}>Nombre</Label>
              <Input
                id={`nombre-${linea.slug}`}
                value={borrador.nombre}
                onChange={(event) =>
                  setBorrador((prev) => ({ ...prev, nombre: event.target.value }))
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor={`subtitulo-${linea.slug}`}>Subtítulo</Label>
              <Input
                id={`subtitulo-${linea.slug}`}
                value={borrador.subtitulo}
                onChange={(event) =>
                  setBorrador((prev) => ({ ...prev, subtitulo: event.target.value }))
                }
              />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor={`descripcion-${linea.slug}`}>Descripción</Label>
          <Textarea
            id={`descripcion-${linea.slug}`}
            rows={3}
            value={borrador.descripcion}
            onChange={(event) =>
              setBorrador((prev) => ({ ...prev, descripcion: event.target.value }))
            }
          />
        </div>

        <Button
          type="button"
          className="rounded-xl"
          onClick={handleGuardar}
          disabled={JSON.stringify(borrador) === JSON.stringify(linea)}
        >
          {guardado ? <Check data-icon="inline-start" /> : null}
          {guardado ? "Guardado" : "Guardar cambios"}
        </Button>
      </CardContent>
    </Card>
  )
}

/**
 * Edición de las líneas de producto. Las líneas en sí (Herrero / Módena) son
 * un catálogo cerrado por ahora (`SlugLineaProducto`, ver src/types/catalogo.ts)
 * — acá se editan sus datos de presentación, no se crean líneas nuevas.
 */
export function AdminLinesPage() {
  const lineas = useContentStore((state) => state.lineas)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold">Líneas</h1>
        <p className="text-sm text-muted-foreground">
          Editá cómo se presenta cada línea en el sitio. Crear líneas nuevas
          todavía no está soportado (implica sumar un nuevo slug en el código).
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {lineas.map((linea) => (
          <LineaCard key={linea.slug} linea={linea} />
        ))}
      </div>
    </div>
  )
}
