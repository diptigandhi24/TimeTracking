import React from "react";
import "../styles/App.css";
import { Form, Button } from "react-bootstrap";
const CreateTask = () => {
  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Task Name:</Form.Label>
        <Form.Control type="string" placeholder="Enter the task name" />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Add tags:</Form.Label>
        <Form.Control type="string" placeholder="Enter the tags" />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Start Time:</Form.Label>
        <Form.Control type="string" placeholder="Enter start Time" />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>End time:</Form.Label>
        <Form.Control type="string" placeholder="Enter end time" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CreateTask;
