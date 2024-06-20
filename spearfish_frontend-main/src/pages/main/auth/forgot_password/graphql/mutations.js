import { gql } from "@apollo/client";

export const MUTATION_REQUEST_PASSWORD_RESET = gql`
  mutation($email: String!) {
    sendAccountResetEmail(email: $email) {
      recoveryToken
    }
  }
`;

export const MUTATION_RESET_PASSWORD = gql`
  mutation($data: IResetPassword!) {
    resetPassword(data: $data)
  }
`;
