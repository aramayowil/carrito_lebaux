import { Award, Building2, PackageSearch, Settings, SquareStack } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useContentStore } from "@/store/use-content-store"

/** Resumen rápido del contenido cargado, con accesos a cada sección. */
export function AdminDashboardPage() {
  const productos = useContentStore((state) => state.productos)
  const lineas = useContentStore((state) => state.lineas)
  const obras = useContentStore((state) => state.obras)
  const beneficios = useContentStore((state) => state.beneficios)

  const destacados = productos.filter((producto) => producto.destacado).length
  const enOferta = productos.filter(
    (producto) => producto.precios.porcentajeDescuento > 0,
  ).length
  const noDisponibles = productos.filter((producto) => !producto.disponible).length

  const tarjetas = [
    {
      to: "/admin/productos",
      icon: PackageSearch,
      label: "Productos",
      valor: productos.length,
      detalle: `${destacados} destacados · ${enOferta} con descuento`,
    },
    {
      to: "/admin/lineas",
      icon: SquareStack,
      label: "Líneas",
      valor: lineas.length,
      detalle: lineas.map((linea) => linea.nombre).join(" · "),
    },
    {
      to: "/admin/obras",
      icon: Building2,
      label: "Obras",
      valor: obras.length,
      detalle: "Proyectos realizados en la Home",
    },
    {
      to: "/admin/beneficios",
      icon: Award,
      label: "Beneficios",
      valor: beneficios.length,
      detalle: "Bloques de confianza en la Home",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold">Panel</h1>
        <p className="text-sm text-muted-foreground">
          Todo lo que cargues acá se refleja al toque en el sitio público.
        </p>
      </div>

      {noDisponibles > 0 && (
        <div className="rounded-xl border border-amber-300/50 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-400">
          Tenés {noDisponibles} producto(s) marcados como no disponibles: no se
          muestran en el catálogo público.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {tarjetas.map((tarjeta) => (
          <Link key={tarjeta.to} to={tarjeta.to}>
            <Card className="rounded-2xl transition-colors hover:border-primary/40">
              <CardHeader className="flex-row items-center gap-3 space-y-0">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <tarjeta.icon className="size-5" />
                </div>
                <div>
                  <CardTitle className="text-base">{tarjeta.label}</CardTitle>
                  <p className="text-2xl font-semibold">{tarjeta.valor}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-1 text-xs text-muted-foreground">
                  {tarjeta.detalle}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="rounded-2xl">
        <CardHeader className="flex-row items-center gap-3 space-y-0">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Settings className="size-5" />
          </div>
          <CardTitle className="text-base">Datos del sitio</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Contacto, WhatsApp, redes sociales y textos generales.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl"
            render={<Link to="/admin/sitio" />}
          >
            Editar
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
