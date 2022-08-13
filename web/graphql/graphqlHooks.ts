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
  logoutUser?: Maybe<Scalars['Boolean']>;
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

export type GQLRegularPostFragment = { __typename?: 'Post', id: string, title: string, createdDate: any };

export type GQLRegularUserFragment = { __typename?: 'User', id: string, userName: string, email: string };

export type GQLLoginUserMutationVariables = Exact<{
  user: GQLLoginInput;
}>;


export type GQLLoginUserMutation = { __typename?: 'Mutation', user: { __typename?: 'User', id: string, userName: string, email: string } };

export type GQLLogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type GQLLogoutUserMutation = { __typename?: 'Mutation', logout?: boolean | null };

export type GQLRegisterUserMutationVariables = Exact<{
  user: GQLRegisterInput;
}>;


export type GQLRegisterUserMutation = { __typename?: 'Mutation', user: { __typename?: 'User', id: string, userName: string, email: string } };

export type GQLGetAllPostQueryVariables = Exact<{ [key: string]: never; }>;


export type GQLGetAllPostQuery = { __typename?: 'Query', posts?: Array<{ __typename?: 'Post', id: string, title: string, createdDate: any }> | null };

export type GQLRehydrateUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GQLRehydrateUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, userName: string, email: string } | null };

export const RegularPostFragmentDoc = gql`
    fragment RegularPost on Post {
  id
  title
  createdDate
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  userName
  email
}
    `;
export const LoginUserDocument = gql`
    mutation LoginUser($user: LoginInput!) {
  user: loginUser(user: $user) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useLoginUserMutation() {
  return Urql.useMutation<GQLLoginUserMutation, GQLLoginUserMutationVariables>(LoginUserDocument);
};
export const LogoutUserDocument = gql`
    mutation LogoutUser {
  logout: logoutUser
}
    `;

export function useLogoutUserMutation() {
  return Urql.useMutation<GQLLogoutUserMutation, GQLLogoutUserMutationVariables>(LogoutUserDocument);
};
export const RegisterUserDocument = gql`
    mutation RegisterUser($user: RegisterInput!) {
  user: registerUser(user: $user) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useRegisterUserMutation() {
  return Urql.useMutation<GQLRegisterUserMutation, GQLRegisterUserMutationVariables>(RegisterUserDocument);
};
export const GetAllPostDocument = gql`
    query GetAllPost {
  posts: getAllPost {
    ...RegularPost
  }
}
    ${RegularPostFragmentDoc}`;

export function useGetAllPostQuery(options?: Omit<Urql.UseQueryArgs<GQLGetAllPostQueryVariables>, 'query'>) {
  return Urql.useQuery<GQLGetAllPostQuery, GQLGetAllPostQueryVariables>({ query: GetAllPostDocument, ...options });
};
export const RehydrateUserDocument = gql`
    query RehydrateUser {
  user: rehydrateUser {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useRehydrateUserQuery(options?: Omit<Urql.UseQueryArgs<GQLRehydrateUserQueryVariables>, 'query'>) {
  return Urql.useQuery<GQLRehydrateUserQuery, GQLRehydrateUserQueryVariables>({ query: RehydrateUserDocument, ...options });
};