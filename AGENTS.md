# AGENTS.md

Guía para cualquier IA (Claude, Copilot, Cursor, etc.) que trabaje en este repositorio.
Leer esto antes de tocar código. El historial de decisiones está en `docs/`.

## Qué es este proyecto

Lebaux — tienda online (carrito de compras) de carritos de aluminio para ventas.
Stack: React 19 + Vite + TypeScript + Tailwind CSS v4 + shadcn/ui + Zustand.

## Reglas no negociables

1. **Componentes de UI = shadcn/ui, exclusivamente.**
   No se escriben primitivos de UI a mano (botones, inputs, dialogs, etc.) ni se
   instalan librerías de componentes alternativas. Si un componente de shadcn no
   está instalado, se agrega con la CLI:

   ```bash
   npx shadcn@latest add <componente>
   ```

   Un agente de IA en este entorno puede no tener acceso de red a `ui.shadcn.com`
   para ejecutar la CLI. En ese caso: **no inventar el componente a mano** — avisar
   al usuario el comando exacto a correr y esperar confirmación.

2. **Arquitectura de carpetas: Screaming Architecture.**
   La carpeta `src/features/` es la que "grita" de qué se trata la app (carrito,
   productos, checkout), no la tecnología usada. Ver detalle abajo.

3. **Cada cambio de arquitectura, paleta, o decisión técnica importante se
   documenta** en `docs/` con un archivo markdown nuevo (no se edita el
   historial existente), y se referencia acá si cambia una regla general.

4. **Paleta de colores:** ver `docs/2026-08-02-paleta-de-colores.md`. Las
   variables viven en `src/index.css` (`:root` / `.dark`) en formato OKLCH y se
   consumen solo vía clases de Tailwind (`bg-primary`, `text-success`, etc.),
   nunca hex hardcodeado en componentes.

## Estructura de carpetas (Screaming Architecture)

```
src/
├── app/                 # composition root: App.tsx, providers, wiring
├── features/            # ⭐ el corazón screaming — una carpeta por capacidad de negocio
│   ├── cart/             # carrito: agregar/quitar, totales, persistencia
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── store/         # estado de Zustand del carrito
│   │   ├── services/
│   │   └── types/
│   ├── products/         # catálogo, filtros, detalle de producto
│   ├── checkout/         # flujo de compra
│   └── theme/             # toggle claro/oscuro
├── pages/                # pantallas de ruta, componen features entre sí
│   └── home/
│       └── sections/      # secciones propias de ESA página (no reutilizables)
├── routes/               # definición de rutas
├── components/
│   ├── ui/                # ⚠️ SOLO shadcn CLI. No editar a mano, no crear acá.
│   └── layout/             # shell de la app: Header, Footer, RootLayout
├── hooks/                # hooks genéricos, no atados a un feature
├── lib/                  # utils genéricas (cn, etc.)
├── services/              # cliente http base / config de API
├── store/                 # store global (si aplica, fuera de un feature)
├── types/                 # ⭐ tipos de dominio globales (catálogo, carrito, sitio)
├── data/mock/             # datos mock mientras no hay backend
└── assets/
```

### Regla para decidir dónde va un archivo nuevo

- ¿Es un primitivo de UI genérico (botón, input, card)? → `components/ui`, vía shadcn CLI.
- ¿Es parte del "esqueleto" de la app (header, footer, nav)? → `components/layout`.
- ¿Pertenece a una lógica de negocio concreta (carrito, productos, checkout)? → `features/<esa-cosa>`.
- ¿Es una sección visual que solo se usa en una página puntual? → `pages/<esa-página>/sections`.
- ¿Se reutiliza en más de un feature? → si es UI pura, `components/`; si es lógica, evaluar
  moverlo a `features/` compartido o a `lib/` según corresponda. No hay carpeta
  automática "shared" — se crea cuando aparece la segunda reutilización, no antes.
- ¿Es un tipo/interfaz de dominio (catálogo, carrito, sitio) usado por más de
  un feature o página? → `src/types` (un archivo por dominio + `index.ts`
  barrel). ¿Es un tipo exclusivo de un solo componente/hook? → se queda
  junto a ese archivo, no va a `src/types`.

## Convenciones de código

- Alias de imports: `@/*` → `src/*` (definido en `tsconfig.json` y `vite.config.ts`). No usar rutas relativas largas (`../../../`).
- `components.json` de shadcn no se toca: los alias de `ui`, `lib`, `hooks` apuntan
  a las rutas de siempre (`@/components/ui`, `@/lib`, `@/hooks`) a propósito, para
  que la CLI de shadcn siga funcionando sin reconfigurar nada.
- Cada componente de layout/feature lleva un comentario corto arriba explicando
  su propósito si no es autoevidente por el nombre.

## Estado del proyecto (ir actualizando)

- [x] Paleta de colores definida (logo → ámbar/gris + semánticos).
- [x] Estructura de carpetas Screaming Architecture.
- [x] Layout genérico de prueba (Header/Footer/RootLayout + HomePage de test).
- [x] Router (`react-router-dom` v7, `src/routes/router.tsx`).
- [x] Tipos globales del catálogo/carrito/sitio en `src/types` (ver
      `docs/2026-08-02-tipos-globales.md`).
- [x] Migración parcial de Header/Footer/Home (Hero, Benefits, Obras,
      About) desde `carrito_responsive_actualizado`, ver
      `docs/2026-08-02-migracion-home.md`. Header simplificado (sin
      mega-menú ni drawer mobile todavía), Footer sin columna de
      categorías — quedan para cuando se migre `features/products`.
- [x] Componentes `sheet`, `card`, `carousel`, `skeleton` y `badge` de shadcn
      instalados mediante la CLI.
- [x] Cards de ofertas y destacados de la Home migradas a
      `features/products` (ver `docs/2026-08-03-migracion-cards-home.md`).
- [ ] Conectar el menú mobile del Header con el `sheet` ya instalado.
- [ ] Completar `features/products`: líneas, categorías, páginas de catálogo,
      detalle y configurador desde `carrito_responsive_actualizado`.
- [ ] Store del carrito (Zustand) en `features/cart/store`.
- [ ] Conexión a datos reales (hoy `data/mock`).

Cuando se complete un ítem o se agregue uno nuevo, actualizar esta lista y sumar
un archivo en `docs/` si la decisión lo amerita.
