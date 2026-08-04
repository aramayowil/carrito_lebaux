import { useState, type ReactElement, type ReactNode } from "react"
import { ImagePlus, Pencil, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ConfirmDeleteDialog } from "@/features/admin/components/ConfirmDeleteDialog"
import { archivoAImagenComprimida } from "@/features/admin/lib/image-file"
import { useContentStore } from "@/store/use-content-store"
import type { Obra } from "@/types"

function obraVacia(): Obra {
  return {
    id: crypto.randomUUID(),
    titulo: "",
    tipo: "",
    especificacion: "",
    imagen: "",
    testimonio: "",
    autor: "",
  }
}

function ObraFormDialog({
  obra,
  onGuardar,
  trigger,
}: {
  obra: Obra
  onGuardar: (obra: Obra) => void
  trigger: ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [borrador, setBorrador] = useState(obra)

  async function handleImagen(archivo: File | undefined) {
    if (!archivo) return
    const url = await archivoAImagenComprimida(archivo)
    setBorrador((prev) => ({ ...prev, imagen: url }))
  }

  function handleGuardar() {
    onGuardar(borrador)
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (next) setBorrador(obra)
      }}
    >
      <DialogTrigger render={trigger as ReactElement} />
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{obra.titulo ? "Editar obra" : "Nueva obra"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <label className="flex aspect-video cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed bg-muted">
            {borrador.imagen ? (
              <img
                src={borrador.imagen}
                alt={borrador.titulo}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
                <ImagePlus className="size-5" />
                Foto de la obra
              </span>
            )}
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(event) => handleImagen(event.target.files?.[0])}
            />
          </label>

          <div className="space-y-1.5">
            <Label>Título</Label>
            <Input
              value={borrador.titulo}
              onChange={(event) =>
                setBorrador((prev) => ({ ...prev, titulo: event.target.value }))
              }
              placeholder="Ampliación de casa en San Miguel de Tucumán"
            />
          </div>

          <div className="space-y-1.5">
            <Label>Tipo de proyecto</Label>
            <Input
              value={borrador.tipo}
              onChange={(event) =>
                setBorrador((prev) => ({ ...prev, tipo: event.target.value }))
              }
              placeholder="Proyecto residencial"
            />
          </div>

          <div className="space-y-1.5">
            <Label>Especificación</Label>
            <Input
              value={borrador.especificacion}
              onChange={(event) =>
                setBorrador((prev) => ({
                  ...prev,
                  especificacion: event.target.value,
                }))
              }
              placeholder="Línea Herrero · 8 aberturas"
            />
          </div>

          <div className="space-y-1.5">
            <Label>Testimonio del cliente</Label>
            <Textarea
              rows={3}
              value={borrador.testimonio}
              onChange={(event) =>
                setBorrador((prev) => ({ ...prev, testimonio: event.target.value }))
              }
            />
          </div>

          <div className="space-y-1.5">
            <Label>Autor del testimonio</Label>
            <Input
              value={borrador.autor}
              onChange={(event) =>
                setBorrador((prev) => ({ ...prev, autor: event.target.value }))
              }
              placeholder="María, San Miguel de Tucumán"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            className="w-full rounded-xl"
            onClick={handleGuardar}
            disabled={!borrador.titulo.trim()}
          >
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/** CRUD de las obras/proyectos que se muestran en la Home. */
export function AdminObrasPage() {
  const obras = useContentStore((state) => state.obras)
  const crearObra = useContentStore((state) => state.crearObra)
  const actualizarObra = useContentStore((state) => state.actualizarObra)
  const eliminarObra = useContentStore((state) => state.eliminarObra)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold">Obras</h1>
          <p className="text-sm text-muted-foreground">
            Proyectos realizados que se muestran en la Home.
          </p>
        </div>
        <ObraFormDialog
          obra={obraVacia()}
          onGuardar={crearObra}
          trigger={
            <Button className="rounded-xl">
              <Plus data-icon="inline-start" />
              Nueva obra
            </Button>
          }
        />
      </div>

      {obras.length === 0 ? (
        <p className="rounded-2xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          Todavía no cargaste ninguna obra.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {obras.map((obra) => (
            <div key={obra.id} className="overflow-hidden rounded-2xl border bg-background">
              <div className="aspect-video bg-muted">
                {obra.imagen && (
                  <img
                    src={obra.imagen}
                    alt={obra.titulo}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="space-y-1 p-4">
                <p className="font-medium leading-tight">{obra.titulo}</p>
                <p className="text-xs text-muted-foreground">{obra.tipo}</p>
              </div>
              <div className="flex gap-2 border-t p-3">
                <ObraFormDialog
                  obra={obra}
                  onGuardar={(datos) => actualizarObra(obra.id, datos)}
                  trigger={
                    <Button variant="outline" size="sm" className="flex-1 rounded-xl">
                      <Pencil data-icon="inline-start" />
                      Editar
                    </Button>
                  }
                />
                <ConfirmDeleteDialog
                  title={`¿Eliminar "${obra.titulo}"?`}
                  description="Esta obra va a dejar de mostrarse en la Home."
                  onConfirm={() => eliminarObra(obra.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
