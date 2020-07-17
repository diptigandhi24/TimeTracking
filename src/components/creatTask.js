import React, { useState } from "react";
import "../styles/App.css";
import { Form } from "react-bootstrap";
// import saveTask from "./data/saveTask";
import { gql, useMutation } from "@apollo/client";
import { INSERT_TASKS, DELETE_TASK } from "../graphql/taskMutation";
import { getTimeStamp } from "./utils";

const CreateTask = (props) => {
  const [taskDetail, updateTaskDetails] = useState({
    title: "",
    tags: "",
    start: "00",
    end: "00",
  });
  const [insertTasks] = useMutation(INSERT_TASKS);

  function updatefeildState(event) {
    let { id, value } = event.target;

    updateTaskDetails((prev) => {
      return { ...prev, [id]: value };
    });
  }

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
          insertTasks({
            variables: {
              title: taskDetail.title,
              start_time: getTimeStamp(taskDetail.start),
              end_time: getTimeStamp(taskDetail.end),
            },
          });
        }}
      >
        Create Task
      </button>
    </Form>
  );
};

export default CreateTask;
