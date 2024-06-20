import { gql } from "@apollo/client";

export const MUTATION_ADD_CATEGORY_TO_BUDGET = gql`
  mutation($budgetId: ID!, $data: IAddCategoryData!) {
    addCategoryToBudget(budgetId: $budgetId, data: $data) {
      category {
        name
      }
    }
  }
`;
