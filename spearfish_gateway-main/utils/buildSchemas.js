const gql = require("graphql-tag");
const { makeExecutableSchema } = require('@graphql-tools/schema');

class BuildGraphQLSchema {
    constructor(types, resolvers) {
        const { queries, mutations } = resolvers;
        this.types = types;
        this.queries = queries;
        this.mutations = mutations;
    }

    buildTypeDefs () {
        return gql`
            scalar Date
            
            type Query {
                _empty: String
            }

            type Mutation {
                _empty: String
            }

            ${this.types}
        `;
    }

    buildResolvers () {
        return {
            Query: {
                ...this.queries
            },

            Mutation: {
                ...this.mutations
            },
        };
    }

    schema () {
        return makeExecutableSchema({
            typeDefs: this.buildTypeDefs(),
            resolvers: this.buildResolvers()
        })
    }
}

module.exports = BuildGraphQLSchema;
