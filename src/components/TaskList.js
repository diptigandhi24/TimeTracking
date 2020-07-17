import React from "react";
//Subscription should be here
import "../styles/App.css";
import { useSubscription, useMutation } from "@apollo/client";
import { TASKS_SUBSCRIPTION } from "../graphql/taskSubscription";
import { DELETE_TASK } from "../graphql/taskMutation";
export const Task = (props) => {
  const [deleteTasks] = useMutation(DELETE_TASK);
  return (
    <li key={props.id}>
      {props.taskName}
      <button>Edit</button>
      <button
        onClick={(e) => {
          deleteTasks({ variables: { id: props.id } });
        }}
      >
        Delete
      </button>
    </li>
  );
};
export const TaskList = () => {
  const { data, loading, error } = useSubscription(TASKS_SUBSCRIPTION);

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
