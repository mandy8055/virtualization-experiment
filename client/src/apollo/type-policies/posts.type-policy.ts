import type { FieldPolicy, Reference } from '@apollo/client';

// Mirrors the PostsResult shape from our schema
type PostsCacheEntry = {
  total: number;
  posts: ReadonlyArray<Reference>;
};

// The field policy for the posts query
// This tells Apollo HOW to merge incoming pages with existing cache
export const postsFieldPolicy: FieldPolicy<PostsCacheEntry> = {
  // keyArgs: [] means NO arguments bust the cache
  // Both page 1 and page 2 map to the SAME cache entry
  // Apollo ignores offset and limit when deciding the cache key
  keyArgs: [],

  merge(
    existing: PostsCacheEntry | undefined,
    incoming: PostsCacheEntry,
    { args }: { args: Record<string, unknown> | null },
  ): PostsCacheEntry {
    // Case 1: No existing cache OR offset is 0 (first page or reset)
    // Replace entirely — never append stale posts from a previous search
    if (!existing || args?.offset === 0) {
      return incoming;
    }

    // Case 2: Subsequent pages — append incoming posts to existing ones
    return {
      ...incoming, // spread incoming to keep total updated
      posts: [...existing.posts, ...incoming.posts],
    };
  },
};
