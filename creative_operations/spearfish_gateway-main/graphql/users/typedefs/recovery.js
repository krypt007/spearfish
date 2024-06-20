'use strict'

const gql = require('graphql-tag');

module.exports = gql`
    type ORecoveryToken {
        recoveryToken: String!
    }
    
    input IResetPassword {
        email: String!,
        password: String!,
        recoveryToken: String!
    }
    
    extend type Mutation {
        sendAccountResetEmail(email: String!): ORecoveryToken!
        resetPassword(data: IResetPassword!): Boolean!
    }
`;