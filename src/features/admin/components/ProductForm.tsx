import { useState, type FormEvent } from "react"
import { Plus, Trash2 } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
import { ImageUploadField } from "@/features/admin/components/ImageUploadField"
import {
  ACCESORIOS_CATALOGO,
  COLORES_CATALOGO,
  VIDRIOS_CATALOGO,
} from "@/features/admin/lib/opciones-catalogo"
import { crearIdMedida } from "@/features/admin/lib/producto-factory"
import { slugUnico, slugify } from "@/features/admin/lib/slugify"
import {
  CATEGORIAS_PRODUCTO,
  ORDEN_CATEGORIAS,
} from "@/features/products/data/catalog-metadata"
import { formatProductPrice } from "@/features/products/lib/product-card-formatters"
import type {
  Accesorio,
  ColorPerfil,
  LineaProducto,
  OpcionMedida,
  OpcionVidrio,
  Producto,
  TipoApertura,
} from "@/types"

const TIPOS_APERTURA: { value: TipoApertura; label: string }[] = [
  { value: "corrediza", label: "Corrediza" },
  { value: "de-abrir", label: "De abrir" },
  { value: "batiente", label: "Batiente" },
  { value: "fija", label: "Fija" },
  { value: "puerta-balcon", label: "Puerta balcón" },
]

interface ProductFormProps {
  productoInicial: Producto
  lineas: LineaProducto[]
  /** Slugs de otros productos, para validar que el nuevo/editado no se repita. */
  slugsExistentes: string[]
  onGuardar: (producto: Producto) => void
  onCancelar: () => void
  guardando?: boolean
}

