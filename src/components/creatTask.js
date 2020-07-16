import React, { useState, useEffect } from "react";
import "../styles/App.css";
import { Form, Button } from "react-bootstrap";
import saveTask from "./data/saveTask";
const CreateTask = (props) => {
  const [taskDetail, updateTaskDetails] = useState({
    title: "",
    tags: "",
    start: "",
    end: "",
  });

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
          type="string"
          placeholder="Enter start Time"
          value={taskDetail.start}
          id="start"
          onChange={(e) => updatefeildState(e)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>End time:</Form.Label>
        <Form.Control
          type="string"
          placeholder="Enter end time"
          value={taskDetail.end}
          id="end"
          onChange={(e) => updatefeildState(e)}
        />
      </Form.Group>
      <Button
        variant="primary"
        onClick={() => console.log("Yay you have create a task")}
      >
        Create Task
      </Button>
    </Form>
  );
};

export default CreateTask;
