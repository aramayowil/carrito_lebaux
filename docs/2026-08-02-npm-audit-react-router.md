# npm audit: falso positivo en react-router (GHSA-qwww-vcr4-c8h2)

**Fecha:** 2026-08-02
**Estado:** revisado, sin acción — documentado para no repetir el análisis

## El aviso

`npm audit` marca `react-router` / `react-router-dom` como vulnerabilidad alta:
`GHSA-qwww-vcr4-c8h2` — "RSC Mode CSRF Bypass Allows Action Execution Before
400 Response", rango reportado 7.12.0 - 8.2.0.

## Por qué no se toca nada

1. **Ya estamos en la versión parcheada.** El advisory oficial (página del
   propio repo `remix-run/react-router`, no solo la entrada genérica que lee
   `npm audit`) especifica dos rangos con fix independiente:
   - `>=7.12.0 <7.18.2` → arreglado en **7.18.2**
   - `>=8.0.0 <8.3.0` → arreglado en 8.3.0

   Este proyecto tiene `react-router-dom` fijado en `7.18.2` en
   `package-lock.json` (ver `docs/2026-08-02-router.md`) — ya es la versión
   con el fix. La base de datos que consulta `npm audit` parece no reflejar
   ese corte fino dentro de la rama 7.x y reporta el rango completo como
   vulnerable.

2. **No aplica a este proyecto de todas formas.** El advisory aclara que solo
   afecta a apps que usan las **RSC APIs `unstable_`** (React Server
   Components / Framework Mode) de react-router. Acá usamos
   `createBrowserRouter` en un SPA client-side puro — no hay RSC ni acciones
   de servidor, así que no hay superficie de ataque aunque no estuviéramos
   parcheados.

3. **No correr `npm audit fix --force` en este caso.** La resolución que
   propone (`react-router-dom@7.11.0` al momento de este análisis) es un
   *downgrade* a una versión más vieja y más vulnerable que la actual —
   típico falso arreglo de `--force` cuando resuelve mal el árbol de deps.

## Si en el futuro se quiere migrar a react-router v8

Es un breaking change real, no un patch: en v8 el paquete `react-router-dom`
se elimina (hay que importar `RouterProvider`/`HydratedRouter` desde
`react-router/dom` y todo lo demás desde `react-router`), y pide Node 22+.
Vite ya cumple el requisito (v8+). Si se decide migrar, hacerlo como tarea
propia — revisar Node, actualizar imports, correr `tsc -b` y `vite build`
completos — no como resultado de un `audit fix`.
