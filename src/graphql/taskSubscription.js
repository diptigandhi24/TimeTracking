import { gql } from "@apollo/client";

export const TASKS_SUBSCRIPTION = gql`
  subscription {
    tasks(distinct_on: [id]) {
      title
      id
      start_time
      end_time
    }
  }
`;
