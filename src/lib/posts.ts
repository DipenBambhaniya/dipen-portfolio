import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  readingTime: number;
  draft: boolean;
};

export type Post = PostMeta & {
  /** Rendered HTML body. */
  html: string;
};

function readAll(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const posts = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
      const { data, content } = matter(raw);
      const words = content.trim().split(/\s+/).length;

      return {
        slug: file.replace(/\.md$/, ''),
        title: typeof data.title === 'string' ? data.title : file,
        date: typeof data.date === 'string' ? data.date : '',
        summary: typeof data.summary === 'string' ? data.summary : '',
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        readingTime: Math.max(1, Math.round(words / 220)),
        draft: data.draft === true,
        html: marked.parse(content, { async: false }),
      };
    });

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * Drafts are visible in `next dev` so you can preview them, and excluded from
 * production builds. Flip `draft: false` in the front matter to publish.
 */
function isVisible(post: Post): boolean {
  return !post.draft || process.env.NODE_ENV === 'development';
}

export function getAllPosts(): PostMeta[] {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return readAll()
    .filter(isVisible)
    .map(({ html, ...meta }) => meta);
}

export function getPost(slug: string): Post | undefined {
  return readAll().find((post) => post.slug === slug && isVisible(post));
}

export function getPostSlugs(): string[] {
  return readAll().filter(isVisible).map((post) => post.slug);
}

export function formatDate(iso: string): string {
  if (!iso) return '';
  const parsed = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return iso;
  return parsed.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
