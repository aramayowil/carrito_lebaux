# Panel admin y store de contenido

**Fecha:** 2026-08-04
**Estado:** aplicado (persistencia en `localStorage`; Supabase queda pendiente)

## Alcance funcional

Se agregó un panel de administración en `/admin` para cargar y editar todo el
contenido que muestra el sitio público, sin tocar código:

1. **Productos**: alta y edición completa (datos generales, fotos, precio de
   lista + descuento por contado, medidas, color/vidrio/accesorios,
   destacado/disponible) y borrado.
2. **Líneas** (Herrero / Módena): edición de nombre, subtítulo, descripción e
   imagen de portada.
3. **Obras**: alta, edición y borrado de los proyectos realizados que se
   muestran en la Home.
4. **Beneficios**: alta, edición y borrado de los bloques de la sección
   "Elegí, configurá y pedí".
5. **Datos del sitio**: contacto, WhatsApp, horarios, redes sociales y URL del
   mapa.
6. **Login simple** (`admin` / `lebaux2026`, hardcodeado) para no dejar la
   carga abierta a cualquiera mientras se prueba.

## Decisión: `localStorage` ahora, Supabase después

El proyecto no tiene backend (`data/mock` era la única fuente de datos). En
vez de escribir un admin que edite archivos `.ts` a mano, se creó un **store
de contenido único** (`src/store/use-content-store.ts`, Zustand + `persist`,
mismo patrón que `features/cart/store/use-cart-store.ts`) que:

- se siembra una única vez con los datos de `data/mock`,
- es la fuente de verdad para todo el sitio público,
- expone las acciones de mutación que usa el admin.

Esto es explícitamente una etapa intermedia. Cuando se conecte Supabase, el
único archivo a reescribir es `use-content-store.ts` (las acciones pasan a
ser `async` y pegarle a la base en vez de a `set()`); los componentes que
consumen el store vía `useContentStore(selector)` no cambian.

Mismo criterio para las fotos: no hay Storage todavía, así que
`features/admin/lib/image-file.ts` redimensiona cada imagen subida con
`<canvas>` (máx. 1600px, JPEG 0.82) y la guarda como `dataURL` dentro del
producto/obra/línea. Es una solución de corto plazo para no romper el límite
de `localStorage` (~5-10MB); al migrar a Supabase Storage esa función se
reemplaza por una subida real y el resto del formulario no cambia.

## Por qué el sitio público ahora lee del store y no de `data/mock`

Para que el admin sirva de algo, sus cambios tienen que verse reflejados sin
build ni deploy. Se migraron todos los consumidores de `data/mock` a
`useContentStore`:

`components/layout/{Footer,Logo,CatalogNavigation,Navbar}.tsx`,
`pages/home/{HomePage,sections/Benefits,sections/ObrasSection,sections/Hero}.tsx`,
`pages/catalog/{CatalogLinePage,sections/CatalogLineMoreContent}.tsx`,
`pages/product/ProductDetailPage.tsx`, `features/checkout/components/CheckoutDialog.tsx`,
`features/products/components/ProductConfigurator.tsx`.

`src/lib/whatsapp.ts` dejó de leer `configuracionSitio` directamente (es un
`lib/` puro, no un hook) y ahora expone `useWhatsappPhone()`; cada componente
que arma un link de WhatsApp lo llama y pasa el teléfono a `buildWhatsAppUrl`.

`data/mock/*` no se borró: sigue siendo el *seed* inicial del store y el
`Estado inicial` al que vuelve `restaurarDatosDePrueba()`.

## Por qué las líneas no se crean dinámicamente

`SlugLineaProducto` (`"herrero" | "modena"`) y los slugs de color, vidrio y
accesorio son uniones cerradas a propósito (ver comentarios en
`src/types/catalogo.ts`). El admin puede **editar** las líneas existentes y
elegir/tarifar qué colores, vidrios y accesorios aplican a cada producto, pero
no puede crear una línea o una opción nueva desde la UI — eso implica abrir
esas uniones a `string` en los tipos, con impacto en varios componentes del
storefront (selects, badges, filtros). Queda anotado como decisión pendiente,
no como limitación accidental.

## Arquitectura aplicada

- `src/store/use-content-store.ts`: store global de contenido (fuera de un
  feature, por eso vive en `src/store/` y no en `features/admin/store/`: lo
  consumen tanto el sitio público como el admin).
- `src/features/admin/`:
  - `store/use-admin-auth-store.ts`: sesión de admin (Zustand + persist).
  - `lib/`: `slugify.ts`, `image-file.ts`, `opciones-catalogo.ts` (catálogo
    maestro de color/vidrio/accesorio), `producto-factory.ts`.
  - `components/`: `AdminShell` (layout), `RequireAdminAuth` (guarda de
    ruta), `ProductForm`, `ImageUploadField`, `ConfirmDeleteDialog`.
- `src/pages/admin/`: `AdminLoginPage`, `AdminDashboardPage`,
  `AdminProductsPage`, `AdminProductFormPage`, `AdminLinesPage`,
  `AdminObrasPage`, `AdminBeneficiosPage`, `AdminSitePage`.
- `src/routes/router.tsx`: `/admin/login` público + `/admin/*` protegido por
  `RequireAdminAuth`, con `lazy` en todas las rutas nuevas.

## shadcn/ui

No se agregó ningún componente nuevo. El panel se armó combinando los
primitivos ya instalados (`accordion`, `alert-dialog`, `dialog`, `sheet`,
`select`, `checkbox`, `card`, `badge`, `input`, `label`, `textarea`,
`button`, `separator`). Donde faltaría un primitivo dedicado (`table` para
listados, `switch` para toggles) se optó deliberadamente por reutilizar
componentes ya instalados (listas con `Card`, toggles con `Checkbox`) en vez
de instalar componentes nuevos sin poder correr `npx shadcn@latest add` en
este entorno (sin acceso de red). Si se quiere una tabla real o switches,
correr:

```bash
npx shadcn@latest add table switch
```

## Pendiente

- Conectar Supabase (datos + Storage) reemplazando `use-content-store.ts` y
  `image-file.ts` — ver ítem "Conexión a datos reales" en `AGENTS.md`.
- Autenticación real (Supabase Auth) en vez de usuario/contraseña
  hardcodeados en `use-admin-auth-store.ts`.
- Si se necesita crear líneas/colores/vidrios/accesorios nuevos desde el
  admin, abrir las uniones cerradas correspondientes en `src/types/catalogo.ts`.
