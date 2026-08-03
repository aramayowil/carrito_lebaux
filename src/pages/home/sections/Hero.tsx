import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import heroImage from "@/assets/hero.png"

/**
 * Sección principal (above the fold) de la home. Rediseño completo desde
 * cero (reemplaza la versión anterior de dos columnas texto/imagen, que
 * daba problemas de altura en mobile).
 *
 * CONCEPTO: imagen de fondo full-bleed (`absolute inset-0`) con overlay
 * oscuro + texto superpuesto centrado/abajo, en vez de columnas separadas
 * peleando por espacio. Esto resuelve de raíz el problema anterior: al
 * ser una sola capa de fondo que siempre cubre el 100% de la sección
 * (`object-cover`), el alto de la sección deja de depender de cuánto
 * texto haya. La sección puede ser `h-[...]` fija con total seguridad.
 *
 * ALTURA: `h-[calc(100svh-var(--spacing-navbar))]` (fija, no `min-h-`).
 * `min-height` es un piso, no un techo: con contenido de dos columnas
 * (como la versión anterior) el navegador podía estirar la sección más
 * allá del 100% de pantalla si el texto no entraba. Con imagen de fondo
 * absoluta, el contenido de texto ya no empuja el alto del contenedor
 * (está superpuesto, no en flujo), así que una altura fija es segura en
 * cualquier tamaño de pantalla — mobile, tablet y desktop por igual.
 *
 * `100svh` (small viewport height) en vez de `100dvh`: en mobile, `dvh`
 * cambia mientras la barra de direcciones del navegador aparece/desaparece
 * al hacer scroll, lo que puede generar un salto visual justo al cargar.
 * `svh` usa el alto mínimo garantizado (con la barra visible) y es estable.
 * Se resta `var(--spacing-navbar)` porque el Navbar es `fixed` y
 * `RootLayout` ya compensa su alto con `pt-navbar` en `main` — si acá
 * pusiéramos `100svh` a secas, se sumaría al padding-top del navbar y el
 * Hero terminaría midiendo navbar-height + 100svh en vez de 100svh.
 *
 * JERARQUÍA VISUAL responsive:
 * - Mobile: contenido alineado abajo (`justify-end`), eyebrow + título +
 *   un solo CTA principal. El texto de apoyo (párrafo) y el segundo botón
 *   se ocultan (`hidden sm:block` / `sm:inline-flex`) para no saturar una
 *   pantalla chica con imagen de fondo — menos es más legible acá.
 * - Tablet (`sm:`): aparecen párrafo y segundo CTA, tamaños de fuente
 *   suben un escalón.
 * - Desktop (`lg:`): contenido centrado verticalmente, ancho de columna
 *   de texto acotado (no ocupa todo el ancho) para que la imagen de fondo
 *   respire a la derecha, tamaños de fuente en su punto máximo.
 *
 * `corner-marks-static` (motivo de "plano técnico" ya usado en el resto
 * del sitio, ver index.css) se mantiene como firma visual, ahora en la
 * esquina de la sección completa en vez de sobre la columna de imagen.
 *
 * La imagen usa `src/assets/hero.png` (ya presente en el proyecto).
 */
export function Hero() {
  return (
    <section className="relative flex h-[calc(100svh-var(--spacing-navbar))] flex-col justify-end overflow-hidden bg-brand-black text-white lg:justify-center">
      {/* Imagen de fondo: cubre toda la sección. object-cover recorta lo
          necesario para llenar el espacio sin deformarse; object-position
          prioriza el centro-derecha, donde está la fachada, dejando la
          izquierda (más plana/oscura) como zona de mejor contraste para
          el texto en desktop. */}
      <img
        src={heroImage}
        alt="Fachada de una vivienda con ventanas y puertas de aluminio Lebaux instaladas"
        className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />

      {/* Overlay: degradado de negro de marca, más fuerte abajo/izquierda
          (donde vive el texto) y transparente hacia arriba/derecha (donde
          la imagen debe leerse con claridad). Combina un degradado
          vertical (mobile, texto abajo) con uno horizontal (desktop,
          texto a la izquierda) vía dos capas independientes. */}
      <div className="absolute inset-0 bg-linear-to-t from-brand-black via-brand-black/70 to-brand-black/10" />
      <div className="absolute inset-0 hidden bg-linear-to-r from-brand-black via-brand-black/55 to-transparent lg:block" />

      {/* Marca de esquina (motivo "plano técnico" de la marca), visible
          solo en desktop donde hay espacio de sobra para no competir con
          el texto. */}
      <div className="corner-marks-static pointer-events-none absolute inset-8 hidden lg:block" />

      {/* Contenido de texto */}
      <div className="relative z-10 px-6 pb-10 sm:px-10 sm:pb-14 lg:px-16 lg:pb-0 xl:px-20">
        <div className="max-w-2xl">
          <span className="eyebrow mb-4 w-fit rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wider backdrop-blur-sm sm:mb-6">
            FÁBRICA DE ABERTURAS &middot; TUCUMÁN
          </span>

          <h1 className="max-w-xl text-balance text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl lg:max-w-2xl xl:text-6xl">
            Cada abertura,{" "}
            <span className="text-primary">fabricada a tu medida</span>
          </h1>

          {/* Párrafo de apoyo: oculto en mobile para no saturar la
              pantalla chica con texto sobre una imagen; aparece desde
              tablet en adelante. */}
          <p className="mt-5 hidden max-w-lg text-base leading-relaxed text-white/80 sm:block md:text-lg">
            Líneas Herrero y Módena, fabricación propia. Elegí medidas, vidrios,
            colores y accesorios, mirá el precio actualizarse al instante y
            encargalo directo por WhatsApp.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
            <Button
              size="lg"
              className="w-full px-8 sm:w-auto"
              render={<Link to="/modena" />}
            >
              Ver línea Módena <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            {/* Segundo CTA: oculto en mobile junto con el párrafo, mismo
                criterio de jerarquía (una sola acción clara en pantallas
                chicas). */}
            <Button
              variant="outline"
              size="lg"
              className="hidden border-white/30 bg-white/5 px-8 text-white backdrop-blur-sm hover:bg-white/15 hover:text-white sm:inline-flex"
              render={<Link to="/herrero" />}
            >
              Ver línea Herrero
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
