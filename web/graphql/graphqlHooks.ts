import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type GQLLoginInput = {
  password: Scalars['String'];
  userName: Scalars['String'];
};

export type GQLMutation = {
  __typename?: 'Mutation';
  createPost?: Maybe<Scalars['Boolean']>;
  deletePost?: Maybe<Scalars['Boolean']>;
  loginUser: GQLUser;
  registerUser: GQLUser;
};


export type GQLMutationCreatePostArgs = {
  post: GQLPostInput;
};


export type GQLMutationDeletePostArgs = {
  id: Scalars['ID'];
};


export type GQLMutationLoginUserArgs = {
  user: GQLLoginInput;
};


export type GQLMutationRegisterUserArgs = {
  user: GQLRegisterInput;
};

export type GQLPost = {
  __typename?: 'Post';
  createdDate: Scalars['Date'];
  id: Scalars['ID'];
  title: Scalars['String'];
  updatedDate: Scalars['Date'];
};

export type GQLPostInput = {
  title: Scalars['String'];
};

export type GQLQuery = {
  __typename?: 'Query';
  getAllPost?: Maybe<Array<GQLPost>>;
  getPost: GQLPost;
  healthCheck: Scalars['String'];
  rehydrateUser?: Maybe<GQLUser>;
};


export type GQLQueryGetPostArgs = {
  id: Scalars['ID'];
};

export type GQLRegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  userName: Scalars['String'];
};

export type GQLUser = {
  __typename?: 'User';
  createdDate: Scalars['Date'];
  email: Scalars['String'];
  id: Scalars['ID'];
  updatedDate: Scalars['Date'];
  userName: Scalars['String'];
};

export type GQLRegisterUserMutationVariables = Exact<{
  user: GQLRegisterInput;
}>;


export type GQLRegisterUserMutation = { __typename?: 'Mutation', user: { __typename?: 'User', id: string, userName: string, email: string } };


export const RegisterUserDocument = gql`
    mutation RegisterUser($user: RegisterInput!) {
  user: registerUser(user: $user) {
    id
    userName
    email
  }
}
    `;

export function useRegisterUserMutation() {
  return Urql.useMutation<GQLRegisterUserMutation, GQLRegisterUserMutationVariables>(RegisterUserDocument);
};