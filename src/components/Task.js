import React, { useState, useEffect } from "react";

import { DELETE_TASK } from "../graphql/taskMutation";
import { useMutation } from "@apollo/client";
import CreateEditTaskUI from "./CreateEditTaskUI";
import { EDIT_TASK } from "../graphql/taskMutation";
export const Task = (props) => {
  const [deleteTasks] = useMutation(DELETE_TASK);
  const [editTaskComponent, loadEditTask] = useState(undefined);
  //   useEffect(() => {
  //     if (editTaskComponent !== undefined) {
  //       loadEditTask(undefined);
  //     }
  //   });
  //   console.log("Printing the details of current props LI", props.item);
  function editTask(e) {
    console.log(" edited component", e.target.getAttribute("data-taskfield"));
    loadEditTask(
      <CreateEditTaskUI mutationQuery={EDIT_TASK} name={"Edit Button"} />
    );
  }

  if (!editTaskComponent) {
    return (
      <li key={props.id}>
        {props.taskName}
        <button
          onClick={(e) => {
            editTask(e);
          }}
          value={[props.item]}
          data-taskfield={props.item}
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            deleteTasks({ variables: { id: props.id } });
          }}
        >
          Delete
        </button>
      </li>
    );
  } else {
    return editTaskComponent;
  }
};
export default Task;
