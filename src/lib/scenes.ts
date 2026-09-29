import type { ImageMetadata } from 'astro';

// Imágenes opcionales en src/assets/scenes/<nombre>.(jpg|jpeg|png|webp). Si no existe, devuelve undefined.
const scenes = import.meta.glob<{ default: ImageMetadata }>('../assets/scenes/*.{jpg,jpeg,png,webp}', { eager: true });

export function getScene(name: string): ImageMetadata | undefined {
  const match = Object.entries(scenes).find(([path]) => path.split('/').pop()?.replace(/\.\w+$/, '') === name);
  return match?.[1].default;
}
