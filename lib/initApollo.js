import { ApolloClient, ApolloLink, InMemoryCache } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import { BatchHttpLink } from 'apollo-link-batch-http';
import fetch from 'isomorphic-unfetch';
import debug from 'debug';
import { v4 as uuid } from 'uuid';
import * as Sentry from '@sentry/node';

const dlog = debug('that:apollo:init');
let apolloClient = null;

function create(initialState, bearerToken) {
  dlog('creating apollo client');
  const isBrowser = typeof window !== 'undefined';

  const baseLink = new BatchHttpLink({
    uri: process.env.API_GATEWAY, // Server URL (must be absolute)
    // credentials: 'same-origin',
    fetch: !isBrowser && fetch,
  });

  let link;

  const correlationId = uuid();

  Sentry.configureScope(scope => {
    scope.setTag('correlationId', correlationId);
  });

  const authMiddlewareLink = setContext(() => {
    dlog('setting auth header %o', `bearer ${bearerToken}`);
    const headers = {
      headers: {
        authorization: `bearer ${bearerToken}`,
        'that-correlation-id': correlationId,
      },
    };

    return headers;
  });

  if (bearerToken) {
    dlog('has user, setting auth headers');
    link = ApolloLink.from([authMiddlewareLink, baseLink]);
  } else {
    dlog('no user, using base link only');

    link = ApolloLink.from([baseLink]);
  }

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    cache: new InMemoryCache().restore(initialState || {}),
    link,
  });
}

export default function initApollo(initialState, currentUser) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return create(initialState, currentUser);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, currentUser);
  }

  return apolloClient;
}
