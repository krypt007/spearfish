import { gql } from "@apollo/client";

export const QUERY_LOGIN_USER = gql`
  query ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token,
      user {
        _id,
        email {
          address
        },
        phone {
          number,
          verified,
        },
        location,
        netIncome,
        name,
        profileImgURL,
        createdAt,
      }
    }
  }
`;
