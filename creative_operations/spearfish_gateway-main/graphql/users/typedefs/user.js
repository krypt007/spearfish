'use strict'
const gql = require('graphql-tag');

module.exports = gql`
    extend type Query {
        getUser(id: ID, email: String): User!
    }
`;
