import { useState, type ReactElement, type ReactNode } from "react"
import {
  BadgeDollarSign,
  MessageCircle,
  Pencil,
  Plus,
  Ruler,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ConfirmDeleteDialog } from "@/features/admin/components/ConfirmDeleteDialog"
import { useContentStore } from "@/store/use-content-store"
import type { Beneficio, IconoBeneficio } from "@/types"

const ICONOS: Record<IconoBeneficio, LucideIcon> = {
  Ruler,
  SlidersHorizontal,
  BadgeDollarSign,
  MessageCircle,
}

const OPCIONES_ICONO: { value: IconoBeneficio; label: string }[] = [
  { value: "Ruler", label: "Regla — medidas" },
  { value: "SlidersHorizontal", label: "Controles — personalización" },
  { value: "BadgeDollarSign", label: "Precio — financiación" },
  { value: "MessageCircle", label: "Chat — atención" },
]

function beneficioVacio(): Beneficio {
  return { id: crypto.randomUUID(), icono: "Ruler", titulo: "", descripcion: "" }
}

function BeneficioFormDialog({
  beneficio,
  onGuardar,
  trigger,
}: {
  beneficio: Beneficio
  onGuardar: (beneficio: Beneficio) => void
  trigger: ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [borrador, setBorrador] = useState(beneficio)

  function handleGuardar() {
    onGuardar(borrador)
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (next) setBorrador(beneficio)
      }}
    >
      <DialogTrigger render={trigger as ReactElement} />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {beneficio.titulo ? "Editar beneficio" : "Nuevo beneficio"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Ícono</Label>
            <Select
              value={borrador.icono}
              onValueChange={(value) =>
                setBorrador((prev) => ({
                  ...prev,
                  icono: value as IconoBeneficio,
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {OPCIONES_ICONO.map((opcion) => (
                  <SelectItem key={opcion.value} value={opcion.value}>
                    {opcion.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Título</Label>
            <Input
              value={borrador.titulo}
              onChange={(event) =>
                setBorrador((prev) => ({ ...prev, titulo: event.target.value }))
              }
              placeholder="Medidas exactas"
            />
          </div>

          <div className="space-y-1.5">
            <Label>Descripción</Label>
            <Textarea
              rows={3}
              value={borrador.descripcion}
              onChange={(event) =>
                setBorrador((prev) => ({
                  ...prev,
                  descripcion: event.target.value,
                }))
              }
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

/** CRUD de los beneficios que se muestran en la sección "Cómo comprar" de la Home. */
export function AdminBeneficiosPage() {
  const beneficios = useContentStore((state) => state.beneficios)
  const crearBeneficio = useContentStore((state) => state.crearBeneficio)
  const actualizarBeneficio = useContentStore((state) => state.actualizarBeneficio)
  const eliminarBeneficio = useContentStore((state) => state.eliminarBeneficio)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold">Beneficios</h1>
          <p className="text-sm text-muted-foreground">
            Los bloques de confianza que aparecen en "Elegí, configurá y pedí".
          </p>
        </div>
        <BeneficioFormDialog
          beneficio={beneficioVacio()}
          onGuardar={crearBeneficio}
          trigger={
            <Button className="rounded-xl">
              <Plus data-icon="inline-start" />
              Nuevo beneficio
            </Button>
          }
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {beneficios.map((beneficio) => {
          const Icon = ICONOS[beneficio.icono]
          return (
            <div key={beneficio.id} className="flex gap-3 rounded-2xl border bg-background p-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{beneficio.titulo}</p>
                <p className="text-sm text-muted-foreground">{beneficio.descripcion}</p>
                <div className="mt-3 flex gap-2">
                  <BeneficioFormDialog
                    beneficio={beneficio}
                    onGuardar={(datos) => actualizarBeneficio(beneficio.id, datos)}
                    trigger={
                      <Button variant="outline" size="sm" className="rounded-xl">
                        <Pencil data-icon="inline-start" />
                        Editar
                      </Button>
                    }
                  />
                  <ConfirmDeleteDialog
                    title={`¿Eliminar "${beneficio.titulo}"?`}
                    description="Este beneficio va a dejar de mostrarse en la Home."
                    onConfirm={() => eliminarBeneficio(beneficio.id)}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
