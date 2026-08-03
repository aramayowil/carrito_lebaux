import { CheckCircle2 } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useCartStore } from "@/features/cart/store/use-cart-store"
import { useCartUIStore } from "@/features/cart/store/use-cart-ui-store"

/** Confirma la apertura de WhatsApp y permite cerrar el pedido ya enviado. */
export function OrderSuccessDialog() {
  const open = useCartUIStore((state) => state.exitoAbierto)
  const setOpen = useCartUIStore((state) => state.setExitoAbierto)
  const vaciar = useCartStore((state) => state.vaciar)

  const finish = () => {
    vaciar()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader className="items-center text-center">
          <span className="mb-2 rounded-full bg-success/10 p-4 text-success">
            <CheckCircle2 className="size-10" />
          </span>
          <DialogTitle className="text-xl">
            Pedido listo para enviar
          </DialogTitle>
          <DialogDescription>
            Abrimos WhatsApp con el detalle. Revisalo y presioná enviar para
            confirmar la consulta.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="w-full"
            onClick={finish}
            render={<Link to="/">Finalizar y volver al inicio</Link>}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
