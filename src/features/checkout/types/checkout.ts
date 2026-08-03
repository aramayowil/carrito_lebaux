export type FormaPago = "contado" | "tarjeta"

export interface DatosCheckout {
  nombre: string
  formaPago: FormaPago
}
