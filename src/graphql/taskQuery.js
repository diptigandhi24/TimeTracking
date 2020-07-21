import { gql } from "@apollo/client";
export const SEARCH_QUERY = gql`
  query searchQuery($title: String!) {
    tasks(where: { title: { _like: $title } }) {
      end_time
      id
      start_time
      title
    }
  }
`;

// export const SEARCH_QUERY = gql`
//   query {
//     tasks(distinct_on: [title]) {
//       created_at
//       end_time
//       id
//       start_time
//       title
//       updated_at
//     }
//   }
// `;

// const searchUserQ = gql`
//   query User($name: String!) {
//     user(name: $name) {
//       id
//       name
//       email
//     }
//   }
// `;
