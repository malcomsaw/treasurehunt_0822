// Universal Asset and Image Resolver for Vite dev, static builds, and GitHub Pages deployments

// Eagerly import all images from src/assets/images so Vite bundles and hashes them in production
const srcImageModules = import.meta.glob<string>('../assets/images/*', {
  eager: true,
  import: 'default'
});

// Map of filename -> bundled URL (e.g., 'pirate_page1_unknown.jpg' -> '/assets/pirate_page1_unknown-D9f3a...jpg')
const bundledImageMap: Record<string, string> = {};

Object.entries(srcImageModules).forEach(([path, url]) => {
  // path is e.g. "../assets/images/pirate_page1_unknown.jpg"
  const fileName = path.split('/').pop() || '';
  if (fileName) {
    bundledImageMap[fileName] = url;
    bundledImageMap[fileName.toLowerCase()] = url;
  }
  bundledImageMap[path] = url;
});

/**
 * Returns a base-aware URL for assets stored in public/
 * (works seamlessly on GitHub Pages subpaths e.g. https://username.github.io/my-app/)
 */
export function getPublicAssetUrl(relativePath: string): string {
  if (!relativePath) return '';
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://') || relativePath.startsWith('data:') || relativePath.startsWith('blob:')) {
    return relativePath;
  }

  // Remove leading slashes and any accidental '/src/' or './'
  let clean = relativePath.replace(/^\.?\//, '');
  
  const base = import.meta.env.BASE_URL || './';
  const prefix = base.endsWith('/') ? base : `${base}/`;
  
  return `${prefix}${clean}`;
}

/**
 * Resolves an image path from either src/assets/images, public/assets/..., or an external URL.
 * Guaranteed to produce a working image URL in both local dev server and static production builds.
 */
export function resolveImageUrl(input?: string): string {
  if (!input) return '';

  const trimmed = input.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:') || trimmed.startsWith('blob:')) {
    return trimmed;
  }

  // Extract base filename (e.g. 'pirate_page1_unknown.jpg')
  const fileName = trimmed.split('/').pop() || '';

  // 1. Check if it's bundled from src/assets/images
  if (fileName && bundledImageMap[fileName]) {
    return bundledImageMap[fileName];
  }
  if (fileName && bundledImageMap[fileName.toLowerCase()]) {
    return bundledImageMap[fileName.toLowerCase()];
  }
  if (bundledImageMap[trimmed]) {
    return bundledImageMap[trimmed];
  }

  // 2. Check if it refers to public/assets/... or /src/assets/images/...
  if (trimmed.includes('src/assets/images/')) {
    const subName = trimmed.split('src/assets/images/')[1];
    if (subName && bundledImageMap[subName]) {
      return bundledImageMap[subName];
    }
    return getPublicAssetUrl(`assets/images/${subName}`);
  }

  if (trimmed.startsWith('/assets/') || trimmed.startsWith('assets/')) {
    return getPublicAssetUrl(trimmed);
  }

  // 3. Fallback: Treat as a public asset path
  return getPublicAssetUrl(trimmed);
}

// Default image filenames for the 7 quest islands
export const DEFAULT_ISLAND_IMAGE_NAMES: Record<number, string> = {
  1: 'GCH.jpeg',
  2: 'QMA.jpeg',
  3: 'BOOKX.jpeg',
  4: 'GYPSY.png',
  5: 'KLCC.jpeg',
  6: 'QM.jpg',
  7: 'PS.jpg',
};

export const CAPTAIN_AVATAR_NAME = 'jacsparrow_1786546631506.jpg';

export function getIslandImageUrl(pageNum: number, customPictureUrl?: string): string {
  if (customPictureUrl && customPictureUrl.trim()) {
    return resolveImageUrl(customPictureUrl);
  }
  const defaultFileName = DEFAULT_ISLAND_IMAGE_NAMES[pageNum] || DEFAULT_ISLAND_IMAGE_NAMES[1];
  return resolveImageUrl(defaultFileName);
}

export function getCaptainAvatarUrl(): string {
  return resolveImageUrl(CAPTAIN_AVATAR_NAME);
}
