const gql = require('graphql-tag');

module.exports = gql`
    input CategoryInput {
        category: ID!,
        amount: Float!
    }
    
    input INewBudget {
        amount: Float!,
        name: String!,
        categories: [CategoryInput!]!
    }
    
    input IEditBudget {
        amount: Int!,
        name: String!,
    }
    
    extend type Mutation {
        createBudget(data: INewBudget!): Budget!
        editBudget(id: ID!, data: IEditBudget!): Budget!
        deleteBudget(id: ID!): Budget!
    }
`;