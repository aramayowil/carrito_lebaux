/** Convierte un texto libre en un slug de URL (sin tildes, minúsculas, guiones). */
export function slugify(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/** Genera un slug único agregando un sufijo numérico si ya existe en `existentes`. */
export function slugUnico(texto: string, existentes: string[]): string {
  const base = slugify(texto) || "item"
  if (!existentes.includes(base)) return base

  let sufijo = 2
  while (existentes.includes(`${base}-${sufijo}`)) sufijo += 1
  return `${base}-${sufijo}`
}
