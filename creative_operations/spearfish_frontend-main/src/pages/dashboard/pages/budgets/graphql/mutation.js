import { gql } from "@apollo/client";

export const MUTATION_DELETE_BUDGET = gql`
  mutation($deleteBudgetId: ID!) {
    deleteBudget(id: $deleteBudgetId) {
      name
    }
  }
`;

export const MUTATION_UPDATE_BUDGET = gql`
  mutation($editBudgetId: ID!, $data: IEditBudget!) {
    editBudget(id: $editBudgetId, data: $data) {
      amount,
      name
    }
  }
`;
