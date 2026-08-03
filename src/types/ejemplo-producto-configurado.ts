/**
 * Ejemplo ejecutable de un `ItemCarrito` completo.
 *
 * No es un tipo: es una constante real que satisface la interfaz, útil
 * para tests, Storybook, o como fixture rápido mientras no hay backend
 * (ver también `src/data/mock`). Si `ItemCarrito` cambia de forma, este
 * archivo deja de compilar y avisa que hay que actualizar el ejemplo.
 */

import type { ItemCarrito } from "./carrito";

export const ejemploItemCarrito: ItemCarrito = {
  id: "item-001",
  producto: {
    id: "herrero-01",
    slug: "ventana-corrediza-herrero",
    nombre: "Ventana Corrediza Línea Herrero",
    linea: "herrero",
    categoria: "ventana",
    imagen: "/img/v_entero_H.jpg",
  },
  seleccion: {
    medidaId: "size-120x100",
    colorSlug: "negro",
    vidrioSlug: "comun-4mm",
    accesoriosSlug: ["mosquitero", "tapajunta"],
  },
  cantidad: 1,
  precios: {
    moneda: "ARS",
    precioBase: 110000,
    adicionalMedida: 0,
    adicionalColor: 0,
    adicionalVidrio: 0,
    adicionalAccesorios: 23000,
    porcentajeDescuento: 0,
    precioUnitarioContado: 133000,
    precioUnitarioTarjeta: 172900,
    totalContado: 133000,
    totalTarjeta: 172900,
  },
};
