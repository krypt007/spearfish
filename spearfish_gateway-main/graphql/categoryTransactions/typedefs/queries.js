'use strict'

const gql = require('graphql-tag');


module.exports = gql`
    input IRetrieveTransactions {
        budget_id: ID!,
        category_id: ID!,
        skip: Int,
        limit: Int
    }
    
    extend type Query {
        getCategoryTransactions(data: IRetrieveTransactions!): [CategoryTransaction!]!
        recentActivities: [CategoryTransaction!]!
    }
`;
