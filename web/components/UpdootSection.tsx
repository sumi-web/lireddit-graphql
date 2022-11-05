import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import React, { useState } from 'react';
import { GQLRegularPostFragment, useVoteMutation } from '../graphql/graphqlHooks';

interface UpdootSectionInterface {
  post: GQLRegularPostFragment;
}

type Loading = 'up-loading' | 'down-loading' | 'not-loading';

const UpdootSection = ({ post }: UpdootSectionInterface) => {
  const [loading, setLoading] = useState<Loading>('not-loading');
  const [{ operation, fetching }, vote] = useVoteMutation();

  const voteState = operation?.variables?.value;

  return (
    <Flex marginRight={'20px'} direction="column" alignItems={'center'}>
      <IconButton
        isLoading={loading === 'up-loading'}
        size={'16px'}
        aria-label="Search database"
        icon={<ChevronUpIcon w={6} h={6} />}
        onClick={async () => {
          setLoading('up-loading');
          await vote({ postId: post.id, value: 1 });
          setLoading('not-loading');
        }}
      />
      <Box>{post.points}</Box>
      <IconButton
        isLoading={loading === 'down-loading'}
        onClick={async () => {
          setLoading('down-loading');
          vote({ postId: post.id, value: -1 });
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
