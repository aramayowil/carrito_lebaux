# Migración de cards de productos de la Home

**Fecha:** 2026-08-03  
**Estado:** aplicado

## Alcance

Se migraron desde `carrito.zip` únicamente las dos cards que renderizaba el
`HomePage.tsx` del proyecto anterior:

- `PromotionProductCard`, usada en el carrusel de productos con descuento.
- `FeaturedProductCard`, usada en la grilla de productos destacados.

No se migraron `ProductCard`, `CatalogProductCard`, `ProductGrid`, las páginas
de línea ni la página de detalle, porque no forman parte de la Home solicitada.

## Ubicación y composición

- Las cards viven en `src/features/products/components/` porque pertenecen a
  la capacidad de negocio de catálogo/productos.
- `HomeProductsSection` vive en `src/pages/home/sections/` porque la composición
  de carrusel de ofertas + grilla de destacados es exclusiva de la Home.
- Los datos temporales viven en `src/data/mock/productos.ts` y usan el tipo
  global `Producto` existente, con los nombres de dominio actuales en español.
- Las imágenes necesarias se copiaron a `public/img/` desde el ZIP fuente.

## shadcn/ui

Las cards se componen con los primitivos oficiales ya instalados de shadcn:
`Card`, `Button` y `Carousel`. Se agregó `Badge` con la CLI oficial:

```bash
npx shadcn@latest add badge
```

No se creó ni modificó manualmente ningún primitivo dentro de
`src/components/ui`.

## Navegación temporal de los CTA

El proyecto anterior abría un configurador o navegaba a `/producto/:slug`.
Esas capacidades todavía no existen en el proyecto actual; mantener esos
destinos habría generado interacciones rotas o rutas 404. Por ahora ambos CTA
abren WhatsApp con una consulta prellenada para el producto usando
`buildWhatsAppUrl`.

Cuando se migren el configurador y la página de detalle, solo se reemplaza el
destino del `Button` en cada card; su estructura visual y sus datos no cambian.

## ESLint y archivos generados

Los archivos que genera la CLI de shadcn exportan variantes y hooks junto a
componentes, y el carrusel sincroniza el estado de Embla al montar. Se agregaron
excepciones de ESLint limitadas a src/components/ui para esos patrones
oficiales; no se relajaron las reglas para el resto de la aplicación.

## Paleta

Se reemplazaron los colores específicos del proyecto anterior (`brand`,
`emerald`) por tokens semánticos existentes: `primary`, `accent`, `success`,
`card`, `border` y `muted-foreground`. No hay colores hex hardcodeados en los
componentes.
