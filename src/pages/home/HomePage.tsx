import { Hero } from "@/pages/home/sections/Hero"
import { Benefits } from "@/pages/home/sections/Benefits"
import { ObrasSection } from "@/pages/home/sections/ObrasSection"
import { AboutSection } from "@/pages/home/sections/AboutSection"
import { HomeProductsSection } from "@/pages/home/sections/HomeProductsSection"
import { obras, productosHome } from "@/data/mock"
import { useDocumentMeta } from "@/hooks/use-document-meta"

/**
 * Compone la portada responsive con contenido institucional y una selección
 * del catálogo mock; la lógica de producto permanece en features/products.
 */
export function HomePage() {
  useDocumentMeta({
    title: "Puertas y ventanas de aluminio a medida",
    description:
      "Fábrica de aberturas de aluminio a medida en Tucumán. Líneas Herrero y Módena.",
  })

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
