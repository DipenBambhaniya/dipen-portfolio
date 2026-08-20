/**
 * Next rewrites `<Link>` hrefs and `/_next` assets for basePath automatically,
 * but plain `<a href>` and `<img src>` pointing at /public do not get rewritten.
 * Use this for those.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function withBasePath(path: string): string {
  if (!path.startsWith('/')) return path;
  return `${BASE_PATH}${path}`;
}
