'use strict'

const gql = require('graphql-tag');

module.exports = gql`
    input INewTransaction {
        budget_id: ID!,
        category_id: ID!,
        amount: Float!,
        title: String!,
        date: Date,
        description: String!
    }
    
    input IUpdateTransaction {
        category_id: ID!
        transaction_id: ID!,
        amount: Float!,
        title: String!,
        date: Date,
        description: String!
    }
    
    extend type Mutation {
        createCategoryTransaction(data: INewTransaction!): CategoryTransaction!
        editCategoryTransaction(data: IUpdateTransaction!): CategoryTransaction!
        deleteCategoryTransaction(transaction_id: ID!): CategoryTransaction!
    }
`;
