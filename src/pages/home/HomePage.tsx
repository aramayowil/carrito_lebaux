import { Hero } from "@/pages/home/sections/Hero"
import { Benefits } from "@/pages/home/sections/Benefits"
import { ObrasSection } from "@/pages/home/sections/ObrasSection"
import { AboutSection } from "@/pages/home/sections/AboutSection"
import { HomeProductsSection } from "@/pages/home/sections/HomeProductsSection"
import { obras, productosHome } from "@/data/mock"

/**
 * Home. Primera pasada de migración desde carrito_responsive_actualizado
 * (ver docs/2026-08-02-migracion-home.md): Hero, Benefits, ObrasSection y
 * AboutSection, dentro de RootLayout (Navbar + Outlet + Footer).
 *
 * Hero ocupa exactamente el alto visible debajo del Navbar fijo
 * (`calc(100svh - var(--spacing-navbar))`, ver Hero.tsx) en todos los
 * dispositivos; Benefits sigue inmediatamente después en el flujo normal.
 *
 * Las cards de ofertas y destacados ya viven en features/products y se
 * componen en HomeProductsSection. Tanto `productosHome` como `obras`
 * vienen de data/mock hasta que se conecte un repositorio de catálogo.
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <HomeProductsSection products={productosHome} />
      <ObrasSection obras={obras} />
      <AboutSection />
    </>
  )
}
