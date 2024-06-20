'use strict'
const gql = require('graphql-tag');

module.exports = gql`
    type LoginPayload {
        token: String!
        user: User!
    }
    
    input IVerifyEmail {
        email: String!,
        code: Int!,
        pid: String!
    }
    
    extend type Query {
        login(email: String!, password: String!): LoginPayload!
    }
    
    extend type Mutation {
        verifyEmail(data: IVerifyEmail!): Boolean!
    }
`;