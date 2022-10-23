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
  forgotPassword?: Maybe<Scalars['Boolean']>;
  loginUser: GQLUser;
  logoutUser?: Maybe<Scalars['Boolean']>;
  registerUser: GQLUser;
  rehydrateUser?: Maybe<GQLUser>;
  resetPassword: GQLUser;
};


export type GQLMutationCreatePostArgs = {
  post: GQLPostInput;
};


export type GQLMutationDeletePostArgs = {
  id: Scalars['ID'];
};


export type GQLMutationForgotPasswordArgs = {
  userName: Scalars['String'];
};


export type GQLMutationLoginUserArgs = {
  user: GQLLoginInput;
};


export type GQLMutationRegisterUserArgs = {
  user: GQLRegisterInput;
};


export type GQLMutationResetPasswordArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type GQLPost = {
  __typename?: 'Post';
  createdDate: Scalars['Date'];
  id: Scalars['ID'];
  points: Scalars['Int'];
  text: Scalars['String'];
  title: Scalars['String'];
  updatedDate: Scalars['Date'];
  user: GQLUser;
};

export type GQLPostInput = {
  points?: InputMaybe<Scalars['Int']>;
  text: Scalars['String'];
  title: Scalars['String'];
};

export type GQLQuery = {
  __typename?: 'Query';
  getAllPost?: Maybe<Array<GQLPost>>;
  getAllUsers?: Maybe<Array<GQLUser>>;
  getPost: GQLPost;
  healthCheck: Scalars['String'];
};


export type GQLQueryGetAllPostArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
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
  createdDate?: Maybe<Scalars['Date']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  updatedDate?: Maybe<Scalars['Date']>;
  userName: Scalars['String'];
};

export type GQLRegularPostFragment = { __typename?: 'Post', id: string, title: string, createdDate: any };

export type GQLRegularUserFragment = { __typename?: 'User', id: string, userName: string, email: string };

export type GQLCreatePostMutationVariables = Exact<{
  post: GQLPostInput;
}>;


export type GQLCreatePostMutation = { __typename?: 'Mutation', created?: boolean | null };

export type GQLForgotPasswordMutationVariables = Exact<{
  userName: Scalars['String'];
}>;


export type GQLForgotPasswordMutation = { __typename?: 'Mutation', sent?: boolean | null };

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

export type GQLResetPasswordMutationVariables = Exact<{
  token: Scalars['String'];
  password: Scalars['String'];
}>;


export type GQLResetPasswordMutation = { __typename?: 'Mutation', created: { __typename?: 'User', id: string, userName: string, email: string } };

export type GQLGetAllPostQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type GQLGetAllPostQuery = { __typename?: 'Query', posts?: Array<{ __typename?: 'Post', id: string, title: string, createdDate: any }> | null };

export type GQLRehydrateUserMutationVariables = Exact<{ [key: string]: never; }>;


export type GQLRehydrateUserMutation = { __typename?: 'Mutation', user?: { __typename?: 'User', id: string, userName: string, email: string } | null };

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
export const CreatePostDocument = gql`
    mutation CreatePost($post: PostInput!) {
  created: createPost(post: $post)
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<GQLCreatePostMutation, GQLCreatePostMutationVariables>(CreatePostDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($userName: String!) {
  sent: forgotPassword(userName: $userName)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<GQLForgotPasswordMutation, GQLForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
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
export const ResetPasswordDocument = gql`
    mutation ResetPassword($token: String!, $password: String!) {
  created: resetPassword(token: $token, password: $password) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useResetPasswordMutation() {
  return Urql.useMutation<GQLResetPasswordMutation, GQLResetPasswordMutationVariables>(ResetPasswordDocument);
};
export const GetAllPostDocument = gql`
    query GetAllPost($limit: Int!, $cursor: String) {
  posts: getAllPost(limit: $limit, cursor: $cursor) {
    ...RegularPost
  }
}
    ${RegularPostFragmentDoc}`;

export function useGetAllPostQuery(options: Omit<Urql.UseQueryArgs<GQLGetAllPostQueryVariables>, 'query'>) {
  return Urql.useQuery<GQLGetAllPostQuery, GQLGetAllPostQueryVariables>({ query: GetAllPostDocument, ...options });
};
export const RehydrateUserDocument = gql`
    mutation RehydrateUser {
  user: rehydrateUser {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useRehydrateUserMutation() {
  return Urql.useMutation<GQLRehydrateUserMutation, GQLRehydrateUserMutationVariables>(RehydrateUserDocument);
};