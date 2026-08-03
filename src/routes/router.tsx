import { createBrowserRouter } from "react-router-dom"

import { RootLayout } from "@/components/layout/RootLayout"
import { HomePage } from "@/pages/home/HomePage"
import { NotFoundPage } from "@/pages/not-found/NotFoundPage"

/**
 * Rutas de la app. RootLayout es la layout route (Header/Footer fijos,
 * el contenido de cada página se renderiza en su <Outlet />).
 *
 * Al migrar features reales, cada página nueva se agrega acá como child
 * route apuntando a src/pages/<pagina>/<Pagina>Page.tsx.
 */
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
])
