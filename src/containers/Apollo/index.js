import React, { useMemo } from 'react';
import { useSession } from "../../hooks";
import ApolloClient from "apollo-client";
import { ApolloProvider } from 'react-apollo';
import {HttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";
import {WebSocketLink} from 'apollo-link-ws';

export default function Apollo({ children }) {
  const { idToken } = useSession();

  const apolloClient = useMemo(
    () => new ApolloClient({
      link: new WebSocketLink({
        uri: 'wss://koule-api.herokuapp.com/v1/graphql',
        options: {
          reconnect: true,
          connectionParams: {
            headers: {
              Authorization: 'Bearer ' + idToken
            }
          }
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