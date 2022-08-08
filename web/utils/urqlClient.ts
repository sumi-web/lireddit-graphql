import { createClient } from 'urql';

export const client = createClient({
  url: 'http://localhost:5001/graphql',
  fetchOptions: {
    credentials: 'include'
  }
});
