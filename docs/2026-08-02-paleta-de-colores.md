# Paleta de colores

**Fecha:** 2026-08-02
**Estado:** aplicado en `src/index.css`

## Origen

Colores extraídos directamente del logo (`logo_recortado.png`) con Python/PIL:

| Color | Hex | Uso |
|---|---|---|
| Ámbar | `#FDC97D` | Color de marca / primario |
| Gris | `#919596` | Neutro / estructural |

## Decisiones

- **Primario (`--primary`):** ámbar 500 (`#F5A83D`) en claro, ámbar 300
  (`#FDC97D`, el tono exacto del logo) en oscuro — en fondo oscuro el tono
  claro del logo tiene mejor contraste. Texto sobre primario: gris casi negro
  (`--primary-foreground`), no blanco, porque el ámbar es un color claro.
- **Secundario / muted / border:** derivados del gris del logo.
- **Accent:** tinte ámbar suave (100 en claro / 900 en oscuro), para hover y
  filas destacadas — no se usa el primario para esto porque compite visualmente
  con los CTAs.
- **Semánticos agregados** (no vienen por defecto en shadcn, se sumaron a mano):
  - `--success` verde `#16A34A` → producto en stock, confirmaciones.
  - `--warning` naranja `#D97706` → últimas unidades, avisos.
  - `--destructive` rojo `#DC2626` (ya existía en el template) → sin stock, errores.
  - `--info` azul `#2563EB` → enlaces, información neutral.

  Cada uno tiene su `-foreground` y está registrado en el bloque `@theme inline`
  de `src/index.css`, así que se puede usar como cualquier color de Tailwind:
  `bg-success`, `text-warning`, `border-info/50`, etc.
- **Ring de foco (`--ring`):** usa el color de marca (ámbar) en vez de gris, para
  que el foco tenga identidad.
- Todos los valores están en **OKLCH**, convertidos desde los hex originales con
  la librería `coloraide`, para mantener el mismo formato que ya usaba la
  plantilla de shadcn (`base-rhea`) y que el theming claro/oscuro sea consistente.

## Cómo se usa

Nunca hardcodear hex en componentes. Siempre vía clases de Tailwind que resuelven
a las variables CSS: `bg-primary`, `text-muted-foreground`, `bg-success/10`, etc.
Si hace falta un tono que no está en la paleta, se agrega acá primero (con su
conversión a OKLCH) y después se consume — no al revés.
