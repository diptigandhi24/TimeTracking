import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
// import gql from "graphql-tag";

// 1
import { ApolloProvider, ApolloClient } from "@apollo/client";
// import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "@apollo/client/link/context";
import { gql, useMutation } from "@apollo/client";
// 2
const httpLink = createHttpLink({
  uri: "https://test-323.herokuapp.com/v1/graphql",
  credentials: "include",
});

// 3

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im1xTFFXMDlNTUxRMUNNZGJpV3cwSyJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6Imdvb2dsZS1vYXV0aDJ8MTAzMjgyMTUzNDY1MzMwNTI3ODU1In0sImdpdmVuX25hbWUiOiJkaXB0aSIsImZhbWlseV9uYW1lIjoiZ2FuZGhpIiwibmlja25hbWUiOiJnYW5kaGlkaXB0aS5zIiwibmFtZSI6ImRpcHRpIGdhbmRoaSIsInBpY3R1cmUiOiJodHRwczovL2xoNS5nb29nbGV1c2VyY29udGVudC5jb20vLVdieVBvaHhzR2lvL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FNWnV1Y21PdmZ5ajVqOXgtckpzZEdQWWd5dENVVjRteGcvcGhvdG8uanBnIiwibG9jYWxlIjoiZW4tR0IiLCJ1cGRhdGVkX2F0IjoiMjAyMC0wNy0xN1QwNToxODo0OS4wNTJaIiwiaXNzIjoiaHR0cHM6Ly90ZXN0LTMyMy51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDMyODIxNTM0NjUzMzA1Mjc4NTUiLCJhdWQiOiJNclVTM3NZTEpUU1paMzJpUjN4OUhwQWJ3MzlWVVJVaCIsImlhdCI6MTU5NDk2MzEyOSwiZXhwIjoxNTk0OTk5MTI5LCJhdF9oYXNoIjoiUlNnYWU5N0dZREJjTUR1Rnl1ZjVmQSIsIm5vbmNlIjoiVTBZSC1JZWxPcHNZY2NhWE9lNnBuQkN3aVFvVjBnTjQifQ.1BA6ayT9HD8jGS1oXFOaH0U1wrXV6mxPW0J2J1lLYtDccPWvLmDAPNI6cIBpn0FOkBnmSZv0ww_GTROapFGI5NFrcf3s_ds4NwhBbq8dWWlWY56sXrGL8kYiAu3g3F9C19chOciadeSDiQM5G8-ITnCCGTOROXJMKhoNateCb9JJQJEHUL5hdgnazpUYO0nsMLlALjg6-QQRRCoGtVk77Ngti2kKfVidCx1-_1F4ZwtHbbE1WRA5oEh-bnQzC6IsD0yPxX7DAO3oDlWXnIWtsZynqYQUbx0VFf6fKiq5rWPuHA6zEwy-20w6mU5d1uFXT1-eMS3okc_ygFxo6oyPBQ";

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
  const [insertTasks, { data }] = useMutation(INSERT_TASKS);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        insertTasks({
          variables: {
            title: "Kitto",
            start_time: "2020-03-01 00:00:00-06",
          },
        });
      }}
    >
      <button type="submit">Add Todo</button>
    </form>
  );
}
// 4
ReactDOM.render(
  <ApolloProvider client={client}>
    {/* <App /> */}
    <InsertTasks />
  </ApolloProvider>,
  document.getElementById("root")
);
serviceWorker.unregister();
