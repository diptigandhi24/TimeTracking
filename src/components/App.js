import React from "react";
import "../styles/App.css";
import CreateTask from "./creatTask";
import { TaskList } from "./TaskList";

let mockTaskList = [{ title: "create App" }, { title: "create Graphql" }];
function App() {
  return (
    <div className="App">
      {/* <CreateTask /> */}
      <TaskList taskList={mockTaskList} />
    </div>
  );
}

export default App;
