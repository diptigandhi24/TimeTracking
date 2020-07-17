import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "./graphql/apolloClient";
import { gql, useMutation, useSubscription } from "@apollo/client";
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
  <ApolloProvider client={apolloClient}>
    {/* <App /> */}
    <InsertTasks />
    <LatestTask />
  </ApolloProvider>,
  document.getElementById("root")
);
serviceWorker.unregister();
