import React from "react";
import "../styles/App.css";
import CreateTask from "./creatTask";
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
function App() {
  return (
    <div className="App">
      <CreateTask />
    </div>
  );
}

export default App;
