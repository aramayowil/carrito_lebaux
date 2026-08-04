import { create } from "zustand"
import { persist } from "zustand/middleware"

/**
 * Autenticación del panel admin — CARRITO LEBAUX
 *
 * No hay backend todavía, así que no hay usuarios reales ni hashing: es un
 * único usuario hardcodeado para frenar acceso casual mientras se prueba el
 * panel. Cuando se conecte Supabase esto se reemplaza por Supabase Auth
 * (ver docs/2026-08-03-panel-admin.md) y `iniciarSesion` pasa a ser async.
 *
 * Las credenciales no son secretas: viajan en el bundle del cliente. No usar
 * este mecanismo para proteger datos sensibles reales.
 */

const USUARIO_ADMIN = "admin"
const CONTRASENA_ADMIN = "lebaux2026"

interface AdminAuthState {
  isAuthenticated: boolean
  usuario: string | null
  iniciarSesion: (usuario: string, contrasena: string) => boolean
  cerrarSesion: () => void
}

export const useAdminAuthStore = create<AdminAuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      usuario: null,
      iniciarSesion: (usuario, contrasena) => {
        const esValido =
          usuario.trim().toLowerCase() === USUARIO_ADMIN &&
          contrasena === CONTRASENA_ADMIN

        if (esValido) {
          set({ isAuthenticated: true, usuario: USUARIO_ADMIN })
        }

        return esValido
      },
      cerrarSesion: () => set({ isAuthenticated: false, usuario: null }),
    }),
    { name: "lebaux-admin-auth" },
  ),
)
