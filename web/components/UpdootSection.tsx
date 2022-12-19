import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import React, { useState } from 'react';
import { GQLRegularPostFragment, useVoteMutation } from '../graphql/graphqlHooks';

interface UpdootSectionInterface {
  updateQuery(): void;
  post: GQLRegularPostFragment;
}

type Loading = 'up-loading' | 'down-loading' | 'not-loading';

const UpdootSection = ({ updateQuery, post }: UpdootSectionInterface) => {
  const [loading, setLoading] = useState<Loading>('not-loading');
  const [_, vote] = useVoteMutation();

  return (
    <Flex marginRight={'20px'} direction="column" alignItems={'center'}>
      <IconButton
        isLoading={loading === 'up-loading'}
        colorScheme={post.voteStatus === 1 ? 'green' : 'gray'}
        size={'16px'}
        aria-label="Search database"
        icon={<ChevronUpIcon w={6} h={6} />}
        onClick={async () => {
          if (post.voteStatus === 1) return;
          setLoading('up-loading');
          const result = await vote({ postId: post.id, value: 1 });

          if (result.data?.voted) {
            updateQuery();
          }

          setLoading('not-loading');
        }}
      />
      <Box>{post.points}</Box>
      <IconButton
        isLoading={loading === 'down-loading'}
        colorScheme={post.voteStatus === -1 ? 'red' : 'gray'}
        onClick={async () => {
          if (post.voteStatus === -1) return;

          setLoading('down-loading');
          const result = await vote({ postId: post.id, value: -1 });

          if (result.data?.voted) {
            updateQuery();
          }
          setLoading('not-loading');
        }}
        size={'16px'}
        aria-label="Search database"
        icon={<ChevronDownIcon w={6} h={6} />}
      />
    </Flex>
  );
};

export default UpdootSection;
