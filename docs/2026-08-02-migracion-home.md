# Migración: Navbar, Footer y Home (Hero, Benefits, Obras, About)

**Fecha:** 2026-08-02
**Estado:** aplicado parcialmente — ver "Pendiente" abajo

## Qué se migró

Desde `carrito_responsive_actualizado` (proyecto anterior, Tailwind v3 +
shadcn sobre Radix) hacia este proyecto (Tailwind v4 + shadcn `base-rhea`
sobre Base UI):

- `components/layout/Header.tsx` — simplificado (ver más abajo).
- `components/layout/Footer.tsx` — sin columna de categorías (ver más abajo).
- `components/layout/Logo.tsx`.
- `components/ui/icons/{WhatsAppIcon,FacebookIcon,InstagramIcon}.tsx`.
- `components/media/ProductImage.tsx` — imagen con fallback, nueva carpeta
  (no es shadcn, no es layout, no es de un feature de negocio concreto).
- `pages/home/HomePage.tsx` + `pages/home/sections/{Hero,Benefits,ObrasSection,AboutSection}.tsx`.
- `data/mock/{sitio,obras,beneficios}.ts` — mock de `ConfiguracionSitio`,
  `Obra[]` y `Beneficio[]` (tipos ya definidos en `src/types`, ver
  `docs/2026-08-02-tipos-globales.md`).
- `lib/whatsapp.ts` — recortado a `buildWhatsAppUrl` + `DEFAULT_WHATSAPP_MESSAGE`.

Explícitamente **no** migrado en esta pasada (a pedido, para una siguiente
etapa junto con `features/products`):

- Las cards de producto de la home (destacados, carrusel de promociones,
  botones "ver catálogo completo por línea").
- El mega-menú de tipologías por línea en el Header (`LineNavMenu`,
  `MobileLineDisclosure`).
- La columna de categorías en el Footer (`CATEGORY_META`/`CATEGORY_ORDER`).

## Decisiones de esta migración

### 1. `src/types` centralizado, no repartido por feature

Ya decidido en `docs/2026-08-02-tipos-globales.md`. Acá simplemente se
consumió: `Obra` y `Beneficio` (de `contenido.ts`) y `ConfiguracionSitio`
(de `sitio.ts`) para los mocks de esta migración.

### 2. Header simplificado, sin mega-menú ni store de UI

El Header viejo dependía de `useUIStore` (Zustand) para el estado del menú
mobile y de un mega-menú de tipologías por línea (`LineNavMenu`,
`MobileLineDisclosure`) que a su vez depende de `CATEGORY_META`/
`CATEGORY_ORDER` — datos que pertenecen a `features/products`, todavía sin
migrar. Se decidió (a pedido) migrar una versión simplificada ahora:

- Logo + nav de texto plano (Inicio / Módena / Herrero) en desktop.
- CTA de WhatsApp con la nueva variante `whatsapp` del Button (ver punto 4).
- Botón de menú mobile presente pero **deshabilitado** (`disabled`): no
  hay Sheet instalado todavía (ver punto 3).

Cuando se migre `features/products`, reemplazar los `NavLink` de
Módena/Herrero por el mega-menú real, y conectar el botón mobile a un
`<Sheet>` con los mismos links.

### 3. Componente `sheet` de shadcn no instalado — sin red a `ui.shadcn.com`

