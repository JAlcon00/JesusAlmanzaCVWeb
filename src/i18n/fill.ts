/** Rellena plantillas tipo "{email} copiado". Módulo aparte para que las islas no importen todo el contenido. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ''));
}
