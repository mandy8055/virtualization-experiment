import { POSTS } from './mock-data.js';

type PostsArgs = {
  offset: number;
  limit: number;
};

export const resolvers = {
  Query: {
    posts: (_: unknown, { offset, limit }: PostsArgs) => {
      // Slice the array based on offset and limit
      // e.g offset=0, limit=20 → POSTS.slice(0, 20) → items 0-19
      // e.g offset=20, limit=20 → POSTS.slice(20, 40) → items 20-39
      const posts = POSTS.slice(offset, offset + limit);

      return {
        posts,
        total: POSTS.length, // always 500 — client uses this to know when to stop
      };
    },
  },
};
