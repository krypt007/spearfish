import { gql } from "@apollo/client";

// Categories / Dials
export const MUTATION_UPDATE_CATEGORY = gql`
  mutation($query: IEditCategoryQuery!, $data: IEditCategoryData!) {
    editCategory(query: $query, data: $data) {
      amount,
    }
  }
`;

export const MUTATION_DELETE_CATEGORY = gql`
  mutation($budgetId: ID!, $categoryId: ID!) {
    deleteCategory(budgetId: $budgetId, categoryId: $categoryId) {
      category {
        name
      },
      amount
    }
  }
`;

// Transactions

export const MUTATION_CREATE_CATEGORY_TRANSACTION = gql`
  mutation($data: INewTransaction!) {
    createCategoryTransaction(data: $data) {
      budget {
        name,
        amount
      },
      category {
        name
      }
      amount,
      description,
      id,
      createdAt,
      updatedAt
    }
  }
`;

export const MUTATION_UPDATE_CATEGORY_TRANSACTION = gql`
  mutation($data: IUpdateTransaction!) {
    editCategoryTransaction(data: $data) {
      budget {
        name,
        amount
      },
      category {
        name
      }
      amount,
      description,
      id,
      createdAt,
      updatedAt
    }
  }
`;

export const MUTATION_DELETE_CATEGORY_TRANSACTION = gql`
  mutation($transactionId: ID!) {
    deleteCategoryTransaction(transaction_id: $transactionId) {
      id,
      amount,
      description
    }
  }
`;
