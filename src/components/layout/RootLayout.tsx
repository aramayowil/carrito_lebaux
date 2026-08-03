import { Outlet } from "react-router-dom"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

/**
 * Layout de la app: Header (fijo) + contenido de la ruta activa (Outlet) + Footer.
 * Se usa como layout route en src/routes/router.tsx, envolviendo todas las páginas.
 *
 * A diferencia de la primera versión de prueba, <main> ya NO tiene
 * max-width ni padding propios: cada página/sección decide su propio
 * ancho (full-bleed para secciones con fondo de marca como el Hero, o la
 * utilidad `.container` de src/index.css para contenido centrado). Esto
 * permite que una misma página combine secciones de ancho completo con
 * secciones acotadas, en vez de forzar un único ancho para toda la app.
 *
 * `pt-20` compensa la altura del Header, que es `fixed` (ver Header.tsx).
 */
export function RootLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
