import { useState, type FormEvent } from "react"
import { Check, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { useContentStore } from "@/store/use-content-store"
import type { EnlaceSocial, HorarioComercial, PlataformaSocial } from "@/types"

/** Edición de los datos globales del sitio: contacto, WhatsApp, redes y horarios. */
export function AdminSitePage() {
  const sitio = useContentStore((state) => state.sitio)
  const actualizarSitio = useContentStore((state) => state.actualizarSitio)

  const [borrador, setBorrador] = useState(sitio)
  const [guardado, setGuardado] = useState(false)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    actualizarSitio(borrador)
    setGuardado(true)
    setTimeout(() => setGuardado(false), 2500)
  }

  function agregarHorario() {
    const horario: HorarioComercial = { etiqueta: "", valor: "" }
    setBorrador((prev) => ({
      ...prev,
      contacto: { ...prev.contacto, horarios: [...prev.contacto.horarios, horario] },
    }))
  }

  function actualizarHorario(index: number, cambios: Partial<HorarioComercial>) {
    setBorrador((prev) => ({
      ...prev,
      contacto: {
        ...prev.contacto,
        horarios: prev.contacto.horarios.map((horario, i) =>
          i === index ? { ...horario, ...cambios } : horario,
        ),
      },
    }))
  }

  function eliminarHorario(index: number) {
    setBorrador((prev) => ({
      ...prev,
      contacto: {
        ...prev.contacto,
        horarios: prev.contacto.horarios.filter((_, i) => i !== index),
      },
    }))
  }

  function agregarRed() {
    const red: EnlaceSocial = { plataforma: "instagram", url: "", etiqueta: "" }
    setBorrador((prev) => ({
      ...prev,
      contacto: {
        ...prev.contacto,
        redesSociales: [...prev.contacto.redesSociales, red],
      },
    }))
  }

  function actualizarRed(index: number, cambios: Partial<EnlaceSocial>) {
    setBorrador((prev) => ({
      ...prev,
      contacto: {
        ...prev.contacto,
        redesSociales: prev.contacto.redesSociales.map((red, i) =>
          i === index ? { ...red, ...cambios } : red,
        ),
      },
    }))
  }

  function eliminarRed(index: number) {
    setBorrador((prev) => ({
      ...prev,
      contacto: {
        ...prev.contacto,
        redesSociales: prev.contacto.redesSociales.filter((_, i) => i !== index),
      },
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold">Datos del sitio</h1>
        <p className="text-sm text-muted-foreground">
          Se usan en el header, el footer y los botones de WhatsApp de todo el sitio.
        </p>
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base">Marca</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                value={borrador.nombre}
                onChange={(event) =>
                  setBorrador((prev) => ({ ...prev, nombre: event.target.value }))
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="nombre-legal">Nombre legal</Label>
              <Input
                id="nombre-legal"
                value={borrador.nombreLegal}
                onChange={(event) =>
                  setBorrador((prev) => ({ ...prev, nombreLegal: event.target.value }))
                }
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="descripcion">Descripción (footer)</Label>
            <Textarea
              id="descripcion"
              rows={2}
              value={borrador.descripcion}
              onChange={(event) =>
                setBorrador((prev) => ({ ...prev, descripcion: event.target.value }))
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base">Contacto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="direccion">Dirección</Label>
              <Input
                id="direccion"
                value={borrador.contacto.direccion}
                onChange={(event) =>
                  setBorrador((prev) => ({
                    ...prev,
                    contacto: { ...prev.contacto, direccion: event.target.value },
                  }))
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ciudad">Ciudad</Label>
              <Input
                id="ciudad"
                value={borrador.contacto.ciudad}
                onChange={(event) =>
                  setBorrador((prev) => ({
                    ...prev,
                    contacto: { ...prev.contacto, ciudad: event.target.value },
                  }))
                }
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="whatsapp">WhatsApp (con código de país, sin +)</Label>
              <Input
                id="whatsapp"
                value={borrador.contacto.telefonoWhatsapp}
                onChange={(event) =>
                  setBorrador((prev) => ({
                    ...prev,
                    contacto: {
                      ...prev.contacto,
                      telefonoWhatsapp: event.target.value,
                    },
                  }))
                }
                placeholder="5493810000000"
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="mapa">URL del mapa embebido</Label>
              <Input
                id="mapa"
                value={borrador.contacto.urlMapaEmbebido}
                onChange={(event) =>
                  setBorrador((prev) => ({
                    ...prev,
                    contacto: {
                      ...prev.contacto,
                      urlMapaEmbebido: event.target.value,
                    },
                  }))
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Horarios</Label>
            {borrador.contacto.horarios.map((horario, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={horario.etiqueta}
                  onChange={(event) =>
                    actualizarHorario(index, { etiqueta: event.target.value })
                  }
                  placeholder="Lunes a viernes"
                  className="flex-1"
                />
                <Input
                  value={horario.valor}
                  onChange={(event) =>
                    actualizarHorario(index, { valor: event.target.value })
                  }
                  placeholder="9:00 a 18:00"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="shrink-0 text-destructive hover:bg-destructive/10"
                  onClick={() => eliminarHorario(index)}
                  aria-label="Eliminar horario"
                >
                  <Trash2 />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-xl"
              onClick={agregarHorario}
            >
              <Plus data-icon="inline-start" />
              Agregar horario
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Redes sociales</Label>
            {borrador.contacto.redesSociales.map((red, index) => (
              <div key={index} className="flex gap-2">
                <Select
                  value={red.plataforma}
                  onValueChange={(value) =>
                    actualizarRed(index, { plataforma: value as PlataformaSocial })
                  }
                >
                  <SelectTrigger className="w-36 shrink-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  value={red.etiqueta}
                  onChange={(event) =>
                    actualizarRed(index, { etiqueta: event.target.value })
                  }
                  placeholder="@lebaux"
                  className="flex-1"
                />
                <Input
                  value={red.url}
                  onChange={(event) => actualizarRed(index, { url: event.target.value })}
                  placeholder="https://instagram.com/lebaux"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="shrink-0 text-destructive hover:bg-destructive/10"
                  onClick={() => eliminarRed(index)}
                  aria-label="Eliminar red social"
                >
                  <Trash2 />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-xl"
              onClick={agregarRed}
            >
              <Plus data-icon="inline-start" />
              Agregar red social
            </Button>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="rounded-xl">
        {guardado ? <Check data-icon="inline-start" /> : null}
        {guardado ? "Guardado" : "Guardar cambios"}
      </Button>
    </form>
  )
}
