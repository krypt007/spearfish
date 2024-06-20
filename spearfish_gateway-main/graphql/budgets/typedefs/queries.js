const gql = require('graphql-tag');

module.exports = gql`
    input IBudgetQueryData {
        _id: ID,
        name: String,
        isClosed: Boolean,
        amount: Float,
    }
    
    input IBudgetQuery {
        query: IBudgetQueryData,
        skip: Int,
        limit: Int,
    }
    
    extend type Query {
        getBudgets(data: IBudgetQuery): [Budget!]!,
        getBudget(query: IBudgetQueryData!): Budget
    }
`;