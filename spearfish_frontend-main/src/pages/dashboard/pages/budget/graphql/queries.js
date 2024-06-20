import { gql } from "@apollo/client";

export const QUERY_GET_BUDGET = gql`
  query($query: IBudgetQueryData!) {
    getBudget(query: $query) {
      id,
      amount,
      name,
      categories {
        amount,
        total_amount,
        category {
          name,
          img,
          _id
        }
      }
    }
  }
`;
