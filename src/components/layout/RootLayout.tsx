import { Outlet } from "react-router-dom"

import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"
import { ScrollToTop } from "@/components/layout/ScrollToTop"
import { CartButton } from "@/features/cart/components/CartButton"
import { CartDrawer } from "@/features/cart/components/CartDrawer"
import { CheckoutDialog } from "@/features/checkout/components/CheckoutDialog"
import { OrderSuccessDialog } from "@/features/checkout/components/OrderSuccessDialog"

/** Shell global: navegación, ruta activa, footer y flujo persistente del carrito. */
export function RootLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Saltar al contenido
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="main-content" className="flex-1 pt-navbar">
        <Outlet />
      </main>
      <Footer />
      <CartButton />
      <CartDrawer />
      <CheckoutDialog />
      <OrderSuccessDialog />
    </div>
  )
}
