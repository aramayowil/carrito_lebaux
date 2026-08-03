import { Outlet } from "react-router-dom"

import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

/**
 * Layout de la app: Navbar (fijo) + contenido de la ruta activa (Outlet) +
 * Footer. Se usa como layout route en src/routes/router.tsx, envolviendo
 * todas las páginas.
 *
 * `main` NO tiene max-width ni padding horizontal propios: cada
 * página/sección decide su propio ancho (full-bleed para secciones con
 * fondo de marca como el Hero, o la utilidad `.container` de
 * src/index.css para contenido centrado). Esto permite que una misma
 * página combine secciones de ancho completo con secciones acotadas, en
 * vez de forzar un único ancho para toda la app.
 *
 * `pt-navbar` sí es necesario: compensa la altura del Navbar, que es
 * `fixed` (sale del flujo normal, así que sin este padding el contenido
 * de cada página quedaría tapado detrás). `--spacing-navbar` se define
 * una sola vez en src/index.css (registrada en la escala de spacing de
 * Tailwind) y la usan tanto Navbar (su propio alto, `h-navbar`) como Hero
 * (`min-height: calc(100svh - var(--spacing-navbar))`, para ocupar
 * exactamente el espacio visible debajo del navbar).
 */
export function RootLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 pt-navbar">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
