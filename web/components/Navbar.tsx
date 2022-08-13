import { Flex, Box, Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';
import { useLogoutUserMutation, useRehydrateUserQuery } from '../graphql/graphqlHooks';

const Navbar = () => {
  const [result] = useRehydrateUserQuery({ requestPolicy: 'cache-and-network' });
  const [{ fetching: logoutFetching }, logout] = useLogoutUserMutation();

  let body = null;

  const { data } = result;

  // user is not logged in
  if (!data?.user)
    body = (
      <>
        <NextLink href="/login">
          <Link ml={4} color="white">
            login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color={'white'}>register</Link>
        </NextLink>
      </>
    );

  // user is logged
  if (data?.user)
    body = (
      <Flex gap={'10px'} alignItems="center">
        <Box color={'white'}>{data.user.userName}</Box>
        <Button
          colorScheme="white"
          onClick={() => {
            logout();
          }}
          isLoading={logoutFetching}
        >
          Logout
        </Button>
      </Flex>
    );

  return (
    <>
      <Flex bg="teal" p={4}>
        <Box ml={'auto'} display="flex" gap={'10px'}>
          {body}
        </Box>
      </Flex>
    </>
  );
};

export default Navbar;
