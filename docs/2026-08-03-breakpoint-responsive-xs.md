# Breakpoint responsive `xs`

Para distinguir dispositivos ultraestrechos de móviles convencionales sin
hardcodear píxeles en los componentes, se agregó el token
`--breakpoint-xs: 22.5rem` en `src/index.css`.

Las grillas de productos consumen la variante semántica `xs:` y continúan con
los breakpoints estándar de Tailwind (`sm`, `md`, `xl`). Las medidas de
componentes deben usar la escala de Tailwind o tokens centralizados; no se
agregan variantes arbitrarias expresadas en píxeles.
