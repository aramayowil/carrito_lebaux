/**
 * Manejo de imágenes subidas desde el admin — CARRITO LEBAUX
 *
 * Hoy no hay backend ni storage (Supabase Storage vendría después, ver
 * AGENTS.md). Mientras tanto, cada imagen subida se redimensiona con
 * `<canvas>` y se guarda como dataURL (base64) directamente en el
 * `Producto`/`Obra`/etc., persistido por Zustand en localStorage.
 *
 * El resize es importante: localStorage tiene un límite de unos 5-10MB por
 * origen, y una foto de celular sin comprimir puede pesar varios MB. Bajar
 * todo a un máximo de 1600px de ancho con calidad JPEG 0.82 mantiene el
 * catálogo liviano sin verse pixelado en el sitio.
 */

const ANCHO_MAXIMO_PX = 1600
const CALIDAD_JPEG = 0.82

/** Lee un archivo de imagen y devuelve un dataURL redimensionado/comprimido. */
export function archivoAImagenComprimida(archivo: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const lector = new FileReader()

    lector.onerror = () => reject(new Error("No se pudo leer el archivo."))
    lector.onload = () => {
      const imagen = new Image()

      imagen.onerror = () =>
        reject(new Error("El archivo no es una imagen válida."))
      imagen.onload = () => {
        const escala = Math.min(1, ANCHO_MAXIMO_PX / imagen.width)
        const ancho = Math.round(imagen.width * escala)
        const alto = Math.round(imagen.height * escala)

        const canvas = document.createElement("canvas")
        canvas.width = ancho
        canvas.height = alto

        const contexto = canvas.getContext("2d")
        if (!contexto) {
          reject(new Error("No se pudo procesar la imagen."))
          return
        }

        contexto.drawImage(imagen, 0, 0, ancho, alto)
        resolve(canvas.toDataURL("image/jpeg", CALIDAD_JPEG))
      }

      imagen.src = lector.result as string
    }

    lector.readAsDataURL(archivo)
  })
}
