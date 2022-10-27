import { Box, Button, Container, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useGetAllPostQuery } from '../graphql/graphqlHooks';
import { withUrql } from '../hocs/withUrqlClient';
import { AddIcon } from '@chakra-ui/icons';

const Home: NextPage = () => {
  const [pagination, setPagination] = useState({
    limit: 5,
    id: null as string | null,
    cursor: null as string | null
  });

  const [{ data, fetching }, reexcuteQuery] = useGetAllPostQuery({
    variables: pagination,
    requestPolicy: 'network-only'
  });
  console.log('posts', data);

  if (!data) {
    return null;
  }

  if (!fetching && !data) {
    return <div>query failed or you go not posts</div>;
  }

  const { posts } = data;

  return (
    <div>
      <Navbar />
      <Container maxW={'1000px'} pt="16px" pb={'3rem'}>
        <Flex alignItems={'center'} justifyContent="space-between">
          <Heading>LiReddit</Heading>
          <Button colorScheme="teal">
            <AddIcon mr={'10px'} />
            <Link href={'/create-post'}>Create Post</Link>
          </Button>
        </Flex>
        <br />
        {!posts && fetching ? (
          <Box>loading....</Box>
        ) : (
          <Stack direction={'column'} spacing={8}>
            {posts!.posts?.map((post, i) => (
              <Box key={post.id} p={5} shadow="md" borderWidth="1px">
                <Heading fontSize="xl">
                  {i + 1}.{post.title}
                </Heading>
                <Text mt={4}>
                  {post.text.slice(0, 100)}
                  {post.text.length > 100 ? '...' : ''}
                </Text>
              </Box>
            ))}
          </Stack>
        )}
        {posts && posts?.posts && (
          <Flex justifyContent={'center'}>
            {posts.posts.length < posts.count && (
              <Button
                isLoading={fetching}
                mt={'1rem'}
                onClick={() => {
                  if (posts.posts) {
                    setPagination({
                      limit: pagination.limit,
                      id: posts?.posts[posts.posts.length - 1].id,
                      cursor: posts?.posts[posts.posts.length - 1]?.createdDate
                    });
                  }
                }}
              >
                Load more
              </Button>
            )}
          </Flex>
        )}
      </Container>
    </div>
  );
};

export default withUrql(Home, true);
