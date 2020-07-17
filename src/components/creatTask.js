import React, { useState } from "react";
import "../styles/App.css";
import { Form } from "react-bootstrap";
// import saveTask from "./data/saveTask";
// import { Mutation } from "react-apollo";
// import gql from "graphql-tag";
// import { useMutation } from "apollo-client";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const POST_MUTATION = gql`
  mutation PostMutation(
    $title: String!
    $start_time: String!
    $end_time: String!
  ) {
    insert_tasks(
      objects: [{ title: $title, start_time: $start_time, end_time: $end_time }]
    ) {
      returning {
        id
        title
      }
    }
  }
`;
console.log("Post Mutation", POST_MUTATION);
const CreateTask = (props) => {
  const [taskDetail, updateTaskDetails] = useState({
    title: "",
    tags: "",
    start: "00",
    end: "00",
  });
  const [addTodo, { data }] = useMutation(POST_MUTATION);

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
        onClick={() =>
          addTodo({
            variables: {
              title: "Waffles",
              start_time: "2020-03-01 00:00:00-06",
              end_time: "2020-03-01 00:02:00-06",
            },
          })
        }
      >
        Submit
      </button>
    </Form>
  );
};

export default CreateTask;
