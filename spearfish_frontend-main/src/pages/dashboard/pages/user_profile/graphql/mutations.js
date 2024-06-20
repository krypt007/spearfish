import { gql } from "@apollo/client";

export const MUTATION_UPDATE_USER_PROFILE = gql`
  mutation($data: IUpdateUser!) {
    updateUserDetails(data: $data) {
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
