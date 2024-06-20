const {GraphQLError} = require('graphql');

module.exports = {
    badRequest(message) {
        throw new GraphQLError(message, {
            extensions: {code: 'BAD_REQUEST'},
        });
    },

    badUserInput(message) {
        throw new GraphQLError(message, {
            extensions: {code: 'BAD_USER_INPUT'},
        });
    },
    unAuthenticated(message) {
        throw new GraphQLError(message, {
            extensions: {code: 'UNAUTHENTICATED'},
        });
    }
}