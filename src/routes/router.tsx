import { createBrowserRouter } from "react-router-dom"

import { RootLayout } from "@/components/layout/RootLayout"
import { HomePage } from "@/pages/home/HomePage"
import { NotFoundPage } from "@/pages/not-found/NotFoundPage"
import type { SlugLineaProducto } from "@/types"

function lazyCatalogLine(line: SlugLineaProducto) {
  return async () => {
    const { CatalogLinePage } = await import("@/pages/catalog/CatalogLinePage")
    return {
      Component: function CatalogLineRoute() {
        return <CatalogLinePage line={line} />
      },
    }
  }
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "modena", lazy: lazyCatalogLine("modena") },
      { path: "herrero", lazy: lazyCatalogLine("herrero") },
      {
        path: "producto/:slug",
        lazy: async () => {
          const { ProductDetailPage } =
            await import("@/pages/product/ProductDetailPage")
          return { Component: ProductDetailPage }
        },
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
])
