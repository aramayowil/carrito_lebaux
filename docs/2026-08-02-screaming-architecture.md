# Reestructuración a Screaming Architecture

**Fecha:** 2026-08-02
**Estado:** aplicado

## Por qué

La estructura anterior (`components/{ui,sections,theme,layout,cart,products}`,
`hooks/`, `services/`, `store/`, `pages/`, `routes/` todos vacíos y planos)
organiza por **tipo técnico**, no por lo que hace la app. Con Screaming
Architecture, al abrir `src/features/` se tiene que entender de inmediato que
esto es una tienda con carrito: se "grita" el dominio (carrito, productos,
checkout), no el framework.

## Qué cambió

- Se creó `src/features/` con una carpeta por capacidad de negocio: `cart`,
  `products`, `checkout`, `theme`. Cada una con sus propios `components/`,
  `hooks/`, `services/`, `types/` (y `store/` en el caso de `cart`).
- Se creó `src/app/` como composition root (`App.tsx`), separado de `pages/`.
- `src/pages/home/sections/` queda para secciones que solo tienen sentido en
  esa página puntual (no reutilizables entre features).
- `src/components/ui` **se mantiene tal cual estaba** (no se movió a
  `shared/` ni se renombró) a propósito: es el path que usa `components.json`
  de shadcn (`"ui": "@/components/ui"`). Moverlo hubiera obligado a
  reconfigurar shadcn y no aporta nada al "screaming" — un primitivo de shadcn
  no es lógica de negocio, es una herramienta.
- `src/components/layout` agrupa el shell de la app (`Header`, `Footer`,
  `RootLayout`) — tampoco es un feature de negocio, es estructura visual
  compartida por todas las páginas.
- Se eliminaron las carpetas técnicas vacías que quedaban sueltas
  (`components/cart`, `components/products`, `components/sections`,
  `components/theme`) — su contenido futuro va a vivir en `features/*`.

## Layout genérico de prueba

Se armó un layout mínimo para validar que la estructura y la paleta de colores
funcionan antes de migrar componentes reales:

- `components/layout/Header.tsx` — logo + nav placeholder + botón de carrito.
- `components/layout/Footer.tsx` — footer simple.
- `components/layout/RootLayout.tsx` — envuelve Header + contenido + Footer.
- `pages/home/HomePage.tsx` — muestra las variantes del `Button` de shadcn y
  los colores semánticos (`success`, `warning`, `destructive`, `info`) para
  confirmar visualmente que `index.css` quedó bien.
- `app/App.tsx` — arma `RootLayout` + `HomePage`. Cuando se agregue el router
  real, acá se reemplaza `<HomePage />` por `<RouterProvider />`.

Validado con `tsc -b` y `vite build` sin errores antes de entregar.

## Pendiente

- Router (`react-router` o similar) en `src/routes/`.
- Migrar componentes reales desde `carrito_responsive_actualizado` hacia
  `features/products` y `features/cart`, adaptándolos a shadcn.
- Store de Zustand del carrito en `features/cart/store`.
