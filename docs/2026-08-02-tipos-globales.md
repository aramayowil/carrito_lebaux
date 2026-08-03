# Tipos globales del proyecto

**Fecha:** 2026-08-02
**Estado:** aplicado en `src/types`

## Dónde viven

Un solo lugar centralizado por dominio: `src/types/`, con un archivo por
dominio y un `index.ts` que reexporta todo.

```
src/types/
├── catalogo.ts      # Línea, Producto, precios, opciones configurables
├── carrito.ts       # selección del cliente, desglose de precio, ítem de carrito
├── contenido.ts      # Obra, Beneficio (contenido editorial de marketing)
├── sitio.ts           # ConfiguracionSitio, contacto, redes sociales
├── ejemplo-producto-configurado.ts  # fixture ejecutable de un ItemCarrito
└── index.ts           # barrel: export * de los 4 archivos de dominio
```

Se descartaron dos alternativas antes de elegir esta:

1. **Repartir por feature** (`features/cart/types`, `features/products/types`,
   etc.). Se descartó porque `catalogo.ts` y `carrito.ts` están fuertemente
   acoplados (`carrito.ts` importa tipos de `catalogo.ts`) y `contenido.ts` /
   `sitio.ts` no pertenecen a ningún feature de negocio — viven en el
   Header/Footer y en secciones de marketing.
2. **`/types` en la raíz del repo** (fuera de `src`). Ya existía una carpeta
   vacía ahí; se eliminó a favor de `src/types` para que todo el código de
   la app quede bajo `src/` y se pueda importar con el alias `@/types`
   igual que el resto (`@/components`, `@/lib`, etc.).

Regla para tipos nuevos: si un tipo es de dominio y lo usa más de un
feature/página, va a `src/types`. Si es exclusivo de un componente o hook
puntual, se queda junto a ese archivo (no infla el barrel global).

## Import

```ts
import type { Producto, ItemCarrito } from "@/types";
```

en vez de apuntar al archivo puntual (`@/types/catalogo`, `@/types/carrito`).

## Qué cambió respecto a la primera versión de estos tipos

La primera versión (pegada directamente en el chat, sin archivo) modelaba
el catálogo con **cuatro niveles** y una entidad intermedia extra:

```
Línea → Tipología → Categoría → Producto
```

con `LineaProducto`, `TipologiaProducto` y `CategoriaProducto` como
entidades independientes (cada una con `id`, `slug`, `activa`, `orden`,
timestamps, etc.), y `Producto` referenciándolas por id (`lineaId`,
`tipologiaId`, `categoriaId`).

La versión corregida y aplicada acá simplifica a **dos niveles reales**:

```
Línea → Producto
```

y reemplaza la cadena `Tipología → Categoría` por dos campos planos en
`Producto`:

- `categoria`: qué es el producto (`"ventana" | "puerta" | "banderola" | ...`).
- `tipoApertura`: cómo funciona (`"corrediza" | "de-abrir" | "batiente" | ...`).

### Por qué

- El catálogo hoy es fijo y lo cura un desarrollador, no un admin dinámico.
  No hace falta una entidad con CRUD (`id`, `activa`, `orden`,
  `creadoEn`/`actualizadoEn`) para algo que en la práctica es una lista
  cerrada de valores — un *union type* de TypeScript ya da autocompletado y
  detecta typos en compilación, sin el costo de mantener tablas intermedias.
- `Tipología` como entidad separada obligaba a modelar la relación
  `Línea → Tipología → Categoría` completa incluso cuando en la UI real solo
  se necesita filtrar productos por "qué es" y "cómo abre". Dos campos
  planos (`categoria`, `tipoApertura`) cubren esos filtros sin la
  indirección de tres tablas.
- Slugs de accesorio/color/vidrio (`SlugAccesorio`, `SlugColorPerfil`,
  `SlugOpcionVidrio`) también pasaron a ser *union types* cerrados en vez de
  `string`, por la misma razón.

### Si en el futuro un admin necesita crear líneas/categorías dinámicamente

Estas uniones (`SlugLineaProducto`, `CategoriaProducto`, `TipoApertura`,
los slugs de opciones) vuelven a abrirse a `string`, y recién ahí tendría
sentido reintroducir entidades tipo `LineaProducto`/`TipologiaProducto`
con `id`/`activa`/`orden` propios. No hacerlo antes de que esa necesidad
exista de verdad (YAGNI).

### Otros cambios menores

- `ImagenProducto` perdió el campo `orden` (el orden de las imágenes de un
  producto es simplemente el orden del array `imagenes`).
- `ColorPerfil` ya no tiene `id`: se identifica solo por `slug` (el color es
  una propiedad transversal del perfil, no depende del producto).
- `Producto.disponible` reemplaza al viejo par `disponible` + `activo`: un
  producto no publicado directamente no debería estar en el array de
  productos que consume el front (se filtra antes, en el origen de datos).
- `ItemCarrito.seleccion` pasó de guardar ids sueltos por campo
  (`SeleccionProducto` con `colorId`/`vidrioId`) a guardar **slugs
  tipados** (`colorSlug`, `vidrioSlug`, `accesoriosSlug`) — consistente con
  que el catálogo ahora identifica esas opciones por slug, no por id
  arbitrario.

## Ejemplo completo

`src/types/ejemplo-producto-configurado.ts` tiene un `ItemCarrito` real
(no solo comentado) para usar como fixture en tests o Storybook mientras no
hay backend. Cada interfaz en `catalogo.ts`, `carrito.ts`, `contenido.ts` y
`sitio.ts` también tiene su propio bloque `@example` en el JSDoc, con al
menos un caso de uso concreto (y casos límite como `vidrioSlug: null` o
`consultarPrecio: true` donde aplica).

## Validado con

```bash
npx tsc -b
```

sin errores, antes de entregar.
