const categoryTransaction = require('./categoryTransaction');
const mutations = require('./mutations');
const queries = require('./queries');
const gql = require('graphql-tag');

module.exports = gql`
    ${categoryTransaction}
    ${mutations}
    ${queries}
`;
