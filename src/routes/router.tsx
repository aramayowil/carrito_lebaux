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
  {
    path: "/admin/login",
    lazy: async () => {
      const { AdminLoginPage } = await import("@/pages/admin/AdminLoginPage")
      return { Component: AdminLoginPage }
    },
  },
  {
    path: "/admin",
    lazy: async () => {
      const { RequireAdminAuth } = await import(
        "@/features/admin/components/RequireAdminAuth"
      )
      return { Component: RequireAdminAuth }
    },
    children: [
      {
        lazy: async () => {
          const { AdminShell } = await import(
            "@/features/admin/components/AdminShell"
          )
          return { Component: AdminShell }
        },
        children: [
          {
            index: true,
            lazy: async () => {
              const { AdminDashboardPage } = await import(
                "@/pages/admin/AdminDashboardPage"
              )
              return { Component: AdminDashboardPage }
            },
          },
          {
            path: "productos",
            lazy: async () => {
              const { AdminProductsPage } = await import(
                "@/pages/admin/AdminProductsPage"
              )
              return { Component: AdminProductsPage }
            },
          },
          {
            path: "productos/nuevo",
            lazy: async () => {
              const { AdminProductFormPage } = await import(
                "@/pages/admin/AdminProductFormPage"
              )
              return { Component: AdminProductFormPage }
            },
          },
          {
            path: "productos/:id/editar",
            lazy: async () => {
              const { AdminProductFormPage } = await import(
                "@/pages/admin/AdminProductFormPage"
              )
              return { Component: AdminProductFormPage }
            },
          },
          {
            path: "lineas",
            lazy: async () => {
              const { AdminLinesPage } = await import(
                "@/pages/admin/AdminLinesPage"
              )
              return { Component: AdminLinesPage }
            },
          },
          {
            path: "obras",
            lazy: async () => {
              const { AdminObrasPage } = await import(
                "@/pages/admin/AdminObrasPage"
              )
              return { Component: AdminObrasPage }
            },
          },
          {
            path: "beneficios",
            lazy: async () => {
              const { AdminBeneficiosPage } = await import(
                "@/pages/admin/AdminBeneficiosPage"
              )
              return { Component: AdminBeneficiosPage }
            },
          },
          {
            path: "sitio",
            lazy: async () => {
              const { AdminSitePage } = await import("@/pages/admin/AdminSitePage")
              return { Component: AdminSitePage }
            },
          },
        ],
      },
    ],
  },
])
