import { Navigate, Outlet, useLocation } from "react-router-dom"

import { useAdminAuthStore } from "@/features/admin/store/use-admin-auth-store"

/** Envuelve las rutas de `/admin/*` que requieren sesión iniciada. */
export function RequireAdminAuth() {
  const isAuthenticated = useAdminAuthStore((state) => state.isAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
