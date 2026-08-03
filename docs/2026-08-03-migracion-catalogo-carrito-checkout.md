# Migración completa de catálogo, carrito y checkout

**Fecha:** 2026-08-03  
**Estado:** aplicado

## Alcance funcional

Se completó el flujo principal del storefront a partir de `carrito.zip`,
adaptándolo a la arquitectura y tipos actuales:

1. Navegación por las líneas Herrero y Módena.
2. Filtros de catálogo por categoría reflejados en la URL.
3. Ficha de producto con galería, vista ampliada y relacionados.
4. Configuración de medida, color, vidrio, accesorios y cantidad.
5. Cálculo único de precios contado/tarjeta.
6. Carrito persistente en `localStorage`, con combinación de configuraciones
   repetidas, edición de cantidades y confirmación antes de vaciar.
7. Checkout validado y generación del pedido completo para WhatsApp.
8. Mega-menú desktop, navegación mobile y Footer conectados al catálogo real.

## Componentes del proyecto viejo que no se migraron

Se descartaron deliberadamente piezas redundantes o sin uso real:

- `ProductMarquee` y `LineShowcase`: la Home ya no los renderiza.
- `ProductCard` quick-view, `ProductConfiguratorDialog` y
  `useConfiguratorStore`: la ficha completa concentra la configuración en un
  único flujo más claro y accesible.
- `useProductStore`, repositorios y Supabase: los datos siguen siendo mock y
  síncronos; agregar una capa asíncrona ficticia no aporta valor.
- `useUIStore`: se reemplazó por estado local para navegación y por un store de
  presentación acotado al feature carrito.
- Theme toggle, loaders decorativos y WhatsApp flotante viejo: no son parte del
  flujo solicitado o ya tienen reemplazo.
- `Header.tsx`: duplicaba al `Navbar.tsx` real y no tenía consumidores; se retiró.

## Arquitectura aplicada

- `src/features/products/`: metadatos del catálogo, calculadora de precios,
  hook de configuración y componentes reutilizables de producto.
- `src/features/cart/`: componentes y stores persistente/de presentación del
  carrito.
- `src/features/checkout/`: tipos locales, armado del mensaje y dialogs del
  checkout.
- `src/pages/catalog/` y `src/pages/product/`: pantallas que componen los
  features sin alojar stores ni cálculos de negocio.
- `src/components/layout/`: navegación de catálogo, Navbar, Footer,
  `ScrollToTop` y composición global.

## shadcn/ui y Base UI

Se instalaron exclusivamente con la CLI oficial:

```bash
npx shadcn@latest add accordion alert-dialog breadcrumb checkbox dialog input label navigation-menu radio-group select separator textarea
```

La CLI detectó el `button.tsx` personalizado y se respondió **no** a su
sobrescritura para preservar la variante WhatsApp. Luego se ejecutó el diff de
la CLI para cada componente nuevo; todos devolvieron `No updates found`, por lo
que coinciden con el registro oficial de shadcn.

Las composiciones principales usan:

- `NavigationMenu`, `Accordion` y `Sheet` para navegación.
- `Card`, `Badge`, `Button`, `Skeleton` y `Breadcrumb` para catálogo.
- `RadioGroup`, `Select`, `Checkbox`, `Label` y `Accordion` para configuración.
- `Sheet`, `AlertDialog` y `Separator` para carrito.
- `Dialog`, `Input`, `Textarea` y `RadioGroup` para checkout.

No se copiaron componentes UI Radix del ZIP y no se escribió ningún primitivo
nuevo dentro de `src/components/ui`. Los íconos SVG de marcas, que son assets
propios y no primitivas shadcn, se reubicaron en `src/components/icons` para
mantener esa frontera explícita.

## Precios y snapshot del carrito

`calcularPrecioProducto` es la única fuente de verdad. Respeta:

- `precioFijo` de una medida, que reemplaza el precio base.
- adicionales de medida, color, vidrio y accesorios.
- bases distintas para contado y tarjeta.
- cantidad para los totales finales.

`ItemCarrito` conserva el resumen legible de la selección además de sus slugs.
Esto mantiene la decisión previa de que el carrito sea un snapshot independiente
del catálogo y, a la vez, permite mostrar etiquetas sin rehidratar productos.

## Datos y assets

`src/data/mock/productos.ts` contiene las 22 tipologías del catálogo viejo,
convertidas al tipo global `Producto`. Solo se extrajeron del ZIP las imágenes
referenciadas por catálogo, galerías, obras y la sección institucional; no se
copió el resto del proyecto ni assets sin consumidor.

## Rendimiento y responsive

- Catálogo y detalle se cargan con rutas lazy. El bundle inicial bajó de
  aproximadamente 665 kB a 304 kB sin minificar la funcionalidad.
- Las grillas parten de dos columnas en mobile y escalan hasta cuatro.
- Los filtros usan scroll horizontal táctil en pantallas angostas.
- Drawer y dialogs limitan alto, permiten scroll interno y conservan áreas
  táctiles amplias.
- Galería, selector de opciones, checkout y Footer reorganizan sus columnas por
  breakpoint sin superposiciones.

## Validación

```bash
npm run build
npm run lint
```

Ambos comandos finalizaron sin errores después de la integración.
