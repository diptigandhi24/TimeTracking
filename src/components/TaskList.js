import React, { useState, useEffect } from "react";
//Subscription should be here
import "../styles/App.css";
import { useSubscription } from "@apollo/client";
import { TASKS_SUBSCRIPTION } from "../graphql/taskSubscription";
import { SEARCH_QUERY } from "../graphql/taskQuery";
import Task from "./Task";
import { Form, Button } from "react-bootstrap";
import apolloClient from "../graphql/apolloClient";
export const TaskList = () => {
  let { data, loading, error } = useSubscription(TASKS_SUBSCRIPTION);

  // let { queryTitle } = client.query({
  //   query: SEARCH_QUERY,

  // });
  // console.log("You are QIering for HELL", queryTitle);
  apolloClient
    .query({
      query: SEARCH_QUERY,
      variables: { title: "%hell%" },
    })
    .then((result) => console.log("Result of the query is", result));
  return (
    <div>
      <h1>Created Task</h1>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Control type="string" placeholder="search/filter" />
          <Button
            variant="primary"
            type="button"
            onClick={(e) => {}}
            value="hel"
          >
            Search
          </Button>
        </Form.Group>
      </Form>
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
