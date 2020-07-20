import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "@apollo/client/link/context";

import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { ApolloProvider, ApolloClient, split } from "@apollo/client";

const GRAPHQL_ENDPOINT = "ws:test-323.herokuapp.com/v1/graphql";
const graphlToken =
  "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im1xTFFXMDlNTUxRMUNNZGJpV3cwSyJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6Imdvb2dsZS1vYXV0aDJ8MTAzMjgyMTUzNDY1MzMwNTI3ODU1In0sImdpdmVuX25hbWUiOiJkaXB0aSIsImZhbWlseV9uYW1lIjoiZ2FuZGhpIiwibmlja25hbWUiOiJnYW5kaGlkaXB0aS5zIiwibmFtZSI6ImRpcHRpIGdhbmRoaSIsInBpY3R1cmUiOiJodHRwczovL2xoNS5nb29nbGV1c2VyY29udGVudC5jb20vLVdieVBvaHhzR2lvL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FNWnV1Y21PdmZ5ajVqOXgtckpzZEdQWWd5dENVVjRteGcvcGhvdG8uanBnIiwibG9jYWxlIjoiZW4tR0IiLCJ1cGRhdGVkX2F0IjoiMjAyMC0wNy0yMFQwNTowNzo1OC44NTBaIiwiaXNzIjoiaHR0cHM6Ly90ZXN0LTMyMy51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDMyODIxNTM0NjUzMzA1Mjc4NTUiLCJhdWQiOiJNclVTM3NZTEpUU1paMzJpUjN4OUhwQWJ3MzlWVVJVaCIsImlhdCI6MTU5NTIyMTY3OSwiZXhwIjoxNTk1MjU3Njc5LCJhdF9oYXNoIjoiN3AxRVNkTUtYQ0l1RFEyVDNUUmI1QSIsIm5vbmNlIjoidGJTRGV5flRsNXJwOUZYZUtseVgzNHdJMTAyemd3SkkifQ.MjMuKF7OehhmFjfBXPKNwemhOo6DEF8GZrN4awcvzdJdSSB5tFzlygWOx38E8tf7WgBAHB_ACHV8ZQeyjmlgnl9p0BfMC0LDr82v89ebAKWlMTv1KFfzXFEV3oL1Dt24nPMsZj6-21vGBlGh1b7BOwjYZ1IbdyuL_BqrL7IlPi8clxTaiAKpZEz7usA10rIaC1_GGKhrK-NFCISSFc0H5VozNnCvQurzqAu866UnTWjR0cv9ZampnO22ds1s9b6pKLBz-LEWrOzloYBt6Lp4975dtpsva1jTmYLXp1AxUG2e1q15SYrigPV-qTSyHDfGbDZ0wJJE2FHdseFoZH1xcg";

const wsLink = new WebSocketLink(
  new SubscriptionClient(GRAPHQL_ENDPOINT, {
    reconnect: true,

    connectionParams: {
      headers: {
        Authorization: graphlToken,
      },
    },
  })
);
// 2
const httpLink = createHttpLink({
  uri: "https://test-323.herokuapp.com/v1/graphql",
  credentials: "include",
});
console.log("subcriptionclinet", wsLink, httpLink);
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);
// 3

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: graphlToken,
    },
  };
});
const apolloClient = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
});
export default apolloClient;
