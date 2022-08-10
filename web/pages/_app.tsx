import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../utils/theme';
import { Provider } from 'urql';
import { client } from '../utils/urqlClient';
import NotificationProvider from '../context/useNotification';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider theme={theme}>
        <NotificationProvider>
          <Component {...pageProps} />
        </NotificationProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
