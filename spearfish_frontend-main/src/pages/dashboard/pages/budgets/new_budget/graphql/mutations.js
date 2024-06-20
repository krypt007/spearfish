import { gql } from "@apollo/client";

export const MUTATION_CREATE_BUDGET = gql`
  mutation($data: INewBudget!) {
    createBudget(data: $data) {
      id,
      isClosed,
      name,
      user
      categories {
        amount,
        category {
          name
        }
      }
    }
  }
`;
