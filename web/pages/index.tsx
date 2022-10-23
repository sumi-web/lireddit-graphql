import { Box } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useGetAllPostQuery } from '../graphql/graphqlHooks';
import { withUrql } from '../hocs/withUrqlClient';

const Home: NextPage = () => {
  const [limit, setState] = useState(5);

  const [{ data }] = useGetAllPostQuery({ variables: { limit: limit } });

  return (
    <div>
      <Navbar />
      <Box>Hello World</Box>
      <br />
      {!data ? (
        <Box>loading....</Box>
      ) : (
        data.posts?.map((post) => (
          <Box key={post.id}>
            <Box>{post.title}</Box>
            <Box>{post.createdDate}</Box>
          </Box>
        ))
      )}
    </div>
  );
};

export default withUrql(Home, true);
