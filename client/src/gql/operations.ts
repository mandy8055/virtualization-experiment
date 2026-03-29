/* eslint-disable */
/* WARNING: THIS FILE IS GENERATED, DON'T EDIT */
import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type GetPostsQueryVariables = Exact<{
  offset: InputMaybe<Scalars["Int"]["input"]>;
  limit: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetPostsQuery = {
  __typename?: "Query";
  posts: {
    __typename?: "PostsResult";
    total: number;
    posts: Array<{
      __typename?: "Post";
      id: string;
      title: string;
      body: string;
      author: string;
      createdAt: string;
    }>;
  };
};

export const GetPostsDocument = gql`
  query GetPosts($offset: Int, $limit: Int) {
    posts(offset: $offset, limit: $limit) {
      total
      posts {
        id
        title
        body
        author
        createdAt
      }
    }
  }
`;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetPostsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(
    GetPostsDocument,
    options,
  );
}
export function useGetPostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPostsQuery,
    GetPostsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(
    GetPostsDocument,
    options,
  );
}
// @ts-ignore
export function useGetPostsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetPostsQuery,
    GetPostsQueryVariables
  >,
): Apollo.UseSuspenseQueryResult<GetPostsQuery, GetPostsQueryVariables>;
export function useGetPostsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>,
): Apollo.UseSuspenseQueryResult<
  GetPostsQuery | undefined,
  GetPostsQueryVariables
>;
export function useGetPostsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetPostsQuery, GetPostsQueryVariables>(
    GetPostsDocument,
    options,
  );
}
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<
  typeof useGetPostsLazyQuery
>;
export type GetPostsSuspenseQueryHookResult = ReturnType<
  typeof useGetPostsSuspenseQuery
>;
export type GetPostsQueryResult = Apollo.QueryResult<
  GetPostsQuery,
  GetPostsQueryVariables
>;
