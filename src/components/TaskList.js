import React from "react";

import "../styles/App.css";

export const Task = (props) => {
  return (
    <li>
      {props.taskName}
      <button>Edit</button>
      <button>Delete</button>
    </li>
  );
};
export const TaskList = (props) => {
  //   let list = props.taskList;
  //   const [taskList, updateTaskList] = useState(list);
  //   taskList.map((item) => {
  //       let update =  taskList;
  //       update.push(item)
  //   });
  return (
    <div>
      <h1>Created Task</h1>

      {props.taskList.length === 0 ? (
        "you haven't created a task"
      ) : (
        <ul>
          {props.taskList.map((item) => {
            return <Task taskName={item.title} />;
          })}
        </ul>
      )}
    </div>
  );
};
