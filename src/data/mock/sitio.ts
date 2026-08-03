import type { ConfiguracionSitio } from "@/types"

/**
 * Configuración global del sitio (Header/Footer). Mock mientras no hay
 * backend/CMS — ver src/services para dónde se reemplazaría por una
 * llamada real. Datos portados de carrito_responsive_actualizado
 * (docs/2026-08-02-migracion-home.md).
 */
export const configuracionSitio: ConfiguracionSitio = {
  nombre: "Lebaux Aberturas",
  nombreLegal: "Lebaux Aberturas",
  descripcion:
    "Fábrica de aberturas de aluminio a medida. Ventanas, puertas y cerramientos de las líneas Herrero y Módena.",
  logo: {
    origen: "/img/logo.png",
    textoAlternativo: "Lebaux Aberturas",
  },
  contacto: {
    direccion: "Av. Alem 1930",
    ciudad: "San Miguel de Tucumán, Tucumán",
    telefonoWhatsapp: "5493816358879",
    horarios: [
      { etiqueta: "Lunes a viernes", valor: "8:00 a 17:00 hs" },
      { etiqueta: "Sábados", valor: "9:00 a 13:30 hs" },
    ],
    redesSociales: [
      {
        plataforma: "facebook",
        url: "https://www.facebook.com/lebauxtucuman",
        etiqueta: "Facebook",
      },
      {
        plataforma: "instagram",
        url: "https://www.instagram.com/lebauxaberturastuc/?hl=es",
        etiqueta: "Instagram",
      },
    ],
    urlMapaEmbebido:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.5475268834057!2d-65.22713522534333!3d-26.854340190765875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225b8f15d6cfa5%3A0xfbddf46f3a0e1d8c!2sAv.%20Alem%201930%2C%20T4000%20San%20Miguel%20de%20Tucum%C3%A1n%2C%20Tucum%C3%A1n!5e0!3m2!1ses!2sar!4v1782484501119!5m2!1ses!2sar",
  },
}
