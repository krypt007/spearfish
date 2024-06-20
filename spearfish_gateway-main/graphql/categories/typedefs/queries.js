'use strict'

const gql = require("graphql-tag");

module.exports = gql`
  type OBudgetCategories {
    category: Category!,
    amount: Float!,
    total_amount: Float!
  }
  
  type OCategoriesBudget {
    id: ID!
    name: String!,
    user: ID!,
    isClosed: Boolean!,
    amount: Float!,
    createdAt: Date!
  }
  
  type OCategory {
    _category: OBudgetCategories,
    budget: OCategoriesBudget
  }
  
  extend type Query {
    defaultCategories: [Category!]!
    getCategoriesInBudget(budget_id: ID!): [OBudgetCategories!]!
    getCategory(budget_id: ID!, category_id: ID!): OCategory!
  }
`;
