import { useRouter } from 'next/router';
import React from 'react';
import { useGetPostQuery } from '../../graphql/graphqlHooks';
import { withUrql } from '../../hocs/withUrqlClient';

const Post = () => {
  const router = useRouter();

  const id = Array.isArray(router.query) ? router.query[0].id : router.query.id;

  const [{ data, fetching }] = useGetPostQuery({
    variables: {
      id
    }
  });

  if (fetching) {
    return <div>...loading</div>;
  }

  return <div>Post</div>;
};
export default withUrql(Post, true);
