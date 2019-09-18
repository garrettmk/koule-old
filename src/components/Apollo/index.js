import React, { useMemo } from 'react';
import { useSession } from "../../hooks";
import ApolloClient from "apollo-client";
import { ApolloProvider } from 'react-apollo';
import {HttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";

export default function Apollo({ children }) {
  const { idToken } = useSession();

  const apolloClient = useMemo(
    () => new ApolloClient({
      link: new HttpLink({
        uri: 'https://koule.herokuapp.com/v1/graphql',
        headers: {
          Authorization: 'Bearer ' + idToken,
        }
      }),
      cache: new InMemoryCache(),
    }),
    [idToken]
  );

  return (
    <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
  );
}