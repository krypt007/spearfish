import { gql } from "@apollo/client";

export const QUERY_GET_CATEGORY = gql`
  query($budgetId: ID!, $categoryId: ID!) {
    getCategory(budget_id: $budgetId, category_id: $categoryId) {
      _category {
        amount,
        total_amount,
        category {
          name
        }
      },
      budget {
        name,
      }
    }
  }
`;

export const QUERY_GET_CATEGORY_TRANSACTIONS = gql`
  query ($data: IRetrieveTransactions!) {
    getCategoryTransactions(data: $data) {
      id,
      amount,
      title,
      description,
      date,
      category {
        _id,
        name
      },
      budget {
        amount,
        name
      }
    }
  }
`;
