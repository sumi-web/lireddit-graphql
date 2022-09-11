import { Flex, Box, Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';
import { useLogoutUserMutation } from '../graphql/graphqlHooks';
import { isServer } from '../utils/isServer';
import { useUser } from '../context/useUser';
import { useRouter } from 'next/router';

// Note:- when ssr enabled its going to fetch current user on the Next.js server and Next.js does not have a cookie
// its not important for Seo to know about the user details
// its making extra request on the server everytime a page is server-side-rendered to get the user which is null
// So I do not want the rehydrateUser query to run on server side, thats why we used paused option to pause the query being run on ssr, it will run when window obj is defined

const Navbar = () => {
  // const [result] = useRehydrateUserQuery({ requestPolicy: 'cache-and-network', pause: isServer() });
  const [{ fetching: logoutFetching }, logout] = useLogoutUserMutation();

  const userCtx = useUser();

  const router = useRouter();

  let body = null;

  // const { data } = result;

  // user is not logged in
  if (!userCtx?.user)
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
  if (userCtx?.user)
    body = (
      <Flex gap={'10px'} alignItems="center">
        <Box color={'white'}>{userCtx.user.userName}</Box>
        <Button
          colorScheme="white"
          onClick={async () => {
            await logout();
            userCtx.setUser(null);
            router.replace('/login');
          }}
          isLoading={logoutFetching}
        >
          Logout
        </Button>
      </Flex>
    );

  return (
    <>
      <Flex bg="teal" p={4} position="sticky" top={0} zIndex={1}>
        <Box ml={'auto'} display="flex" gap={'10px'}>
          {body}
        </Box>
      </Flex>
    </>
  );
};

export default Navbar;
