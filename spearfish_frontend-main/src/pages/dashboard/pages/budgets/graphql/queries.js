import { gql } from "@apollo/client";

export const QUERY_MY_BUDGETS = gql`
  query {
    getBudgets {
      id,
      name,
      isClosed,
      amount,
      createdAt,
      categories {
        total_amount,
        category {
          name
        }
      }
    }
  }
`;
