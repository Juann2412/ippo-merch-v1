/**
 * Images Naruto — hébergées localement dans /public/images/products/naruto/
 * Sources vérifiées (HTTPS) :
 * - POP MART Ninkai Taisen : Shumi Store (shumistore.com)
 * - Bandai GPF Mystery Box : Innex Inc (innexinc.com, SKU 87430)
 */
const BASE = "/images/products/naruto";

export const NARUTO_LOCAL_IMAGES = {
  ninkaiBox: `${BASE}/ninkai-box.jpg`,
  ninkaiLineup: `${BASE}/ninkai-lineup.webp`,
  ninkaiCharacters: `${BASE}/ninkai-characters.webp`,
  gpfBox: `${BASE}/gpf-box.jpg`,
} as const;

export function getNarutoImageUrlsForSlug(slug: string): {
  box: string;
  reveal: string;
} {
  const { ninkaiBox, ninkaiLineup, ninkaiCharacters, gpfBox } = NARUTO_LOCAL_IMAGES;

  if (slug === "ninkai-taisen-blind-box") {
    return { box: ninkaiBox, reveal: ninkaiCharacters };
  }

  if (slug.endsWith("-gpf-series-2")) {
    return { box: gpfBox, reveal: gpfBox };
  }

  if (slug.includes("-ninkai") || slug.includes("ninkai")) {
    return { box: ninkaiBox, reveal: ninkaiLineup };
  }

  return { box: ninkaiBox, reveal: ninkaiLineup };
}
