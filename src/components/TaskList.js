import React from "react";
//Subscription should be here
import "../styles/App.css";
import { useSubscription } from "@apollo/client";
import { TASKS_SUBSCRIPTION } from "../graphql/taskSubscription";
export const Task = (props) => {
  return (
    <li key={props.id}>
      {props.taskName}
      <button>Edit</button>
      <button>Delete</button>
    </li>
  );
};
export const TaskList = () => {
  //   let list = props.taskList;
  //   const [taskList, updateTaskList] = useState(list);
  //   taskList.map((item) => {
  //       let update =  taskList;
  //       update.push(item)
  //   });
  const { data, loading, error } = useSubscription(TASKS_SUBSCRIPTION);
  //   if (data) {
  //     console.log("And data is", data.tasks);
  //     let test = data.tasks[0].title;
  //   }
  return (
    <div>
      <h1>Created Task</h1>

      {data ? (
        <ul>
          {data.tasks.map((item) => {
            return <Task taskName={item.title} key={item.id} id={item.id} />;
          })}
        </ul>
      ) : loading === true ? (
        "Loading Data"
      ) : (
        "you haven't created a task"
      )}
    </div>
  );
};
