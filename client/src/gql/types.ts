/* eslint-disable */
/* WARNING: THIS FILE IS GENERATED, DON'T EDIT */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Post = {
  __typename?: "Post";
  author: Scalars["String"]["output"];
  body: Scalars["String"]["output"];
  createdAt: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  title: Scalars["String"]["output"];
};

export type PostsResult = {
  __typename?: "PostsResult";
  posts: Array<Post>;
  total: Scalars["Int"]["output"];
};

export type Query = {
  __typename?: "Query";
  posts: PostsResult;
};

export type QueryPostsArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};
