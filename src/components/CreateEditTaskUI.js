import React, { useState, useCallback } from "react";
import "../styles/App.css";
import { Form } from "react-bootstrap";
// import saveTask from "./data/saveTask";
import { useMutation } from "@apollo/client";

import { getTimeStamp } from "./utils";

const CreateTask = (props) => {
  const [taskDetail, updateTaskDetails] = useState(props.prefilled);
  const [insertTasks] = useMutation(props.mutationQuery); //dynamic graphql query
  console.log(
    "Remove Edit form",
    props.disappearAfterUpdate === true,
    props.removeEditForm
  );
  let removeEdit = props.updateEditTask;

  function updatefeildState(event) {
    let { id, value } = event.target;

    updateTaskDetails((prev) => {
      return { ...prev, [id]: value };
    });
  }

  const handleremoveForm = useCallback(
    (event) => {
      removeEdit(undefined);
    },
    [removeEdit]
  );

  return (
    <Form submit={props.task}>
      <Form.Group>
        <Form.Label>Task Name:</Form.Label>
        <Form.Control
          type="string"
          placeholder="Enter the task name"
          value={taskDetail.title}
          id="title"
          onChange={(e) => updatefeildState(e)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Add tags:</Form.Label>
        <Form.Control
          type="string"
          placeholder="Enter the tags"
          value={taskDetail.tags}
          id="tags"
          onChange={(e) => updatefeildState(e)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Start Time:</Form.Label>
        <Form.Control
          type="time"
          placeholder="Enter start Time"
          value={taskDetail.start}
          id="start"
          onChange={(e) => updatefeildState(e)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>End time:</Form.Label>
        <Form.Control
          type="time"
          placeholder="Enter end time"
          value={taskDetail.end}
          id="end"
          onChange={(e) => updatefeildState(e)}
        />
      </Form.Group>
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          if (taskDetail.id === "") {
            insertTasks({
              variables: {
                title: taskDetail.title,
                start_time: getTimeStamp(taskDetail.start),
                end_time: getTimeStamp(taskDetail.end),
              },
            });
          } else {
            insertTasks({
              variables: {
                title: taskDetail.title,
                start_time: getTimeStamp(taskDetail.start),
                end_time: getTimeStamp(taskDetail.end),
                id: taskDetail.id,
              },
            });
            handleremoveForm();
          }
        }}
      >
        {props.name}
      </button>
    </Form>
  );
};
CreateTask.defaultProps = {
  prefilled: {
    title: "",
    tags: "",
    start: "00",
    end: "00",
    id: "",
  },
  updateEditTask: () => {},
};
export default CreateTask;
