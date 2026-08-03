import { useState } from "react"
import { ShoppingCart, Trash2 } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { CartItemRow } from "@/features/cart/components/CartItemRow"
import {
  calcularTotalesCarrito,
  useCartStore,
} from "@/features/cart/store/use-cart-store"
import { useCartUIStore } from "@/features/cart/store/use-cart-ui-store"
import { formatProductPrice } from "@/features/products/lib/product-card-formatters"

/** Drawer principal del carrito con edición, totales y confirmación para vaciar. */
export function CartDrawer() {
  const [clearDialogOpen, setClearDialogOpen] = useState(false)
  const open = useCartUIStore((state) => state.carritoAbierto)
  const setOpen = useCartUIStore((state) => state.setCarritoAbierto)
  const abrirCheckout = useCartUIStore((state) => state.abrirCheckout)
  const items = useCartStore((state) => state.items)
  const vaciar = useCartStore((state) => state.vaciar)
  const totals = calcularTotalesCarrito(items)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="w-full max-w-full gap-0 p-0 sm:max-w-lg"
      >
        <SheetHeader className="border-b pr-16">
          <div className="flex items-start justify-between gap-4">
            <div>
              <SheetTitle className="text-lg uppercase tracking-wide">
                Tu pedido
              </SheetTitle>
              <SheetDescription>
                {totals.cantidadItems === 0
                  ? "Todavía no agregaste productos."
                  : `${totals.cantidadItems} unidades configuradas`}
              </SheetDescription>
            </div>

            {items.length > 0 && (
              <AlertDialog
                open={clearDialogOpen}
                onOpenChange={setClearDialogOpen}
              >
                <AlertDialogTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground"
                    />
                  }
                >
                  <Trash2 data-icon="inline-start" /> Vaciar
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      ¿Vaciar todo el carrito?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Se eliminarán todas las configuraciones guardadas en este
                      pedido.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      variant="destructive"
                      onClick={() => {
                        vaciar()
                        setClearDialogOpen(false)
                      }}
                    >
                      Vaciar carrito
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center text-muted-foreground">
            <span className="rounded-full bg-muted p-5">
              <ShoppingCart className="size-10 opacity-60" />
            </span>
            <p className="font-medium text-foreground">Tu carrito está vacío</p>
            <p className="max-w-xs text-sm">
              Elegí una abertura, configurá sus opciones y agregala para empezar
              el pedido.
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto p-4 sm:p-6">
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>

            <div className="space-y-4 border-t bg-card p-4 sm:p-6">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-muted-foreground">Total contado</span>
                <span className="font-bold text-success">
                  {formatProductPrice(totals.totalContado)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-muted-foreground">Total tarjeta</span>
                <span className="font-bold">
                  {formatProductPrice(totals.totalTarjeta)}
                </span>
              </div>
              <Separator />
              <Button size="lg" className="w-full" onClick={abrirCheckout}>
                Continuar pedido
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
