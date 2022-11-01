import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  vote?: Maybe<Scalars['Boolean']>;
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


export type GQLMutationVoteArgs = {
  postId: Scalars['String'];
  value: Scalars['Int'];
};

export type GQLPaginatedResult = {
  __typename?: 'PaginatedResult';
  count: Scalars['Int'];
  posts?: Maybe<Array<GQLPost>>;
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
  getAllPost?: Maybe<GQLPaginatedResult>;
  getAllUsers?: Maybe<Array<GQLUser>>;
  getPost: GQLPost;
  healthCheck: Scalars['String'];
};


export type GQLQueryGetAllPostArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type GQLResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LoginInput: GQLLoginInput;
  Mutation: ResolverTypeWrapper<{}>;
  PaginatedResult: ResolverTypeWrapper<GQLPaginatedResult>;
  Post: ResolverTypeWrapper<GQLPost>;
  PostInput: GQLPostInput;
  Query: ResolverTypeWrapper<{}>;
  RegisterInput: GQLRegisterInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<GQLUser>;
};

/** Mapping between all available schema types and the resolvers parents */
export type GQLResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Date: Scalars['Date'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  LoginInput: GQLLoginInput;
  Mutation: {};
  PaginatedResult: GQLPaginatedResult;
  Post: GQLPost;
  PostInput: GQLPostInput;
  Query: {};
  RegisterInput: GQLRegisterInput;
  String: Scalars['String'];
  User: GQLUser;
};

export interface GQLDateScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['Date'], any> {
  name: 'Date';
}

export type GQLMutationResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Mutation'] = GQLResolversParentTypes['Mutation']> = {
  createPost?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<GQLMutationCreatePostArgs, 'post'>>;
  deletePost?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<GQLMutationDeletePostArgs, 'id'>>;
  forgotPassword?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<GQLMutationForgotPasswordArgs, 'userName'>>;
  loginUser?: Resolver<GQLResolversTypes['User'], ParentType, ContextType, RequireFields<GQLMutationLoginUserArgs, 'user'>>;
  logoutUser?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>;
  registerUser?: Resolver<GQLResolversTypes['User'], ParentType, ContextType, RequireFields<GQLMutationRegisterUserArgs, 'user'>>;
  rehydrateUser?: Resolver<Maybe<GQLResolversTypes['User']>, ParentType, ContextType>;
  resetPassword?: Resolver<GQLResolversTypes['User'], ParentType, ContextType, RequireFields<GQLMutationResetPasswordArgs, 'password' | 'token'>>;
  vote?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<GQLMutationVoteArgs, 'postId' | 'value'>>;
};

export type GQLPaginatedResultResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['PaginatedResult'] = GQLResolversParentTypes['PaginatedResult']> = {
  count?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  posts?: Resolver<Maybe<Array<GQLResolversTypes['Post']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPostResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Post'] = GQLResolversParentTypes['Post']> = {
  createdDate?: Resolver<GQLResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>;
  points?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  text?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  updatedDate?: Resolver<GQLResolversTypes['Date'], ParentType, ContextType>;
  user?: Resolver<GQLResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLQueryResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Query'] = GQLResolversParentTypes['Query']> = {
  getAllPost?: Resolver<Maybe<GQLResolversTypes['PaginatedResult']>, ParentType, ContextType, RequireFields<GQLQueryGetAllPostArgs, 'limit'>>;
  getAllUsers?: Resolver<Maybe<Array<GQLResolversTypes['User']>>, ParentType, ContextType>;
  getPost?: Resolver<GQLResolversTypes['Post'], ParentType, ContextType, RequireFields<GQLQueryGetPostArgs, 'id'>>;
  healthCheck?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
};

export type GQLUserResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['User'] = GQLResolversParentTypes['User']> = {
  createdDate?: Resolver<Maybe<GQLResolversTypes['Date']>, ParentType, ContextType>;
  email?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>;
  updatedDate?: Resolver<Maybe<GQLResolversTypes['Date']>, ParentType, ContextType>;
  userName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLResolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  Mutation?: GQLMutationResolvers<ContextType>;
  PaginatedResult?: GQLPaginatedResultResolvers<ContextType>;
  Post?: GQLPostResolvers<ContextType>;
  Query?: GQLQueryResolvers<ContextType>;
  User?: GQLUserResolvers<ContextType>;
};

