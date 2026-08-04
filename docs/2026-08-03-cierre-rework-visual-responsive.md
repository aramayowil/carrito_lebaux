# Cierre del rework visual y responsive

**Fecha:** 2026-08-03  
**Estado:** aplicado y validado

## Objetivo

Se actualizó la experiencia visual de Lebaux para mantener una estética
coherente entre Home, catálogos, navegación, carrito y checkout. El trabajo
también redujo la densidad de información en pantallas pequeñas y corrigió
comportamientos específicos de la navegación mobile.

Este documento registra el estado vigente y complementa las migraciones del
mismo día. En particular, reemplaza la referencia anterior a grillas que
comenzaban siempre con dos columnas.

## Checkout

- Se eliminaron los campos de ubicación de entrega y observaciones.
- `DatosCheckout` conserva únicamente nombre y forma de pago.
- El mensaje final de WhatsApp dejó de incluir información eliminada.
- El selector de forma de pago se presentó como dos tarjetas seleccionables,
  con estados de hover, foco y selección consistentes con la paleta.
- El resumen actualiza el total estimado según contado o tarjeta.

Archivos principales:

- `src/features/checkout/components/CheckoutDialog.tsx`
- `src/features/checkout/lib/order-message.ts`
- `src/features/checkout/types/checkout.ts`

## Catálogos por línea

- Se reemplazó el fondo excesivamente amarillo por el fondo semántico general.
- El encabezado se convirtió en una tarjeta neutra, centrada y de menor peso
  visual.
- Los filtros conservan desplazamiento horizontal en pantallas angostas.
- Se agregó contenido después de la grilla para que la página no termine de
  forma abrupta:
  - beneficios específicos de Herrero y Módena;
  - comparación entre ambas líneas;
  - criterios para elegir;
  - CTA de asesoramiento por WhatsApp.

Archivos principales:

- `src/pages/catalog/CatalogLinePage.tsx`
- `src/pages/catalog/sections/CatalogLineMoreContent.tsx`

## Home

### Hero

- Se renovaron título, texto y acciones para representar la propuesta actual de
  fabricación, configuración y catálogo.
- Se ajustó la composición visual a la nueva jerarquía de la página.

### Beneficios

- Se reescribió el contenido alrededor de un proceso de compra simple.
- Se actualizaron iconos, títulos y descripciones.
- Las tarjetas ahora explican medidas, configuración, precio y acompañamiento.

### Destacados, obras y contenido institucional

- La sección de productos destacados recibió CTAs de catálogo más visibles.
- Se agregó una sección editorial de obras realizadas entre productos y
  contenido institucional, con testimonios y datos mock tipados.
- `Quiénes somos` se reescribió para explicar fabricación, líneas disponibles
  y acompañamiento.
- Se eliminó el bloque redundante “Fabricación propia en Tucumán”.

Archivos principales:

- `src/pages/home/sections/Hero.tsx`
- `src/pages/home/sections/Benefits.tsx`
- `src/pages/home/sections/HomeProductsSection.tsx`
- `src/pages/home/sections/ObrasSection.tsx`
- `src/pages/home/sections/AboutSection.tsx`
- `src/data/mock/beneficios.ts`
- `src/data/mock/obras.ts`
- `src/types/contenido.ts`

## Navegación

### NavigationMenu de escritorio

- `CatalogNavigation` se reconstruyó con la composición recomendada por
  shadcn/Base UI:
  `NavigationMenu → List → Item → Trigger → Content → Link`.
- Inicio, Herrero y Módena comparten la misma estructura.
- Inicio despliega accesos a Portada, Cómo comprar, Productos destacados, Obras
  realizadas y Quiénes somos.
- Herrero y Módena presentan categorías y catálogo completo como items
  uniformes.
- Se retiraron estados activos y animaciones de opacidad forzados que producían
  parpadeos.
- El popup mantiene el fondo grafito también en sus esquinas portaled, sin
  halos claros.

### Navbar y Sheet mobile

- El botón de menú aumentó su área táctil.
- Se agregó un acceso compacto a WhatsApp en la barra mobile.
- La Navbar se oculta al desplazarse hacia abajo y reaparece al subir.
- Cerca del inicio, al abrir el Sheet o al recibir foco, permanece visible.
- El Sheet mobile se reorganizó con encabezado, navegación desplazable y CTA
  fijo.
- El catálogo mobile usa un Accordion táctil con categorías en grilla.
- El scrollbar y el gutter nativos adoptan esquema oscuro solo mientras está
  abierto el Sheet de navegación; otros dialogs y drawers no se alteran.

Archivos principales:

- `src/components/layout/Navbar.tsx`
- `src/components/layout/CatalogNavigation.tsx`
- `src/index.css`

## Footer

- Se redujo el tamaño del logo en mobile.
- Se ajustaron espacios, columnas, mapa y jerarquía para pantallas angostas.
- Desktop conserva la composición amplia previa.

Archivos principales:

- `src/components/layout/Footer.tsx`
- `src/components/layout/Logo.tsx`

## Cards de producto

### CatalogProductCard

- Imagen cuadrada y proporciones más estables.
- Título limitado a dos líneas.
- Precio y precio contado con jerarquía adaptable.
- La descripción aparece desde desktop.
- En mobile se abrevia el contador de medidas, se oculta el badge secundario y
  el CTA usa un texto más corto.

### FeaturedProductCard

- Se adoptó una tarjeta vertical compatible con grillas de varias columnas.
- La descripción, financiación y cantidad de medidas aparecen progresivamente
  cuando existe espacio.
- El precio contado tiene un bloque visual propio.
- Imagen, tipografía y CTA reducen densidad en mobile.

### PromotionProductCard

- Descuento, nombre y precio son la información prioritaria en mobile.
- Categoría, descripción y mensajes secundarios se muestran por breakpoint.
- La altura de imagen cambia con la cantidad de cards visibles.
- Se normalizaron bordes, sombras y CTA con el resto del catálogo.

Archivos principales:

- `src/features/products/components/CatalogProductCard.tsx`
- `src/features/products/components/FeaturedProductCard.tsx`
- `src/features/products/components/PromotionProductCard.tsx`

## Grillas responsive

Se agregó el breakpoint semántico `xs` como token de Tailwind:

```css
--breakpoint-xs: 22.5rem;
```

La progresión vigente es:

| Ancho semántico | Cards visibles |
| --------------- | -------------: |
| Menor que `xs`  |              1 |
| Desde `xs`      |              2 |
| Desde `md`      |              3 |
| Desde `xl`      |              4 |

La misma progresión se aplica a:

- catálogo de línea;
- productos relacionados;
- productos destacados;
- carrusel de promociones;
- skeletons de carga.

No se usan breakpoints arbitrarios expresados en píxeles dentro de estos
componentes. Las dimensiones utilizan la escala de Tailwind y los breakpoints
adicionales se centralizan como tokens en `@theme`. La decisión detallada está
en `docs/2026-08-03-breakpoint-responsive-xs.md`.

## Límites respetados

- Los componentes se componen con primitivos shadcn existentes.
- No se editaron manualmente los archivos oficiales de `src/components/ui`.
- No se agregaron colores hexadecimales en componentes.
- Se conservaron los tokens semánticos de la paleta y la arquitectura por
  features.
- Los cambios de navegación y scrollbar están acotados para no modificar
  CartDrawer, checkout u otros comportamientos similares.

## Validación

Durante el rework se ejecutaron repetidamente:

```bash
npm run build
npm run lint
```

Ambos comandos finalizaron sin errores. También se verificó el formato de los
archivos modificados con Prettier.
