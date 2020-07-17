import { gql } from "@apollo/client";
export const INSERT_TASKS = gql`
  mutation InsertTasks(
    $title: String!
    $start_time: timestamptz!
    $end_time: timestamptz!
  ) {
    insert_tasks(objects: [{ title: $title, start_time: $start_time }]) {
      returning {
        id
        title
      }
    }
  }
`;
