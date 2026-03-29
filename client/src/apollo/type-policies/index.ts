import { postsFieldPolicy } from './posts.type-policy.ts';

// All type policies live here
// Tomorrow if you add a new feature, just add its policy here
// The apollo client stays clean — no feature-specific logic there
export const typePolicies = {
  Query: {
    fields: {
      posts: postsFieldPolicy,
    },
  },
};
