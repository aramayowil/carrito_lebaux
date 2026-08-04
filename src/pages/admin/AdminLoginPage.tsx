import { useState, type FormEvent } from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAdminAuthStore } from "@/features/admin/store/use-admin-auth-store"
import { Logo } from "@/components/layout/Logo"

/** Login del panel admin. Credenciales hardcodeadas mientras no hay backend. */
export function AdminLoginPage() {
  const isAuthenticated = useAdminAuthStore((state) => state.isAuthenticated)
  const iniciarSesion = useAdminAuthStore((state) => state.iniciarSesion)
  const navigate = useNavigate()
  const location = useLocation()

  const [usuario, setUsuario] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [error, setError] = useState<string | null>(null)

  if (isAuthenticated) {
    const destino =
      (location.state as { from?: Location } | null)?.from?.pathname ?? "/admin"
    return <Navigate to={destino} replace />
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const ok = iniciarSesion(usuario, contrasena)
    if (!ok) {
      setError("Usuario o contraseña incorrectos.")
      return
    }
    navigate("/admin", { replace: true })
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-sm rounded-2xl">
        <CardHeader className="items-center text-center">
          <Logo className="mb-2 h-10 w-auto" />
          <CardTitle>Panel de administración</CardTitle>
          <p className="text-sm text-muted-foreground">
            Ingresá con tu usuario para cargar el catálogo.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="usuario">Usuario</Label>
              <Input
                id="usuario"
                value={usuario}
                onChange={(event) => setUsuario(event.target.value)}
                autoComplete="username"
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contrasena">Contraseña</Label>
              <Input
                id="contrasena"
                type="password"
                value={contrasena}
                onChange={(event) => setContrasena(event.target.value)}
                autoComplete="current-password"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full rounded-xl">
              Ingresar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
