import { es } from './es';
import { en } from './en';
import type { Locale, SiteContent } from './types';
import { person } from './shared';

export type { Locale, SiteContent } from './types';
export { person, THRESHOLD_DEFAULT } from './shared';
export { fill } from './fill';

const content: Record<Locale, SiteContent> = { es, en };

export const locales: Locale[] = ['en', 'es'];

/** Idioma de la página actual a partir de Astro.currentLocale (por defecto, inglés). */
export function getContent(locale: string | undefined): SiteContent {
  return content[(locale === 'es' ? 'es' : 'en') as Locale];
}

/** Enlace mailto con asunto y saludo prellenados en el idioma de la página. Abre el cliente de correo predeterminado. */
export function mailtoHref(c: SiteContent): string {
  const params = `subject=${encodeURIComponent(c.mail.subject)}&body=${encodeURIComponent(c.mail.body)}`;
  return `mailto:${person.email}?${params}`;
}

/** Ruta de la portada en cada idioma (inglés sin prefijo, español en /es/). */
export function homePath(locale: Locale): string {
  return locale === 'en' ? '/' : '/es/';
}
