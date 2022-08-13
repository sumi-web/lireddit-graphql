import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import NotificationProvider from '../context/useNotification';
import '../styles/globals.css';
import { theme } from '../utils/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <NotificationProvider>
        <Component {...pageProps} />
      </NotificationProvider>
    </ChakraProvider>
  );
}

export default MyApp;
