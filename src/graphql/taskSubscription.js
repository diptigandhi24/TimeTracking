import { gql } from "@apollo/client";

export const TASKS_SUBSCRIPTION = gql`
  subscription {
    tasks(distinct_on: [title]) {
      title
      id
    }
  }
`;
