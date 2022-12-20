import { Box, Container, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import Navbar from '../../components/Navbar';
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

  return (
    <>
      <Navbar />

      <Container maxW="1000px">
        <Heading>{data?.post.title}</Heading>
        <Text>{data?.post.text}</Text>
      </Container>
    </>
  );
};
export default withUrql(Post, true);
