const gql = require('graphql-tag');
const {Category} = require('../../shared/typedefs');
const budget = require('./budget');
const mutations = require('./mutations');
const queries = require('./queries');

module.exports = gql`
    ${Category}
    ${budget}
    ${mutations}
    ${queries}
`;
