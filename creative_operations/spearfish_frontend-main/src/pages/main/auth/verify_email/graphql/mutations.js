import { gql } from "@apollo/client";

export const MUTATION_VERIFY_EMAIL = gql`
  mutation($data: IVerifyEmail!) {
    verifyEmail(data: $data)
  }
`;
