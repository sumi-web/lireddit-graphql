import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import NotificationProvider from '../context/useNotification';
import UserProvider from '../context/useUser';
import '../styles/globals.css';
import { theme } from '../utils/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <NotificationProvider>
          <Component {...pageProps} />
        </NotificationProvider>
      </UserProvider>
    </ChakraProvider>
  );
}

export default MyApp;
