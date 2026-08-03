import type { Obra } from "@/types"
import { ProductImage } from "@/components/media/ProductImage"

interface ObrasSectionProps {
  obras: Obra[]
}

/**
 * "Algunas de nuestras obras": casos reales con foto + testimonio.
 * Portada de carrito_responsive_actualizado (docs/2026-08-02-migracion-home.md).
 *
 * Los campos de `Obra` cambiaron de nombre respecto al proyecto viejo
 * (title/image/quote/author -> titulo/imagen/testimonio/autor), ver
 * src/types/contenido.ts.
 */
export function ObrasSection({ obras }: ObrasSectionProps) {
  if (obras.length === 0) return null

  return (
    <section id="obras" className="py-20">
      <div className="container">
        <p className="eyebrow mb-2 justify-center text-center">Casos reales</p>
        <h2 className="section-title mb-12">Algunas de nuestras obras</h2>

        <div className="grid gap-5 md:grid-cols-3">
          {obras.map((obra) => (
            <article
              key={obra.id}
              className="group relative aspect-square overflow-hidden rounded-2xl border bg-brand-black shadow-lg"
            >
              <ProductImage
                src={obra.imagen}
                alt={obra.titulo}
                className="h-full w-full"
                imgClassName="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/90 to-black/40 p-6 opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
                <div className="translate-y-5 text-center transition-transform duration-300 group-hover:translate-y-0">
                  <p className="mb-4 text-sm italic leading-relaxed text-white">
                    "{obra.testimonio}"
                  </p>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-primary">
                    &mdash; {obra.autor}
                  </h4>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