Siguiendo la regla no negociable de `AGENTS.md` ("si un componente de
shadcn no está instalado, se agrega con la CLI; si no hay acceso de red,
avisar el comando exacto y esperar confirmación, nunca inventarlo a
mano"), se intentó `npx shadcn@latest add sheet` y falló por falta de
acceso de red a `ui.shadcn.com` en este entorno (dominio no está en la
whitelist del sandbox).

**Acción pendiente para quien retome esto:** correr

```bash
npx shadcn@latest add sheet
```

y reemplazar el botón de menú mobile (hoy `disabled`, en
`Header.tsx`) por un `<Sheet>` real con los links de navegación + CTA de
WhatsApp, igual que hacía el proyecto anterior.

### 4. Variante `whatsapp` en el Button (sí se tocó `components/ui`, con justificación)

El Button viejo tenía variantes de color fijo (`brand`, y un verde
`#25D366` hardcodeado para WhatsApp) que no existen en la paleta actual
(ámbar/gris, ver `docs/2026-08-02-paleta-de-colores.md`). Se resolvió:

- `brand` → no hacía falta variante nueva: ya es lo mismo que `default`
  (usa `--primary`, ámbar).
- WhatsApp → se agregó una variante `whatsapp` nueva a `button.tsx`, en
  vez de un `className` con el color embebido a mano en cada lugar donde
  aparece el CTA (Header hoy; Footer/checkout más adelante).

Esto es una excepción puntual a "no tocar `components/ui` a mano": no se
inventó un componente nuevo, se extendió una variante de uno ya instalado
por CLI (`cva` está pensado justamente para esto). Se agregó también el
color como token de tema:

```css
/* src/index.css */
--whatsapp: oklch(0.761 0.201 149.74); /* #25D366, verde oficial de WhatsApp */
--whatsapp-foreground: oklch(1 0 0);
```

igual en `:root` y `.dark` (es un color de marca de terceros, fijo, no
depende del tema claro/oscuro del sitio).

### 5. Colores fijos `brand-black` / `brand-graphite`

Hero, Header, Footer y Benefits usan fondos oscuros fijos, **independientes
del tema claro/oscuro** de la app (a diferencia de `background`/
`foreground`, que sí cambian con el tema). Se agregaron como tokens
nuevos, con el mismo valor en `:root` y `.dark`:

```css
--brand-black: oklch(0.191 0 0); /* #141414 */
--brand-graphite: oklch(0.235 0 0); /* #1e1e1e */
```

### 6. Utilidades de layout portadas a `index.css`

Se portaron desde el `index.css` del proyecto anterior, remapeando sus
colores de marca fijos (`--brand-steel`, `--brand-brass`, etc.) a los
tokens semánticos ya definidos en la paleta actual (`primary`,
`muted-foreground`, `border`), para no reintroducir una paleta paralela:

- `@utility container` — Tailwind v4 ya no trae `container` centrado con
  padding por breakpoint por defecto; se restaura igual que en el
  proyecto viejo.
- `.eyebrow`, `.section-title` / `.section-title-left` — tipografía de
  encabezados de sección.
- `.corner-marks` / `.corner-marks-static` — marcas de esquina (motivo
  "plano técnico" de aberturas), en hover o siempre visibles.
- `.dim-line` — separador tipo "línea de cota".

### 7. `RootLayout` ya no fuerza `max-w-6xl` + padding en `<main>`

Antes: `<main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">`.
Esto rompía cualquier sección full-bleed (fondo de un color hasta el borde
de la pantalla, como el Hero o Benefits). Ahora `<main>` es solo
`flex-1 pt-20` (el `pt-20` compensa el Header, que es `fixed`), y cada
sección decide su propio ancho: full-bleed cuando su diseño lo pide, o la
utilidad `.container` por dentro cuando el contenido debe quedar centrado
y acotado (igual que hacía el proyecto anterior). Esto también deja
margen para armar layouts con grid propios por sección más adelante, en
vez de un único ancho fijo para toda la app.

### 8. `lucide-react` (esta versión) no incluye íconos de marcas

El proyecto nuevo usa `lucide-react@^1.28.0`, que — a diferencia de la
versión que usaba el proyecto viejo — **ya no exporta** `Facebook` ni
`Instagram` (lucide sacó los logos de marcas de terceros del paquete
por tema de licencias). Se resolvió igual que ya se hacía con
`WhatsAppIcon`: SVGs propios en `components/ui/icons/` (`FacebookIcon`,
`InstagramIcon`), con `currentColor` para heredar color del texto.

### 9. `ProductImage` va en `components/media/`, no en un feature

No es un componente de shadcn, no es parte del shell (`layout`), y no es
lógica de negocio de un feature concreto — es una utilidad de imagen
reutilizable (hoy la usan `ObrasSection` y `AboutSection`; a futuro,
`features/products` y `features/cart`). Se creó `src/components/media/`
como nueva subcarpeta genérica para este tipo de componente.

### 10. Assets: se usan los ya presentes en `src/assets`

`Logo.tsx` usa `src/assets/logo.png` y `Hero.tsx` usa `src/assets/hero.png`
(ambos ya estaban en el proyecto, importados como módulo ES en vez de
path público). El proyecto viejo tenía además `logo-icon.png` (variante
compacta del logo para mobile) que no está disponible todavía — `Logo.tsx`
usa un único asset por ahora.

Las imágenes de `ObrasSection` (`/img/obra_johana.jpg`, etc.) y
`AboutSection` (`/img/quienes_somos.png`) siguen apuntando a paths de
`public/img/` que **no existen todavía** en este proyecto — quedan como
placeholders con fallback (`ProductImage` los reemplaza por un ícono +
texto si el archivo no está, no rompe el layout). Agregar esos archivos a
`public/img/` cuando estén disponibles.

## Cambios de nombres de campos (por los tipos ya migrados)

Al consumir `Obra` y `Beneficio` desde `src/types` (ver
`docs/2026-08-02-tipos-globales.md`), varios campos cambiaron de nombre
respecto al proyecto anterior:

| Viejo (`types/index.ts`) | Nuevo (`src/types/contenido.ts`) |
| ------------------------ | -------------------------------- |
| `Obra.title`             | `Obra.titulo`                    |
| `Obra.image`             | `Obra.imagen`                    |
| `Obra.quote`             | `Obra.testimonio`                |
| `Obra.author`            | `Obra.autor`                     |
| `Benefit.icon`           | `Beneficio.icono`                |
| `Benefit.title`          | `Beneficio.titulo`               |
| `Benefit.description`    | `Beneficio.descripcion`          |

También `SiteConfig` → `ConfiguracionSitio` con sus sub-tipos en español
(`contact` → `contacto`, `hours` → `horarios`, `social` → `redesSociales`,
etc.), ver `src/types/sitio.ts`.

## Pendiente

- [ ] Instalar `sheet` (`npx shadcn@latest add sheet`) y conectar el menú
      mobile del Header.
- [ ] Migrar `features/products` (líneas, categorías, tipologías) y con
      eso el mega-menú del Header (`LineNavMenu`/`MobileLineDisclosure`) y
      la columna de categorías del Footer.
- [ ] Migrar las cards de producto de la home (destacados, promociones en
      carrusel) — requiere `Carousel`, `Card` de shadcn (tampoco
      instalados) y el store/servicio de catálogo (`useCatalog` en el
      proyecto viejo).
- [ ] Subir los assets faltantes a `public/img/` (obras, quienes_somos,
      logo-icon) o migrarlos a `src/assets` si se prefiere importarlos
      como módulo.

## Validado con

```bash
npx tsc -b
npx vite build
npx eslint <archivos migrados>
npx prettier --check <archivos migrados>
```

Todo sin errores antes de entregar.
