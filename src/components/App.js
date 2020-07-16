import React from "react";
import "../styles/App.css";
import CreateTask from "./creatTask";
import { TaskList } from "./TaskList";

// import ApolloClient from "apollo-boost";
// import { ApolloProvider } from "react-apollo";

// const client = new ApolloClient({
//   uri: "https://test-323.herokuapp.com/v1/graphql",
// });

// function App() {
//   return (
//     <div className="App">
//       <ApolloProvider client={client}>
//         <div>
//           <h2>My first Apollo app</h2>
//         </div>
//       </ApolloProvider>
//     </div>
//   );
// }
let mockTaskList = [{ title: "create App" }, { title: "create Graphql" }];
function App() {
  return (
    <div className="App">
      <CreateTask />
      <TaskList taskList={mockTaskList} />
    </div>
  );
}

export default App;
