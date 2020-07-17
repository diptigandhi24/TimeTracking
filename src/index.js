import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "./graphql/apolloClient";
import CreateTask from "./components/creatTask";
import { TaskList } from "./components/TaskList";
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

function InsertTasks() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <button type="submit">Add Todo</button>
    </form>
  );
}

// 4
ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    {/* <App /> */}
    {/* <InsertTasks /> */}
    <CreateTask />
    <TaskList />
  </ApolloProvider>,
  document.getElementById("root")
);
serviceWorker.unregister();
