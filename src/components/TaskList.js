import React, { useState, useEffect } from "react";
//Subscription should be here
import "../styles/App.css";
import { useSubscription, useMutation } from "@apollo/client";
import { TASKS_SUBSCRIPTION } from "../graphql/taskSubscription";
import Task from "./Task";
export const TaskList = () => {
  const { data, loading, error } = useSubscription(TASKS_SUBSCRIPTION);

  // const [enteredTask, updateEnteredTask] = useState([]);
  return (
    <div>
      <h1>Created Task</h1>

      {data ? (
        <ul>
          {data.tasks.map((item) => {
            return (
              <Task
                taskName={item.title}
                key={item.id}
                id={item.id}
                item={item}
              />
            );
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
