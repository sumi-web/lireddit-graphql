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
  LoginInput: GQLLoginInput;
  Mutation: ResolverTypeWrapper<{}>;
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
  LoginInput: GQLLoginInput;
  Mutation: {};
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
  loginUser?: Resolver<GQLResolversTypes['User'], ParentType, ContextType, RequireFields<GQLMutationLoginUserArgs, 'user'>>;
  registerUser?: Resolver<GQLResolversTypes['User'], ParentType, ContextType, RequireFields<GQLMutationRegisterUserArgs, 'user'>>;
};

export type GQLPostResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Post'] = GQLResolversParentTypes['Post']> = {
  createdDate?: Resolver<GQLResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  updatedDate?: Resolver<GQLResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLQueryResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Query'] = GQLResolversParentTypes['Query']> = {
  getAllPost?: Resolver<Maybe<Array<GQLResolversTypes['Post']>>, ParentType, ContextType>;
  getPost?: Resolver<GQLResolversTypes['Post'], ParentType, ContextType, RequireFields<GQLQueryGetPostArgs, 'id'>>;
  healthCheck?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  rehydrateUser?: Resolver<Maybe<GQLResolversTypes['User']>, ParentType, ContextType>;
};

export type GQLUserResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['User'] = GQLResolversParentTypes['User']> = {
  createdDate?: Resolver<GQLResolversTypes['Date'], ParentType, ContextType>;
  email?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>;
  updatedDate?: Resolver<GQLResolversTypes['Date'], ParentType, ContextType>;
  userName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLResolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  Mutation?: GQLMutationResolvers<ContextType>;
  Post?: GQLPostResolvers<ContextType>;
  Query?: GQLQueryResolvers<ContextType>;
  User?: GQLUserResolvers<ContextType>;
};

