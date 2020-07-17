import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import * as serviceWorker from "./serviceWorker";

// 1
import { ApolloProvider, ApolloClient, split } from "@apollo/client";
// import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "@apollo/client/link/context";
import { gql, useMutation, useSubscription } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { SubscriptionClient } from "subscriptions-transport-ws";

const GRAPHQL_ENDPOINT = "ws:test-323.herokuapp.com/v1/graphql";
// const subcriptionClient = new SubscriptionClient(GRAPHQL_ENDPOINT, {
//   reconnect: true,
//   credentials: "include",
//   connectionParams: {
//     header: {
//       authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im1xTFFXMDlNTUxRMUNNZGJpV3cwSyJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6Imdvb2dsZS1vYXV0aDJ8MTAzMjgyMTUzNDY1MzMwNTI3ODU1In0sImdpdmVuX25hbWUiOiJkaXB0aSIsImZhbWlseV9uYW1lIjoiZ2FuZGhpIiwibmlja25hbWUiOiJnYW5kaGlkaXB0aS5zIiwibmFtZSI6ImRpcHRpIGdhbmRoaSIsInBpY3R1cmUiOiJodHRwczovL2xoNS5nb29nbGV1c2VyY29udGVudC5jb20vLVdieVBvaHhzR2lvL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FNWnV1Y21PdmZ5ajVqOXgtckpzZEdQWWd5dENVVjRteGcvcGhvdG8uanBnIiwibG9jYWxlIjoiZW4tR0IiLCJ1cGRhdGVkX2F0IjoiMjAyMC0wNy0xN1QwNzoyODo1NC43NjhaIiwiaXNzIjoiaHR0cHM6Ly90ZXN0LTMyMy51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDMyODIxNTM0NjUzMzA1Mjc4NTUiLCJhdWQiOiJNclVTM3NZTEpUU1paMzJpUjN4OUhwQWJ3MzlWVVJVaCIsImlhdCI6MTU5NDk3MDkzNSwiZXhwIjoxNTk1MDA2OTM1LCJhdF9oYXNoIjoidXlvSGRqVVdiTXlFLVRrY20tRTFuQSIsIm5vbmNlIjoia0lNRkozZUMya2I5ZGVYbXRhUjdEcWwxUE5OZGdfSEwifQ.khDnEtkIclFwLJdtodjgD_s5qJ1iLdId44V3eZk1mP8ivF6YCtGW3KvFRRHencoCv6i61zoHxSU4B307fJYDq7vw56rU5C4wZYgqUQyMRP4azDXM8ydFLRjfuux04x5mhkLcGq-XTFh0i0HvAYULSaqxPO_O2tPEnciIoHK3g6QMS1nrVhnMqtjaPlmG79fjQm_UFelk8ZDbj6jgvqAj4LM3S6okTsnqR4cttsCc9fnqjhmK3N239z-CD6loh2l5unus-16LKXq7n0e75h4kYg_dwPSZnxqgTELldrt74I80vpmQvC8QbTNmZYb_KzIeLHc2lB6-cG7MSGAeSsdCvQ`,
//     },
//   },
// });

