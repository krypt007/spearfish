import { gql } from "@apollo/client";

export const QUERY_DEFAULT_CATEGORIES = gql`
  query {
    defaultCategories {
      description,
      icon,
      name,
      _id
    }
  }
`;
