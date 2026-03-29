import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { typePolicies } from './type-policies/index.ts';

// HttpLink — tells Apollo where to send queries
const httpLink = new HttpLink({
  uri: 'http://localhost:4000', // our server
});

// The Apollo Client instance — single source of truth for all GraphQL ops
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies,
  }),
  defaultOptions: {
    query: {
      // cache-first: check cache before hitting network
      // If data exists in cache, use it — no unnecessary network request
      fetchPolicy: 'cache-first',
    },
  },
});
