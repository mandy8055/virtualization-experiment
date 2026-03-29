export type Post = {
  id: string;
  title: string;
  body: string;
  author: string;
  createdAt: string;
};

const AUTHORS = [
  'Mandy Sankrit',
  'Linus Torvalds',
  'Dan Abramov',
  'Kent C. Dodds',
  'Theo Browne',
  'Tanner Linsley',
  'Ryan Carniato',
  'Evan You',
];

const TOPICS = [
  'Understanding React Reconciliation',
  'Why Virtualization Matters',
  'GraphQL Pagination Deep Dive',
  'TypeScript Utility Types in Practice',
  'Apollo Cache Internals',
  'CSS Grid vs Flexbox',
  'Node.js Event Loop Explained',
  'Stoicism and Software Engineering',
  'The Art of Code Review',
  'Mastering useEffect',
  'Building Design Systems',
  'Micro Frontends in 2026',
  'Docker for Frontend Devs',
  'Testing Philosophy',
  'Open Source Contribution Guide',
];

const BODIES = [
  'In this post we explore the core concepts behind this topic and why it matters in modern web development. We walk through real examples and common pitfalls.',
  'Most developers overlook this entirely. After working on a large-scale production system, I realized how critical this is for performance and maintainability.',
  'Let us break this down step by step. The mental model is simpler than you think once you understand what is happening under the hood.',
  'This is something I learned the hard way on a production incident. Here is what I wish someone had told me earlier in my career.',
  'The documentation makes this look complicated but it really is not. Here is the minimal version that covers 90% of real-world use cases.',
];

// Deterministic date — each post is 1 day apart starting from Jan 1 2025
const getCreatedAt = (index: number): string => {
  const base = new Date('2025-01-01T00:00:00.000Z');
  base.setDate(base.getDate() + index);
  return base.toISOString();
};

// Generate N deterministic posts
// Deterministic means: same index always produces same post — no randomness
const generatePosts = (count: number): Post[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: String(index + 1),
    title: `#${index + 1} — ${TOPICS[index % TOPICS.length]}`,
    body: BODIES[index % BODIES.length],
    author: AUTHORS[index % AUTHORS.length],
    createdAt: getCreatedAt(index),
  }));
};

// Single source of truth — 500 posts, generated once at module load
// All resolvers import from here
export const POSTS = generatePosts(500);
