'use strict'

const gql = require('graphql-tag');

module.exports = gql`
  input INewUser {
    firstName: String!,
    lastName: String!,
    email: String!,
    password: String!,
    acceptedTerms: Boolean!,
  }
  
  input IUpdateUser {
    firstName: String!,
    lastName: String!,
    phone: Int!,
    location: String!
  }
  
  type OUpdatedUser {
    user: User!,
    token: String!
  }

  extend type Mutation {
    createUser(data: INewUser): User!
    updateUserDetails(data: IUpdateUser!): OUpdatedUser!
  }
`;
