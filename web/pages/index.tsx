import { Box, Button, Container, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useDeletePostMutation, useGetAllPostQuery } from '../graphql/graphqlHooks';
import { withUrql } from '../hocs/withUrqlClient';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import UpdootSection from '../components/UpdootSection';
import Link from 'next/link';

const Home: NextPage = () => {
  const router = useRouter();

  const [pagination, setPagination] = useState({
    limit: 10,
    id: null as string | null,
    cursor: null as string | null
  });

  const [{ data, fetching }, reexcuteQuery] = useGetAllPostQuery({
    variables: pagination,
    requestPolicy: 'cache-and-network'
  });

  const [_, deletePost] = useDeletePostMutation();

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
          <Button colorScheme="teal" onClick={() => router.push('/create-post')}>
            <AddIcon mr={'10px'} />
            Create Post
          </Button>
        </Flex>
        <br />
        {!posts && fetching ? (
          <Box>loading....</Box>
        ) : (
          <Stack direction={'column'} spacing={8}>
            {posts!.posts?.map((post, i) => (
              <Box key={post.id} p={5} shadow="md" borderWidth="1px" cursor={'pointer'}>
                <Flex position={'relative'}>
                  <UpdootSection post={post} updateQuery={reexcuteQuery} />
                  <Flex justifyContent={'space-between'} direction="column" width={'100%'}>
                    <Flex justifyContent={'space-between'} direction="row">
                      <Link href={'/post/' + post.id}>
                        <Heading fontSize="xl">
                          {i + 1}.{post.title}
                        </Heading>
                      </Link>
                      <Text>{post.user.userName}</Text>
                    </Flex>
                    <Text mt={4}>
                      {post.text.slice(0, 100)}
                      {post.text.length > 100 ? '...' : ''}
                    </Text>
                  </Flex>
                  <Button
                    width={'26px'}
                    height="32px"
                    position={'absolute'}
                    bottom="0"
                    right={'0'}
                    fontSize="0.8rem"
                    colorScheme="red"
                    onClick={async () => {
                      await deletePost({ id: post.id });
                      reexcuteQuery();
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </Flex>
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

export default withUrql(Home, false);
