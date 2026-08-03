export type FormaPago = "contado" | "tarjeta"

export interface DatosCheckout {
  nombre: string
  localidad: string
  formaPago: FormaPago
  notas: string
}
