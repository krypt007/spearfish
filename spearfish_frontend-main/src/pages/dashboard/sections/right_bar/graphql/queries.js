import { gql } from "@apollo/client";

export const QUERY_GET_RECENT_ACTIVITIES = gql`
  query {
    recentActivities {
      amount,
      description,
      title,
      date,
      budget {
        name,
        id
      },
      category {
        _id,
        name,
        icon
      }
    }
  }
`;
