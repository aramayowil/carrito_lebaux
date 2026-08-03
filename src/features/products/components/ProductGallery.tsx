import { useState } from "react"
import { ChevronLeft, ChevronRight, Expand } from "lucide-react"

import { ProductImage } from "@/components/media/ProductImage"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import type { ImagenProducto } from "@/types"

interface ProductGalleryProps {
  images: ImagenProducto[]
  productName: string
}

/** Galería responsive con miniaturas y vista ampliada basada en Dialog de shadcn. */
export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const activeImage = images[activeIndex] ?? images[0]
  const hasMultiple = images.length > 1

  const goTo = (index: number) => {
    if (images.length === 0) return
    setActiveIndex(((index % images.length) + images.length) % images.length)
  }

  return (
    <div>
      <Button
        variant="ghost"
        onClick={() => setLightboxOpen(true)}
        className="corner-marks group relative h-auto w-full overflow-hidden rounded-3xl border bg-white p-0 hover:bg-white"
        aria-label="Ampliar imagen del producto"
      >
        <ProductImage
          src={activeImage?.url ?? ""}
          alt={activeImage?.textoAlternativo ?? productName}
          className="h-80 w-full sm:h-112"
        />
        <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-brand-black/75 px-3 py-2 text-xs font-medium text-white">
          <Expand className="size-4" /> Ampliar
        </span>
      </Button>

      {hasMultiple && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <Button
              key={`${image.url}-${index}`}
              variant="outline"
              onClick={() => setActiveIndex(index)}
              aria-label={`Ver imagen ${index + 1}`}
              aria-pressed={index === activeIndex}
              className={cn(
                "h-20 w-20 shrink-0 overflow-hidden rounded-xl p-1",
                index === activeIndex &&
                  "border-primary ring-2 ring-primary/20",
              )}
            >
              <ProductImage
                src={image.url}
                alt={image.textoAlternativo}
                className="h-full w-full rounded-lg bg-white"
                imgClassName="object-cover"
              />
            </Button>
          ))}
        </div>
      )}

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent
          showCloseButton
          className="flex h-[92dvh] max-h-[92dvh] max-w-[calc(100%-1rem)] flex-col gap-3 overflow-hidden bg-brand-black/95 p-3 sm:max-w-6xl sm:p-5"
        >
          <DialogTitle className="sr-only">
            Galería de {productName}
          </DialogTitle>
          <div className="relative flex min-h-0 flex-1 items-center justify-center">
            <ProductImage
              src={activeImage?.url ?? ""}
              alt={activeImage?.textoAlternativo ?? productName}
              className="h-full w-full rounded-2xl bg-white"
            />
            {hasMultiple && (
              <>
                <Button
                  variant="secondary"
                  size="icon-lg"
                  onClick={() => goTo(activeIndex - 1)}
                  aria-label="Imagen anterior"
                  className="absolute left-2 rounded-full sm:left-4"
                >
                  <ChevronLeft />
                </Button>
                <Button
                  variant="secondary"
                  size="icon-lg"
                  onClick={() => goTo(activeIndex + 1)}
                  aria-label="Imagen siguiente"
                  className="absolute right-2 rounded-full sm:right-4"
                >
                  <ChevronRight />
                </Button>
              </>
            )}
          </div>
          {hasMultiple && (
            <p className="text-center text-xs text-white/70">
              {activeIndex + 1} de {images.length}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
