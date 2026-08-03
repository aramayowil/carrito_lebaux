import { create } from "zustand"

interface CartUIState {
  carritoAbierto: boolean
  checkoutAbierto: boolean
  exitoAbierto: boolean
  setCarritoAbierto: (open: boolean) => void
  setCheckoutAbierto: (open: boolean) => void
  setExitoAbierto: (open: boolean) => void
  abrirCarrito: () => void
  abrirCheckout: () => void
}

export const useCartUIStore = create<CartUIState>((set) => ({
  carritoAbierto: false,
  checkoutAbierto: false,
  exitoAbierto: false,
  setCarritoAbierto: (carritoAbierto) => set({ carritoAbierto }),
  setCheckoutAbierto: (checkoutAbierto) => set({ checkoutAbierto }),
  setExitoAbierto: (exitoAbierto) => set({ exitoAbierto }),
  abrirCarrito: () => set({ carritoAbierto: true, checkoutAbierto: false }),
  abrirCheckout: () => set({ carritoAbierto: false, checkoutAbierto: true }),
}))
