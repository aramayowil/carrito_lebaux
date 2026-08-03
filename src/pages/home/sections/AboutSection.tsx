import { ProductImage } from "@/components/media/ProductImage"

/**
 * "Quiénes somos". Portada de carrito_responsive_actualizado
 * (docs/2026-08-02-migracion-home.md).
 *
 * La imagen sigue apuntando a /img/quienes_somos.png (carpeta `public/`,
 * no `src/assets`): todavía no se subió ese asset. `ProductImage` muestra
 * un placeholder con fallback mientras tanto, así que no rompe el layout.
 */
export function AboutSection() {
  return (
    <section id="nosotros" className="bg-background py-20">
      <div className="container grid items-center gap-12 md:grid-cols-2">
        <div>
          <p className="eyebrow mb-2">Desde Tucumán</p>
          <h2 className="section-title section-title-left mb-6">
            Quiénes somos
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            Fábrica de aberturas de aluminio a medida para todo tipo de
            proyectos. Ofrecemos ventanas, puertas y cerramientos con excelente
            relación precio-calidad, adaptados a cada necesidad. Trabajamos con
            líneas Herrero y Módena de alta prestación, garantizando durabilidad
            y diseño.
          </p>
          <div className="dim-line mt-8">Fabricación propia</div>
        </div>
        <ProductImage
          src="/img/quienes_somos.png"
          alt="Nuestra empresa"
          className="corner-marks h-80 w-full rounded-2xl bg-white shadow-lg"
          imgClassName="object-cover"
        />
      </div>
    </section>
  )
}
