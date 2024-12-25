// lib/apolloClient.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql', // Your GraphQL API URL
    credentials: 'same-origin', // Adjust based on your API's CORS setup
  }),
  cache: new InMemoryCache(),
});

export default client;
