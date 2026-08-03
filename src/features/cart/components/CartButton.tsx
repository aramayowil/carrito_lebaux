import { ShoppingCart } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/features/cart/store/use-cart-store"
import { useCartUIStore } from "@/features/cart/store/use-cart-ui-store"

/** Acceso flotante al carrito, con contador de unidades y área táctil amplia. */
export function CartButton() {
  const count = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.cantidad, 0),
  )
  const abrirCarrito = useCartUIStore((state) => state.abrirCarrito)

  return (
    <div className="fixed bottom-5 right-5 z-40 sm:bottom-7 sm:right-7">
      {count > 0 && (
        <span
          className="animate-cart-wave pointer-events-none absolute inset-0 rounded-full bg-primary/30"
          aria-hidden="true"
        />
      )}
      <Button
        size="icon-lg"
        onClick={abrirCarrito}
        aria-label={
          count > 0 ? `Abrir carrito, ${count} unidades` : "Abrir carrito"
        }
        className="relative size-14 rounded-full border-primary bg-clip-border shadow-xl transition-[transform,background-color,box-shadow,border-color] duration-200 hover:scale-105 hover:border-primary hover:bg-primary hover:shadow-2xl active:scale-95 active:shadow-lg"
      >
        <ShoppingCart className="size-6" />
        {count > 0 && (
          <Badge className="absolute -right-2 -top-2 min-w-6 justify-center bg-foreground text-background">
            {count > 99 ? "99+" : count}
          </Badge>
        )}
      </Button>
    </div>
  )
}
