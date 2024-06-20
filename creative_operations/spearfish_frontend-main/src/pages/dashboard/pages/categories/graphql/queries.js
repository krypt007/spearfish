import { gql } from "@apollo/client";

export const QUERY_GET_CATEGORIES_IN_BUDGET = gql`
  query($budgetId: ID!) {
    getCategoriesInBudget(budget_id: $budgetId) {
      total_amount,
      amount,
      category {
        _id,
        name,
        img,
        icon,
        description,
      }
    }
  }
`;