const wsLink = new WebSocketLink(
  new SubscriptionClient(GRAPHQL_ENDPOINT, {
    reconnect: true,

    connectionParams: {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im1xTFFXMDlNTUxRMUNNZGJpV3cwSyJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6Imdvb2dsZS1vYXV0aDJ8MTAzMjgyMTUzNDY1MzMwNTI3ODU1In0sImdpdmVuX25hbWUiOiJkaXB0aSIsImZhbWlseV9uYW1lIjoiZ2FuZGhpIiwibmlja25hbWUiOiJnYW5kaGlkaXB0aS5zIiwibmFtZSI6ImRpcHRpIGdhbmRoaSIsInBpY3R1cmUiOiJodHRwczovL2xoNS5nb29nbGV1c2VyY29udGVudC5jb20vLVdieVBvaHhzR2lvL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FNWnV1Y21PdmZ5ajVqOXgtckpzZEdQWWd5dENVVjRteGcvcGhvdG8uanBnIiwibG9jYWxlIjoiZW4tR0IiLCJ1cGRhdGVkX2F0IjoiMjAyMC0wNy0xN1QwNzoyODo1NC43NjhaIiwiaXNzIjoiaHR0cHM6Ly90ZXN0LTMyMy51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDMyODIxNTM0NjUzMzA1Mjc4NTUiLCJhdWQiOiJNclVTM3NZTEpUU1paMzJpUjN4OUhwQWJ3MzlWVVJVaCIsImlhdCI6MTU5NDk3MDkzNSwiZXhwIjoxNTk1MDA2OTM1LCJhdF9oYXNoIjoidXlvSGRqVVdiTXlFLVRrY20tRTFuQSIsIm5vbmNlIjoia0lNRkozZUMya2I5ZGVYbXRhUjdEcWwxUE5OZGdfSEwifQ.khDnEtkIclFwLJdtodjgD_s5qJ1iLdId44V3eZk1mP8ivF6YCtGW3KvFRRHencoCv6i61zoHxSU4B307fJYDq7vw56rU5C4wZYgqUQyMRP4azDXM8ydFLRjfuux04x5mhkLcGq-XTFh0i0HvAYULSaqxPO_O2tPEnciIoHK3g6QMS1nrVhnMqtjaPlmG79fjQm_UFelk8ZDbj6jgvqAj4LM3S6okTsnqR4cttsCc9fnqjhmK3N239z-CD6loh2l5unus-16LKXq7n0e75h4kYg_dwPSZnxqgTELldrt74I80vpmQvC8QbTNmZYb_KzIeLHc2lB6-cG7MSGAeSsdCvQ",
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
  const token =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im1xTFFXMDlNTUxRMUNNZGJpV3cwSyJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6Imdvb2dsZS1vYXV0aDJ8MTAzMjgyMTUzNDY1MzMwNTI3ODU1In0sImdpdmVuX25hbWUiOiJkaXB0aSIsImZhbWlseV9uYW1lIjoiZ2FuZGhpIiwibmlja25hbWUiOiJnYW5kaGlkaXB0aS5zIiwibmFtZSI6ImRpcHRpIGdhbmRoaSIsInBpY3R1cmUiOiJodHRwczovL2xoNS5nb29nbGV1c2VyY29udGVudC5jb20vLVdieVBvaHhzR2lvL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FNWnV1Y21PdmZ5ajVqOXgtckpzZEdQWWd5dENVVjRteGcvcGhvdG8uanBnIiwibG9jYWxlIjoiZW4tR0IiLCJ1cGRhdGVkX2F0IjoiMjAyMC0wNy0xN1QwNzoyODo1NC43NjhaIiwiaXNzIjoiaHR0cHM6Ly90ZXN0LTMyMy51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDMyODIxNTM0NjUzMzA1Mjc4NTUiLCJhdWQiOiJNclVTM3NZTEpUU1paMzJpUjN4OUhwQWJ3MzlWVVJVaCIsImlhdCI6MTU5NDk3MDkzNSwiZXhwIjoxNTk1MDA2OTM1LCJhdF9oYXNoIjoidXlvSGRqVVdiTXlFLVRrY20tRTFuQSIsIm5vbmNlIjoia0lNRkozZUMya2I5ZGVYbXRhUjdEcWwxUE5OZGdfSEwifQ.khDnEtkIclFwLJdtodjgD_s5qJ1iLdId44V3eZk1mP8ivF6YCtGW3KvFRRHencoCv6i61zoHxSU4B307fJYDq7vw56rU5C4wZYgqUQyMRP4azDXM8ydFLRjfuux04x5mhkLcGq-XTFh0i0HvAYULSaqxPO_O2tPEnciIoHK3g6QMS1nrVhnMqtjaPlmG79fjQm_UFelk8ZDbj6jgvqAj4LM3S6okTsnqR4cttsCc9fnqjhmK3N239z-CD6loh2l5unus-16LKXq7n0e75h4kYg_dwPSZnxqgTELldrt74I80vpmQvC8QbTNmZYb_KzIeLHc2lB6-cG7MSGAeSsdCvQ";

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
});
// client
//   .query({
//     query: gql`
//       query {
//         tasks(distinct_on: [title]) {
//           created_at
//           end_time
//           id
//           start_time
//           title
//           updated_at
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result));
// start_time: $start_time, end_time: $end_time
// start_time: "2020-03-01 00:00:00-06",
// end_time: "2020-03-01 00:02:00-06",
// $start_time: String!
// $end_time: String!
const INSERT_TASKS = gql`
  mutation InsertTasks($title: String!, $start_time: timestamptz!) {
    insert_tasks(objects: [{ title: $title, start_time: $start_time }]) {
      returning {
        id
        title
      }
    }
  }
`;
function InsertTasks() {
  const [insertTasks] = useMutation(INSERT_TASKS);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        insertTasks({
          variables: {
            title: "Burger2222",
            start_time: "2020-03-01 00:00:00-06",
          },
        });
      }}
    >
      <button type="submit">Add Todo</button>
    </form>
  );
}
const TASKS_SUBSCRIPTION = gql`
  subscription {
    tasks(distinct_on: [title]) {
      title
    }
  }
`;
function LatestTask() {
  const { data, loading, error } = useSubscription(TASKS_SUBSCRIPTION);
  if (data) {
    console.log("And data is", data.tasks);
    let test = data.tasks[0].title;
    return <h4>SOmething:{test} </h4>;
  } else {
    return <h4>waiting for data</h4>;
  }
}
// 4
ReactDOM.render(
  <ApolloProvider client={client}>
    {/* <App /> */}
    <InsertTasks />
    <LatestTask />
  </ApolloProvider>,
  document.getElementById("root")
);
serviceWorker.unregister();
