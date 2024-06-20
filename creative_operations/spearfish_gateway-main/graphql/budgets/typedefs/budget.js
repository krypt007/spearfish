const gql = require('graphql-tag');

module.exports = gql`
    type BudgetCategory {
        category: Category!,
        amount: Float!
        total_amount: Float!
    }
    
    type Budget {
        id: ID!
        name: String!,
        user: ID!,
        isClosed: Boolean!,
        amount: Float!,
        savings: Float!,
        categories: [BudgetCategory!]!,
        createdAt: Date!
    }
`;
