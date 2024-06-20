'use strict'

const gql = require("graphql-tag");

module.exports = gql`
    input IEditCategoryData {
        amount: Int!
    }
    
    input IEditCategoryQuery {
        budgetId: ID!,
        categoryId: ID!,
    }
    
    input IAddCategoryData {
        categoryId: ID!,
        amount: Int!
    }
    
    extend type Mutation {
        deleteCategory(budgetId: ID!, categoryId: ID!): OBudgetCategories!
        editCategory(query: IEditCategoryQuery!, data: IEditCategoryData!): OBudgetCategories!
        addCategoryToBudget(budgetId: ID!, data: IAddCategoryData!): [OBudgetCategories!]!
    }
`;
