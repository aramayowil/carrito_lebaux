import { Hero } from "@/pages/home/sections/Hero"
import { Benefits } from "@/pages/home/sections/Benefits"
import { ObrasSection } from "@/pages/home/sections/ObrasSection"
import { AboutSection } from "@/pages/home/sections/AboutSection"
import { obras } from "@/data/mock"

/**
 * Home. Primera pasada de migración desde carrito_responsive_actualizado
 * (ver docs/2026-08-02-migracion-home.md): Hero, Benefits, ObrasSection y
 * AboutSection.
 *
 * Deliberadamente NO migrado todavía en esta pasada (queda para cuando
 * exista features/products con datos reales):
 *   - Carrusel de productos en oferta.
 *   - Sección "Destacados" con FeaturedProductCard.
 *   - Botones de acceso al catálogo completo por línea.
 *
 * `obras` viene de data/mock por ahora; cuando exista features/products
 * con su propio store/servicio, esto se reemplaza por ese hook (como hacía
 * useCatalog en el proyecto anterior) en vez de importar el mock directo.
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <ObrasSection obras={obras} />
      <AboutSection />
    </>
  )
}
