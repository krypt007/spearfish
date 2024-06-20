'use strict'

const gql = require('graphql-tag');

const User = gql`
    type Email {
        address: String!,
        verificationCode: String,
        verified: Boolean!,
        recoveryToken: String,
    }

    type Phone {
        number: Int,
        verificationCode: String,
        verified: Boolean,
    }

    type User {
        _id: String!
        name: String!,
        email: Email!,
        phone: Phone!,
        location: String,
        profileImgURL: String,
        netIncome: Int,
        acceptedTerms: Boolean!,
        createdAt: Date!
    }
`;

const Category = gql`
    ${User}
    
    type Category {
        _id: ID!,
        name: String!,
        img: String!,
        icon: String!,
        description: String!,
        owner: User!
    }
`;

module.exports = { User, Category };