/** Formulario grande de producto, usado tanto para crear como para editar. */
export function ProductForm({
  productoInicial,
  lineas,
  slugsExistentes,
  onGuardar,
  onCancelar,
  guardando = false,
}: ProductFormProps) {
  const [producto, setProducto] = useState<Producto>(productoInicial)
  const [slugTocado, setSlugTocado] = useState(Boolean(productoInicial.slug))
  const [etiquetasTexto, setEtiquetasTexto] = useState(
    productoInicial.etiquetas.join(", "),
  )
  const [errores, setErrores] = useState<string[]>([])

  const otrosSlugs = slugsExistentes.filter(
    (slug) => slug !== productoInicial.slug,
  )

  function handleNombreChange(nombre: string) {
    setProducto((prev) => ({
      ...prev,
      nombre,
      slug: slugTocado ? prev.slug : slugify(nombre),
    }))
  }

  // --- Medidas -------------------------------------------------------------

  function agregarMedida() {
    const nueva: OpcionMedida = {
      id: crearIdMedida(),
      etiqueta: "",
      anchoCm: 100,
      altoCm: 100,
      precioAdicional: 0,
    }
    setProducto((prev) => ({ ...prev, medidas: [...prev.medidas, nueva] }))
  }

  function actualizarMedida(id: string, cambios: Partial<OpcionMedida>) {
    setProducto((prev) => ({
      ...prev,
      medidas: prev.medidas.map((medida) =>
        medida.id === id ? { ...medida, ...cambios } : medida,
      ),
    }))
  }

  function eliminarMedida(id: string) {
    setProducto((prev) => ({
      ...prev,
      medidas: prev.medidas.filter((medida) => medida.id !== id),
    }))
  }

  // --- Color / vidrio / accesorios (catálogo cerrado, ver opciones-catalogo) --

  function toggleColor(color: ColorPerfil, incluido: boolean) {
    setProducto((prev) => ({
      ...prev,
      colores: incluido
        ? [...prev.colores, color]
        : prev.colores.filter((item) => item.slug !== color.slug),
    }))
  }

  function actualizarPrecioColor(slug: string, precioAdicional: number) {
    setProducto((prev) => ({
      ...prev,
      colores: prev.colores.map((color) =>
        color.slug === slug ? { ...color, precioAdicional } : color,
      ),
    }))
  }

  function toggleVidrio(vidrio: OpcionVidrio, incluido: boolean) {
    setProducto((prev) => ({
      ...prev,
      opcionesVidrio: incluido
        ? [...prev.opcionesVidrio, vidrio]
        : prev.opcionesVidrio.filter((item) => item.slug !== vidrio.slug),
    }))
  }

  function actualizarPrecioVidrio(slug: string, precioAdicional: number) {
    setProducto((prev) => ({
      ...prev,
      opcionesVidrio: prev.opcionesVidrio.map((vidrio) =>
        vidrio.slug === slug ? { ...vidrio, precioAdicional } : vidrio,
      ),
    }))
  }

  function toggleAccesorio(accesorio: Accesorio, incluido: boolean) {
    setProducto((prev) => ({
      ...prev,
      accesorios: incluido
        ? [...prev.accesorios, accesorio]
        : prev.accesorios.filter((item) => item.slug !== accesorio.slug),
    }))
  }

  function actualizarPrecioAccesorio(slug: string, precioAdicional: number) {
    setProducto((prev) => ({
      ...prev,
      accesorios: prev.accesorios.map((accesorio) =>
        accesorio.slug === slug ? { ...accesorio, precioAdicional } : accesorio,
      ),
    }))
  }

  // --- Precios ---------------------------------------------------------------

  const precioLista = producto.precios.precioBase ?? 0
  const descuento = producto.precios.porcentajeDescuento
  const precioContadoCalculado = Math.round(precioLista * (1 - descuento / 100))

  function actualizarPrecioLista(valor: number) {
    setProducto((prev) => ({
      ...prev,
      precios: {
        ...prev.precios,
        precioBase: valor,
        precioTarjeta: valor,
        precioContado: Math.round(
          valor * (1 - prev.precios.porcentajeDescuento / 100),
        ),
      },
    }))
  }

  function actualizarDescuento(valor: number) {
    setProducto((prev) => ({
      ...prev,
      precios: {
        ...prev.precios,
        porcentajeDescuento: valor,
        precioContado: Math.round(
          (prev.precios.precioBase ?? 0) * (1 - valor / 100),
        ),
      },
    }))
  }

  // --- Envío -------------------------------------------------------------

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const problemas: string[] = []

    if (!producto.nombre.trim()) problemas.push("Ingresá un nombre para el producto.")
    if (producto.medidas.length === 0) problemas.push("Agregá al menos una medida.")
    if (producto.medidas.some((medida) => !medida.etiqueta.trim())) {
      problemas.push("Todas las medidas necesitan una etiqueta (ej: 120 x 100 cm).")
    }
    if (!producto.precios.consultarPrecio && !precioLista) {
      problemas.push('Cargá un precio de lista o marcá "Consultar precio".')
    }

    if (problemas.length > 0) {
      setErrores(problemas)
      return
    }

    setErrores([])
    const slugFinal = slugUnico(producto.slug || producto.nombre, otrosSlugs)
    const etiquetas = etiquetasTexto
      .split(",")
      .map((etiqueta) => etiqueta.trim())
      .filter(Boolean)

    onGuardar({ ...producto, slug: slugFinal, etiquetas })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errores.length > 0 && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          <p className="mb-1 font-semibold">Revisá estos puntos:</p>
          <ul className="list-inside list-disc space-y-0.5">
            {errores.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <Accordion
        defaultValue={[
          "general",
          "imagenes",
          "precio",
          "medidas",
          "opciones",
          "visibilidad",
        ]}
      >
        <AccordionItem value="general">
          <AccordionTrigger>Datos generales</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="nombre">Nombre del producto</Label>
                <Input
                  id="nombre"
                  value={producto.nombre}
                  onChange={(event) => handleNombreChange(event.target.value)}
                  placeholder="Ej: Ventana Corrediza Línea Herrero"
                  required
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input
                  id="slug"
                  value={producto.slug}
                  onChange={(event) => {
                    setSlugTocado(true)
                    setProducto((prev) => ({
                      ...prev,
                      slug: slugify(event.target.value),
                    }))
                  }}
                  placeholder="ventana-corrediza-herrero"
                />
                <p className="text-xs text-muted-foreground">
                  Se genera solo a partir del nombre, pero podés editarlo.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="linea">Línea</Label>
                <Select
                  value={producto.linea}
                  onValueChange={(value) =>
                    setProducto((prev) => ({
                      ...prev,
                      linea: value as Producto["linea"],
                    }))
                  }
                >
                  <SelectTrigger id="linea" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {lineas.map((linea) => (
                      <SelectItem key={linea.slug} value={linea.slug}>
                        {linea.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoria">Categoría</Label>
                <Select
                  value={producto.categoria}
                  onValueChange={(value) =>
                    setProducto((prev) => ({
                      ...prev,
                      categoria: value as Producto["categoria"],
                    }))
                  }
                >
                  <SelectTrigger id="categoria" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ORDEN_CATEGORIAS.map((categoria) => (
                      <SelectItem key={categoria} value={categoria}>
                        {CATEGORIAS_PRODUCTO[categoria].etiqueta}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="apertura">Tipo de apertura (opcional)</Label>
                <Select
                  value={producto.tipoApertura ?? "sin-definir"}
                  onValueChange={(value) =>
                    setProducto((prev) => ({
                      ...prev,
                      tipoApertura:
                        value === "sin-definir"
                          ? undefined
                          : (value as TipoApertura),
                    }))
                  }
                >
                  <SelectTrigger id="apertura" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sin-definir">Sin definir</SelectItem>
                    {TIPOS_APERTURA.map((tipo) => (
                      <SelectItem key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  value={producto.descripcion}
                  onChange={(event) =>
                    setProducto((prev) => ({
                      ...prev,
                      descripcion: event.target.value,
                    }))
                  }
                  rows={3}
                  placeholder="Contale al cliente qué hace especial a este producto."
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="etiquetas">Etiquetas (separadas por coma)</Label>
                <Input
                  id="etiquetas"
                  value={etiquetasTexto}
                  onChange={(event) => setEtiquetasTexto(event.target.value)}
                  placeholder="oferta, herrero, ventana"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="imagenes">
          <AccordionTrigger>Fotos del producto</AccordionTrigger>
          <AccordionContent>
            <ImageUploadField
              imagenes={producto.imagenes}
              nombreProducto={producto.nombre}
              onChange={(imagenes) =>
                setProducto((prev) => ({ ...prev, imagenes }))
              }
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="precio">
          <AccordionTrigger>Precio y descuento</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Checkbox
                id="consultar-precio"
                checked={producto.precios.consultarPrecio}
                onCheckedChange={(checked) =>
                  setProducto((prev) => ({
                    ...prev,
                    precios: {
                      ...prev.precios,
                      consultarPrecio: checked === true,
                    },
                  }))
                }
              />
              <Label htmlFor="consultar-precio" className="font-normal">
                Mostrar "Consultar precio" en vez de un valor
              </Label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="precio-lista">Precio de lista (tarjeta)</Label>
                <Input
                  id="precio-lista"
                  type="number"
                  min={0}
                  step={1000}
                  value={precioLista || ""}
                  onChange={(event) =>
                    actualizarPrecioLista(Number(event.target.value) || 0)
                  }
                  disabled={producto.precios.consultarPrecio}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descuento">Descuento por contado (%)</Label>
                <Input
                  id="descuento"
                  type="number"
                  min={0}
                  max={100}
                  value={descuento || ""}
                  onChange={(event) =>
                    actualizarDescuento(Number(event.target.value) || 0)
                  }
                  disabled={producto.precios.consultarPrecio}
                />
              </div>
            </div>

            {!producto.precios.consultarPrecio && precioLista > 0 && (
              <p className="rounded-xl bg-muted px-3 py-2 text-sm text-muted-foreground">
                Precio de contado calculado:{" "}
                <span className="font-semibold text-success">
                  {formatProductPrice(precioContadoCalculado)}
                </span>
              </p>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="medidas">
          <AccordionTrigger>Medidas disponibles</AccordionTrigger>
          <AccordionContent className="space-y-3">
            {producto.medidas.map((medida) => (
              <div
                key={medida.id}
                className="grid gap-2 rounded-xl border p-3 sm:grid-cols-[1.4fr_0.8fr_0.8fr_1fr_auto] sm:items-end"
              >
                <div className="space-y-1">
                  <Label className="text-xs">Etiqueta</Label>
                  <Input
                    value={medida.etiqueta}
                    onChange={(event) =>
                      actualizarMedida(medida.id, { etiqueta: event.target.value })
                    }
                    placeholder="120 x 100 cm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Ancho (cm)</Label>
                  <Input
                    type="number"
                    min={0}
                    value={medida.anchoCm}
                    onChange={(event) =>
                      actualizarMedida(medida.id, {
                        anchoCm: Number(event.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Alto (cm)</Label>
                  <Input
                    type="number"
                    min={0}
                    value={medida.altoCm}
                    onChange={(event) =>
                      actualizarMedida(medida.id, {
                        altoCm: Number(event.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">
                    {medida.precioFijo !== undefined
                      ? "Precio fijo"
                      : "Adicional sobre el precio base"}
                  </Label>
                  <Input
                    type="number"
                    min={0}
                    value={medida.precioFijo ?? medida.precioAdicional}
                    onChange={(event) => {
                      const valor = Number(event.target.value) || 0
                      actualizarMedida(
                        medida.id,
                        medida.precioFijo !== undefined
                          ? { precioFijo: valor }
                          : { precioAdicional: valor },
                      )
                    }}
                  />
                  <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Checkbox
                      checked={medida.precioFijo !== undefined}
                      onCheckedChange={(checked) =>
                        actualizarMedida(medida.id, {
                          precioFijo:
                            checked === true ? medida.precioAdicional : undefined,
                          precioAdicional: 0,
                        })
                      }
                    />
                    Precio fijo (no suma al precio base)
                  </label>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:bg-destructive/10"
                  aria-label="Eliminar medida"
                  onClick={() => eliminarMedida(medida.id)}
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
              onClick={agregarMedida}
            >
              <Plus data-icon="inline-start" />
              Agregar medida
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="opciones">
          <AccordionTrigger>Color, vidrio y accesorios</AccordionTrigger>
          <AccordionContent className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-medium">Colores de perfil</p>
              {COLORES_CATALOGO.map((color) => {
                const incluido = producto.colores.some(
                  (item) => item.slug === color.slug,
                )
                const actual = producto.colores.find(
                  (item) => item.slug === color.slug,
                )
                return (
                  <div key={color.slug} className="flex items-center gap-3">
                    <Checkbox
                      checked={incluido}
                      onCheckedChange={(checked) =>
                        toggleColor(color, checked === true)
                      }
                    />
                    <span
                      className="size-4 shrink-0 rounded-full border"
                      style={{ backgroundColor: color.hexadecimal }}
                      aria-hidden="true"
                    />
                    <span className="flex-1 text-sm">{color.etiqueta}</span>
                    <Input
                      type="number"
                      min={0}
                      className="w-28"
                      disabled={!incluido}
                      value={actual?.precioAdicional ?? color.precioAdicional}
                      onChange={(event) =>
                        actualizarPrecioColor(
                          color.slug,
                          Number(event.target.value) || 0,
                        )
                      }
                    />
                  </div>
                )
              })}
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Opciones de vidrio</p>
              {VIDRIOS_CATALOGO.map((vidrio) => {
                const incluido = producto.opcionesVidrio.some(
                  (item) => item.slug === vidrio.slug,
                )
                const actual = producto.opcionesVidrio.find(
                  (item) => item.slug === vidrio.slug,
                )
                return (
                  <div key={vidrio.slug} className="flex items-center gap-3">
                    <Checkbox
                      checked={incluido}
                      onCheckedChange={(checked) =>
                        toggleVidrio(vidrio, checked === true)
                      }
                    />
                    <span className="flex-1 text-sm">{vidrio.etiqueta}</span>
                    <Input
                      type="number"
                      min={0}
                      className="w-28"
                      disabled={!incluido}
                      value={actual?.precioAdicional ?? vidrio.precioAdicional}
                      onChange={(event) =>
                        actualizarPrecioVidrio(
                          vidrio.slug,
                          Number(event.target.value) || 0,
                        )
                      }
                    />
                  </div>
                )
              })}
              <p className="text-xs text-muted-foreground">
                Dejá todo sin marcar en productos que no llevan vidrio (ej: una
                puerta ciega).
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Accesorios</p>
              {ACCESORIOS_CATALOGO.map((accesorio) => {
                const incluido = producto.accesorios.some(
                  (item) => item.slug === accesorio.slug,
                )
                const actual = producto.accesorios.find(
                  (item) => item.slug === accesorio.slug,
                )
                return (
                  <div key={accesorio.slug} className="flex items-center gap-3">
                    <Checkbox
                      checked={incluido}
                      onCheckedChange={(checked) =>
                        toggleAccesorio(accesorio, checked === true)
                      }
                    />
                    <span className="flex-1 text-sm">{accesorio.etiqueta}</span>
                    <Input
                      type="number"
                      min={0}
                      className="w-28"
                      disabled={!incluido}
                      value={actual?.precioAdicional ?? accesorio.precioAdicional}
                      onChange={(event) =>
                        actualizarPrecioAccesorio(
                          accesorio.slug,
                          Number(event.target.value) || 0,
                        )
                      }
                    />
                  </div>
                )
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="visibilidad">
          <AccordionTrigger>Visibilidad</AccordionTrigger>
          <AccordionContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="destacado"
                checked={producto.destacado}
                onCheckedChange={(checked) =>
                  setProducto((prev) => ({
                    ...prev,
                    destacado: checked === true,
                  }))
                }
              />
              <Label htmlFor="destacado" className="font-normal">
                Mostrar como producto destacado en la Home
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="disponible"
                checked={producto.disponible}
                onCheckedChange={(checked) =>
                  setProducto((prev) => ({
                    ...prev,
                    disponible: checked === true,
                  }))
                }
              />
              <Label htmlFor="disponible" className="font-normal">
                Disponible (visible en el catálogo público)
              </Label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          className="rounded-xl"
          onClick={onCancelar}
        >
          Cancelar
        </Button>
        <Button type="submit" className="rounded-xl" disabled={guardando}>
          {guardando ? "Guardando..." : "Guardar producto"}
        </Button>
      </div>
    </form>
  )
}
