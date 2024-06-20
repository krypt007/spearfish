import { gql } from "@apollo/client";

export const MUTATION_CREATE_USER = gql`
  mutation ($data: INewUser) {
    createUser(data: $data) {
      _id,
      name,
      email {
        address
      }
    }
  }
`;
