'use strict'

const gql = require('graphql-tag');
const { User, Category } = require('../../shared/typedefs');
const Budget = require('../../budgets/typedefs/budget');

module.exports = gql`
    ${User}
    ${Category}
    ${Budget}
    
    type CategoryTransaction {
        id: ID!,
        budget: Budget!,
        category: Category!,
        title: String!,
        description: String!,
        amount: Float!,
        date: Date!
        createdAt: Date!,
        updatedAt: Date!
    }
`;